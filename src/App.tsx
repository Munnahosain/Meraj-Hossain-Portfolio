/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ViewMode, CaseStudy, PortfolioData, TimeTheme } from './types';
import { ARCHIVE_ITEMS, CASE_STUDIES, MERAJ_PROFILE } from './data/portfolioData';
import { getTimeTheme } from './utils/timeColor';
import { Header } from './components/Header';
import { GalleryHome, type GalleryMediaTransition } from './components/GalleryHome';
import { EditorialDeckCards, type DeckCardId } from './components/EditorialDeckCards';
import { CaseStudyView } from './components/CaseStudyView';
import { ArchiveView } from './components/ArchiveView';
import { AboutView } from './components/AboutView';
import { ContactModal } from './components/ContactModal';
import { MotionButton, ViewTransition } from './components/motion/MotionPrimitives';
import { CustomCursor } from './components/motion/CustomCursor';
import { useLenis } from './hooks/useLenis';
import { motionTokens } from './lib/motion';
import {
  getProjectAnimationSettings,
  getProjectMotionEasing,
} from './lib/project-motion';

type SharedHeroImage = GalleryMediaTransition & {
  phase: 'shutter' | 'handoff' | 'settled';
  targetRect?: GalleryMediaTransition['rect'];
};

function getProjectSlugFromLocation() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

