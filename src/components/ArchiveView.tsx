import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ARCHIVE_ITEMS } from '../data/portfolioData';
import { ArchiveItem, TimeTheme } from '../types';
import { Volume2, VolumeX, X } from 'lucide-react';
import { ProgressiveImage } from './motion/ProgressiveImage';
import { FrictionScroller } from '../utils/frictionScroll';

interface ArchiveViewProps {
  theme: TimeTheme;
  items?: ArchiveItem[];
}

// Intrinsic ratios for archive media
const DEFAULT_RATIOS: Record<string, number> = {
  'arch-1': 0.66, // Mirror room (portrait)
  'arch-2': 0.84, // Sunflower vase (portrait/square)
  'arch-7': 1.0, // Folded paper packaging box (square)
  'arch-bestseller': 1.36, // Bestseller Spring installation (wide landscape)
  'arch-copenhagen': 0.76, // Copenhagen Fashion Week garment rack (portrait)
  'arch-6': 1.0, // Chrome 30 installation (square)
};

export const ArchiveView: React.FC<ArchiveViewProps> = ({ theme, items = ARCHIVE_ITEMS }) => {
  // Use what the admin published; only fall back to the built-in set when there is nothing.
  // Short lists are repeated so the looping track is always wider than the viewport.
  const archiveItems = React.useMemo(() => {
    const base = items && items.length > 0 ? items : ARCHIVE_ITEMS;
    const out: ArchiveItem[] = [];
    while (out.length < 8) out.push(...base);
    return out;
  }, [items]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [mediaRatios, setMediaRatios] = useState<Record<string, number>>(DEFAULT_RATIOS);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900
  );
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scheduleFrameRef = useRef<(() => void) | null>(null);

  // Normal bottom strip height (~44% of viewport height)
  const stripHeight = Math.max(260, Math.min(viewportHeight * 0.44, 460));

  // Expanded hero card height: extends up to just below header/signature (exact match to image_2e70c37f.png)
  const expandedHeight = Math.max(stripHeight, viewportHeight - 56);

  const handleMediaLoad = (id: string, width: number, height: number) => {
    if (!width || !height) return;
    setMediaRatios((prev) => ({
      ...prev,
      [id]: width / height,
    }));
  };

  // Cloned sets for circular momentum loop
  const infiniteItems = React.useMemo(() => {
    return [...archiveItems, ...archiveItems, ...archiveItems];
  }, [archiveItems]);

  const frictionScrollerRef = useRef<FrictionScroller>(
    new FrictionScroller({
      friction: 0.928,
      impulseFactor: 0.42,
      baseNotchImpulse: 9.2,
      maxVelocity: 125,
      streakTimeoutMs: 195,
      streakRampStep: 0.28,
      maxStreakMultiplier: 3.2,
      spring: 'tactile',
    })
  );

  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const [draggedDistance, setDraggedDistance] = useState(0);

  const setBlockWidthRef = useRef<number>(0);

  const calculateOffsets = useCallback(() => {
    if (!scrollRef.current) return;
    const firstCard = cardRefs.current[0];
    const middleCard0 = cardRefs.current[archiveItems.length];
    if (firstCard && middleCard0) {
      setBlockWidthRef.current = middleCard0.offsetLeft - firstCard.offsetLeft;
    }
  }, [archiveItems.length]);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
      calculateOffsets();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      calculateOffsets();
      const blockWidth = setBlockWidthRef.current;
      if (scrollRef.current && blockWidth > 0) {
        scrollRef.current.scrollLeft = blockWidth;
        targetScrollRef.current = blockWidth;
        currentScrollRef.current = blockWidth;
      }
    }, 60);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateOffsets]);

  // Center an item smoothly in viewport (used for arrow keys)
  const centerCard = useCallback(
    (idx: number) => {
      const scrollEl = scrollRef.current;
      const cardEl = cardRefs.current[idx];
      if (!scrollEl || !cardEl) return;

      const item = infiniteItems[idx];
      const ratio = mediaRatios[item.id] || DEFAULT_RATIOS[item.id] || 0.8;
      const targetCardWidth = Math.round(
        Math.min(expandedHeight * ratio, viewportWidth * 0.88)
      );
      const vWidth = scrollEl.clientWidth;

      // Card offset relative to the track
      const cardLeft = cardEl.offsetLeft;
      const targetScroll = cardLeft - (vWidth - targetCardWidth) / 2;

      targetScrollRef.current = Math.max(0, targetScroll);
      scheduleFrameRef.current?.();
    },
    [expandedHeight, infiniteItems, mediaRatios, viewportWidth]
  );

  // In-place card click handler: expands right where the user clicked without jumping positions
  const handleCardClick = (idx: number, e: React.MouseEvent) => {
    if (draggedDistance >= 10) return;
    e.stopPropagation();

    if (expandedIndex === idx) {
      // Collapse in-place
      setExpandedIndex(null);
      return;
    }

    const prevExpanded = expandedIndex;
    const cardEl = cardRefs.current[idx];
    const scrollEl = scrollRef.current;

    setExpandedIndex(idx);

    if (cardEl && scrollEl) {
      const item = infiniteItems[idx];
      const ratio = mediaRatios[item.id] || DEFAULT_RATIOS[item.id] || 0.8;
      const targetWidth = Math.round(
        Math.min(expandedHeight * ratio, viewportWidth * 0.88)
      );

      // If a card to the left was previously expanded, compensate for its collapse
      // so this card stays locked at the exact same screen X position with 0 jump
      if (prevExpanded !== null && prevExpanded < idx) {
        const prevItem = infiniteItems[prevExpanded];
        const prevRatio = mediaRatios[prevItem.id] || DEFAULT_RATIOS[prevItem.id] || 0.8;
        const prevTargetWidth = Math.round(
          Math.min(expandedHeight * prevRatio, viewportWidth * 0.88)
        );
        const prevNormalWidth = Math.round(stripHeight * prevRatio);
        const widthShrinkage = prevTargetWidth - prevNormalWidth;

        scrollEl.scrollLeft -= widthShrinkage;
        currentScrollRef.current -= widthShrinkage;
        targetScrollRef.current -= widthShrinkage;
      }

      // Check if expanding the card in-place would exceed the screen bounds
      const cardRect = cardEl.getBoundingClientRect();
      const margin = 24;

      if (cardRect.left < margin) {
        // Gently bring left edge into view
        const underflow = margin - cardRect.left;
        targetScrollRef.current = Math.max(0, targetScrollRef.current - underflow);
        scheduleFrameRef.current?.();
      } else if (cardRect.left + targetWidth > viewportWidth - margin) {
        // Gently bring right edge into view
        const overflow = cardRect.left + targetWidth - (viewportWidth - margin);
        targetScrollRef.current += overflow;
        scheduleFrameRef.current?.();
      }
    }
  };

  // High-performance smooth momentum loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
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

      // Vertical spring squish dynamic scale
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0, 0, 0) scale(1, ${physics.dynamicScale})`;
      }

      const setWidth = setBlockWidthRef.current;
      // Only do circular boundary wrap when no card is actively expanded
      if (setWidth > 0 && !isDraggingRef.current && expandedIndex === null) {
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

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) delta *= 33;
      else if (e.deltaMode === 2) delta *= 400;

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
  }, [expandedIndex]);

  // Touch / native scrolling moves scrollLeft outside the physics loop; adopt it so
  // the next wheel or drag doesn't snap back to a stale position.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || isDraggingRef.current) return;
    if (Math.abs(el.scrollLeft - currentScrollRef.current) > 2) {
      currentScrollRef.current = el.scrollLeft;
      targetScrollRef.current = el.scrollLeft;
      frictionScrollerRef.current.reset();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
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
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = e.pageX - lastXRef.current;

    dragVelocityRef.current = dx / dt;
    lastXRef.current = e.pageX;
    lastTimeRef.current = now;

    const walk = (e.pageX - startXRef.current) * 1.5;
    const newPos = startScrollRef.current - walk;

    scrollRef.current.scrollLeft = newPos;
    targetScrollRef.current = newPos;
    currentScrollRef.current = newPos;
    setDraggedDistance(Math.abs(walk));

    if (Math.abs(dragVelocityRef.current) > 1.2) {
      frictionScrollerRef.current.addImpulse(-dx * 0.35);
    }
    scheduleFrameRef.current?.();
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const flingVelocity = -dragVelocityRef.current * 18;
    if (Math.abs(flingVelocity) > 2) {
      frictionScrollerRef.current.releaseFling(flingVelocity);
    }
    scheduleFrameRef.current?.();
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (expandedIndex === null) return;
      if (e.key === 'Escape') {
        setExpandedIndex(null);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (expandedIndex + 1) % infiniteItems.length;
        setExpandedIndex(nextIdx);
        centerCard(nextIdx);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (expandedIndex - 1 + infiniteItems.length) % infiniteItems.length;
        setExpandedIndex(prevIdx);
        centerCard(prevIdx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandedIndex, infiniteItems.length, centerCard]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-h-screen overflow-hidden select-none"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {/* ========================================================
          TITLE ROW (Exact match to Brandon Yasin reference image)
          - Left column: Giant lowercase "archive"
          - Right column (aligned at 56.6% with MENU/CONTACT):
            A CURATED SELECTION
            OF WORK & EXPLORATIONS
            2016—2026
          - Sits in background layer (z-0)
          ======================================================== */}
      <div className="absolute top-0 left-0 right-0 z-0 pt-[clamp(5.5rem,13vh,10.5rem)] px-6 sm:px-10 lg:px-12 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-[56.6%_1fr] items-start w-full">
          {/* Left Column: archive */}
          <div>
            <h1
              className="font-sans text-[clamp(4.5rem,9.5vw,12rem)] font-light leading-[0.82] tracking-[-0.05em] transition-colors duration-500"
              style={{ color: theme.text }}
            >
              archive
            </h1>
          </div>

          {/* Right Column: aligned with MENU/CONTACT column */}
          <div className="flex flex-col justify-start pt-2 sm:pt-4">
            <div
              className="font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.06em] uppercase leading-[1.38] transition-colors duration-500"
              style={{ color: theme.text }}
            >
              A CURATED SELECTION<br />
              OF WORK &amp; EXPLORATIONS<br />
              <span className="mt-3.5 block font-sans tracking-[0.06em]">2016—2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          BOTTOM GALLERY STRIP WITH INLINE HERO CARD EXPANSION
          - Spans the viewport height so expanding cards can reach
            all the way up below the header/signature (exact match to image_2e70c37f.png)
          - Items aligned to bottom baseline (`items-end`)
          - Normal height: stripHeight (~44% of viewport)
          - Clicked card height: expandedHeight (~viewportHeight - 56px)
          - Smooth in-out transitions: cubic-bezier(0.65, 0, 0.35, 1)
          - In-place expansion: does NOT jump sideways when clicked
          - Clicking an expanded card shrinks it back to normal
          - Clicking another card expands the new one smoothly
          ======================================================== */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-end overflow-hidden"
        onClick={(e) => {
          // Clicking empty background collapses expanded card
          if (e.target === e.currentTarget && draggedDistance < 8) {
            setExpandedIndex(null);
          }
        }}
      >
        <div
          ref={scrollRef}
          data-cursor="drag"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          tabIndex={0}
          aria-label="Archive explorations gallery. Drag or scroll horizontally to explore. Click any card to expand."
          className="w-full h-full no-scrollbar px-6 sm:px-10 lg:px-12 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing focus-visible:outline-none"
        >
          <div
            ref={trackRef}
            className="flex gap-[9px] items-end h-full pb-3 sm:pb-4 transform-gpu"
            style={{ willChange: 'transform', transformOrigin: 'center bottom' }}
          >
            {infiniteItems.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              const ratio = mediaRatios[item.id] || DEFAULT_RATIOS[item.id] || 0.8;
              const cardWidth = Math.round(stripHeight * ratio);
              const cardExpandedWidth = Math.round(
                Math.min(expandedHeight * ratio, viewportWidth * 0.88)
              );

              const currentWidth = isExpanded ? cardExpandedWidth : cardWidth;
              const currentHeight = isExpanded ? expandedHeight : stripHeight;
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={(e) => handleCardClick(idx, e)}
                  role="button"
                  data-cursor={isExpanded ? 'close' : 'open'}
                  tabIndex={0}
                  aria-label={
                    isExpanded
                      ? `${item.title} (expanded). Click to minimize.`
                      : `Expand ${item.title}`
                  }
                  title={isExpanded ? 'Click to minimize' : `${item.title}`}
                  style={{
                    width: `${currentWidth}px`,
                    height: `${currentHeight}px`,
                    // No width tween until the real ratio is known, so cards don't jump on first load.
                    transition: mediaRatios[item.id]
                      ? 'width 650ms cubic-bezier(0.65, 0, 0.35, 1), height 650ms cubic-bezier(0.65, 0, 0.35, 1)'
                      : 'height 650ms cubic-bezier(0.65, 0, 0.35, 1)',
                    willChange: 'width, height',
                  }}
                  className={`group relative flex-shrink-0 overflow-hidden select-none bg-black transform-gpu ${
                    isExpanded ? 'cursor-zoom-out z-20' : 'cursor-pointer hover:opacity-95'
                  }`}
                >
                  {/* Media Content */}
                  {item.type === 'video' && (isExpanded || isHovered) ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <ProgressiveImage
                      src={item.poster || item.src}
                      alt={item.title}
                      loading={idx < 10 ? 'eager' : 'lazy'}
                      onLoad={(e) => {
                        handleMediaLoad(
                          item.id,
                          e.currentTarget.naturalWidth,
                          e.currentTarget.naturalHeight
                        );
                      }}
                      className="pointer-events-none"
                    />
                  )}

                  {/* Caption: slides up on hover, always visible when expanded */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                      isExpanded || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}
                  >
                    <span className="block truncate font-mono text-[10px] uppercase tracking-[0.18em]">
                      {item.title}
                    </span>
                  </div>

                  {isExpanded && (
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedIndex(null);
                      }}
                      className="absolute right-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/55 text-white/90 backdrop-blur-md transition-colors duration-300 hover:bg-black/75 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  {/* Audio Mute/Unmute Toggle Button when expanded video */}
                  {isExpanded && item.type === 'video' && (
                    <div
                      className="absolute bottom-4 right-4 z-30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted((m) => !m);
                        }}
                        className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white border border-white/10 transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
