import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Without this, one bad record from the admin panel (a missing field, a broken
 * section) blanks the entire portfolio. Show a calm fallback instead.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio failed to render:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="fixed inset-0 z-[500] flex flex-col items-center justify-center gap-6 bg-[#101114] px-6 text-center text-[#f2f4f3]">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#18C98A]">
          Something went wrong
        </span>
        <h1 className="text-4xl font-light tracking-tight sm:text-6xl">
          this page <span className="text-[#18C98A]">lost its frame</span>
        </h1>
        <p className="max-w-md text-sm font-light leading-relaxed text-[#8e9693]">
          A piece of content could not be displayed. Reloading usually fixes it.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer border border-[#18C98A]/40 px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[#18C98A] transition-colors duration-300 hover:bg-[#18C98A] hover:text-[#101114]"
          >
            Reload
          </button>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="cursor-pointer border border-white/20 px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 hover:border-white/60"
          >
            Home
          </button>
        </div>
      </main>
    );
  }
}
