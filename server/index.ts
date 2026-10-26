import 'dotenv/config';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';
import { ARCHIVE_ITEMS, CASE_STUDIES, MERAJ_PROFILE } from '../src/data/portfolioData';
import type { PortfolioData } from '../src/types';
import {
  deleteMediaFromR2,
  getMediaUploadLimit,
  R2StorageError,
  uploadMediaToR2,
  validateMediaUpload,
} from './utils/r2';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = path.join(rootDir, 'data', 'portfolio.json');
const mediaFile = path.join(rootDir, 'data', 'media.json');
const distDir = path.join(rootDir, 'dist');
const defaultData: PortfolioData = {
  profile: MERAJ_PROFILE,
  caseStudies: CASE_STUDIES,
  archiveItems: ARCHIVE_ITEMS,
};
const sessions = new Map<string, number>();
const sessionLifetimeMs = 8 * 60 * 60 * 1000;
const sessionCookie = 'portfolio_admin_session';

interface StoredMedia {
  id: string;
  fileName: string;
  url: string;
  storageKey: string;
  type: 'image' | 'video';
  mimeType: string;
  size: number;
  createdAt: string;
}

let portfolioData: PortfolioData = defaultData;
let mediaItems: StoredMedia[] = [];
try {
  portfolioData = JSON.parse(await readFile(dataFile, 'utf8')) as PortfolioData;
} catch {
  // Source data remains available until the first admin save.
}

try {
  const savedMedia = JSON.parse(await readFile(mediaFile, 'utf8')) as unknown;
  if (!Array.isArray(savedMedia)) throw new Error('Media library data must be an array.');
  mediaItems = savedMedia as StoredMedia[];
} catch (error) {
  if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error;
}

async function saveMediaItems(items: StoredMedia[]) {
  await mkdir(path.dirname(mediaFile), { recursive: true });
  await writeFile(mediaFile, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
  mediaItems = items;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function getSessionToken(request: Request) {
  const cookieHeader = request.headers.cookie || '';
  const cookie = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${sessionCookie}=`));
  return cookie?.slice(sessionCookie.length + 1);
}

function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const token = getSessionToken(request);
  const expiresAt = token ? sessions.get(token) : undefined;
  if (!token || !expiresAt || expiresAt < Date.now()) {
    if (token) sessions.delete(token);
    response.status(401).json({ error: 'Admin login required.' });
    return;
  }
  next();
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '8mb' }));

app.get('/api/portfolio', (_request, response) => {
  response.json(portfolioData);
});

app.post('/api/admin/login', (request, response) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    response.status(503).json({ error: 'Set ADMIN_EMAIL and ADMIN_PASSWORD in the server environment first.' });
    return;
  }

  const email = typeof request.body?.email === 'string' ? request.body.email.trim() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';
  if (!safeEqual(email.toLowerCase(), adminEmail.trim().toLowerCase()) || !safeEqual(password, adminPassword)) {
    response.status(401).json({ error: 'Email or password is incorrect.' });
    return;
  }

  const token = randomBytes(32).toString('hex');
  sessions.set(token, Date.now() + sessionLifetimeMs);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.setHeader('Set-Cookie', `${sessionCookie}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}`);
  response.json({ authenticated: true });
});

app.get('/api/admin/session', (request, response) => {
  const token = getSessionToken(request);
  const expiresAt = token ? sessions.get(token) : undefined;
  if (!token || !expiresAt || expiresAt < Date.now()) {
    if (token) sessions.delete(token);
    response.json({ authenticated: false });
    return;
  }
  response.json({ authenticated: true });
});

app.post('/api/admin/logout', (request, response) => {
  const token = getSessionToken(request);
  if (token) sessions.delete(token);
  response.setHeader('Set-Cookie', `${sessionCookie}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
  response.json({ authenticated: false });
});

