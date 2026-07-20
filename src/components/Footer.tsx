import { Timecode } from "./Timecode";

export function Footer() {
  return (
    <footer className="relative z-20 px-6 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
      <div className="flex gap-4 items-center">
        <span className="text-white">EN</span>
        <span>/</span>
        <span>BN</span>
      </div>
      <div>© 2026 Meraj Hossain — All rights reserved</div>
      <div className="flex gap-4 items-center">
        <span>23.8583° N, 90.2667° E</span>
        <Timecode />
      </div>
    </footer>
  );
}
