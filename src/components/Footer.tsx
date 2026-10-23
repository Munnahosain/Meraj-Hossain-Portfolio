import { Timecode } from "./Timecode";
import { useWebsiteSettings } from "@/hooks/use-cms";

const defaultLogo = "/MCU-LOGO-0.2V-1.png";

export function Footer() {
  const { data: settings } = useWebsiteSettings();
  const ownerName = settings?.general?.ownerName || "Meraj Hossain";
  const logoImg = settings?.branding?.footerLogo || settings?.branding?.websiteLogo || defaultLogo;

  return (
    <footer className="relative z-20 px-6 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
      <div className="flex gap-4 items-center">
        <span className="text-white">EN</span>
        <span>/</span>
        <span>BN</span>
      </div>
      <div className="flex items-center gap-3 text-center">
        <img src={logoImg} alt={ownerName} className="h-7 w-auto object-contain opacity-90" />
        <span>
          © {new Date().getFullYear()} {ownerName} - All rights reserved
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <span>23.8583° N, 90.2667° E</span>
        <Timecode />
      </div>
    </footer>
  );
}
