import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Copy, LogOut, Save, Trash2 } from 'lucide-react';
import { ARCHIVE_ITEMS, CASE_STUDIES, MERAJ_PROFILE } from '../data/portfolioData';
import type { PortfolioData } from '../types';
import {
  PortfolioEditor,
  toEditableValue,
  type EditableValue,
} from './admin/PortfolioEditor';

type DataTab = 'profile' | 'caseStudies' | 'archiveItems' | 'media';
type MediaItem = {
  id: string;
  fileName: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  createdAt: string;
};

const initialData: PortfolioData = {
  profile: MERAJ_PROFILE,
  caseStudies: CASE_STUDIES,
  archiveItems: ARCHIVE_ITEMS,
};

const tabLabels: Record<DataTab, string> = {
  profile: 'Profile & CMS',
  caseStudies: 'Case studies',
  archiveItems: 'Archive',
  media: 'Media library',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPortfolioData(value: unknown): value is PortfolioData {
  return (
    isRecord(value) &&
    isRecord(value.profile) &&
    typeof value.profile.name === 'string' &&
    typeof value.profile.email === 'string' &&
    Array.isArray(value.caseStudies) &&
    Array.isArray(value.archiveItems)
  );
}

function readError(value: unknown, fallback: string) {
  return isRecord(value) && typeof value.error === 'string' ? value.error : fallback;
}

async function readJsonResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error(
      'Admin API returned a web page instead of JSON. Open the site served by `npm run dev` (http://localhost:3000) and restart that server.',
    );
  }

  try {
    return await response.json();
  } catch {
    throw new Error('Admin API returned invalid JSON. Restart the development server and try again.');
  }
}