app.put('/api/admin/portfolio', requireAdmin, async (request, response) => {
  const nextData = request.body as PortfolioData;
  if (
    !nextData ||
    !nextData.profile ||
    !Array.isArray(nextData.caseStudies) ||
    !Array.isArray(nextData.archiveItems) ||
    typeof nextData.profile.name !== 'string' ||
    !nextData.profile.email
  ) {
    response.status(400).json({ error: 'Portfolio data is incomplete or invalid.' });
    return;
  }

  try {
    await mkdir(path.dirname(dataFile), { recursive: true });
    await writeFile(dataFile, `${JSON.stringify(nextData, null, 2)}\n`, 'utf8');
    portfolioData = nextData;
    response.json({ saved: true });
  } catch {
    response.status(500).json({ error: 'Could not save portfolio data.' });
  }
});

app.get('/api/admin/media', requireAdmin, (_request, response) => {
  response.json({ media: mediaItems });
});

app.post(
  '/api/admin/media',
  requireAdmin,
  express.raw({
    type: '*/*',
    limit: Number(process.env.R2_MAX_UPLOAD_BYTES) || 100 * 1024 * 1024,
  }),
  async (request, response) => {
    const mimeType = request.headers['content-type']?.split(';')[0]?.trim() || '';
    const buffer = request.body;
    try {
      if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
        response.status(400).json({ error: 'Choose a non-empty image or video file.' });
        return;
      }

      const maxSize = getMediaUploadLimit();
      if (buffer.length > maxSize) {
        response.status(413).json({
          error: `File exceeds the ${(maxSize / (1024 * 1024)).toFixed(1)} MB upload limit.`,
        });
        return;
      }

      const validated = validateMediaUpload(mimeType, buffer);
      const uploaded = await uploadMediaToR2(
        buffer,
        validated.mimeType,
        validated.extension,
      );
      const fileName = String(request.query.name || 'upload')
        .replace(/[\\/]/g, '_')
        .replace(/[\u0000-\u001f\u007f]/g, '')
        .slice(0, 180) || 'upload';
      const newMedia: StoredMedia = {
        id: randomBytes(16).toString('hex'),
        fileName,
        url: uploaded.url,
        storageKey: uploaded.key,
        type: validated.type,
        mimeType: validated.mimeType,
        size: buffer.length,
        createdAt: new Date().toISOString(),
      };

      try {
        await saveMediaItems([newMedia, ...mediaItems]);
      } catch (error) {
        await deleteMediaFromR2(uploaded.key);
        throw error;
      }

      response.status(201).json({ media: newMedia });
    } catch (error) {
      if (error instanceof R2StorageError) {
        response.status(error.status).json({ error: error.message });
        return;
      }
      console.error('Media upload failed:', error);
      response.status(500).json({ error: 'Could not save uploaded media.' });
    }
  },
);

app.use('/api/admin/media', (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'entity.too.large'
  ) {
    response.status(413).json({
      error: `File exceeds the ${(getMediaUploadLimit() / (1024 * 1024)).toFixed(1)} MB upload limit.`,
    });
    return;
  }
  next(error);
});

app.delete('/api/admin/media/:id', requireAdmin, async (request, response) => {
  const media = mediaItems.find((item) => item.id === request.params.id);
  if (!media) {
    response.status(404).json({ error: 'Media item not found.' });
    return;
  }

  try {
    await deleteMediaFromR2(media.storageKey);
    await saveMediaItems(mediaItems.filter((item) => item.id !== media.id));
    response.json({ deleted: true });
  } catch (error) {
    if (error instanceof R2StorageError) {
      response.status(error.status).json({ error: error.message });
      return;
    }
    console.error('Media record deletion failed:', error);
    response.status(500).json({ error: 'The file was removed from R2, but its media record could not be saved.' });
  }
});

const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production';
if (isProduction) {
  app.use(express.static(distDir));
  app.get('*', (_request, response) => response.sendFile(path.join(distDir, 'index.html')));
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    configFile: path.join(rootDir, 'vite.config.ts'),
    server: { host: '0.0.0.0', middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});