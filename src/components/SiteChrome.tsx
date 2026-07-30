import type { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-foreground relative overflow-x-hidden">
      {/* left/right subtle green side highlights */}
      <div
        className="pointer-events-none fixed inset-y-0 left-0 w-[3px] z-30 opacity-80"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(15,166,122,0.95) 30%, rgba(15,166,122,0.95) 70%, transparent)",
          boxShadow: "0 0 40px 6px rgba(15,166,122,0.12)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-y-0 right-0 w-[3px] z-30 opacity-80"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(15,166,122,0.95) 30%, rgba(15,166,122,0.95) 70%, transparent)",
          boxShadow: "0 0 40px 6px rgba(15,166,122,0.12)",
        }}
      />

      <NavBar />
      <main className="relative z-10 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
