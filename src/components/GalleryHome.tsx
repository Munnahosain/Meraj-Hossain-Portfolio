import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CaseStudy, TimeTheme } from '../types';
import { FrictionScroller } from '../utils/frictionScroll';
import type { ProjectMotionEasing } from '../lib/project-motion';
import { ProgressiveImage } from './motion/ProgressiveImage';

interface GalleryHomeProps {
  cases: CaseStudy[];
  onSelectCase: (
    caseStudy: CaseStudy,
    selectionKey: string,
    media: GalleryMediaTransition,
  ) => void;
  isTransitioning?: boolean;
  transitionSelectionKey?: string | null;
  transitionEasing?: ProjectMotionEasing;
  /** Hold the deal-out intro until the page loader has lifted. */
  introEnabled?: boolean;
  /** Arrow keys step through cases while true. */
  keyboardEnabled?: boolean;
  theme: TimeTheme;
}

export interface GalleryMediaTransition {
  src: string;
  alt: string;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

type IntroStage = 'measuring' | 'shutter' | 'morph' | 'dealing' | 'interactive';

// Drop durations and custom easings for the 4-step progressive shutter:
// Silky cinematic curves with friction-free deceleration as requested by user
const DROP_DURATIONS = [560, 560, 400, 320];
const DROP_EASINGS = [
  'cubic-bezier(0.16, 1, 0.3, 1)',
  'cubic-bezier(0.16, 1, 0.3, 1)',
  'cubic-bezier(0.16, 1, 0.3, 1)',
  'cubic-bezier(0.16, 1, 0.3, 1)',
];

// The full shutter intro plays once per page load; coming back from a case
// study only re-deals the cards, so returning never costs extra time.
let fullIntroPlayed = false;

const pad = (value: number) => String(value).padStart(2, '0');

export const GalleryHome: React.FC<GalleryHomeProps> = ({
  cases,
  onSelectCase,
  isTransitioning = false,
  transitionSelectionKey = null,
  transitionEasing = [0.76, 0, 0.24, 1],
  introEnabled = true,
  keyboardEnabled = true,
  theme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scheduleFrameRef = useRef<(() => void) | null>(null);

  // Infinite Cases Array (3 sets: endless circular repeat)
  const infiniteCases = React.useMemo(() => {
    return [...cases, ...cases, ...cases];
  }, [cases]);

  // Spring-based Friction Scroller with Progressive Velocity-Proportional Bounce
  // Olpo scroll = olpo bounce, beshi scroll = beshi bounce
  const [frictionScroller] = useState(
    () =>
      new FrictionScroller({
        friction: 0.928, // Controlled, responsive deceleration
        impulseFactor: 0.42,
        baseNotchImpulse: 9.2, // Gentle single wheel spin travels ~120px with virtually zero squish
        maxVelocity: 125,
        streakTimeoutMs: 195,
        streakRampStep: 0.28,
        maxStreakMultiplier: 3.2,
        spring: 'tactile',
      }),
  );
  const frictionScrollerRef = useRef<FrictionScroller>(frictionScroller);

  // Position and state tracking refs
  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const [draggedDistance, setDraggedDistance] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Deck Loading Animation States
  const [introStage, setIntroStage] = useState<IntroStage>('measuring');
  const [scaleProgress, setScaleProgress] = useState<number>(0.85);
  const [centerOffsets, setCenterOffsets] = useState<number[]>([]);

  // Exactly 4 Featured Images for the shutter effect ending with cases[0] (hero project)
  const shutterFeaturedCases = React.useMemo(() => {
    if (cases.length === 0) return [];
    if (cases.length >= 4) {
      return [cases[1], cases[2], cases[3], cases[0]];
    }
    const result: typeof cases = [];
    for (let i = 0; i < 3; i++) {
      result.push(cases[(i + 1) % cases.length]);
    }
    result.push(cases[0]);
    return result;
  }, [cases]);

  const [shutterPositions, setShutterPositions] = useState<number[]>([
    -105, -105, -105, -105,
  ]);

  // Width of one full set of 6 cases
  const setBlockWidthRef = useRef<number>(0);
  const casesLengthRef = useRef(cases.length);
  casesLengthRef.current = cases.length;
  const timersRef = useRef<number[]>([]);
  const wrapTimerRef = useRef<number | null>(null);

  // Timeline scrubber measurements + live DOM handles (updated without re-rendering)
  const firstLeftRef = useRef(0);
  const cardStepRef = useRef(0);
  const cardWidthRef = useRef(0);
  const lastActiveRef = useRef(-1);
  const playheadRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const casesRef = useRef(cases);
  casesRef.current = cases;

  const later = useCallback((callback: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(callback, ms));
  }, []);
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  // Which case is centred, and how far along the loop we are (drives the timeline).
  const updateTimeline = useCallback(() => {
    const el = scrollRef.current;
    const count = casesLengthRef.current;
    if (!el || count === 0 || cardStepRef.current <= 0) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const fractional = (center - firstLeftRef.current - cardWidthRef.current / 2) / cardStepRef.current;
    const norm = ((fractional % count) + count) % count;
    const active = Math.round(norm) % count;
    if (playheadRef.current) playheadRef.current.style.left = `${(norm / count) * 100}%`;
    if (active !== lastActiveRef.current) {
      lastActiveRef.current = active;
      if (counterRef.current) counterRef.current.textContent = `${pad(active + 1)} / ${pad(count)}`;
      if (titleRef.current) {
        titleRef.current.textContent = casesRef.current[active]?.title.replace(/\n/g, ' ') ?? '';
      }
      el.dataset.active = String(active);
    }
  }, []);

  // Measure center offsets for middle set (indices 6 to 11) relative to viewport center
  const calculateOffsets = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const count = casesLengthRef.current;
    const viewportCenterX = window.innerWidth / 2;

    const firstCard = cardRefs.current[0];
    const secondCard = cardRefs.current[1];
    const middleCard0 = cardRefs.current[count];
    if (firstCard && middleCard0) {
      setBlockWidthRef.current = middleCard0.offsetLeft - firstCard.offsetLeft;
    }
    if (firstCard) {
      const scrollRect = scrollEl.getBoundingClientRect();
      firstLeftRef.current = firstCard.getBoundingClientRect().left - scrollRect.left + scrollEl.scrollLeft;
      cardWidthRef.current = firstCard.offsetWidth;
    }
    if (firstCard && secondCard) cardStepRef.current = secondCard.offsetLeft - firstCard.offsetLeft;

    const scrollRect = scrollEl.getBoundingClientRect();
    const offsets = Array.from({ length: count }, (_, i) => {
      const el = cardRefs.current[count + i];
      if (!el) return 0;
      const cardUntransformedLeft = scrollRect.left + el.offsetLeft - scrollEl.scrollLeft;
      const cardCenterX = cardUntransformedLeft + el.offsetWidth / 2;
      return viewportCenterX - cardCenterX;
    });
    setCenterOffsets(offsets);
    updateTimeline();
  }, [updateTimeline]);

  const rafIdRef = useRef<number | null>(null);
  const cancelRafSchedule = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const placeMiddleSet = useCallback(() => {
    if (scrollRef.current && setBlockWidthRef.current > 0) {
      scrollRef.current.scrollLeft = setBlockWidthRef.current;
      targetScrollRef.current = setBlockWidthRef.current;
      currentScrollRef.current = setBlockWidthRef.current;
    }
  }, []);

  // Launch the 4-Image Progressive Roller Shutter driven by a requestAnimationFrame loop
  const startDeckIntro = useCallback(
    (quick: boolean) => {
      clearTimers();
      cancelRafSchedule();
      setIntroStage('measuring');
      setScaleProgress(0.85);
      setShutterPositions([-105, -105, -105, -105]);
      frictionScrollerRef.current.reset();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        calculateOffsets();
        placeMiddleSet();
        updateTimeline();
        setShutterPositions([0, 0, 0, 0]);
        setScaleProgress(1);
        setIntroStage('interactive');
        fullIntroPlayed = true;
        return;
      }

      placeMiddleSet();

      // Precision timeline scheduled using continuous requestAnimationFrame loop (locked to 60fps/120fps)
      let startTime: number | null = null;
      const schedule = [
        {
          time: 40,
          action: () => {
            calculateOffsets();
            placeMiddleSet();
            updateTimeline();
          },
        },
        {
          time: 60,
          action: () => {
            if (quick) {
              setScaleProgress(1);
              setIntroStage('dealing');
              return;
            }
            // Shutter Drop 1: Slow, graceful drop (550ms)
            setIntroStage('shutter');
            setShutterPositions([0, -105, -105, -105]);
            setScaleProgress(0.88);
          },
        },
        {
          time: 610,
          action: () => {
            if (quick) return;
            // Shutter Drop 2: Slow, graceful drop (550ms)
            setShutterPositions([0, 0, -105, -105]);
            setScaleProgress(0.92);
          },
        },
        {
          time: 1160,
          action: () => {
            if (quick) return;
            // Shutter Drop 3: Accelerating drop (380ms)
            setShutterPositions([0, 0, 0, -105]);
            setScaleProgress(0.96);
          },
        },
        {
          time: 1540,
          action: () => {
            if (quick) return;
            // Shutter Drop 4: Final hero image lands crisp (300ms)
            setShutterPositions([0, 0, 0, 0]);
            setScaleProgress(1.0);
          },
        },
        {
          time: 1990,
          action: () => {
            if (quick) {
              fullIntroPlayed = true;
              setIntroStage('interactive');
              return;
            }
            // Smooth Glide: Morph card smoothly translates directly into the target track card
            setIntroStage('morph');
          },
        },
        {
          time: 2840,
          action: () => {
            fullIntroPlayed = true;
            setIntroStage('interactive');
          },
        },
      ];

      let nextIndex = 0;
      const frameLoop = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        while (nextIndex < schedule.length && elapsed >= schedule[nextIndex].time) {
          schedule[nextIndex].action();
          nextIndex++;
        }

        if (nextIndex < schedule.length) {
          rafIdRef.current = requestAnimationFrame(frameLoop);
        } else {
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(frameLoop);
    },
    [calculateOffsets, clearTimers, cancelRafSchedule, placeMiddleSet, updateTimeline],
  );

  // Start (or restart) the intro only when the loader is gone or the set of
  // projects actually changes. A data refresh that returns the same projects
  // must not replay the intro halfway through.
  const casesKey = cases.map((item) => item.id).join('|');
  useEffect(() => {
    if (!introEnabled) return;
    startDeckIntro(fullIntroPlayed);
    return () => {
      clearTimers();
      cancelRafSchedule();
    };
  }, [casesKey, introEnabled, startDeckIntro, clearTimers, cancelRafSchedule]);

  useEffect(() => {
    window.addEventListener('resize', calculateOffsets);
    return () => window.removeEventListener('resize', calculateOffsets);
  }, [calculateOffsets]);

  // Keep measurements fresh if the project data changes without a restart.
  useEffect(() => {
    calculateOffsets();
  }, [cases, calculateOffsets]);

  // Jump to a case via the shortest route around the loop.
  const scrollToCase = useCallback((index: number) => {
    const el = scrollRef.current;
    const count = casesLengthRef.current;
    if (!el || count === 0 || cardStepRef.current <= 0) return;
    let best = 0;
    let bestDistance = Infinity;
    for (let setIndex = 0; setIndex < 3; setIndex += 1) {
      const candidate =
        firstLeftRef.current +
        (setIndex * count + index) * cardStepRef.current +
        cardWidthRef.current / 2 -
        el.clientWidth / 2;
      const distance = Math.abs(candidate - currentScrollRef.current);
      if (distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }
    frictionScrollerRef.current.reset();
    targetScrollRef.current = Math.max(0, best);
    scheduleFrameRef.current?.();
  }, []);

  // Wrap into the middle set once scrolling settles, for input that bypasses the physics loop (touch).
  const wrapScroll = useCallback(() => {
    const el = scrollRef.current;
    const setWidth = setBlockWidthRef.current;
    if (!el || setWidth <= 0 || isDraggingRef.current) return;
    if (currentScrollRef.current >= 2 * setWidth) {
      currentScrollRef.current -= setWidth;
      targetScrollRef.current -= setWidth;
      el.scrollLeft -= setWidth;
    } else if (currentScrollRef.current <= 0.5 * setWidth) {
      currentScrollRef.current += setWidth;
      targetScrollRef.current += setWidth;
      el.scrollLeft += setWidth;
    }
  }, []);

  const handleScroll = () => {
    updateTimeline();
    const el = scrollRef.current;
    if (!el || introStage !== 'interactive' || isDraggingRef.current) return;
    // Native (touch) scrolling moves scrollLeft without going through the physics
    // loop; adopt the new position so the next wheel/drag doesn't snap back.
    if (Math.abs(el.scrollLeft - currentScrollRef.current) > 2) {
      currentScrollRef.current = el.scrollLeft;
      targetScrollRef.current = el.scrollLeft;
      frictionScrollerRef.current.reset();
      if (wrapTimerRef.current !== null) window.clearTimeout(wrapTimerRef.current);
      wrapTimerRef.current = window.setTimeout(wrapScroll, 140);
    }
  };

  useEffect(
    () => () => {
      if (wrapTimerRef.current !== null) window.clearTimeout(wrapTimerRef.current);
    },
    [],
  );

  // Arrow keys: step one case at a time.
  useEffect(() => {
    if (!keyboardEnabled || introStage !== 'interactive' || isTransitioning) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('input, textarea, select, [role="slider"]')) return;
      const count = casesLengthRef.current;
      if (count === 0) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const current = lastActiveRef.current < 0 ? 0 : lastActiveRef.current;
      scrollToCase((current + direction + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [introStage, isTransitioning, keyboardEnabled, scrollToCase]);

  // Infinite Loop + Friction Momentum Coasting + Spring Bounce Engine
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || introStage !== 'interactive' || isTransitioning) return;
    const scrollElement = el;

    let rafId: number | null = null;
    let isRunning = true;
    let lastTime = performance.now();

    const scheduleFrame = () => {
      if (isRunning && rafId === null) {
        rafId = requestAnimationFrame(smoothScrollLoop);
      }
    };
    scheduleFrameRef.current = scheduleFrame;

    function smoothScrollLoop() {
      rafId = null;
      if (!isRunning) return;
      const now = performance.now();
      const dt = Math.min(now - lastTime, 32);
      lastTime = now;

      // Step the spring physics engine: friction decay + momentum coasting + dynamic spring bounce
      const physics = frictionScrollerRef.current.update(
        currentScrollRef.current,
        targetScrollRef.current,
        dt
      );

      if (!isDraggingRef.current) {
        targetScrollRef.current = physics.newTarget;
        currentScrollRef.current = physics.newScroll;
        scrollElement.scrollLeft = physics.newScroll;
      }

      // Drive physical spring scale on single track container for peak 60/120fps GPU performance
      if (trackRef.current && introStage === 'interactive') {
        trackRef.current.style.transform = `translate3d(0, 0, 0) scale(1, ${physics.dynamicScale})`;
      }

      wrapScroll();
      updateTimeline();

      if (physics.isMoving || isDraggingRef.current) scheduleFrame();
    }

    // Mouse Wheel Handler with Auto-Accelerating Momentum
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      // Normalize Firefox line/page delta modes to pixels
      if (e.deltaMode === 1) {
        delta *= 33;
      } else if (e.deltaMode === 2) {
        delta *= 400;
      }

      // Injects physical impulse with continuous auto-acceleration:
      // Single spin = controlled gentle distance (~180px) keeping the target card right in front of you
      // Continuous spinning ("laga tar") = speed automatically accelerates up to 3.2x
      // Direction reversal or pause = resets immediately back to normal gentle speed
      frictionScrollerRef.current.addImpulse(delta, performance.now());
      scheduleFrame();
    };

    scrollElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      isRunning = false;
      scheduleFrameRef.current = null;
      if (rafId !== null) cancelAnimationFrame(rafId);
      scrollElement.removeEventListener('wheel', handleWheel);
    };
  }, [introStage, isTransitioning, updateTimeline, wrapScroll]);

  // Mouse Drag Handlers with Fling Release Velocity
  const handleMouseDown = (e: React.MouseEvent) => {
    if (introStage !== 'interactive' || !scrollRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    lastXRef.current = e.pageX;
    dragVelocityRef.current = 0;
    lastTimeRef.current = performance.now();
    startScrollRef.current = scrollRef.current.scrollLeft;
    setDraggedDistance(0);
    frictionScrollerRef.current.reset();
    scheduleFrameRef.current?.();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current || introStage !== 'interactive') return;
    e.preventDefault();
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = e.pageX - lastXRef.current;

    // Track fling velocity in pixels/ms
    dragVelocityRef.current = dx / dt;
    lastXRef.current = e.pageX;
    lastTimeRef.current = now;

    const walk = (e.pageX - startXRef.current) * 1.5;
    const newPos = startScrollRef.current - walk;

    scrollRef.current.scrollLeft = newPos;
    targetScrollRef.current = newPos;
    currentScrollRef.current = newPos;
    setDraggedDistance(Math.abs(walk));

    // Fast drag motions trigger immediate kinetic spring response
    if (Math.abs(dragVelocityRef.current) > 1.2) {
      frictionScrollerRef.current.addImpulse(-dx * 0.35);
    }
    scheduleFrameRef.current?.();
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Release with physical fling momentum
    const flingVelocity = -dragVelocityRef.current * 18;
    if (Math.abs(flingVelocity) > 2) {
      frictionScrollerRef.current.releaseFling(flingVelocity);
    }
    scheduleFrameRef.current?.();
  };

  const stopGalleryMotion = () => {
    isDraggingRef.current = false;
    dragVelocityRef.current = 0;
    frictionScrollerRef.current.reset();
    targetScrollRef.current = scrollRef.current?.scrollLeft ?? currentScrollRef.current;
    currentScrollRef.current = targetScrollRef.current;
  };

  const selectCase = (item: CaseStudy, idx: number, selectionKey: string) => {
    const media = mediaRefs.current[idx];
    if (!media) return;

    const rect = media.getBoundingClientRect();
    const video = media.querySelector('video');
    const image = media.querySelector('img');
    const src = video
      ? video.poster || item.coverPoster || item.coverImage
      : image?.currentSrc || item.coverPoster || item.coverImage;

    onSelectCase(item, selectionKey, {
      src,
      alt: item.title.replace('\n', ' '),
      rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
    });
  };

  const isIntroActive = introStage !== 'interactive';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-h-screen overflow-hidden flex flex-col justify-end pb-7 sm:pb-9 md:pb-10 pt-20 sm:pt-24 select-none transition-colors duration-700"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >


      {/* Main Infinite Horizontal Track - Never Ends! Bottom gap matches reference image */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        data-cursor="drag"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ willChange: 'transform, opacity' }}
        className={`w-full no-scrollbar px-4 sm:px-8 pt-2 sm:pt-3 items-stretch h-[75vh] sm:h-[78vh] md:h-[79vh] ${
          introStage === 'interactive'
            ? isTransitioning
              ? 'overflow-x-auto pointer-events-none'
              : 'overflow-x-auto cursor-grab active:cursor-grabbing'
            : 'overflow-hidden pointer-events-none'
        }`}
      >
        <div
          ref={trackRef}
          className="flex gap-2.5 sm:gap-3 items-stretch h-full transform-gpu"
          style={{
            willChange: 'transform, opacity',
            transformOrigin: 'center bottom',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
        {cases.length === 0 && (
          <div className="grid h-full w-full place-items-center px-6 text-center font-mono text-xs uppercase tracking-widest opacity-60">
            No projects are currently featured.
          </div>
        )}
        {infiniteCases.map((item, idx) => {
          const isHovered = hoveredIndex === idx;

          // Which set is this? (0: first clone, 1: middle primary set, 2: last clone)
          const setIndex = Math.floor(idx / cases.length);
          const itemIndexInSet = idx % cases.length;

          // Middle set offset for intro animation
          const isMiddleSet = setIndex === 1;
          const offsetX = isMiddleSet ? centerOffsets[itemIndexInSet] || 0 : 0;
          const isHeroCard = isMiddleSet && itemIndexInSet === 0;
          const selectionKey = `${item.id}-${idx}`;
          const isSelectedCard = selectionKey === transitionSelectionKey;

          // Left/Right split condition for middle set
          const isLeftGroup = itemIndexInSet < 3;
          const fanAngle = (itemIndexInSet - 2.5) * 4.2;

          // Compute Dynamic Transform Style based on Stage:
          let cardTransform = 'translate3d(0, 0, 0)';
          let cardOpacity = 1;
          let cardZIndex = 1;
          let cardTransition = 'none';

          if (introStage === 'measuring') {
            if (isHeroCard) {
              cardTransform = `translate3d(${centerOffsets[0] || 0}px, 0, 0)`;
            }
            cardOpacity = 0;
            cardTransition = 'none';
          } else if (introStage === 'shutter') {
            if (isHeroCard) {
              // The hero card is centered in the viewport and acts as the shutter canvas
              cardTransform = `translate3d(${centerOffsets[0] || 0}px, 0, 0)`;
              cardOpacity = 1;
              cardZIndex = 25;
            } else {
              cardTransform = isMiddleSet ? `translate3d(${offsetX}px, 0, 0)` : 'translate3d(0, 0, 0)';
              cardOpacity = 0;
              cardZIndex = 1;
            }
            cardTransition = 'none';
          } else if (introStage === 'morph' || introStage === 'dealing') {
            if (isHeroCard) {
              // The 4th shutter card ITSELF glides directly into the 1st portfolio card position!
              cardTransform = 'translate3d(0, 0, 0)';
              cardOpacity = 1;
              cardZIndex = 25;
              cardTransition = 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 220ms';
            } else {
              // Brandon Yasin deck deal sequence: right card deals first, then left, then center
              cardTransform = 'translate3d(0, 0, 0)';
              cardOpacity = 1;
              cardZIndex = 5;
              let dealDelay = 300;
              if (itemIndexInSet === 1) {
                dealDelay = 0; // Right card deals first
              } else if (itemIndexInSet === cases.length - 1 || itemIndexInSet === 2) {
                dealDelay = 140; // Left card deals second
              } else {
                dealDelay = Math.min(itemIndexInSet * 90 + 200, 520);
              }
              cardTransition = `transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${dealDelay}ms, opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${dealDelay}ms`;
            }
          } else {
            // Interactive state: physical spring engine directly updates vertical transforms at 60/120fps with zero CSS lag
            cardTransform = 'translate3d(0, 0, 0)';
            cardOpacity = 1;
            cardZIndex = 1;
            cardTransition = 'none';
          }

          return (
            <div
              key={`${item.id}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onMouseEnter={() => {
                if (!isIntroActive) setHoveredIndex(idx);
              }}
              onMouseLeave={() => {
                if (!isIntroActive) setHoveredIndex(null);
              }}
              onClick={() => {
                if (!isIntroActive && !isTransitioning && draggedDistance < 10) {
                  stopGalleryMotion();
                  selectCase(item, idx, selectionKey);
                }
              }}
              onKeyDown={(event) => {
                if (
                  !isIntroActive &&
                  !isTransitioning &&
                  draggedDistance < 10 &&
                  (event.key === 'Enter' || event.key === ' ')
                ) {
                  event.preventDefault();
                  stopGalleryMotion();
                  selectCase(item, idx, selectionKey);
                }
              }}
              role="button"
              data-cursor="view"
              tabIndex={isIntroActive || isTransitioning ? -1 : 0}
              aria-label={`Open ${item.title.replace('\n', ' ')} case study`}
              aria-disabled={isIntroActive || isTransitioning}
              style={{
                transform: cardTransform,
                transformOrigin: 'center bottom',
                opacity: cardOpacity,
                zIndex: isSelectedCard ? 20 : isHovered ? 10 : cardZIndex,
                clipPath:
                  isTransitioning && !isSelectedCard ? 'inset(0 0 100% 0)' : 'inset(0)',
                transition: isTransitioning
                  ? `clip-path 700ms cubic-bezier(${transitionEasing.join(', ')}) ${Math.min(itemIndexInSet * 20, 100)}ms`
                  : cardTransition,
                willChange: isTransitioning ? 'clip-path' : 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="group relative flex-shrink-0 w-[78vw] sm:w-[48vw] md:w-[35vw] lg:w-[26vw] max-w-[480px] h-full flex flex-col justify-between cursor-pointer transform-gpu select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C98A]"
            >
              {/* Subtle Upward Card Lift on Hover: smooth ease-in-out lift (6px to 8px) */}
              <div
                className={`w-full h-full flex flex-col justify-between transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform transform-gpu ${
                  isHovered && !isIntroActive ? '-translate-y-1.5 sm:-translate-y-2' : 'translate-y-0'
                }`}
              >
                {/* Only Project Title at the top - Exact replica of reference image */}
                <div
                  className="pb-2.5 font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.14em] uppercase truncate transition-colors duration-500"
                  style={{ color: theme.text }}
                >
                  <div className="relative overflow-hidden h-[16px]">
                    <div className="transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
                      <span>{item.title.replace('\n', ' ')}</span>
                    </div>
                    <div
                      className="absolute top-0 left-0 transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] translate-y-full group-hover:translate-y-0"
                      style={{ color: theme.isLight ? '#0B8A5A' : '#34EEA0' }}
                    >
                      <span>{item.title.replace('\n', ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Media Container extending directly down with 2px bottom gap - No zoom, clean lift & subtle accent glow */}
                <div
                  ref={(el) => {
                    mediaRefs.current[idx] = el;
                  }}
                  className={`relative w-full flex-1 overflow-hidden bg-[#16181e] transform-gpu transition-all duration-300 ${
                    isHovered && !isIntroActive ? 'ring-1 ring-[#18C98A]/35' : ''
                  }`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Shutter Blades running directly inside the 1st Hero Card */}
                  {isHeroCard && (introStage === 'shutter' || introStage === 'morph') && (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      {shutterFeaturedCases.map((shutterItem, stepIdx) => {
                        if (!shutterItem) return null;
                        const yPos = shutterPositions[stepIdx];
                        const duration = DROP_DURATIONS[stepIdx] || 400;
                        const easing = DROP_EASINGS[stepIdx] || 'cubic-bezier(0.22, 1, 0.36, 1)';

                        return (
                          <div
                            key={`shutter-blade-${stepIdx}`}
                            className="absolute inset-0 w-full h-full transform-gpu"
                            style={{
                              transform: `translate3d(0, ${yPos}%, 0)`,
                              transition: `transform ${duration}ms ${easing}`,
                              zIndex: stepIdx + 1,
                              willChange: 'transform, opacity',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                          >
                            {/* Subtle Shutter Slat Grooves */}
                            <div
                              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-400"
                              style={{
                                opacity: introStage === 'morph' ? 0 : 0.15,
                                backgroundImage:
                                  'repeating-linear-gradient(180deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 14px)',
                              }}
                            />

                            {/* Clean Cover Image */}
                            <img
                              src={shutterItem.coverPoster || shutterItem.coverImage}
                              alt={shutterItem.title}
                              className="w-full h-full object-cover"
                            />

                            {/* Leading Bottom Shutter Blade Edge with #18C98A glow */}
                            <div
                              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#18C98A] shadow-[0_0_12px_#18C98A] z-20 transition-opacity duration-300"
                              style={{
                                opacity: introStage === 'morph' ? 0 : 1,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {item.coverVideo ? (
                    <video
                      src={item.coverVideo}
                      poster={item.coverPoster || item.coverImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProgressiveImage
                      src={item.coverPoster || item.coverImage}
                      alt={item.title}
                      loading={idx < 6 ? "eager" : "lazy"}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Timeline scrubber: where you are in the loop. Click a tick to jump. */}
      {cases.length > 1 && (
        <div
          className="pointer-events-none absolute inset-x-4 sm:inset-x-8 bottom-1.5 sm:bottom-2.5 z-20 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ color: theme.text, opacity: introStage === 'interactive' && !isTransitioning ? 0.8 : 0 }}
        >
          <span ref={counterRef} className="w-14 shrink-0 tabular-nums">{`01 / ${pad(cases.length)}`}</span>
          <div className="relative h-5 flex-1">
            <div className="absolute inset-x-0 top-1/2 h-px opacity-25" style={{ backgroundColor: theme.text }} />
            {cases.map((item, index) => (
              <button
                key={item.id}
                type="button"
                tabIndex={-1}
                aria-label={`Go to ${item.title.replace('\n', ' ')}`}
                onClick={() => scrollToCase(index)}
                className="pointer-events-auto group/tick absolute top-0 h-5 w-5 -translate-x-1/2"
                style={{ left: `${((index + 0.5) / cases.length) * 100}%` }}
              >
                <span
                  className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 opacity-40 transition-[height,opacity] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/tick:h-4 group-hover/tick:opacity-100"
                  style={{ backgroundColor: theme.text }}
                />
              </button>
            ))}
            <div
              ref={playheadRef}
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#18C98A] shadow-[0_0_10px_#18C98A]"
              style={{ left: '0%' }}
            />
          </div>
          <span ref={titleRef} className="hidden sm:block w-48 shrink-0 truncate text-right" />
        </div>
      )}
    </div>
  );
};
