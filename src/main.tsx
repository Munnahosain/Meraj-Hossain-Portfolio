import { lazy, Suspense } from 'react';
import barba from '@barba/core';
import gsap from 'gsap';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import App from './App.tsx';
import { MotionProvider } from './components/motion/MotionProvider';
import { motionEngineTokens, motionTokens } from './lib/motion';
import './index.css';

const AdminPanel = lazy(() => import('./components/AdminPanel.tsx'));

function mountApp(container: HTMLElement, pathname: string): Root | null {
	const rootElement = container.querySelector<HTMLElement>('#root');
	if (!rootElement) return null;

	document.documentElement.classList.toggle('admin-scroll', pathname.startsWith('/admin'));

	const root = createRoot(rootElement);
	flushSync(() => {
		root.render(
			<MotionProvider>
				{pathname.startsWith('/admin') ? (
					<Suspense fallback={<main className="min-h-screen bg-[#111311] p-8 text-sm text-white/60">Loading admin...</main>}>
						<AdminPanel />
					</Suspense>
				) : (
					<App />
				)}
			</MotionProvider>,
		);
	});
	return root;
}

const initialContainer = document.querySelector<HTMLElement>('[data-barba="container"]');
let reactRoot = initialContainer ? mountApp(initialContainer, window.location.pathname) : null;

barba.init({
	transitions: [
		{
			name: 'portfolio-page-transition',
			async leave({ current }) {
				reactRoot?.unmount();
				reactRoot = null;
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
				await gsap.to(current.container, {
					autoAlpha: 0,
					yPercent: -2,
					duration: motionTokens.duration.pageExit,
					ease: motionEngineTokens.gsap.pageExit,
				});
			},
			afterEnter({ next }) {
				reactRoot = mountApp(next.container, next.url.path);
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
				return gsap.fromTo(
					next.container,
					{ autoAlpha: 0, yPercent: 2 },
					{
						autoAlpha: 1,
						yPercent: 0,
						duration: motionTokens.duration.pageEnter,
						ease: motionEngineTokens.gsap.pageEnter,
					},
				);
			},
		},
	],
});