function getProjectUrl(caseStudy: CaseStudy) {
  const slug = caseStudy.slug || caseStudy.id;
  return `/projects/${encodeURIComponent(slug)}${caseStudy.status === 'draft' ? '?preview=true' : ''}`;
}

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    profile: MERAJ_PROFILE,
    caseStudies: CASE_STUDIES,
    archiveItems: ARCHIVE_ITEMS,
  });
  const [view, setView] = useState<ViewMode>(() =>
    CASE_STUDIES.some((item) => {
      const slug = getProjectSlugFromLocation();
      return slug && (item.slug === slug || item.id === slug);
    })
      ? 'case-detail'
      : 'home',
  );
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(() => {
    const slug = getProjectSlugFromLocation();
    return slug ? CASE_STUDIES.find((item) => item.slug === slug || item.id === slug) || null : null;
  });
  const [transitionTarget, setTransitionTarget] = useState<CaseStudy | null>(null);
  const [transitionSelectionKey, setTransitionSelectionKey] = useState<string | null>(null);
  const [sharedHeroImage, setSharedHeroImage] = useState<SharedHeroImage | null>(null);
  const sharedHeroLayerRef = useRef<HTMLDivElement>(null);
  const transitionLockRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const menuProgress = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const [hoveredDeck, setHoveredDeck] = useState<DeckCardId | 'cases' | null>(null);

  // Page loader: disabled per user request (no splash screen, numbers, or shutter animation)
  const [showPreloader, setShowPreloader] = useState(false);
  const [isBooted, setIsBooted] = useState(true);
  const [bootReady, setBootReady] = useState(true);
  const [dataSettled, setDataSettled] = useState(false);
  const seenLoader = useRef(true);
  const handleReveal = useCallback(() => {
    setIsBooted(true);
  }, []);
  const handleLoaderDone = useCallback(() => setShowPreloader(false), []);

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

  // Smooth scroll for the About page, which scrolls inside the card (not the window).
  // Wait for the previous view's exit fade so Lenis binds to the right content.
  const [aboutReady, setAboutReady] = useState(false);
  useEffect(() => {
    if (view !== 'about') {
      setAboutReady(false);
      return;
    }
    const timer = window.setTimeout(() => setAboutReady(true), 380);
    return () => window.clearTimeout(timer);
  }, [view]);
  useLenis(aboutReady && !isMenuOpen, mainRef);

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
  // Case studies always render on a light paper background, so the header must use dark ink there
  // (the time-of-day theme can be dark, which made the header invisible).
  const caseHeaderTheme: TimeTheme = {
    ...theme,
    bg: '#f3f1ec',
    text: '#171713',
    textMuted: '#5c5a54',
    surface: '#e8e5de',
    surfaceHover: '#dedbd2',
    border: '#cbc7bd',
    accent: '#16845f',
    isLight: true,
  };

  useEffect(() => {
    let active = true;
    const previewMode = new URLSearchParams(window.location.search).get('preview') === 'true';
    fetch(`/api/portfolio${previewMode ? '?preview=true' : ''}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PortfolioData | null) => {
        if (!active || !data?.profile || !data.caseStudies || !data.archiveItems) return;
        setPortfolio(data);
        const slug = getProjectSlugFromLocation();
        if (!slug) return;
        const matchedCase = data.caseStudies.find(
          (item) => item.slug === slug || item.id === slug,
        );
        if (matchedCase) {
          setSelectedCase(matchedCase);
          setView('case-detail');
          document.title = `${matchedCase.title.replace(/\n/g, ' ')} — Meraj Hossain`;
        } else {
          window.history.replaceState({ portfolioView: 'home' }, '', '/');
          setSelectedCase(null);
          setView('home');
        }
      })
      .catch(() => {
        const slug = getProjectSlugFromLocation();
        const bundledCase = slug
          ? CASE_STUDIES.find((item) => item.slug === slug || item.id === slug)
          : null;
        if (active && slug && !bundledCase) {
          window.history.replaceState({ portfolioView: 'home' }, '', '/');
          setSelectedCase(null);
          setView('home');
        }
      })
      .finally(() => {
        if (active) setDataSettled(true);
      });
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

  const handleSelectCase = (
    cs: CaseStudy,
    selectionKey?: string,
    media?: GalleryMediaTransition,
  ) => {
    if (transitionLockRef.current) return;
    transitionLockRef.current = true;

    if (
      !selectionKey ||
      !media ||
      shouldReduceMotion ||
      getProjectAnimationSettings(cs).preset === 'reduced-motion'
    ) {
      setSharedHeroImage(null);
      setSelectedCase(cs);
      setView('case-detail');
      window.history.pushState(
        { portfolioView: 'project', slug: cs.slug || cs.id },
        '',
        getProjectUrl(cs),
      );
      document.title = `${cs.title.replace(/\n/g, ' ')} — Meraj Hossain`;
      transitionLockRef.current = false;
      return;
    }

    setTransitionTarget(cs);
    setTransitionSelectionKey(selectionKey);
    setSharedHeroImage({ ...media, phase: 'shutter' });
    transitionTimerRef.current = window.setTimeout(() => {
      const slug = cs.slug || cs.id;
      setSelectedCase(cs);
      setView('case-detail');
      setSharedHeroImage((current) =>
        current ? { ...current, phase: 'handoff', targetRect: undefined } : null,
      );
      window.history.pushState(
        { portfolioView: 'project', slug },
        '',
        getProjectUrl(cs),
      );
      document.title = `${cs.title.replace(/\n/g, ' ')} — Meraj Hossain`;
      setTransitionTarget(null);
      setTransitionSelectionKey(null);
      transitionLockRef.current = false;
      transitionTimerRef.current = null;
    }, 850);
  };

  const handleBackToGallery = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    transitionLockRef.current = false;
    setTransitionTarget(null);
    setTransitionSelectionKey(null);
    setSharedHeroImage(null);
    if (window.location.pathname !== '/') {
      window.history.replaceState({ portfolioView: 'home' }, '', '/');
    }
    document.title = 'Meraj Hossain — Motion Graphics & Visual Designer Portfolio';
    setSelectedCase(null);
    setView('home');
  };

  useEffect(() => {
    const handlePopState = () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
      transitionLockRef.current = false;
      setTransitionTarget(null);
      setTransitionSelectionKey(null);
      setSharedHeroImage(null);
      const slug = getProjectSlugFromLocation();
      if (!slug) {
        setSelectedCase(null);
        setView('home');
        document.title = 'Meraj Hossain — Motion Graphics & Visual Designer Portfolio';
        return;
      }

      const matchedCase = portfolio.caseStudies.find(
        (item) => item.slug === slug || item.id === slug,
      );
      if (!matchedCase) {
        window.history.replaceState({ portfolioView: 'home' }, '', '/');
        setSelectedCase(null);
        setView('home');
        return;
      }
      setSelectedCase(matchedCase);
      setView('case-detail');
      document.title = `${matchedCase.title.replace(/\n/g, ' ')} — Meraj Hossain`;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [portfolio.caseStudies]);

  const cancelProjectTransition = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    transitionLockRef.current = false;
    setTransitionTarget(null);
    setTransitionSelectionKey(null);
    setSharedHeroImage(null);
  };

  const handleSharedHeroTargetReady = useCallback((
    rect: NonNullable<SharedHeroImage['targetRect']>,
  ) => {
    setSharedHeroImage((current) =>
      current?.phase === 'handoff' ? { ...current, targetRect: rect } : current,
    );
  }, []);

  useEffect(() => {
    if (
      view !== 'case-detail' ||
      sharedHeroImage?.phase !== 'handoff' ||
      !sharedHeroImage.targetRect ||
      !sharedHeroLayerRef.current
    ) {
      return;
    }

    const source = sharedHeroImage.rect;
    const destination = sharedHeroImage.targetRect;
    const deltaX = source.left - destination.left;
    const deltaY = source.top - destination.top;
    const scaleX = source.width / destination.width;
    const scaleY = source.height / destination.height;
    const inverseTransform =
      `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`;
    const easing = getProjectMotionEasing(selectedCase).join(', ');
    const animation = sharedHeroLayerRef.current.animate(
      [
        { transform: inverseTransform },
        { transform: 'translate3d(0, 0, 0) scale(1, 1)' },
      ],
      {
        duration: 420,
        easing: `cubic-bezier(${easing})`,
        fill: 'forwards',
      },
    );

    animation.onfinish = () => {
      setSharedHeroImage((current) =>
        current?.phase === 'handoff' ? { ...current, phase: 'settled' } : current,
      );
    };

    return () => animation.cancel();
  }, [
    selectedCase,
    sharedHeroImage?.phase,
    sharedHeroImage?.rect,
    sharedHeroImage?.targetRect,
    view,
  ]);

  const handleNavigate = (newView: 'home' | 'cases' | 'archive' | 'about') => {
    cancelProjectTransition();
    if (newView === 'cases' || newView === 'home') {
      if (window.location.pathname !== '/') {
        window.history.replaceState({ portfolioView: 'home' }, '', '/');
      }
      setView('home');
      setSelectedCase(null);
      setIsMenuOpen(false);
      document.title = 'Meraj Hossain — Motion Graphics & Visual Designer Portfolio';
    } else {
      setView(newView);
      setSelectedCase(null);
      setIsMenuOpen(true);
      document.title = `${newView === 'archive' ? 'Archive' : 'About'} — Meraj Hossain`;
    }
  };

  const handleCloseExpanded = useCallback(() => {
    setView('home');
    setIsMenuOpen(true);
    if (window.location.pathname !== '/') {
      window.history.replaceState({ portfolioView: 'home' }, '', '/');
    }
    document.title = 'Meraj Hossain — Motion Graphics & Visual Designer Portfolio';
  }, []);

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (view === 'archive' || view === 'about') {
          handleCloseExpanded();
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        } else if (isContactOpen) {
          setIsContactOpen(false);
        } else if (view === 'case-detail') {
          handleBackToGallery();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isContactOpen, view, handleCloseExpanded]);

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

  // Negative magnetic counter: mouse right = cards left, mouse left = cards right, mouse down = cards up, mouse up = cards down.
  const totalDeckX = useMotionValue(0);
  const smoothDeckX = useSpring(totalDeckX, { stiffness: 280, damping: 22, mass: 0.4 });
  const deckRepelX = useTransform([smoothDeckX, menuProgress], ([x, p]) => (x as number) * (p as number));

  const totalDeckY = useMotionValue(0);
  const smoothDeckY = useSpring(totalDeckY, { stiffness: 280, damping: 22, mass: 0.4 });
  const deckRepelY = useTransform([smoothDeckY, menuProgress], ([y, p]) => (y as number) * (p as number));

  useEffect(() => {
    if (!isMenuOpen) {
      totalDeckX.set(0);
      totalDeckY.set(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = windowSize.width / 2;
      const centerY = windowSize.height / 2;
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / centerX));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / centerY));
      const MAGNETIC_STRENGTH_X = isDesktop ? 60 : 36;
      const MAGNETIC_STRENGTH_Y = isDesktop ? 18 : 10;
      totalDeckX.set(-normX * MAGNETIC_STRENGTH_X);
      totalDeckY.set(-normY * MAGNETIC_STRENGTH_Y);
    };

    const handleMouseLeave = () => {
      totalDeckX.set(0);
      totalDeckY.set(0);
    };

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const current = totalDeckX.get();
      totalDeckX.set(Math.max(-160, Math.min(160, current - delta * 0.4)));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMenuOpen, isDesktop, windowSize.width, windowSize.height, totalDeckX, totalDeckY]);

  // Active theme / menu colors
  const activeBg = isMenuOpen ? FIXED_MENU_DARK_GREEN : theme.bg;
  const activeText = isMenuOpen ? '#E5EADF' : theme.text;
  const featuredCases = useMemo(
    () =>
      portfolio.caseStudies
        .filter((item) => item.heroVisible !== false && item.status !== 'draft')
        .sort((left, right) => Number(Boolean(right.featured)) - Number(Boolean(left.featured))),
    [portfolio.caseStudies],
  );

  // Boot readiness: data in, fonts parsed, first covers decoded (with a hard 3.5s cap).
  useEffect(() => {
    if (bootReady) return;
    const hardCap = window.setTimeout(() => setBootReady(true), 5000);
    if (!dataSettled) return () => window.clearTimeout(hardCap);

    let cancelled = false;
    const covers = featuredCases
      .slice(0, 4)
      .map((item) => item.coverPoster || item.coverImage)
      .filter(Boolean);
    const images = Promise.all(
      covers.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;
          }),
      ),
    );
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const cap = new Promise<void>((resolve) => window.setTimeout(resolve, 3500));
    Promise.race([Promise.all([images, fonts]), cap]).then(() => {
      if (!cancelled) setBootReady(true);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(hardCap);
    };
  }, [bootReady, dataSettled, featuredCases]);

  return (
    <div
      data-menu-open={isMenuOpen}
      data-deck-hover={hoveredDeck ?? ''}
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
        onCloseView={handleCloseExpanded}
        onOpenMenu={() => {
          cancelProjectTransition();
          setIsMenuOpen(true);
        }}
        onToggleMenu={() => {
          cancelProjectTransition();
          setIsMenuOpen((prev) => !prev);
        }}
        isMenuOpen={isMenuOpen}
        onOpenContact={() => {
          cancelProjectTransition();
          setIsContactOpen(true);
        }}
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
        theme={view === 'case-detail' && !isMenuOpen ? caseHeaderTheme : theme}
        onScrubStateChange={setIsScrubbing}
        deckRepelX={deckRepelX}
        isBooted={isBooted}
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
        ref={mainRef}
        data-deck-card="cases"
        data-cursor={isMenuOpen ? 'open' : undefined}
        onPointerEnter={(event) => {
          if (isMenuOpen && event.pointerType === 'mouse') setHoveredDeck('cases');
        }}
        onPointerLeave={() => setHoveredDeck((current) => (current === 'cases' ? null : current))}
        onClick={isMenuOpen ? () => setIsMenuOpen(false) : undefined}
        initial={false}
        className={`fixed ${
          isMenuOpen
            ? 'group cursor-pointer select-none overflow-hidden no-scrollbar'
            : view === 'home' || view === 'case-detail'
            ? 'overflow-hidden no-scrollbar'
            : 'overflow-hidden no-scrollbar'
        }`}
        style={{
          x: deckRepelX,
          y: deckRepelY,
          top: heroTop,
          left: heroLeft,
          width: heroWidth,
          height: heroHeight,
          backgroundColor: theme.bg,
          color: theme.text,
          borderRadius: '0px', // Strictly sharp 0px corners
          border: isMenuOpen ? `1px solid ${theme.border}` : '0px solid transparent',
          boxShadow: 'none', // Strictly no shadow on cards as requested
          zIndex: isMenuOpen ? 25 : 30, // Firmly higher than closed cards
          opacity: view === 'archive' || view === 'about' ? 0 : 1,
          pointerEvents: view === 'archive' || view === 'about' ? 'none' : 'auto',
        }}
        title={isMenuOpen ? 'Click to expand cases full screen' : undefined}
      >
        {/* Keep the live home rail mounted while it becomes the menu's clipped hero window. */}
        <AnimatePresence mode="wait" initial={false} custom={sharedHeroImage ? 'instant' : 'fade'}>
        {(!isMenuOpen || view === 'home') && (
          <ViewTransition
            key={view === 'case-detail' ? selectedCase?.id || view : view}
            className={`w-full ${
              view === 'home'
                ? 'h-full overflow-hidden'
                : view === 'case-detail'
                  ? 'h-full overflow-hidden'
                  : 'min-h-full'
            }`}
            style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
          >
            {view === 'home' && (
              <GalleryHome
                cases={featuredCases}
                onSelectCase={handleSelectCase}
                isTransitioning={Boolean(transitionTarget)}
                transitionSelectionKey={transitionSelectionKey}
                transitionEasing={transitionTarget ? getProjectMotionEasing(transitionTarget) : undefined}
                introEnabled={isBooted}
                keyboardEnabled={view === 'home' && !isMenuOpen && !isContactOpen}
                theme={theme}
              />
            )}

            {view === 'case-detail' && selectedCase && (
              <CaseStudyView
                caseStudy={selectedCase}
                allCases={portfolio.caseStudies}
                onSelectCase={handleSelectCase}
                onBack={handleBackToGallery}
                theme={theme}
                sharedHeroSize={
                  sharedHeroImage
                    ? {
                        width: sharedHeroImage.rect.width,
                        height: sharedHeroImage.rect.height,
                      }
                    : undefined
                }
                isSharedHeroAnimating={sharedHeroImage?.phase === 'handoff'}
                onHeroImageReady={handleSharedHeroTargetReady}
              />
            )}
          </ViewTransition>
        )}
        </AnimatePresence>

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
          When clicked, each card expands from its exact card coordinates!
          ======================================================== */}
      <EditorialDeckCards
        isOpen={isMenuOpen}
        activeView={view}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        onCloseExpanded={handleCloseExpanded}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        cardTop={cardTop}
        card1Left={card1Left}
        card2Left={card2Left}
        card3Left={card3Left}
        isDesktop={isDesktop}
        theme={theme}
        windowWidth={windowSize.width}
        windowHeight={windowSize.height}
        deckRepelX={deckRepelX}
        deckRepelY={deckRepelY}
        onHoverCard={setHoveredDeck}
        persona={portfolio.profile}
        archiveItems={portfolio.archiveItems}
        onOpenContact={() => setIsContactOpen(true)}
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

      {view === 'case-detail' &&
        sharedHeroImage?.phase === 'handoff' &&
        createPortal(
          <div
            ref={sharedHeroLayerRef}
            className="pointer-events-none overflow-hidden"
            style={{
              position: 'fixed',
              left: sharedHeroImage.targetRect?.left ?? sharedHeroImage.rect.left,
              top: sharedHeroImage.targetRect?.top ?? sharedHeroImage.rect.top,
              width: sharedHeroImage.targetRect?.width ?? sharedHeroImage.rect.width,
              height: sharedHeroImage.targetRect?.height ?? sharedHeroImage.rect.height,
              transformOrigin: 'top left',
              transform: sharedHeroImage.targetRect
                ? `translate3d(${sharedHeroImage.rect.left - sharedHeroImage.targetRect.left}px, ${sharedHeroImage.rect.top - sharedHeroImage.targetRect.top}px, 0) scale(${sharedHeroImage.rect.width / sharedHeroImage.targetRect.width}, ${sharedHeroImage.rect.height / sharedHeroImage.targetRect.height})`
                : 'none',
              willChange: 'transform',
              zIndex: 35,
            }}
            aria-hidden="true"
          >
            <img
              src={sharedHeroImage.src}
              alt=""
              className="block h-full w-full object-cover"
            />
          </div>,
          document.body,
        )}

      <CustomCursor />

    </div>
  );
}
