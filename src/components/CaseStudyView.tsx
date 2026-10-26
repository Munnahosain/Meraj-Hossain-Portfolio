import React, { useRef, useEffect, useState } from 'react';
import { CaseStudy, TimeTheme } from '../types';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useLenis } from '../hooks/useLenis';

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  allCases: CaseStudy[];
  onSelectCase: (caseStudy: CaseStudy) => void;
  onBack: () => void;
  theme: TimeTheme;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  caseStudy,
  allCases,
  onSelectCase,
  onBack,
  theme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const [heroScale, setHeroScale] = useState(1);
  const currentIndex = allCases.findIndex((c) => c.id === caseStudy.id);
  const nextCase = allCases[(currentIndex + 1) % allCases.length];

  // Attach Lenis smooth scrolling to the container
  useLenis(true, containerRef);

  // Scroll to top on case study change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setHeroScale(1);
  }, [caseStudy.id]);

  // Scroll-linked hero scale animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = el.scrollTop;
      // Gently scale down hero image from 1.0 to 0.96 as user scrolls first 600px
      const scale = Math.max(0.955, 1 - (scrollY / 1400) * 0.05);
      setHeroScale(scale);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Generic horizontal drag-to-scroll handler for filmstrips
  const setupDragScroll = (trackRef: React.RefObject<HTMLDivElement | null>) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const el = trackRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add('cursor-grabbing');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.6;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  };

  useEffect(() => {
    const clean1 = setupDragScroll(row1Ref);
    const clean2 = setupDragScroll(row2Ref);
    return () => {
      clean1?.();
      clean2?.();
    };
  }, [caseStudy.id]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-28 sm:pt-36 pb-24 overflow-y-auto no-scrollbar transition-colors duration-700"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12">
        {/* Back Link */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase hover:text-[#18C98A] text-[#8e9693] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Cases</span>
          </button>
        </div>

        {/* Hero Headline & Intro Split with Pinned Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-12 border-b border-[#18C98A]/15">
          {/* Big Editorial Title & Overview */}
          <div className="lg:col-span-7">
            <h1
              className="text-5xl sm:text-7xl xl:text-8xl font-sans font-light tracking-tight leading-[0.95] text-balance transition-colors duration-500"
              style={{ color: theme.text }}
            >
              {caseStudy.title}
            </h1>
            <p
              className="mt-8 text-base sm:text-lg leading-relaxed max-w-2xl font-light transition-colors duration-500"
              style={{ color: theme.textMuted }}
            >
              {caseStudy.description}
            </p>
          </div>

          {/* Metadata Block - Pinned on Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col justify-between pt-2 space-y-8">
            <div className="grid grid-cols-2 gap-6 font-mono text-[11px] tracking-widest uppercase">
              <div>
                <span className="opacity-60 block mb-1" style={{ color: theme.textMuted }}>Client</span>
                <span className="font-semibold" style={{ color: theme.text }}>{caseStudy.client}</span>
              </div>
              <div>
                <span className="opacity-60 block mb-1" style={{ color: theme.textMuted }}>Year</span>
                <span className="font-semibold text-[#18C98A]">{caseStudy.year}</span>
              </div>
              <div className="col-span-2">
                <span className="opacity-60 block mb-1" style={{ color: theme.textMuted }}>Services</span>
                <span className="font-semibold" style={{ color: theme.text }}>{caseStudy.role}</span>
              </div>
            </div>

            {/* Strategic Summary */}
            {caseStudy.challenge && (
              <div
                className="p-6 rounded border space-y-2 backdrop-blur-sm transition-colors duration-500"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
              >
                <div className="font-mono text-[10px] tracking-widest uppercase text-[#18C98A]">
                  Design Mandate
                </div>
                <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: theme.text }}>
                  {caseStudy.challenge}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Primary Hero Media with Scroll-Linked Scale */}
        <div
          ref={heroMediaRef}
          style={{
            transform: `scale(${heroScale})`,
            transition: 'transform 0.1s ease-out',
          }}
          className="my-14 w-full rounded-none overflow-hidden border border-[#18C98A]/20 bg-[#16181e] shadow-none will-change-transform"
        >
          {caseStudy.coverVideo ? (
            <video
              src={caseStudy.coverVideo}
              poster={caseStudy.coverPoster || caseStudy.coverImage}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[85vh] object-cover"
            />
          ) : (
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              className="w-full max-h-[85vh] object-cover"
            />
          )}
        </div>

        {/* Dynamic Content Sections */}
        <div className="space-y-16 sm:space-y-24 my-16">
          {caseStudy.contentMedia.map((media, idx) => (
            <div key={idx} className="space-y-4">
              <div className="relative w-full rounded-none overflow-hidden border border-[#18C98A]/15 bg-[#16181e] shadow-none transition-all duration-500 hover:border-[#18C98A]/35">
                {media.type === 'video' ? (
                  <video
                    src={media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-h-[80vh] object-cover"
                  />
                ) : (
                  <img
                    src={media.src}
                    alt={media.caption || `Content ${idx + 1}`}
                    loading="lazy"
                    className="w-full max-h-[80vh] object-cover"
                  />
                )}
              </div>

              {media.caption && (
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#8e9693] pt-2 px-1">
                  <span className="text-[#18C98A]">{media.caption}</span>
                  <span>{caseStudy.client} · {caseStudy.year}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dual-Row Horizontal Filmstrip with Momentum Drag */}
        {caseStudy.scrollGalleryRow1 && caseStudy.scrollGalleryRow1.length > 0 && (
          <div className="my-20 space-y-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A]">
                Multi-Touch Brand & Digital Interface Screens
              </div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#8e9693] hidden sm:inline">
                Drag to explore
              </span>
            </div>

            {/* Row 1 Track */}
            <div
              ref={row1Ref}
              className="w-full overflow-x-auto no-scrollbar flex gap-4 py-2 select-none cursor-grab"
            >
              {caseStudy.scrollGalleryRow1.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[240px] sm:w-[280px] h-[360px] sm:h-[420px] rounded-sm overflow-hidden border border-[#18C98A]/15 bg-[#16181e]"
                >
                  <img
                    src={src}
                    alt={`Screen Row 1 - ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 Track */}
            {caseStudy.scrollGalleryRow2 && (
              <div
                ref={row2Ref}
                className="w-full overflow-x-auto no-scrollbar flex gap-4 py-2 select-none cursor-grab"
              >
                {caseStudy.scrollGalleryRow2.map((src, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[240px] sm:w-[280px] h-[360px] sm:h-[420px] rounded-sm overflow-hidden border border-[#18C98A]/15 bg-[#16181e]"
                  >
                    <img
                      src={src}
                      alt={`Screen Row 2 - ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Next Case Study Navigation Footer */}
        <div className="pt-20 border-t border-[#18C98A]/15 mt-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            <div>
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#18C98A] block mb-3">
                Next Case Study
              </span>
              <button
                onClick={() => onSelectCase(nextCase)}
                className="text-4xl sm:text-6xl font-sans font-light tracking-tight hover:text-[#18C98A] transition-colors text-left flex items-center gap-4 group cursor-pointer"
                style={{ color: theme.text }}
              >
                <span>{nextCase.title.replace('\n', ' ')}</span>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-300 text-[#18C98A]" />
              </button>
            </div>

            <button
              onClick={onBack}
              className="px-6 py-3 rounded-full border text-inherit font-mono text-[11px] tracking-widest uppercase hover:bg-[#18C98A]/10 hover:border-[#18C98A] transition-all cursor-pointer"
              style={{
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              All Projects ({allCases.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
