import { lazy, Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const AdminPanel = lazy(() => import('./components/AdminPanel.tsx'));
const isAdminRoute = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
	isAdminRoute ? (
		<Suspense fallback={<main className="min-h-screen bg-[#111311] p-8 text-sm text-white/60">Loading admin...</main>}>
			<AdminPanel />
		</Suspense>
	) : (
		<App />
	),
);
