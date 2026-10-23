import type { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* left/right subtle green side highlights */}
      <div className="side-highlight-left" />
      <div className="side-highlight-right" />

      <NavBar />
      <main className="relative z-10 pt-[6rem] md:pt-[6.5rem]">{children}</main>
      <Footer />
    </div>
  );
}