function countReferences(value: EditableValue, url: string): number {
  if (value === url) return 1;
  if (Array.isArray(value)) {
    return value.reduce<number>((total, item) => total + countReferences(item, url), 0);
  }
  if (typeof value === 'object' && value !== null) {
    return Object.values(value).reduce<number>(
      (total, item) => total + countReferences(item, url),
      0,
    );
  }
  return 0;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<EditableValue>(toEditableValue(initialData));
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [tab, setTab] = useState<DataTab>('profile');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadPortfolio = async () => {
    const response = await fetch('/api/admin/portfolio', { credentials: 'same-origin' });
    const portfolio = await readJsonResponse(response);
    if (!response.ok || !isPortfolioData(portfolio)) {
      throw new Error('Could not load valid portfolio data.');
    }
    setData(toEditableValue(portfolio));
  };

  const loadMedia = async () => {
    const response = await fetch('/api/admin/media', { credentials: 'same-origin' });
    const result = await readJsonResponse(response);
    if (!response.ok || !isRecord(result) || !Array.isArray(result.media)) {
      throw new Error(readError(result, 'Could not load the media library.'));
    }
    setMedia(result.media as MediaItem[]);
  };

  useEffect(() => {
    let active = true;
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', { credentials: 'same-origin' });
        const session = await readJsonResponse(response);
        if (!response.ok) throw new Error(readError(session, 'Could not verify admin session.'));
        if (!isRecord(session) || session.authenticated !== true) return;
        await Promise.all([loadPortfolio(), loadMedia()]);
        if (active) setIsAuthenticated(true);
      } catch (error) {
        if (active) setStatus(error instanceof Error ? error.message : 'Could not load admin data.');
      } finally {
        if (active) setIsChecking(false);
      }
    };
    void checkSession();
    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
      });
      const result = await readJsonResponse(response);
      if (!response.ok) throw new Error(readError(result, 'Login failed.'));
      await Promise.all([loadPortfolio(), loadMedia()]);
      setIsAuthenticated(true);
      setPassword('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Login failed.');
    }
  };

  const handleSave = async () => {
    setStatus('');
    if (!isPortfolioData(data)) {
      setStatus('Portfolio data is incomplete. Check the required profile fields and content lists.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(data),
      });
      const result = await readJsonResponse(response);
      if (!response.ok) throw new Error(readError(result, 'Could not save changes.'));
      setStatus('Saved. Changes are live on the portfolio.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const uploadMedia = async (file: File): Promise<string | null> => {
    setStatus('');
    try {
      const response = await fetch(`/api/admin/media?name=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        credentials: 'same-origin',
        body: file,
      });
      const result = await readJsonResponse(response);
      if (!response.ok || !isRecord(result) || !isRecord(result.media)) {
        throw new Error(readError(result, 'Could not upload file to Cloudflare R2.'));
      }
      const uploaded = result.media as MediaItem;
      setMedia((current) => [uploaded, ...current]);
      setStatus(`${file.name} uploaded to R2. Save changes to publish its URL.`);
      return uploaded.url;
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not upload file to Cloudflare R2.');
      return null;
    }
  };

  const deleteMedia = async (item: MediaItem) => {
    const references = countReferences(data, item.url);
    const warning = references
      ? ` This file is used in ${references} content field(s), which will no longer load.`
      : '';
    if (!window.confirm(`Permanently delete ${item.fileName} from Cloudflare R2?${warning}`)) return;

    setStatus('');
    try {
      const response = await fetch(`/api/admin/media/${encodeURIComponent(item.id)}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      const result = await readJsonResponse(response);
      if (!response.ok) throw new Error(readError(result, 'Could not delete file from R2.'));
      setMedia((current) => current.filter((mediaItem) => mediaItem.id !== item.id));
      setStatus('File deleted from R2 and removed from the media library.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not delete file from R2.');
    }
  };

  const handleLogout = async () => {
    setStatus('');
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
      if (!response.ok) throw new Error('Could not sign out.');
      setIsAuthenticated(false);
      setPassword('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not sign out.');
    }
  };

  const section = tab === 'profile' ? 'profile' : tab;
  const sectionData =
    typeof data === 'object' && data !== null && !Array.isArray(data) ? data[section] : null;

  if (isChecking) {
    return <main className="min-h-screen bg-[#111311] p-8 text-sm text-white/60">Checking admin session...</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111311] px-5 text-[#f1f1e9]">
        <form onSubmit={handleLogin} className="w-full max-w-md border border-white/15 p-7 sm:p-9">
          <a href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a6ee68]">Meraj Hossain / Portfolio</a>
          <h1 className="mt-8 font-display text-4xl uppercase">Admin access</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">Sign in with the administrator account configured on the server.</p>
          <label className="mt-8 block font-mono text-[10px] uppercase tracking-widest text-white/55">
            Email
            <input
              autoComplete="username"
              className="mt-2 block w-full border border-white/20 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-[#a6ee68]"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="mt-5 block font-mono text-[10px] uppercase tracking-widest text-white/55">
            Password
            <input
              autoComplete="current-password"
              className="mt-2 block w-full border border-white/20 bg-transparent px-3 py-3 text-sm text-white outline-none focus:border-[#a6ee68]"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {status && <p role="alert" className="mt-4 text-sm text-red-300">{status}</p>}
          <button className="mt-7 w-full bg-[#a6ee68] px-4 py-3 text-sm font-semibold text-[#111311] transition-colors hover:bg-white" type="submit">
            Sign in
          </button>
          <a href="/" className="mt-6 inline-flex items-center gap-2 text-xs text-white/55 hover:text-white">Back to website <ArrowUpRight size={14} /></a>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111311] text-[#f1f1e9]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-10">
        <div>
          <a href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a6ee68]">Meraj Hossain / Portfolio</a>
          <h1 className="mt-2 font-display text-2xl uppercase">Content studio</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white">View site <ArrowUpRight size={14} /></a>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-xs hover:border-white/50" type="button"><LogOut size={14} /> Sign out</button>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Portfolio CMS</p>
            <h2 className="mt-2 text-2xl font-light">Edit website content</h2>
          </div>
          {tab !== 'media' && (
            <button onClick={handleSave} disabled={isSaving} className="inline-flex items-center gap-2 bg-[#a6ee68] px-4 py-3 text-sm font-semibold text-[#111311] disabled:opacity-50" type="button">
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          )}
        </div>
        <nav aria-label="Portfolio sections" className="mt-6 flex gap-1 overflow-x-auto border-b border-white/10">
          {(Object.keys(tabLabels) as DataTab[]).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`shrink-0 border-b-2 px-4 py-3 text-sm transition-colors ${tab === item ? 'border-[#a6ee68] text-[#a6ee68]' : 'border-transparent text-white/55 hover:text-white'}`} type="button">
              {tabLabels[item]}
            </button>
          ))}
        </nav>
        {status && <p aria-live="polite" className="mt-5 text-sm text-white/70">{status}</p>}

        {tab === 'media' ? (
          <section className="mt-6 space-y-5">
            <div>
              <h3 className="text-xl font-light">R2 media library</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">
                Uploaded files are stored in Cloudflare R2. Deleting a file permanently removes it from R2.
                Replace or remove any content references before deleting a file that is in use.
              </p>
            </div>
            {media.length === 0 ? (
              <p className="border border-white/10 p-8 text-center text-sm text-white/45">No uploaded files yet. Upload an image or video from a content field.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {media.map((item) => (
                  <article className="overflow-hidden border border-white/10 bg-white/[0.02]" key={item.id}>
                    <div className="aspect-video bg-black">
                      {item.type === 'video' ? (
                        <video className="h-full w-full object-contain" controls preload="metadata" src={item.url} />
                      ) : (
                        <img alt={item.fileName} className="h-full w-full object-contain" loading="lazy" src={item.url} />
                      )}
                    </div>
                    <div className="space-y-3 p-3">
                      <p className="truncate text-sm text-white" title={item.fileName}>{item.fileName}</p>
                      <p className="text-xs text-white/40">{(item.size / (1024 * 1024)).toFixed(2)} MB</p>
                      <div className="flex justify-between gap-2">
                        <button
                          className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 text-xs text-white/70 hover:border-white/50"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(item.url);
                              setStatus('Media URL copied.');
                            } catch {
                              setStatus('Could not copy media URL. Copy it from the browser address bar instead.');
                            }
                          }}
                          type="button"
                        >
                          <Copy size={13} /> Copy URL
                        </button>
                        <button
                          className="inline-flex items-center gap-1.5 border border-red-300/20 px-3 py-2 text-xs text-red-200 hover:border-red-300"
                          onClick={() => void deleteMedia(item)}
                          type="button"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-white/50">
              {tab === 'profile' && 'Edit profile details, about copy, skills, experience, education, values, process and clients. Upload an image or video directly to R2 from media fields.'}
              {tab === 'caseStudies' && 'Manage every case study, content media item and scroll gallery. Add or remove items and upload images/videos to R2.'}
              {tab === 'archiveItems' && 'Manage archive titles, categories, years, media and ordering. Add or remove archive items as needed.'}
            </p>
            <div className="mt-5">
              {sectionData !== null && sectionData !== undefined ? (
                <PortfolioEditor
                  onChange={(nextValue) => {
                    if (typeof data !== 'object' || data === null || Array.isArray(data)) return;
                    setData({ ...data, [section]: nextValue });
                  }}
                  onUpload={uploadMedia}
                  value={sectionData}
                />
              ) : (
                <p className="border border-white/10 p-5 text-sm text-red-300">This content section is unavailable.</p>
              )}
            </div>
          </>
        )}

        <div className="mt-5 flex min-h-8 items-center justify-between gap-4 text-xs text-white/40">
          <span>{tab === 'media' ? `${media.length} files` : tab === 'profile' ? 'Profile content' : `${Array.isArray(sectionData) ? sectionData.length : 0} items`}</span>
          <span>Uploads default to 100 MB maximum; the server limit can be configured.</span>
        </div>
      </section>
    </main>
  );
}
