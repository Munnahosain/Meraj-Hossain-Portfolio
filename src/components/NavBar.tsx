import { Link } from "@tanstack/react-router";
import { useWebsiteSettings } from "@/hooks/use-cms";

export function NavBar() {
  const { data: settings } = useWebsiteSettings();
  const brandName = settings?.branding?.websiteName || "MRJ";
  const logoImg = settings?.branding?.websiteLogo;
  const contactText = settings?.hero?.contactButtonText || "Get in touch";

  return (
    <nav className="fixed inset-x-0 top-0 z-[9999] px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md" style={{ backgroundColor: 'rgba(4,10,7,0.4)', borderBottom: '1px solid var(--border)' }}>
      <Link to="/" className="flex items-center gap-2 font-mono text-sm tracking-widest">
        {logoImg ? (
          <img src={logoImg} alt={brandName} className="h-6 w-auto object-contain" />
        ) : (
          <>
            <span className="text-white/40">[</span>
            <span className="font-display text-lg tracking-wider">{brandName}</span>
            <span className="text-[var(--primary)]">•</span>
            <span className="text-white/40">]</span>
          </>
        )}
      </Link>
      <div className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
        <Link
          to="/about"
          className="hover:text-[var(--primary)] transition-colors"
          activeProps={{ className: "text-white" }}
        >
          About
        </Link>
        <Link
          to="/projects"
          className="hover:text-[var(--primary)] transition-colors"
          activeProps={{ className: "text-white" }}
        >
          Projects
        </Link>
        <Link
          to="/services"
          className="hover:text-[var(--primary)] transition-colors"
          activeProps={{ className: "text-white" }}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors"
          activeProps={{ className: "text-white" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          {contactText}
        </Link>
      </div>
    </nav>
  );
}
