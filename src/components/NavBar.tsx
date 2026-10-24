import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/use-cms";
import { getImageSrc } from "@/lib/utils";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: settings } = useWebsiteSettings();
  const brandName = settings?.branding?.websiteName || "MRJ";
  const logoImg = settings?.branding?.websiteLogo;
  const contactText = settings?.hero?.contactButtonText || "Get in touch";

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[9999] flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-5"
      style={{ backgroundColor: "rgba(4,10,7,0.94)", borderBottom: "1px solid var(--border)" }}
    >
      <Link to="/" className="flex items-center gap-2 font-mono text-sm tracking-widest">
        {logoImg ? (
          <img
            src={getImageSrc(logoImg)}
            alt={brandName}
            className="h-6 w-auto object-contain"
          />
        ) : (
          <>
            <span className="text-white/40">[</span>
            <span className="font-display text-lg tracking-wider">{brandName}</span>
            <span className="text-[var(--primary)]">•</span>
            <span className="text-white/40">]</span>
          </>
        )}
      </Link>
      <div className="hidden items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 md:flex">
        <Link
          to="/about"
          className="nav-link transition-colors"
          activeProps={{ className: "text-white" }}
        >
          About
        </Link>
        <Link
          to="/projects"
          className="nav-link transition-colors"
          activeProps={{ className: "text-white" }}
        >
          Projects
        </Link>
        <Link
          to="/services"
          className="nav-link transition-colors"
          activeProps={{ className: "text-white" }}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="nav-link flex items-center gap-2 transition-colors"
          activeProps={{ className: "text-white" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          {contactText}
        </Link>
      </div>
      <button
        type="button"
        className="nav-menu-toggle grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/80 transition-colors hover:text-[var(--primary)] md:hidden"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-navigation absolute inset-x-0 top-full flex flex-col gap-1 border-b border-white/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white/65 shadow-2xl md:hidden"
        >
          <Link
            to="/about"
            className="nav-link rounded px-3 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/projects"
            className="nav-link rounded px-3 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/services"
            className="nav-link rounded px-3 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="nav-link flex items-center gap-2 rounded px-3 py-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
            {contactText}
          </Link>
        </div>
      )}
    </nav>
  );
}
