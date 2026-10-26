import React, { useState, useEffect } from 'react';
import { MerajProfile, TimeTheme } from '../types';
import { X } from 'lucide-react';

interface MagazineMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'cases' | 'archive' | 'about') => void;
  persona: MerajProfile;
  theme: TimeTheme;
}

export const MagazineMenu: React.FC<MagazineMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  persona,
  theme,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isRevealed, setIsRevealed] = useState(false);

  // Smooth entrance & exit orchestration for the cards
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Staggered reveal trigger
      const timer = requestAnimationFrame(() => {
        setIsRevealed(true);
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setIsRevealed(false);
      const exitTimer = setTimeout(() => {
        setIsRendered(false);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  // Determine card appearance dynamically based on the active time theme
  // Follows user's strict 3-theme scheme:
  // - Day Light: Clean off-white canvas, classic editorial warm paper cards (#E6E4DF), charcoal type
  // - Evening Green (Sunset to 9 PM): Deep forest green canvas (#10472E), rich green cards (#134D34), luminous mint green type (#A7F3D0)
  // - Night Pure Dark: Obsidian canvas (#101114), obsidian slate cards (#181A22), crisp white type
  let cardBg = '#181A22';
  let cardBorder = 'rgba(255, 255, 255, 0.12)';
  let cardText = '#F3F4F6';
  let cardMuted = '#9CA3AF';
  let signatureColor = '#F3F4F6';

  if (theme.isGreen) {
    cardBg = '#134D34';
    cardBorder = 'rgba(167, 243, 208, 0.22)';
    cardText = '#A7F3D0';
    cardMuted = '#6EE7B7';
    signatureColor = '#A7F3D0';
  } else if (theme.isLight) {
    cardBg = '#E6E4DF';
    cardBorder = 'rgba(18, 20, 23, 0.12)';
    cardText = '#121417';
    cardMuted = '#585F5B';
    signatureColor = '#121417';
  }

  // Handle selecting a section
  const handleSelect = (target: 'cases' | 'archive' | 'about') => {
    setIsRevealed(false);
    setTimeout(() => {
      onNavigate(target);
      onClose();
    }, 280);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto no-scrollbar transition-opacity duration-500 ease-out ${
        isRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {/* Top Header Bar inside Menu */}
      <div
        className="w-full px-6 sm:px-12 py-5 sm:py-6 flex items-center justify-between border-b transition-colors duration-500 shrink-0"
        style={{
          borderColor: theme.isGreen
            ? 'rgba(167, 243, 208, 0.18)'
            : theme.isLight
            ? 'rgba(18, 20, 23, 0.08)'
            : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          className="font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase transition-colors duration-500"
          style={{
            color: theme.isGreen ? '#A7F3D0' : theme.text,
          }}
        >
          {persona.name} · Editorial Directory
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 font-mono text-[11px] sm:text-[12px] tracking-[0.16em] uppercase hover:opacity-75 transition-opacity cursor-pointer group"
          style={{
            color: theme.isGreen ? '#A7F3D0' : theme.text,
          }}
          title="Close Menu (Esc)"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Main 3-Card Editorial Gallery Container (Exact match to reference image_d0b2457a.png) */}
      <div className="flex-1 w-full max-w-[1580px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 w-full items-stretch">
          
          {/* ========================================================
              CARD 1: CASES
              The hero section smoothly scales/minimizes into this card!
              ======================================================== */}
          <div
            onClick={() => handleSelect('cases')}
            className="group relative flex flex-col justify-between p-6 sm:p-8 cursor-pointer rounded-sm shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
              borderWidth: '1px',
              borderStyle: 'solid',
              color: cardText,
              transform: isRevealed
                ? 'scale(1) translateY(0)'
                : 'scale(1.06) translateY(24px)',
              opacity: isRevealed ? 1 : 0.2,
              transitionDelay: '0ms',
            }}
          >
            {/* Card Header: Author Name & Custom Signature Script */}
            <div>
              <div className="flex items-start justify-between">
                <div className="font-sans font-medium text-[11px] sm:text-[12px] tracking-[0.14em] uppercase leading-tight">
                  <div>MERAJ</div>
                  <div>HOSSAIN</div>
                </div>

                {/* Signature Vector */}
                <div className="w-[60px] h-[28px] opacity-90 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 110 44" fill="none" className="w-full h-full">
                    <path
                      d="M4 36 C 8 20, 16 8, 22 12 C 28 16, 30 38, 34 38 C 38 38, 44 14, 50 14 C 56 14, 62 36, 68 38"
                      stroke={signatureColor}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M72 10 C 74 6, 77 8, 77 24 C 77 34, 84 22, 90 28 C 94 32, 95 38, 98 37"
                      stroke={signatureColor}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="99" cy="37" r="1.6" fill={signatureColor} />
                  </svg>
                </div>
              </div>

              {/* Lowercase Bold Title */}
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-normal tracking-tight lowercase mt-6 mb-3 leading-none group-hover:translate-x-1 transition-transform duration-300">
                cases
              </h2>

              {/* Sub-label strip matching screenshot */}
              <div
                className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase mb-5"
                style={{ color: cardMuted }}
              >
                <span>URE</span>
                <span>LOUIS VUITTON</span>
              </div>
            </div>

            {/* Visual Content: Side-by-side Hero Posters (NINE & LOUIS VUITTON) */}
            <div className="mt-4 pt-2">
              <div className="grid grid-cols-2 gap-3 h-[280px] sm:h-[340px] lg:h-[390px] w-full overflow-hidden bg-black/10">
                {/* Poster 1: NINE ("Not everything needs to be beige") */}
                <div className="relative h-full overflow-hidden bg-black/20">
                  <img
                    src="/assets/site/NINE.6XIRjh36.jpg"
                    alt="NINE Campaign"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Poster 2: LOUIS VUITTON (Silhouette against Twilight) */}
                <div className="relative h-full overflow-hidden bg-black/20">
                  <img
                    src="/assets/site/LV.DCogZ-7C.jpg"
                    alt="Louis Vuitton Campaign"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Interactive Action Prompt */}
              <div
                className="mt-4 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase"
                style={{ color: cardMuted }}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Enter Cases Portfolio →
                </span>
                <span className="opacity-60">01 / 03</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 2: ARCHIVE
              Smoothly reveals alongside Card 1!
              ======================================================== */}
          <div
            onClick={() => handleSelect('archive')}
            className="group relative flex flex-col justify-between p-6 sm:p-8 cursor-pointer rounded-sm shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
              borderWidth: '1px',
              borderStyle: 'solid',
              color: cardText,
              transform: isRevealed
                ? 'scale(1) translateX(0) translateY(0)'
                : 'scale(0.96) translateX(24px) translateY(24px)',
              opacity: isRevealed ? 1 : 0,
              transitionDelay: '120ms',
            }}
          >
            {/* Card Header */}
            <div>
              <div className="flex items-start justify-between">
                <div className="font-sans font-medium text-[11px] sm:text-[12px] tracking-[0.14em] uppercase leading-tight">
                  <div>MERAJ</div>
                  <div>HOSSAIN</div>
                </div>

                <div className="w-[60px] h-[28px] opacity-90 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 110 44" fill="none" className="w-full h-full">
                    <path
                      d="M4 36 C 8 20, 16 8, 22 12 C 28 16, 30 38, 34 38 C 38 38, 44 14, 50 14 C 56 14, 62 36, 68 38"
                      stroke={signatureColor}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M72 10 C 74 6, 77 8, 77 24 C 77 34, 84 22, 90 28 C 94 32, 95 38, 98 37"
                      stroke={signatureColor}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="99" cy="37" r="1.6" fill={signatureColor} />
                  </svg>
                </div>
              </div>

              {/* Lowercase Title */}
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-normal tracking-tight lowercase mt-6 mb-3 leading-none group-hover:translate-x-1 transition-transform duration-300">
                archive
              </h2>

              <div
                className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase mb-5"
                style={{ color: cardMuted }}
              >
                <span>BESTSELLER</span>
                <span>CPHFW LOCATIONS</span>
              </div>
            </div>

            {/* Visual Content: Exact layout from reference image_d0b2457a.png */}
            <div className="mt-4 pt-2">
              <div className="grid grid-cols-12 gap-2.5 h-[280px] sm:h-[340px] lg:h-[390px] w-full overflow-hidden items-end">
                {/* Left: BESTSELLER Mirror Cube installation */}
                <div className="col-span-5 h-[240px] sm:h-[280px] lg:h-[320px] overflow-hidden bg-black/20">
                  <img
                    src="/assets/site/BESTSELLER.BwMYxazI.jpg"
                    alt="Bestseller Cube"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Middle: Copenhagen Fashion Week Collage Frame */}
                <div className="col-span-4 h-[240px] sm:h-[280px] lg:h-[320px] overflow-hidden bg-black/20">
                  <img
                    src="/assets/site/COPENHAGEN_FASHION_WEEK.Cif1zX-w.jpg"
                    alt="Copenhagen Fashion Week"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Right: Typography column */}
                <div className="col-span-3 h-[240px] sm:h-[280px] lg:h-[320px] flex flex-col justify-between py-2 text-[8px] sm:text-[9px] font-mono leading-tight tracking-wider opacity-75">
                  <div>
                    <div>copenhagen</div>
                    <div>fashion week</div>
                    <div>locations</div>
                    <div className="mt-2 text-[7px] opacity-60">ARCHIVE VOL. 4</div>
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-widest text-[9px]">BESTSELLER</div>
                  </div>
                </div>
              </div>

              {/* Action Prompt */}
              <div
                className="mt-4 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase"
                style={{ color: cardMuted }}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Explore 16 Motion Works →
                </span>
                <span className="opacity-60">02 / 03</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 3: ABOUT
              Smoothly reveals alongside Card 1 and 2!
              ======================================================== */}
          <div
            onClick={() => handleSelect('about')}
            className="group relative flex flex-col justify-between p-6 sm:p-8 cursor-pointer rounded-sm shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
              borderWidth: '1px',
              borderStyle: 'solid',
              color: cardText,
              transform: isRevealed
                ? 'scale(1) translateX(0) translateY(0)'
                : 'scale(0.96) translateX(48px) translateY(24px)',
              opacity: isRevealed ? 1 : 0,
              transitionDelay: '240ms',
            }}
          >
            {/* Card Header */}
            <div>
              <div className="flex items-start justify-between">
                <div className="font-sans font-medium text-[11px] sm:text-[12px] tracking-[0.14em] uppercase leading-tight">
                  <div>MERAJ</div>
                  <div>HOSSAIN</div>
                </div>

                <div className="w-[60px] h-[28px] opacity-90 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 110 44" fill="none" className="w-full h-full">
                    <path
                      d="M4 36 C 8 20, 16 8, 22 12 C 28 16, 30 38, 34 38 C 38 38, 44 14, 50 14 C 56 14, 62 36, 68 38"
                      stroke={signatureColor}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M72 10 C 74 6, 77 8, 77 24 C 77 34, 84 22, 90 28 C 94 32, 95 38, 98 37"
                      stroke={signatureColor}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="99" cy="37" r="1.6" fill={signatureColor} />
                  </svg>
                </div>
              </div>

              {/* Lowercase Title */}
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-normal tracking-tight lowercase mt-6 mb-3 leading-none group-hover:translate-x-1 transition-transform duration-300">
                about
              </h2>

              <div
                className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase mb-5"
                style={{ color: cardMuted }}
              >
                <span>CREATIVE DIRECTION</span>
                <span>DHAKA / GLOBAL</span>
              </div>
            </div>

            {/* Visual Content: Exact portrait photo from image_d0b2457a.png */}
            <div className="mt-4 pt-2">
              <div className="h-[280px] sm:h-[340px] lg:h-[390px] w-full flex items-end justify-start">
                <div className="relative h-[240px] sm:h-[280px] lg:h-[320px] w-[80%] max-w-[280px] overflow-hidden bg-black/10">
                  <img
                    src="/assets/site/image-1.COdZ4MWx.jpg"
                    alt="Meraj Hossain Portrait"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Action Prompt */}
              <div
                className="mt-4 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase"
                style={{ color: cardMuted }}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Read Profile & Philosophy →
                </span>
                <span className="opacity-60">03 / 03</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Bottom Bar with Keyboard navigation hint */}
      <div
        className="w-full px-6 sm:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest uppercase border-t transition-colors duration-500 shrink-0 opacity-70"
        style={{
          borderColor: theme.isGreen
            ? 'rgba(167, 243, 208, 0.18)'
            : theme.isLight
            ? 'rgba(18, 20, 23, 0.08)'
            : 'rgba(255, 255, 255, 0.1)',
          color: theme.isGreen ? '#A7F3D0' : theme.text,
        }}
      >
        <span>PRESS [ESC] OR SELECT A CARD TO ENTER</span>
        <span>MERAJ HOSSAIN · SELECTED PORTFOLIO 2026</span>
      </div>
    </div>
  );
};
