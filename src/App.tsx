/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ViewMode, CaseStudy, PortfolioData } from './types';
import { ARCHIVE_ITEMS, CASE_STUDIES, MERAJ_PROFILE } from './data/portfolioData';
import { getTimeTheme } from './utils/timeColor';
import { Header } from './components/Header';
import { GalleryHome } from './components/GalleryHome';
import { EditorialDeckCards } from './components/EditorialDeckCards';
import { CaseStudyView } from './components/CaseStudyView';
import { ArchiveView } from './components/ArchiveView';
import { AboutView } from './components/AboutView';
import { ContactModal } from './components/ContactModal';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    profile: MERAJ_PROFILE,
    caseStudies: CASE_STUDIES,
    archiveItems: ARCHIVE_ITEMS,
  });
  const [view, setView] = useState<ViewMode>('home');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const viewTransitionRef = useRef<HTMLDivElement>(null);
  const menuProgress = useMotionValue(0);

  useLayoutEffect(() => {
    const view = viewTransitionRef.current;
    if (!view) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        view,
        { autoAlpha: 0, y: 20, clipPath: 'inset(0 0 7% 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.65,
          ease: 'power3.out',
          clearProps: 'clipPath',
        },
      );
    }, view);

    return () => context.revert();
  }, [view, selectedCase?.id]);

  useEffect(() => {
    const animation = animate(menuProgress, isMenuOpen ? 1 : 0, {
      duration: 0.72,
      ease: [0.76, 0, 0.24, 1],
    });
    return () => animation.stop();
  }, [isMenuOpen, menuProgress]);

  // Initialize Lenis smooth scroll for detail/editorial views
  useLenis(view !== 'home' && !isMenuOpen);

  // Time Engine: Default to Dhaka live time (UTC+6)
  const getDhakaHour = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const dhakaTime = new Date(utc + 3600000 * portfolio.profile.timezoneOffset);
    return dhakaTime.getHours() + dhakaTime.getMinutes() / 60;
  };

  const [currentHour, setCurrentHour] = useState(getDhakaHour);
  const [isTimeOffset, setIsTimeOffset] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const theme = getTimeTheme(currentHour);

  useEffect(() => {
    let active = true;
    fetch('/api/portfolio')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PortfolioData | null) => {
        if (active && data?.profile && data.caseStudies && data.archiveItems) setPortfolio(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  // Responsive Viewport Dimensions for 3-Card Decking
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * FIXED DARK OLIVE GREEN BACKGROUND WHEN MENU IS OPEN
   * Exact match to user specification:
   * "আর হচ্ছে ওই পুরা ব্যাকগ্রাউন্ডটা একটা কালারই থাকবে যেটা হচ্ছে ডার্ক গ্রিন কালারটা থাকবে।
   * ওটা ফিক্সড থাকবে, ওটা অন্য কোনো কালার থাকবে না।"
   */
  const FIXED_MENU_DARK_GREEN = '#353B2D';

  useEffect(() => {
    const bg = isMenuOpen ? FIXED_MENU_DARK_GREEN : theme.bg;
    document.body.style.backgroundColor = bg;
    document.documentElement.style.backgroundColor = bg;
  }, [isMenuOpen, theme.bg]);

  // Live clock tick when not in manual Time Travel offset mode
  useEffect(() => {
    if (isTimeOffset) return;
    const interval = setInterval(() => {
      setCurrentHour(getDhakaHour());
    }, 30000);

    return () => clearInterval(interval);
  }, [isTimeOffset, portfolio.profile.timezoneOffset]);

  // Handle manual time dial scrub
  const handleTimeChange = (newHour: number) => {
    setCurrentHour(newHour);
    setIsTimeOffset(true);
  };

  const handleResetTime = () => {
    setCurrentHour(getDhakaHour());
    setIsTimeOffset(false);
  };

  const handleSelectCase = (cs: CaseStudy) => {
    setSelectedCase(cs);
    setView('case-detail');
  };

  const handleNavigate = (newView: 'home' | 'cases' | 'archive' | 'about') => {
    if (newView === 'cases') {
      setView('home');
    } else {
      setView(newView);
    }
    setSelectedCase(null);
    setIsMenuOpen(false);
  };

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        else if (isContactOpen) setIsContactOpen(false);
        else if (view === 'case-detail') setView('home');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isContactOpen, view]);

  // 3-Card Layout Geometry Calculations
  const isDesktop = windowSize.width >= 1024;
  const gap = 24;
  const maxDeckWidth = Math.min(1400, windowSize.width - 64);
  const cardWidth = isDesktop
    ? Math.min(448, Math.floor((maxDeckWidth - gap * 2) / 3))
    : Math.min(360, windowSize.width - 48);
  const heroWindowWidth = cardWidth;
  const cardHeight = isDesktop
    ? Math.min(580, windowSize.height - 120)
    : Math.min(540, windowSize.height - 150);
  const cardTop = isDesktop
    ? Math.max(82, Math.floor((windowSize.height - cardHeight) / 2 + 18))
    : 90;
  const card1Left = isDesktop
    ? 16
    : Math.floor((windowSize.width - cardWidth) / 2);
  const card2Left = card1Left + cardWidth + gap;
  const card3Left = card2Left + cardWidth + gap;
  const heroTop = useTransform(menuProgress, (progress) => progress * cardTop);
  const heroLeft = useTransform(menuProgress, (progress) => progress * card1Left);
  const heroWidth = useTransform(
    menuProgress,
    (progress) => windowSize.width + (heroWindowWidth - windowSize.width) * progress,
  );
  const heroHeight = useTransform(
    menuProgress,
    (progress) => windowSize.height + (cardHeight - windowSize.height) * progress,
  );

  // Active theme / menu colors
  const activeBg = isMenuOpen ? FIXED_MENU_DARK_GREEN : theme.bg;
  const activeText = isMenuOpen ? '#E5EADF' : theme.text;
  const featuredCases = portfolio.caseStudies.slice(0, 2);

  return (
    <div
      className={`relative h-screen w-full font-sans selection:bg-[#18C98A] selection:text-[#101114] overflow-hidden ${
        isScrubbing ? 'transition-none' : 'transition-colors duration-700 ease-out'
      }`}
      style={{
        backgroundColor: activeBg,
        color: activeText,
      }}
    >
      {/* Fixed Dark Olive Green Canvas Backdrop */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: FIXED_MENU_DARK_GREEN,
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      />

      {/* Header */}
      <Header
        persona={portfolio.profile}
        activeView={view}
        onNavigate={handleNavigate}
        onOpenMenu={() => setIsMenuOpen(true)}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        isMenuOpen={isMenuOpen}
        onOpenContact={() => setIsContactOpen(true)}
        currentHour={currentHour}
        onTimeChange={handleTimeChange}
        onResetTime={handleResetTime}
        isTimeOffset={isTimeOffset}
        menuFrameLeft={card1Left}
        menuFrameTop={cardTop}
        menuFrameWidth={heroWindowWidth}
        menuSignatureWidth={isDesktop ? 101 : 76}
        viewportWidth={windowSize.width}
        menuProgress={menuProgress}
        theme={theme}
        onScrubStateChange={setIsScrubbing}
      />

      {/* ========================================================
          CARD 1: THE ACTUAL LIVE LANDING PAGE / CASES CARD
          Strict User Requirements (image_7335291e.png):
          1. Color: MUST NOT CHANGE. Keeps exact landing page color (theme.bg)
          2. Text: ONLY MERAJ / HOSSAIN + "cases" title + signature "mh." mark +
             "THE EMIRATES" / "BESTSELLER 50 FESTIVAL" subheaders. No extra text!
          3. Styling: Sharp 0px corners, crisp border, solid opacity: 1 (no glitch)
          4. Animation: Smooth Framer Motion circInOut scaling into deck dock
          5. No Scrollbar: Strictly overflow-hidden in hero section as requested
          ======================================================== */}
      <motion.main
        onClick={isMenuOpen ? () => setIsMenuOpen(false) : undefined}
        initial={false}
        className={`fixed ${
          isMenuOpen
            ? 'group cursor-pointer select-none overflow-hidden no-scrollbar'
            : view === 'home'
            ? 'overflow-hidden no-scrollbar'
            : 'overflow-y-auto'
        }`}
        style={{
          top: heroTop,
          left: heroLeft,
          width: heroWidth,
          height: heroHeight,
          backgroundColor: theme.bg, // Strict: NEVER changes color away from landing page!
          color: theme.text,
          borderRadius: '0px', // Strictly sharp 0px corners
          border: isMenuOpen ? `1px solid ${theme.border}` : '0px solid transparent',
          boxShadow: 'none', // Strictly no shadow on cards as requested
          zIndex: isMenuOpen ? 25 : 30, // Firmly higher than closed cards
          opacity: 1, // Solid 1: no opacity glitch
        }}
        title={isMenuOpen ? 'Click to expand cases full screen' : undefined}
      >
        {/* Keep the live home rail mounted while it becomes the menu's clipped hero window. */}
        {(!isMenuOpen || view === 'home') && (
          <div
            key={view === 'case-detail' ? selectedCase?.id || view : view}
            ref={viewTransitionRef}
            className={`w-full ${view === 'home' ? 'h-full overflow-hidden' : 'min-h-full'}`}
            style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
          >
            {view === 'home' && (
              <GalleryHome
                cases={portfolio.caseStudies}
                onSelectCase={handleSelectCase}
                theme={theme}
              />
            )}

            {view === 'case-detail' && selectedCase && (
              <CaseStudyView
                caseStudy={selectedCase}
                allCases={portfolio.caseStudies}
                onSelectCase={handleSelectCase}
                onBack={() => setView('home')}
                theme={theme}
              />
            )}

            {view === 'archive' && <ArchiveView theme={theme} items={portfolio.archiveItems} />}

            {view === 'about' && (
              <AboutView
                persona={portfolio.profile}
                onOpenContact={() => setIsContactOpen(true)}
                theme={theme}
              />
            )}
          </div>
        )}

        {/* Menu framing over the live gallery window */}
        {isMenuOpen && (
          <div className="pointer-events-none absolute inset-0 z-10 select-none">
            <div className="absolute left-5 top-[72px] overflow-hidden sm:left-6">
              <motion.h2
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, delay: 0.72, ease: [0.76, 0, 0.24, 1] }}
                className="text-3xl sm:text-4xl font-sans font-light lowercase leading-none"
              >
                cases
              </motion.h2>
            </div>
          </div>
        )}
      </motion.main>

      {/* ========================================================
          CARD 2 (ARCHIVE) & CARD 3 (ABOUT)
          Smoothly slide in beside docked Card 1 using Framer Motion
          Sharing the EXACT landing page theme background (theme.bg)
          ======================================================== */}
      <EditorialDeckCards
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        cardTop={cardTop}
        card2Left={card2Left}
        card3Left={card3Left}
        isDesktop={isDesktop}
        theme={theme}
        windowWidth={windowSize.width}
        windowHeight={windowSize.height}
      />

      {/* Mobile Indicator Buttons when in Menu mode */}
      {!isDesktop && isMenuOpen && (
        <div className="fixed bottom-6 inset-x-0 z-40 flex items-center justify-center gap-3 px-6 pointer-events-auto">
          <button
            onClick={() => handleNavigate('cases')}
            className="px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase border"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.border,
            }}
          >
            Cases
          </button>
          <button
            onClick={() => handleNavigate('archive')}
            className="px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase border opacity-80"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.border,
            }}
          >
            Archive
          </button>
          <button
            onClick={() => handleNavigate('about')}
            className="px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase border opacity-80"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.border,
            }}
          >
            About
          </button>
        </div>
      )}

      {/* Tactile Contact Sheet */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        persona={portfolio.profile}
        theme={theme}
      />
    </div>
  );
}
