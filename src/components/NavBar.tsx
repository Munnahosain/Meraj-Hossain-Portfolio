import { Link } from "@tanstack/react-router";

export function NavBar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-black/30 border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 font-mono text-sm tracking-widest">
        <span className="text-white/40">[</span>
        <span className="font-display text-lg tracking-wider">MRJ</span>
        <span className="text-[var(--brand-red)]">•</span>
        <span className="text-white/40">]</span>
      </Link>
      <div className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
        <Link to="/about" className="hover:text-white transition-colors" activeProps={{ className: "text-white" }}>About</Link>
        <Link to="/projects" className="hover:text-white transition-colors" activeProps={{ className: "text-white" }}>Projects</Link>
        <Link to="/services" className="hover:text-white transition-colors" activeProps={{ className: "text-white" }}>Services</Link>
        <Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors" activeProps={{ className: "text-white" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-red)] animate-pulse" />
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
