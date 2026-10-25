import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, LogOut, Save } from 'lucide-react';
import { ARCHIVE_ITEMS, CASE_STUDIES, MERAJ_PROFILE } from '../data/portfolioData';
import type { PortfolioData } from '../types';

type DataTab = 'profile' | 'projects' | 'archive';

const initialData: PortfolioData = {
  profile: MERAJ_PROFILE,
  caseStudies: CASE_STUDIES,
  archiveItems: ARCHIVE_ITEMS,
};

const tabLabels: Record<DataTab, string> = {
  profile: 'Profile & CMS',
  projects: 'Case studies',
  archive: 'Archive',
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<PortfolioData>(initialData);
  const [tab, setTab] = useState<DataTab>('profile');
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadPortfolio = async () => {
    const response = await fetch('/api/portfolio');
    if (!response.ok) throw new Error('Could not load portfolio data.');
    const portfolio = (await response.json()) as PortfolioData;
    setData(portfolio);
    setDraft(JSON.stringify(portfolio.profile, null, 2));
  };

  useEffect(() => {
    let active = true;
    fetch('/api/admin/session')
      .then(async (response) => {
        const session = await response.json();
        if (!response.ok || !session.authenticated) return false;
        if (active) {
          setIsAuthenticated(true);
          await loadPortfolio();
        }
        return true;
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setIsChecking(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (tab === 'profile') setDraft(JSON.stringify(data.profile, null, 2));
    if (tab === 'projects') setDraft(JSON.stringify(data.caseStudies, null, 2));
    if (tab === 'archive') setDraft(JSON.stringify(data.archiveItems, null, 2));
  }, [data, tab]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login failed.');
      setIsAuthenticated(true);
      await loadPortfolio();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Login failed.');
    }
  };

  const handleSave = async () => {
    setStatus('');
    let value: unknown;
    try {
      value = JSON.parse(draft);
    } catch {
      setStatus('This editor contains invalid JSON.');
      return;
    }

    const nextData: PortfolioData = { ...data };
    if (tab === 'profile') nextData.profile = value as PortfolioData['profile'];
    if (tab === 'projects') nextData.caseStudies = value as PortfolioData['caseStudies'];
    if (tab === 'archive') nextData.archiveItems = value as PortfolioData['archiveItems'];

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save changes.');
      setData(nextData);
      setStatus('Saved. Changes are live on the portfolio.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPassword('');
  };

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
          <button onClick={handleSave} disabled={isSaving} className="inline-flex items-center gap-2 bg-[#a6ee68] px-4 py-3 text-sm font-semibold text-[#111311] disabled:opacity-50" type="button">
            <Save size={16} /> {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
        <nav aria-label="Portfolio sections" className="mt-6 flex gap-1 overflow-x-auto border-b border-white/10">
          {(Object.keys(tabLabels) as DataTab[]).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`shrink-0 border-b-2 px-4 py-3 text-sm transition-colors ${tab === item ? 'border-[#a6ee68] text-[#a6ee68]' : 'border-transparent text-white/55 hover:text-white'}`} type="button">
              {tabLabels[item]}
            </button>
          ))}
        </nav>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/50">
          {tab === 'profile' && 'Update biography, contact details, skills, experience, education, values and process. Keep the JSON structure and field names intact.'}
          {tab === 'projects' && 'Edit every case study, its copy, media, galleries, client and year. Use valid JSON and keep media paths under /assets.'}
          {tab === 'archive' && 'Manage archive titles, categories, years and media paths. Use valid JSON and keep media paths under /assets.'}
        </p>
        <label className="mt-4 block">
          <span className="sr-only">{tabLabels[tab]} JSON</span>
          <textarea
            spellCheck={false}
            className="min-h-[55vh] w-full resize-y border border-white/15 bg-[#171a17] p-4 font-mono text-xs leading-6 text-[#dbe5d5] outline-none focus:border-[#a6ee68] sm:p-6"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
        </label>
        <div className="flex min-h-12 items-center justify-between gap-4">
          <p aria-live="polite" className="text-sm text-white/60">{status}</p>
          <span className="font-mono text-[10px] text-white/35">{tab === 'profile' ? data.profile.name : tab === 'projects' ? `${data.caseStudies.length} case studies` : `${data.archiveItems.length} archive items`}</span>
        </div>
      </section>
    </main>
  );
}