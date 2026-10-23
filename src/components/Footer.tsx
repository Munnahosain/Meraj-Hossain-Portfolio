import { useWebsiteSettings } from "@/hooks/use-cms";
import { getImageSrc } from "@/lib/utils";

const defaultLogo = "/MCU-LOGO-0.2V-1.png";

export function Footer() {
  const { data: settings } = useWebsiteSettings();
  const ownerName = settings?.general?.ownerName || "Meraj Hossain";
  const logoImg = settings?.branding?.footerLogo || settings?.branding?.websiteLogo || defaultLogo;

  return (
    <footer className="relative z-20 px-6 md:px-12 py-8 border-t border-white/5 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
      <div className="flex items-center gap-3 text-center">
        <img
          src={getImageSrc(logoImg)}
          alt={ownerName}
          className="h-7 w-auto object-contain opacity-90"
        />
        <span>
          © {new Date().getFullYear()} {ownerName} - All rights reserved
        </span>
      </div>
    </footer>
  );
}
