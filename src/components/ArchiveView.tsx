import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHIVE_ITEMS } from '../data/portfolioData';
import { ArchiveItem, TimeTheme } from '../types';
import { Grid, Columns, X, Maximize2 } from 'lucide-react';
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

export const ArchiveView: React.FC<ArchiveViewProps> = ({ theme, items = ARCHIVE_ITEMS }) => {
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<ArchiveItem | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'horizontal' | 'grid'>('horizontal');
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen pt-28 sm:pt-36 pb-20 transition-colors duration-700 overflow-x-hidden"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12">
        {/* Archive Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#18C98A]/15">
          <div>
            <h1
              className="text-6xl sm:text-8xl font-sans font-light tracking-tight leading-none transition-colors duration-500"
              style={{ color: theme.text }}
            >
              archive
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12">
            <div className="font-mono text-[11px] tracking-widest uppercase leading-relaxed text-[#8e9693]">
              A curated selection<br />
              of motion & visual explorations<br />
              <span className="text-[#18C98A]">2016—2026</span>
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded border border-[#18C98A]/20 bg-[#16181e] backdrop-blur-sm self-start sm:self-auto">
              <MotionButton
                onClick={() => setViewMode('horizontal')}
                className={`p-1.5 rounded motion-transition-colors cursor-pointer ${
                  viewMode === 'horizontal'
                    ? 'bg-[#18C98A] text-[#101114]'
                    : 'text-[#8e9693] hover:text-[#f2f4f3]'
                }`}
                title="Filmstrip View"
              >
                <Columns className="w-4 h-4" />
              </MotionButton>
              <MotionButton
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded motion-transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#18C98A] text-[#101114]'
                    : 'text-[#8e9693] hover:text-[#f2f4f3]'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </MotionButton>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        {viewMode === 'horizontal' ? (
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto no-scrollbar flex gap-6 sm:gap-8 py-12 select-none"
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
                className="group flex-shrink-0 w-[75vw] sm:w-[42vw] md:w-[32vw] lg:w-[24vw] max-w-[400px] flex flex-col justify-between cursor-pointer"
              >
                <div className="relative w-full h-[380px] sm:h-[460px] overflow-hidden rounded-none bg-[#16181e] border border-[#18C98A]/15 group-hover:border-[#18C98A]/40 shadow-none">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-[#101114]/50 opacity-0 group-hover:opacity-100 motion-transition-opacity flex items-center justify-center">
                    <span className="p-3 rounded-full bg-[#101114]/80 border border-[#18C98A]/40 text-[#18C98A] backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#f2f4f3]">
                  <span className="truncate pr-2 font-medium group-hover:text-[#18C98A] motion-transition-colors">{item.title}</span>
                  <span className="text-[#18C98A]">{item.number}</span>
                </div>
                <div className="text-[10px] font-mono tracking-wider text-[#8e9693] uppercase truncate">
                  {item.category} · {item.year}
                </div>
              </MotionCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 py-12">
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
                className="group flex flex-col justify-between cursor-pointer"
              >
                <div className="relative w-full h-[340px] overflow-hidden rounded-none bg-[#16181e] border border-[#18C98A]/15 group-hover:border-[#18C98A]/40 shadow-none">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-[#101114]/50 opacity-0 group-hover:opacity-100 motion-transition-opacity flex items-center justify-center">
                    <span className="p-3 rounded-full bg-[#101114]/80 border border-[#18C98A]/40 text-[#18C98A] backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#f2f4f3]">
                  <span className="truncate pr-2 font-medium group-hover:text-[#18C98A] motion-transition-colors">{item.title}</span>
                  <span className="text-[#18C98A]">{item.number}</span>
                </div>
                <div className="text-[10px] font-mono tracking-wider text-[#8e9693] uppercase truncate">
                  {item.category} · {item.year}
                </div>
              </MotionCard>
            ))}
          </div>
        )}
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
            className="fixed top-0 left-0 pointer-events-none z-50 hidden xl:block w-48 overflow-hidden rounded border border-[#18C98A]/40 bg-[#101114]/90 backdrop-blur-md p-2 shadow-2xl"
          >
            <div className="w-full h-28 overflow-hidden rounded-sm bg-black/50 mb-2">
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
            <div className="text-[10px] font-mono tracking-widest uppercase text-white truncate">
              {hoveredItem.title}
            </div>
            <div className="text-[9px] font-mono text-[#18C98A] uppercase">
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
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 bg-[#101114]/95 backdrop-blur-xl"
              onClick={() => setActiveItem(null)}
            >
              <MotionButton
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#18C98A] motion-transition-colors cursor-pointer z-10"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </MotionButton>

              <MotionModalContent
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden rounded border border-[#18C98A]/30 bg-[#16181e]"
              >
                <div className="w-full flex-1 overflow-hidden bg-black flex items-center justify-center">
                  {activeItem.type === 'video' ? (
                    <video
                      src={activeItem.src}
                      poster={activeItem.poster}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="max-h-[70vh] w-full object-contain"
                    />
                  ) : (
                    <img
                      src={activeItem.src}
                      alt={activeItem.title}
                      className="max-h-[70vh] w-full object-contain"
                    />
                  )}
                </div>

                <div className="p-5 flex items-center justify-between border-t border-white/10 bg-[#121419]">
                  <div>
                    <h3 className="text-lg font-sans text-white">{activeItem.title}</h3>
                    <div className="text-[11px] font-mono tracking-widest uppercase text-[#8e9693]">
                      {activeItem.category} · {activeItem.year}
                    </div>
                  </div>
                  <div className="font-mono text-sm text-[#18C98A]">{activeItem.number}</div>
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
