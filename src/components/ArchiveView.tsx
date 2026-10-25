import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ARCHIVE_ITEMS } from '../data/portfolioData';
import { ArchiveItem, TimeTheme } from '../types';
import { Grid, Columns, X, Maximize2 } from 'lucide-react';

interface ArchiveViewProps {
  theme: TimeTheme;
  items?: ArchiveItem[];
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ theme, items = ARCHIVE_ITEMS }) => {
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);
  const [viewMode, setViewMode] = useState<'horizontal' | 'grid'>('horizontal');
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-full min-h-screen pt-28 sm:pt-36 pb-20 transition-colors duration-700 overflow-x-hidden"
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
              <button
                onClick={() => setViewMode('horizontal')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'horizontal'
                    ? 'bg-[#18C98A] text-[#101114]'
                    : 'text-[#8e9693] hover:text-[#f2f4f3]'
                }`}
                title="Filmstrip View"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#18C98A] text-[#101114]'
                    : 'text-[#8e9693] hover:text-[#f2f4f3]'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
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
              <motion.div
                key={item.id}
                onClick={() => setActiveItem(item)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.035, 0.28), ease: [0.76, 0, 0.24, 1] }}
                className="group flex-shrink-0 w-[75vw] sm:w-[42vw] md:w-[32vw] lg:w-[24vw] max-w-[400px] flex flex-col justify-between cursor-pointer transition-transform duration-500 hover:-translate-y-2"
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

                  <div className="absolute inset-0 bg-[#101114]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 rounded-full bg-[#101114]/80 border border-[#18C98A]/40 text-[#18C98A] backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#f2f4f3]">
                  <span className="truncate pr-2 font-medium group-hover:text-[#18C98A] transition-colors">{item.title}</span>
                  <span className="text-[#18C98A]">{item.number}</span>
                </div>
                <div className="text-[10px] font-mono tracking-wider text-[#8e9693] uppercase truncate">
                  {item.category} · {item.year}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 py-12">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={() => setActiveItem(item)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.035, 0.28), ease: [0.76, 0, 0.24, 1] }}
                className="group flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1"
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

                  <div className="absolute inset-0 bg-[#101114]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-[#101114]/80 border border-[#18C98A]/40 text-[#18C98A] backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#f2f4f3]">
                  <span className="truncate pr-2 font-medium group-hover:text-[#18C98A] transition-colors">{item.title}</span>
                  <span className="text-[#18C98A]">{item.number}</span>
                </div>
                <div className="text-[10px] font-mono tracking-wider text-[#8e9693] uppercase truncate">
                  {item.category} · {item.year}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-[#101114]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-none overflow-hidden bg-[#16181e] border border-[#18C98A]/30 shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#18C98A]/15 flex items-center justify-between font-mono text-[11px] tracking-widest uppercase text-[#f2f4f3]">
              <span>
                <span className="text-[#18C98A] mr-2">{activeItem.number}</span> / {activeItem.title}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="hover:text-[#18C98A] transition-colors p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex-1 bg-[#101114] overflow-hidden flex items-center justify-center min-h-[400px]">
              {activeItem.type === 'video' ? (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              )}
            </div>

            <div className="p-4 border-t border-[#18C98A]/15 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[#8e9693]">
              <span className="text-[#18C98A]">{activeItem.category}</span>
              <span>{activeItem.year}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
