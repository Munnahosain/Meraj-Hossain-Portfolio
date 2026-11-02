import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CaseStudy, TimeTheme } from '../types';
import { FrictionScroller } from '../utils/frictionScroll';
import type { ProjectMotionEasing } from '../lib/project-motion';

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

type IntroStage = 'measuring' | 'shutter' | 'dealing' | 'interactive';

export const GalleryHome: React.FC<GalleryHomeProps> = ({
  cases,
  onSelectCase,
  isTransitioning = false,
  transitionSelectionKey = null,
  transitionEasing = [0.76, 0, 0.24, 1],
  theme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scheduleFrameRef = useRef<(() => void) | null>(null);

  // Infinite Cases Array (3 sets: 18 items total for endless circular repeat)
  const infiniteCases = React.useMemo(() => {
    return [...cases, ...cases, ...cases];
  }, [cases]);

  // Spring-based Friction Scroller with Progressive Velocity-Proportional Bounce
  // Olpo scroll = olpo bounce, beshi scroll = beshi bounce
  const frictionScrollerRef = useRef<FrictionScroller>(
    new FrictionScroller({
      friction: 0.928, // Controlled, responsive deceleration
      impulseFactor: 0.42,
      baseNotchImpulse: 9.2, // Gentle single wheel spin travels ~120px with virtually zero squish
      maxVelocity: 125,
      streakTimeoutMs: 195,
      streakRampStep: 0.28,
      maxStreakMultiplier: 3.2,
      spring: 'tactile',
    })
  );

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
  const [scaleProgress, setScaleProgress] = useState<number>(0.72);
  const [centerOffsets, setCenterOffsets] = useState<number[]>([]);

  // 5 Featured Images for the shutter effect
  const shutterFeaturedIndices = cases.slice(0, 5).map((_, index) => index);
  const [shutterPositions, setShutterPositions] = useState<number[]>([
    -105, -105, -105, -105, -105,
  ]);

  // Width of one full set of 6 cases
  const setBlockWidthRef = useRef<number>(0);

  // Measure center offsets for middle set (indices 6 to 11) relative to viewport center
  const calculateOffsets = useCallback(() => {
    if (!scrollRef.current) return;
    const viewportCenterX = window.innerWidth / 2;

    const firstCard = cardRefs.current[0];
    const middleCard0 = cardRefs.current[cases.length];
    if (firstCard && middleCard0) {
      setBlockWidthRef.current = middleCard0.offsetLeft - firstCard.offsetLeft;
    }

    const offsets = cases.map((_, i) => {
      const idx = cases.length + i;
      const el = cardRefs.current[idx];
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      return viewportCenterX - cardCenterX;
    });
    setCenterOffsets(offsets);
  }, [cases]);

  // Launch the 5-Image Roller Shutter + Left/Right Parting Deal Animation
  const startDeckIntro = useCallback(() => {
    setIntroStage('measuring');
    setScaleProgress(0.72);
    setShutterPositions([-105, -105, -105, -105, -105]);
    frictionScrollerRef.current.reset();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      calculateOffsets();
      const blockWidth = setBlockWidthRef.current;
      if (scrollRef.current && blockWidth > 0) {
        scrollRef.current.scrollLeft = blockWidth;
        targetScrollRef.current = blockWidth;
        currentScrollRef.current = blockWidth;
      }
      setShutterPositions([0, 0, 0, 0, 0]);
      setScaleProgress(1);
      setIntroStage('interactive');
      return;
    }

    if (scrollRef.current && setBlockWidthRef.current > 0) {
      scrollRef.current.scrollLeft = setBlockWidthRef.current;
      targetScrollRef.current = setBlockWidthRef.current;
      currentScrollRef.current = setBlockWidthRef.current;
    }

    setTimeout(() => {
      calculateOffsets();

      if (scrollRef.current && setBlockWidthRef.current > 0) {
        scrollRef.current.scrollLeft = setBlockWidthRef.current;
        targetScrollRef.current = setBlockWidthRef.current;
        currentScrollRef.current = setBlockWidthRef.current;
      }

      setIntroStage('shutter');

      // Drop 1: 1st shutter image rolls down from top (0ms)
      setShutterPositions([0, -105, -105, -105, -105]);
      setScaleProgress(0.76);

      // Drop 2: 2nd shutter image rolls down (280ms)
      setTimeout(() => {
        setShutterPositions([0, 0, -105, -105, -105]);
        setScaleProgress(0.82);
      }, 280);

      // Drop 3: 3rd shutter image rolls down (560ms)
      setTimeout(() => {
        setShutterPositions([0, 0, 0, -105, -105]);
        setScaleProgress(0.88);
      }, 560);

      // Drop 4: 4th shutter image rolls down (840ms)
      setTimeout(() => {
        setShutterPositions([0, 0, 0, 0, -105]);
        setScaleProgress(0.94);
      }, 840);

      // Drop 5: 5th (LAST) shutter image rolls down (1120ms)
      setTimeout(() => {
        setShutterPositions([0, 0, 0, 0, 0]);
        setScaleProgress(1.0);
      }, 1120);

      // Step 3: Earlier images slide left, last images slide right (1500ms)
      setTimeout(() => {
        setIntroStage('dealing');

        // Step 4: After dealing finishes, unlock interactive infinite gallery (2550ms)
        setTimeout(() => {
          setIntroStage('interactive');
        }, 1050);
      }, 1500);
    }, 50);
  }, [calculateOffsets]);

  // Initial trigger on mount
  useEffect(() => {
    startDeckIntro();
    window.addEventListener('resize', calculateOffsets);
    return () => window.removeEventListener('resize', calculateOffsets);
  }, [startDeckIntro, calculateOffsets]);

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
      const dt = now - lastTime;
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

      // Drive physical spring scale purely on the vertical axis onto card DOM nodes.
      const scaleVal = physics.dynamicScale;
      const cards = cardRefs.current;
      for (let i = 0; i < cards.length; i++) {
        const cardEl = cards[i];
        if (cardEl) {
          cardEl.style.transform = `translate3d(0, 0, 0) scale(1, ${scaleVal})`;
          cardEl.style.transformOrigin = 'center bottom';
        }
      }

      const setWidth = setBlockWidthRef.current;
      if (setWidth > 0 && !isDraggingRef.current) {
        if (currentScrollRef.current >= 2 * setWidth) {
          currentScrollRef.current -= setWidth;
          targetScrollRef.current -= setWidth;
          scrollElement.scrollLeft -= setWidth;
        } else if (currentScrollRef.current <= 0.5 * setWidth) {
          currentScrollRef.current += setWidth;
          targetScrollRef.current += setWidth;
          scrollElement.scrollLeft += setWidth;
        }
      }

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
  }, [introStage, isTransitioning]);

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
      {/* Central Shop Roller Shutter Drop Overlay during Shutter Phase (5 Images) */}
      {introStage === 'shutter' && (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div
            className="relative w-[78vw] sm:w-[48vw] md:w-[35vw] lg:w-[26vw] max-w-[480px] h-[74vh] sm:h-[77vh] md:h-[78vh] overflow-hidden border border-[#18C98A]/25 transition-transform duration-500 ease-out"
            style={{
              backgroundColor: theme.surface,
              transform: `scale(${scaleProgress})`,
            }}
          >
            {shutterFeaturedIndices.map((caseIdx, stepIdx) => {
              const item = cases[caseIdx];
              if (!item) return null;
              const yPos = shutterPositions[stepIdx];

              return (
                <div
                  key={caseIdx}
                  className="absolute inset-0 w-full h-full will-change-transform"
                  style={{
                    transform: `translate3d(0, ${yPos}%, 0)`,
                    transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                    zIndex: stepIdx + 1,
                  }}
                >
                  {/* Subtle Shutter Slat Grooves */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-15 z-10"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(180deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 14px)',
                    }}
                  />

                  {/* Clean Cover Image */}
                  <img
                    src={item.coverPoster || item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Leading Bottom Shutter Blade Edge with #18C98A glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#18C98A] shadow-[0_0_12px_#18C98A] z-20" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Infinite Horizontal Track - Never Ends! Bottom gap matches reference image */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full no-scrollbar flex gap-2.5 sm:gap-3 px-4 sm:px-8 pt-2 sm:pt-3 items-stretch h-[75vh] sm:h-[78vh] md:h-[79vh] ${
          introStage === 'interactive'
            ? isTransitioning
              ? 'overflow-x-auto pointer-events-none'
              : 'overflow-x-auto cursor-grab active:cursor-grabbing'
            : 'overflow-hidden pointer-events-none'
        }`}
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
          const selectionKey = `${item.id}-${idx}`;
          const isSelectedCard = selectionKey === transitionSelectionKey;

          // Left/Right split condition for middle set
          const isLeftGroup = itemIndexInSet < 3;
          const fanAngle = (itemIndexInSet - 2.5) * 4.2;

          // Compute Dynamic Transform Style based on Stage:
          let cardTransform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
          let cardOpacity = 1;
          let cardZIndex = 1;
          let cardTransition = 'none';

          if (introStage === 'measuring' || introStage === 'shutter') {
            if (isMiddleSet) {
              cardTransform = `translate3d(${offsetX}px, 0, 0) scale(${scaleProgress}) rotate(${fanAngle * 0.15}deg)`;
              cardOpacity = 0;
              cardZIndex = 5;
            } else {
              cardOpacity = 0;
            }
            cardTransition = 'none';
          } else if (introStage === 'dealing') {
            cardTransform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
            cardOpacity = 1;
            cardZIndex = 5;
            const delay = Math.abs(itemIndexInSet - (isLeftGroup ? 2 : 3)) * 65;
            cardTransition = `transform 980ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 600ms ease ${delay}ms`;
          } else {
            // Interactive state: physical spring engine directly updates vertical transforms at 60/120fps with zero CSS lag
            cardTransform = 'translate3d(0, 0, 0) scale(1, 1)';
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
              }}
              className="group relative flex-shrink-0 w-[78vw] sm:w-[48vw] md:w-[35vw] lg:w-[26vw] max-w-[480px] h-full flex flex-col justify-between cursor-pointer transform-gpu select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C98A]"
            >
              {/* Subtle Upward Card Lift on Hover: halka ekto upore uthbe (6px to 8px) without zooming image/video */}
              <div
                className={`w-full h-full flex flex-col justify-between transition-transform duration-300 ease-out will-change-transform transform-gpu ${
                  isHovered && !isIntroActive ? '-translate-y-1.5 sm:-translate-y-2' : 'translate-y-0'
                }`}
              >
                {/* Only Project Title at the top - Exact replica of reference image */}
                <div
                  className="pb-2.5 font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.14em] uppercase truncate transition-colors duration-500"
                  style={{ color: theme.text }}
                >
                  <div className="relative overflow-hidden h-[16px]">
                    <div className="transition-transform duration-300 group-hover:-translate-y-full">
                      <span>{item.title.replace('\n', ' ')}</span>
                    </div>
                    <div
                      className="absolute top-0 left-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0"
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
                >
                  {item.coverVideo ? (
                    <video
                      src={item.coverVideo}
                      poster={item.coverPoster || item.coverImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      ref={(videoEl) => {
                        if (videoEl && videoEl.paused) {
                          videoEl.play().catch(() => {});
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.coverPoster || item.coverImage}
                      alt={item.title}
                      loading={idx < 6 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
