import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/use-cms";
import { getImageSrc } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";

const MENU_FOCUS_RESTORE_KEY = "portfolio-menu-focus-restore";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  const { data: settings } = useWebsiteSettings();
  const brandName = settings?.branding?.websiteName || "MRJ";
  const logoImg = settings?.branding?.websiteLogo;
  const contactText = settings?.hero?.contactButtonText || "Get in touch";

  const closeMenu = useCallback(
    (focusPath?: string) => {
      if (focusPath && focusPath !== pathname) {
        sessionStorage.setItem(MENU_FOCUS_RESTORE_KEY, focusPath);
      } else {
        sessionStorage.removeItem(MENU_FOCUS_RESTORE_KEY);
      }
      setIsMenuOpen(false);
      menuToggleRef.current?.focus();
    },
    [pathname],
  );

  useEffect(() => {
    if (sessionStorage.getItem(MENU_FOCUS_RESTORE_KEY) === pathname) {
      sessionStorage.removeItem(MENU_FOCUS_RESTORE_KEY);
      window.setTimeout(() => {
        document.querySelector<HTMLButtonElement>(".nav-menu-toggle")?.focus();
      }, 250);
    }
  }, [pathname]);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          nav,
          { autoAlpha: 0, y: -10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
          },
        );
      });

      return () => media.revert();
    },
    { scope: navRef },
  );

  useGSAP(
    () => {
      if (!isMenuOpen || !menuRef.current) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline.fromTo(
          menuRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.3, clearProps: "opacity,visibility,transform" },
        );
        timeline.fromTo(
          ".mobile-navigation-link",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.07,
            clearProps: "opacity,visibility,transform",
          },
          "-=0.12",
        );
      });

      return () => media.revert();
    },
    { scope: menuRef, dependencies: [isMenuOpen], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;
      const items = menuRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <nav
      ref={navRef}
      className="site-nav fixed inset-x-0 top-0 z-[9999] flex items-center justify-between px-4 py-3.5 backdrop-blur-md sm:px-6 md:px-12 md:py-4"
      style={{ backgroundColor: "rgba(4,10,7,0.72)", borderBottom: "1px solid var(--border)" }}
    >
      <Link
        to="/"
        className="site-brand flex items-center gap-2 font-mono text-sm tracking-widest"
        aria-label="Meraj Hossain — home"
      >
        {logoImg ? (
          <img src={getImageSrc(logoImg)} alt={brandName} className="h-6 w-auto object-contain" />
        ) : (
          <>
            <span className="text-white/40">[</span>
            <span className="font-display text-lg tracking-wider">{brandName}</span>
            <span className="text-[var(--primary)]">•</span>
            <span className="text-white/40">]</span>
          </>
        )}
      </Link>
      <div className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 lg:flex xl:gap-8">
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
          Selected work
        </Link>
        <Link
          to="/services"
          className="nav-link transition-colors"
          activeProps={{ className: "text-white" }}
        >
          Services
        </Link>
        <Link to="/" hash="experience" className="nav-link transition-colors">
          Experience
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
        ref={menuToggleRef}
        type="button"
        className="nav-menu-toggle grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/80 transition-colors hover:text-[var(--primary)] lg:hidden"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="mobile-navigation fixed inset-x-0 bottom-0 top-[4.25rem] flex flex-col justify-between overflow-y-auto border-b border-white/10 px-6 pb-8 pt-10 font-mono text-xs uppercase tracking-[0.18em] text-white/65 shadow-2xl sm:px-10 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div>
            <div className="mb-6 flex items-center justify-between text-[10px] tracking-[0.2em] text-white/40">
              <span>Meraj Hossain</span>
              <span>Navigation / 01—06</span>
            </div>
            <div className="mobile-navigation-links flex flex-col">
              <Link to="/" className="mobile-navigation-link" onClick={() => closeMenu("/")}>
                <span>01</span> Home
              </Link>
              <Link
                to="/projects"
                className="mobile-navigation-link"
                onClick={() => closeMenu("/projects")}
              >
                <span>02</span> Selected work
              </Link>
              <Link
                to="/about"
                className="mobile-navigation-link"
                onClick={() => closeMenu("/about")}
              >
                <span>03</span> About
              </Link>
              <Link
                to="/services"
                className="mobile-navigation-link"
                onClick={() => closeMenu("/services")}
              >
                <span>04</span> Services
              </Link>
              <Link
                to="/"
                hash="experience"
                className="mobile-navigation-link"
                onClick={() => closeMenu("/")}
              >
                <span>05</span> Experience
              </Link>
              <Link
                to="/contact"
                className="mobile-navigation-link"
                onClick={() => closeMenu("/contact")}
              >
                <span>06</span> {contactText}
              </Link>
            </div>
          </div>
          <p className="mt-10 max-w-sm text-xs normal-case leading-relaxed tracking-normal text-white/45">
            Graphics design, motion and video — based in Dhaka, Bangladesh.
          </p>
        </div>
      )}
    </nav>
  );
}
