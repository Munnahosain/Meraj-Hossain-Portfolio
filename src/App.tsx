/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
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
import { FadeUp, MotionButton } from './components/motion/MotionPrimitives';
import { useLenis } from './hooks/useLenis';
import { motionTokens } from './lib/motion';

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
  const menuProgress = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      menuProgress.set(isMenuOpen ? 1 : 0);
      return;
    }

    const animation = animate(menuProgress, isMenuOpen ? 1 : 0, {
      duration: motionTokens.duration.navigation,
      ease: motionTokens.easing.menu,
    });
    return () => animation.stop();
  }, [isMenuOpen, menuProgress, shouldReduceMotion]);

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
  const deckTotalWidth = cardWidth * 3 + gap * 2;
  const card1Left = isDesktop
    ? Math.max(16, Math.floor((windowSize.width - deckTotalWidth) / 2))
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

  // Horizontal Negative Magnetic Counter + Continuous Smooth Edge-Hold Auto-Scroll:
  // - Moves strictly left/right (zero vertical floating)
  // - Normal mouse movement: negative magnetic counter (mouse right = cards left, mouse left = cards right)
  // - Holding mouse on right side: continuously and smoothly scrolls the 3 cards to the left
  // - Holding mouse on left side: continuously and smoothly scrolls the 3 cards to the right
  const totalDeckX = useMotionValue(0);
  const smoothDeckX = useSpring(totalDeckX, { stiffness: 280, damping: 22, mass: 0.4 });
  const deckRepelX = useTransform([smoothDeckX, menuProgress], ([x, p]) => (x as number) * (p as number));

  const accumulatedScrollRef = useRef(0);
  const mouseNormXRef = useRef(0);

  useEffect(() => {
    if (!isMenuOpen) {
      accumulatedScrollRef.current = 0;
      mouseNormXRef.current = 0;
      totalDeckX.set(0);
      return;
    }

    let rafId: number;
    let lastTime = performance.now();

    // Safe travel limits so all 3 cards stay clearly visible on screen ("screen er baire jabe na")
    // Prevents cards from scrolling off-screen where "just last er card dekkha jay"
    const maxTravel = isDesktop
      ? Math.min(220, Math.max(100, Math.floor(windowSize.width * 0.13)))
      : Math.floor(cardWidth * 1.1);

    const minLimit = -maxTravel;
    const maxLimit = maxTravel;

    const loop = (time: number) => {
      const dt = Math.min(32, time - lastTime) / 16.667;
      lastTime = time;

      const normX = mouseNormXRef.current; // -1 to +1
      const absNormX = Math.abs(normX);
      const SCROLL_THRESHOLD = 0.28;

      // 1. Continuous smooth auto-scroll when mouse is held on left or right sides:
      if (absNormX > SCROLL_THRESHOLD) {
        // Holding on right (normX > 0) -> scrolls cards to left (- direction, "dan theke bame")
        // Holding on left (normX < 0) -> scrolls cards to right (+ direction, "bam theke dane")
        const direction = normX > 0 ? -1 : 1;
        const intensity = (absNormX - SCROLL_THRESHOLD) / (1 - SCROLL_THRESHOLD);
        // Snappy, realistic continuous scroll speed:
        const speed = direction * intensity * (isDesktop ? 4.8 : 3.6) * dt;
        accumulatedScrollRef.current += speed;
      }

      // 2. Elastic bounce & rubber-band boundary clamping:
      // "screen er baire jabe na jodi o jay bounce e effect er moto fire asbe"
      let displayScroll = accumulatedScrollRef.current;

      if (accumulatedScrollRef.current < minLimit) {
        const overshoot = minLimit - accumulatedScrollRef.current;
        // Snappy elastic bounce spring pulling back into safe bounds ("bounce e effect er moto fire asbe")
        accumulatedScrollRef.current += overshoot * 0.32 * dt;
        // Visual rubber-band resistance curve (soft clamp to max 30px overshoot)
        displayScroll = minLimit - Math.min(30, Math.pow(overshoot, 0.7) * 2.8);
      } else if (accumulatedScrollRef.current > maxLimit) {
        const overshoot = accumulatedScrollRef.current - maxLimit;
        // Snappy elastic bounce spring pulling back into safe bounds
        accumulatedScrollRef.current -= overshoot * 0.32 * dt;
        // Visual rubber-band resistance curve
        displayScroll = maxLimit + Math.min(30, Math.pow(overshoot, 0.7) * 2.8);
      }

      // 3. Instant negative magnetic counter repulsion:
      const MAGNETIC_STRENGTH = isDesktop ? 54 : 32;
      const magneticOffset = -normX * MAGNETIC_STRENGTH;

      // Combined position: bounded scroll with elastic bounce + immediate negative magnetic offset
      totalDeckX.set(displayScroll + magneticOffset);

      rafId = requestAnimationFrame(loop);
    };

    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = windowSize.width / 2;
      const norm = Math.max(-1, Math.min(1, (e.clientX - centerX) / (windowSize.width / 2)));
      mouseNormXRef.current = norm;
    };

    const handleMouseLeave = () => {
      mouseNormXRef.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMenuOpen, isDesktop, windowSize.width, cardWidth, gap, totalDeckX]);

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
        deckRepelX={deckRepelX}
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
          x: deckRepelX,
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
          <FadeUp
            key={view === 'case-detail' ? selectedCase?.id || view : view}
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
          </FadeUp>
        )}

        {/* Menu framing over the live gallery window */}
        {isMenuOpen && (
          <div className="pointer-events-none absolute inset-0 z-10 select-none">
            <div className="absolute left-5 top-[72px] overflow-hidden sm:left-6">
              <motion.h2
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: motionTokens.duration.navigationLabel,
                  delay: motionTokens.duration.navigation,
                  ease: motionTokens.easing.menu,
                }}
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
        deckRepelX={deckRepelX}
      />

      {/* Mobile Indicator Buttons when in Menu mode */}
      {!isDesktop && isMenuOpen && (
        <div className="fixed bottom-6 inset-x-0 z-40 flex items-center justify-center gap-3 px-6 pointer-events-auto">
          <MotionButton
            onClick={() => handleNavigate('cases')}
            className="px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase border"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.border,
            }}
          >
            Cases
          </MotionButton>
          <MotionButton
            onClick={() => handleNavigate('archive')}
            className="px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase border opacity-80"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.border,
            }}
          >
            Archive
          </MotionButton>
          <MotionButton
            onClick={() => handleNavigate('about')}
            className="px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase border opacity-80"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.border,
            }}
          >
            About
          </MotionButton>
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
