import type { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { ViewfinderFrame } from "./ViewfinderFrame";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <ViewfinderFrame />
      <NavBar />
      <main className="relative z-10 pt-15">{children}</main>
      <Footer />
    </div>
  );
}
