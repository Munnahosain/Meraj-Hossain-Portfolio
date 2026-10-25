import 'dotenv/config';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';
import { ARCHIVE_ITEMS, CASE_STUDIES, MERAJ_PROFILE } from '../src/data/portfolioData';
import type { PortfolioData } from '../src/types';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = path.join(rootDir, 'data', 'portfolio.json');
const distDir = path.join(rootDir, 'dist');
const defaultData: PortfolioData = {
  profile: MERAJ_PROFILE,
  caseStudies: CASE_STUDIES,
  archiveItems: ARCHIVE_ITEMS,
};
const sessions = new Map<string, number>();
const sessionLifetimeMs = 8 * 60 * 60 * 1000;
const sessionCookie = 'portfolio_admin_session';

let portfolioData: PortfolioData = defaultData;
try {
  portfolioData = JSON.parse(await readFile(dataFile, 'utf8')) as PortfolioData;
} catch {
  // Source data remains available until the first admin save.
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