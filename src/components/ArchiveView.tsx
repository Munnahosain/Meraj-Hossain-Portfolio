import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHIVE_ITEMS } from '../data/portfolioData';
import { ArchiveItem, TimeTheme } from '../types';
import { X, Maximize2 } from 'lucide-react';
import {
  MotionButton,
  MotionCard,
  MotionModalBackdrop,
  MotionModalContent,
} from './motion/MotionPrimitives';
import { motionTokens } from '../lib/motion';

interface ArchiveViewProps {
  theme: TimeTheme;
  items?: ArchiveItem[];
}

const ARCHIVE_BACKGROUND = '#e5e2da';
const ARCHIVE_FOREGROUND = '#171717';

export const ArchiveView: React.FC<ArchiveViewProps> = ({ theme, items = ARCHIVE_ITEMS }) => {
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<ArchiveItem | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mediaRatios, setMediaRatios] = useState<Record<string, number>>({});
  const [viewportHeight, setViewportHeight] = useState(900);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardHeight = Math.max(240, Math.min(viewportHeight * 0.43, 680));

  const setMediaRatio = (id: string, width: number, height: number) => {
    if (!width || !height) return;
    setMediaRatios((current) => ({ ...current, [id]: width / height }));
  };

  // Track mouse coordinates for floating preview card
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  // Keyboard escape for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeItem) {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeItem]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleWheel = (e: WheelEvent) => {
      const strip = scrollRef.current;
      if (!strip || strip.scrollWidth <= strip.clientWidth) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      e.preventDefault();
      strip.scrollLeft += delta;
    };

    root.addEventListener('wheel', handleWheel, { passive: false });
    return () => root.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="relative h-full min-h-0 w-full overflow-hidden px-5 pb-[3vh] pt-28 transition-colors duration-700 sm:pt-[clamp(10rem,18vh,16rem)]"
      style={{
        backgroundColor: ARCHIVE_BACKGROUND,
        color: ARCHIVE_FOREGROUND,
      }}
    >
      <div className="flex h-full w-full flex-col">
        {/* Archive Title Bar */}
        <div className="grid shrink-0 grid-cols-1 items-center gap-6 md:grid-cols-[56.6%_1fr]">
          <div>
            <h1
              className="font-sans text-[clamp(7rem,6.5vw,14rem)] font-light leading-[0.82] tracking-[-0.05em] transition-colors duration-500"
              style={{ color: ARCHIVE_FOREGROUND }}
            >
              archive
            </h1>
          </div>

          <div className="flex flex-col items-start">
            <div
              className="font-sans text-base tracking-[0.04em] uppercase leading-[1.2]"
              style={{ color: ARCHIVE_FOREGROUND }}
            >
              A curated selection<br />
              of motion & visual explorations<br />
              <span>2016—2026</span>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label="Archive projects. Scroll horizontally to explore."
          className="mt-[clamp(11rem,35vh,23.5rem)] flex w-full shrink-0 select-none gap-[9px] overflow-x-auto overscroll-x-contain py-3 no-scrollbar focus-visible:outline focus-visible:outline-1"
          style={{ outlineColor: theme.accent }}
        >
            {items.map((item, index) => (
              <MotionCard
                key={item.id}
                onClick={() => setActiveItem(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                delay={Math.min(index * motionTokens.stagger.tight, motionTokens.stagger.maximum)}
                inView
                once
                amount={0.2}
                lift={8}
                className="group flex flex-shrink-0 cursor-pointer flex-col justify-between"
                style={{
                  width: `${Math.round(cardHeight * (mediaRatios[item.id] || 0.8))}px`,
                }}
              >
                <div
                  className="relative w-full overflow-hidden border shadow-none"
                  style={{
                    height: `${cardHeight}px`,
                    backgroundColor: ARCHIVE_BACKGROUND,
                    borderColor: `${ARCHIVE_FOREGROUND}1a`,
                  }}
                >
                  {item.type === 'video' ? (
                    <motion.video
                      layoutId={`archive-media-${item.id}`}
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedMetadata={(event) =>
                        setMediaRatio(item.id, event.currentTarget.videoWidth, event.currentTarget.videoHeight)
                      }
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <motion.img
                      layoutId={`archive-media-${item.id}`}
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      onLoad={(event) =>
                        setMediaRatio(item.id, event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)
                      }
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  )}

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 motion-transition-opacity flex items-center justify-center"
                    style={{ backgroundColor: `${theme.bg}80` }}
                  >
                    <span
                      className="p-3 rounded-full border backdrop-blur-md"
                      style={{
                        backgroundColor: `${theme.bg}cc`,
                        borderColor: `${theme.accent}66`,
                        color: theme.accent,
                      }}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div
                  className="pt-3 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase"
                style={{ color: ARCHIVE_FOREGROUND }}
                >
                  <span className="truncate pr-2 font-medium motion-transition-colors group-hover:text-[var(--primary)]">
                    {item.title}
                  </span>
                  <span style={{ color: theme.accent }}>{item.number}</span>
                </div>
                <div
                  className="text-[10px] font-mono tracking-wider uppercase truncate"
                  style={{ color: theme.textMuted }}
                >
                  {item.category} · {item.year}
                </div>
              </MotionCard>
            ))}
        </div>
      </div>

      {/* Floating Cursor Media Preview on Desktop */}
      <AnimatePresence>
        {hoveredItem && !activeItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPos.x + 18,
              y: cursorPos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-0 left-0 pointer-events-none z-50 hidden xl:block w-48 overflow-hidden border backdrop-blur-md p-2 shadow-2xl"
            style={{
              borderColor: `${theme.accent}66`,
              backgroundColor: `${theme.bg}e6`,
            }}
          >
            <div className="w-full h-28 overflow-hidden mb-2" style={{ backgroundColor: theme.surface }}>
              {hoveredItem.type === 'video' ? (
                <video
                  src={hoveredItem.src}
                  poster={hoveredItem.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={hoveredItem.src}
                  alt={hoveredItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div
              className="text-[10px] font-mono tracking-widest uppercase truncate"
              style={{ color: theme.text }}
            >
              {hoveredItem.title}
            </div>
            <div className="text-[9px] font-mono uppercase" style={{ color: theme.accent }}>
              {hoveredItem.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      {createPortal(
        <AnimatePresence>
          {activeItem && (
            <MotionModalBackdrop
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 backdrop-blur-xl"
              style={{ backgroundColor: `${theme.bg}f2` }}
              onClick={() => setActiveItem(null)}
            >
              <MotionButton
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full border motion-transition-colors cursor-pointer z-10"
                style={{
                  borderColor: `${theme.text}33`,
                  color: theme.text,
                }}
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </MotionButton>

              <MotionModalContent
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden border"
                style={{
                  borderColor: `${theme.accent}4d`,
                  backgroundColor: theme.surface,
                }}
              >
                <div className="w-full flex-1 overflow-hidden bg-black flex items-center justify-center">
                  {activeItem.type === 'video' ? (
                    <motion.video
                      layoutId={`archive-media-${activeItem.id}`}
                      src={activeItem.src}
                      poster={activeItem.poster}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="max-h-[70vh] w-full object-contain"
                    />
                  ) : (
                    <motion.img
                      layoutId={`archive-media-${activeItem.id}`}
                      src={activeItem.src}
                      alt={activeItem.title}
                      className="max-h-[70vh] w-full object-contain"
                    />
                  )}
                </div>

                <div
                  className="p-5 flex items-center justify-between border-t"
                  style={{
                    borderColor: `${theme.text}1a`,
                    backgroundColor: theme.bg,
                  }}
                >
                  <div>
                    <h3 className="text-lg font-sans" style={{ color: theme.text }}>
                      {activeItem.title}
                    </h3>
                    <div
                      className="text-[11px] font-mono tracking-widest uppercase"
                      style={{ color: theme.textMuted }}
                    >
                      {activeItem.category} · {activeItem.year}
                    </div>
                  </div>
                  <div className="font-mono text-sm" style={{ color: theme.accent }}>
                    {activeItem.number}
                  </div>
                </div>
              </MotionModalContent>
            </MotionModalBackdrop>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};
