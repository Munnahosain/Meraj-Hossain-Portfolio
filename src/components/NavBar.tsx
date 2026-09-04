import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useWebsiteSettings } from "@/hooks/use-cms";

const navbarLogo = "/MCU-LOGO-0.2V-6.png";

export function NavBar() {
  const { data: settings } = useWebsiteSettings();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const dragRef = useRef({
    active: false,
    dragged: false,
    pointerId: 0,
    startX: 0,
    startOffset: 0,
  });
  const [logoOffset, setLogoOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const brandName = settings?.branding?.websiteName || "Meraj Hossain";
  const contactText = settings?.hero?.contactButtonText || "Get in touch";

  const getMaxOffset = () => {
    const logo = logoRef.current;
    if (!logo) return 0;
    const reservedRightSpace = window.innerWidth >= 768 ? 620 : 56;
    return Math.max(window.innerWidth - logo.offsetWidth - reservedRightSpace, 0);
  };

  const getMaxScroll = () =>
    Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

  const syncLogoToScroll = () => {
    const maxScroll = getMaxScroll();
    const maxOffset = getMaxOffset();
    const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    setLogoOffset(Math.round(maxOffset * progress));
  };

  useEffect(() => {
    let frame = 0;

    const updateLogoPosition = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!dragRef.current.active) syncLogoToScroll();
      });
    };

    updateLogoPosition();
    window.addEventListener("scroll", updateLogoPosition, { passive: true });
    window.addEventListener("resize", updateLogoPosition);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateLogoPosition);
      window.removeEventListener("resize", updateLogoPosition);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    dragRef.current = {
      active: true,
      dragged: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: logoOffset,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const maxOffset = getMaxOffset();
    const delta = event.clientX - drag.startX;
    const nextOffset = Math.min(Math.max(drag.startOffset + delta, 0), maxOffset);

    if (Math.abs(delta) > 3) {
      drag.dragged = true;
    }

    setLogoOffset(nextOffset);
    window.scrollTo({
      top: (nextOffset / Math.max(maxOffset, 1)) * getMaxScroll(),
      behavior: "auto",
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (dragRef.current.active && event.currentTarget.hasPointerCapture(dragRef.current.pointerId)) {
      event.currentTarget.releasePointerCapture(dragRef.current.pointerId);
    }
    dragRef.current.active = false;
    setIsDragging(false);
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragRef.current.dragged) {
      event.preventDefault();
      dragRef.current.dragged = false;
    }
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[9999] px-6 md:px-12 py-0 flex items-center justify-between backdrop-blur-md"
      style={{ backgroundColor: "rgba(4,10,7,0.4)", borderBottom: "1px solid var(--border)" }}
    >
      <Link
        ref={logoRef}
        to="/"
        className={`flex items-center gap-2 select-none will-change-transform ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        aria-label={brandName}
        style={{ transform: `translateX(${logoOffset}px)` }}
        onClick={handleLogoClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img src={navbarLogo} alt={brandName} className="h-[60px] w-auto object-contain" />
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
