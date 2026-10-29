import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { CaseStudy, ProjectSection, TimeTheme } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLenis } from '../hooks/useLenis';
import { ProjectShutterImage } from './ProjectShutterImage';
import {
  getProjectAnimationSettings,
  getProjectMotionEasing,
  normalizeProjectSection,
  type ProjectMotionEasing,
} from '../lib/project-motion';

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  allCases: CaseStudy[];
  onSelectCase: (caseStudy: CaseStudy) => void;
  onBack: () => void;
  theme: TimeTheme;
  sharedHeroSize?: { width: number; height: number };
  isSharedHeroAnimating?: boolean;
  onHeroImageReady?: (rect: { left: number; top: number; width: number; height: number }) => void;
}

function getSectionSpacing(section: ProjectSection) {
  if (section.spacing === 'compact') return 'py-10 sm:py-14';
  if (section.spacing === 'spacious') return 'py-24 sm:py-32';
  return 'py-16 sm:py-24';
}

function isSafeCtaUrl(value: string) {
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(value);
}

function updateScrollDepthFrames(root: HTMLElement, reduceMotion: boolean) {
  const rootRect = root.getBoundingClientRect();
  const frames = root.querySelectorAll<HTMLElement>('[data-scroll-depth-frame]');

  frames.forEach((frame) => {
    const target = frame.firstElementChild as HTMLElement | null;
    if (!target) return;

    if (reduceMotion) {
      target.style.transform = '';
      target.style.willChange = '';
      return;
    }

    const targetRect = frame.getBoundingClientRect();
    const travelDistance = rootRect.height + targetRect.height;
    if (travelDistance <= 0) return;

    const progress = Math.min(
      1,
      Math.max(0, (rootRect.bottom - targetRect.top) / travelDistance),
    );
    const interpolate = (start: number, middle: number, end: number) =>
      progress <= 0.5
        ? start + (middle - start) * progress * 2
        : middle + (end - middle) * (progress - 0.5) * 2;
    const direction = frame.dataset.scrollDepthDirection === '-1' ? -1 : 1;
    const y = interpolate(58, 0, -58);
    const z = interpolate(-72, 0, 64);
    const rotateX = interpolate(8, 0, -7);
    const rotateY = interpolate(-7 * direction, 0, 7 * direction);
    const scale = interpolate(0.94, 1, 0.96);

    target.style.transform = `translateY(${y}px) translateZ(${z}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    target.style.willChange = 'transform';
  });
}

function ScrollDepthFrame({
  children,
  direction = 1,
  className = '',
}: {
  children: React.ReactNode;
  direction?: 1 | -1;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={className}
      data-scroll-depth-frame
      data-scroll-depth-direction={direction}
      style={{ perspective: 1300, perspectiveOrigin: '50% 50%' }}
    >
      <div
        className="h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          willChange: reduceMotion ? undefined : 'transform',
          transform: reduceMotion
            ? undefined
            : `translateY(58px) translateZ(-72px) scale(0.94) rotateX(8deg) rotateY(${-7 * direction}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ProjectStorySections({
  sections,
  theme,
  fallbackImage,
  scrollRootRef,
  durationMs,
  stickyEnabled,
  textRevealStyle,
  easing,
  reducedMotionFallback,
}: {
  sections: ProjectSection[];
  theme: TimeTheme;
  fallbackImage: string;
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  durationMs: number;
  stickyEnabled: boolean;
  textRevealStyle: 'rise' | 'fade' | 'none';
  easing: ProjectMotionEasing;
  reducedMotionFallback: 'instant' | 'fade';
}) {
  const reduceMotion = useReducedMotion();
  const blocks: Array<{ type: 'section'; section: ProjectSection; index: number } | { type: 'story'; sections: ProjectSection[]; index: number }> = [];

  for (let index = 0; index < sections.length; index += 1) {
    const section = sections[index];
    if (section.layout !== 'sticky-story' || section.stickyEnabled === false || !stickyEnabled) {
      blocks.push({ type: 'section', section, index });
      continue;
    }

    const storySections: ProjectSection[] = [];
    while (
      index < sections.length &&
      sections[index].layout === 'sticky-story' &&
      sections[index].stickyEnabled !== false
    ) {
      storySections.push(sections[index]);
      index += 1;
    }
    index -= 1;
    blocks.push({ type: 'story', sections: storySections, index: index - storySections.length + 1 });
  }

  return (
    <div className="my-16 sm:my-24">
      {blocks.map((block, blockIndex) =>
        block.type === 'story' ? (
          <StickyStoryBlock
            key={`story-${block.index}`}
            sections={block.sections}
            theme={theme}
            fallbackImage={fallbackImage}
            scrollRootRef={scrollRootRef}
            durationMs={durationMs}
            reduceMotion={Boolean(reduceMotion)}
            easing={easing}
            textRevealStyle={textRevealStyle}
            reducedMotionFallback={reducedMotionFallback}
          />
        ) : (
          <ProjectStoryBlock
            key={block.section.id || `section-${block.index}-${blockIndex}`}
            section={block.section}
            index={block.index}
            theme={theme}
            fallbackImage={fallbackImage}
            scrollRootRef={scrollRootRef}
            durationMs={durationMs}
            reduceMotion={Boolean(reduceMotion)}
            textRevealStyle={textRevealStyle}
            easing={easing}
            reducedMotionFallback={reducedMotionFallback}
          />
        ),
      )}
    </div>
  );
}

function ProjectStoryBlock({
  section,
  index,
  theme,
  fallbackImage,
  scrollRootRef,
  durationMs,
  reduceMotion,
  textRevealStyle,
  easing,
  reducedMotionFallback,
}: {
  section: ProjectSection;
  index: number;
  theme: TimeTheme;
  fallbackImage: string;
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  durationMs: number;
  reduceMotion: boolean;
  textRevealStyle: 'rise' | 'fade' | 'none';
  easing: ProjectMotionEasing;
  reducedMotionFallback: 'instant' | 'fade';
}) {
  const isGallery = section.layout === 'cinematic-gallery';
  const isFullWidth = section.layout === 'full-width' || isGallery;
  const imageOnLeft = section.imagePosition
    ? section.imagePosition === 'left'
    : section.layout === 'image-left';
  const configuredGalleryImages = section.galleryImages?.filter(Boolean) || [];
  const galleryImages = isGallery
    ? configuredGalleryImages.length > 0
      ? configuredGalleryImages
      : section.image
        ? [section.image]
        : []
    : section.image
      ? [section.image]
      : [];
  const alignment =
    section.textAlignment === 'center'
      ? 'text-center items-center'
      : section.textAlignment === 'right'
        ? 'text-right items-end'
        : 'text-left items-start';
  const imageRatio =
    section.imageSize === 'compact' ? 'aspect-[4/3]' : section.imageSize === 'immersive' ? 'aspect-video' : 'aspect-[16/10]';
  const panelStyle =
    section.backgroundTreatment === 'panel'
      ? { backgroundColor: theme.surface, borderColor: theme.border }
      : section.backgroundTreatment === 'accent'
        ? { borderColor: '#18C98A' }
        : { borderColor: theme.border };
  const revealStyle =
    section.animationPreset === 'reduced-motion' ||
    reduceMotion ||
    textRevealStyle === 'none';
  const imageTransitionDuration =
    section.animationPreset === 'reduced-motion' ? 0 : durationMs;

  return (
    <motion.section
      initial={
        revealStyle
          ? false
          : { opacity: 0, y: textRevealStyle === 'rise' ? 24 : 0 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: easing }}
      className={`grid grid-cols-1 items-center gap-8 border-y border-[#18C98A]/10 ${getSectionSpacing(section)} ${
        isFullWidth ? 'lg:grid-cols-1' : 'lg:grid-cols-2 lg:gap-16'
      } ${section.backgroundTreatment === 'accent' ? 'border-l-2 pl-5 sm:pl-8' : ''}`}
      style={panelStyle}
    >
      {galleryImages.length > 0 && (
        <ScrollDepthFrame
          direction={index % 2 === 0 ? 1 : -1}
          className={`min-w-0 ${isFullWidth ? 'w-full' : imageOnLeft ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {isGallery ? (
            <CinematicGallery
              images={galleryImages}
              section={section}
              fallbackImage={fallbackImage}
              durationMs={imageTransitionDuration}
              easing={easing}
              reducedMotionFallback={reducedMotionFallback}
            />
          ) : (
            <div
              className={`relative overflow-hidden border bg-[#16181e] ${imageRatio} ${
                isFullWidth && section.imageSize === 'immersive' ? 'max-h-[85vh]' : ''
              }`}
              style={{ borderColor: theme.border }}
            >
              <ProjectShutterImage
                src={galleryImages[0]}
                alt={section.imageAlt || section.heading || 'Project visual'}
                fallbackSrc={fallbackImage}
                durationMs={imageTransitionDuration}
                easing={easing}
                reducedMotionFallback={reducedMotionFallback}
              />
            </div>
          )}
          {section.caption && !isGallery && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: theme.textMuted }}>
              {section.caption}
            </p>
          )}
        </ScrollDepthFrame>
      )}

      <div
        className={`flex flex-col ${alignment} ${isFullWidth ? 'mx-auto mt-8 w-full max-w-4xl' : ''} ${
          isFullWidth ? '' : imageOnLeft ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {section.heading && (
          <h2 className="text-3xl font-sans font-light leading-tight tracking-tight sm:text-5xl">
            {section.heading}
          </h2>
        )}
        {section.body && (
          <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 sm:text-base sm:leading-8" style={{ color: theme.textMuted }}>
            {section.body}
          </p>
        )}
        {section.ctaLabel && section.ctaUrl && isSafeCtaUrl(section.ctaUrl) && (
          <a
            href={section.ctaUrl}
            target={section.ctaUrl.startsWith('http') ? '_blank' : undefined}
            rel={section.ctaUrl.startsWith('http') ? 'noreferrer' : undefined}
            className="mt-7 inline-flex items-center gap-2 border-b border-[#18C98A]/60 pb-2 font-mono text-[10px] uppercase tracking-widest text-[#18C98A] hover:border-[#18C98A]"
          >
            {section.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.section>
  );
}

function CinematicGallery({
  images,
  section,
  fallbackImage,
  durationMs,
  easing,
  reducedMotionFallback,
}: {
  images: string[];
  section: ProjectSection;
  fallbackImage: string;
  durationMs: number;
  easing: ProjectMotionEasing;
  reducedMotionFallback: 'instant' | 'fade';
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || fallbackImage;
  const caption = section.galleryCaptions?.[activeIndex] || section.caption;

  return (
    <div>
      <div className="relative aspect-video max-h-[85vh] overflow-hidden border bg-[#16181e]" style={{ borderColor: '#18C98A' }}>
        <ProjectShutterImage
          src={activeImage}
          alt={
            section.galleryAltTexts?.[activeIndex] ||
            section.imageAlt ||
            section.heading ||
            `Project gallery image ${activeIndex + 1}`
          }
          fallbackSrc={fallbackImage}
          durationMs={durationMs}
          loading={activeIndex === 0 ? 'eager' : 'lazy'}
          easing={easing}
          reducedMotionFallback={reducedMotionFallback}
        />
        {caption && (
          <div className="absolute inset-x-0 bottom-0 bg-black/55 px-4 py-3 font-mono text-[9px] uppercase tracking-widest text-white/75 backdrop-blur-sm">
            {caption}
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)}
              className="grid h-10 w-10 place-items-center border border-white/40 bg-black/50 text-white backdrop-blur-sm"
              aria-label="Previous project image"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((index) => (index + 1) % images.length)}
              className="grid h-10 w-10 place-items-center border border-white/40 bg-black/50 text-white backdrop-blur-sm"
              aria-label="Next project image"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Project gallery images">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-pressed={activeIndex === index}
              className={`h-16 w-24 shrink-0 overflow-hidden border ${
                activeIndex === index ? 'border-[#18C98A]' : 'border-white/20'
              }`}
            >
              <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StickyStoryBlock({
  sections,
  theme,
  fallbackImage,
  scrollRootRef,
  durationMs,
  reduceMotion,
  easing,
  textRevealStyle,
  reducedMotionFallback,
}: {
  sections: ProjectSection[];
  theme: TimeTheme;
  fallbackImage: string;
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  durationMs: number;
  reduceMotion: boolean;
  easing: ProjectMotionEasing;
  textRevealStyle: 'rise' | 'fade' | 'none';
  reducedMotionFallback: 'instant' | 'fade';
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const activeSection = sections[activeIndex] || sections[0];

  useEffect(() => {
    const root = scrollRootRef.current;
    const observedSections = sectionRefs.current.filter(
      (section): section is HTMLElement => section !== null,
    );
    if (!root || observedSections.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);
        const active = visibleSections[0]?.target;
        if (!active) return;
        const index = observedSections.indexOf(active as HTMLElement);
        if (index >= 0) setActiveIndex(index);
      },
      { root, rootMargin: '-20% 0px -35% 0px', threshold: [0.15, 0.4, 0.65] },
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [scrollRootRef, sections.length]);

  return (
    <section className="grid grid-cols-1 gap-8 border-y border-[#18C98A]/15 py-10 sm:py-16 lg:grid-cols-2 lg:gap-16">
      <div className="relative order-1 lg:order-2">
        <div className="relative lg:sticky lg:top-24">
          <ScrollDepthFrame className="relative aspect-[4/3] overflow-hidden border bg-[#16181e] lg:aspect-[4/5]">
            <ProjectShutterImage
              src={activeSection?.image || fallbackImage}
              alt={activeSection?.imageAlt || activeSection?.heading || 'Project storytelling image'}
              fallbackSrc={fallbackImage}
              durationMs={durationMs}
              easing={easing}
              reducedMotionFallback={reducedMotionFallback}
            />
            {activeSection?.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-black/55 px-4 py-3 font-mono text-[9px] uppercase tracking-widest text-white/75 backdrop-blur-sm">
                {activeSection.caption}
              </div>
            )}
          </ScrollDepthFrame>
        </div>
      </div>
      <div className="order-2 lg:order-1">
        {sections.map((section, index) => (
          <motion.article
            key={section.id || `${section.heading}-${index}`}
            ref={(element) => {
              sectionRefs.current[index] = element;
            }}
            animate={{
              opacity:
                reduceMotion || textRevealStyle === 'none'
                  ? 1
                  : activeIndex === index
                    ? 1
                    : 0.48,
              x:
                reduceMotion ||
                activeIndex === index ||
                textRevealStyle !== 'rise'
                  ? 0
                  : 8,
            }}
            transition={{
              duration:
                reduceMotion || textRevealStyle === 'none' ? 0 : 0.35,
              ease: easing,
            }}
            className="flex min-h-[48vh] flex-col justify-center border-b py-12 last:border-0 sm:min-h-[56vh] lg:min-h-[62vh]"
            style={{ borderColor: theme.border }}
          >
            {section.heading && (
              <h2 className="text-3xl font-sans font-light leading-tight tracking-tight sm:text-5xl">
                {section.heading}
              </h2>
            )}
            {section.body && (
              <p className="mt-5 max-w-xl whitespace-pre-line text-sm leading-7 sm:text-base sm:leading-8" style={{ color: theme.textMuted }}>
                {section.body}
              </p>
            )}
            {section.ctaLabel && section.ctaUrl && isSafeCtaUrl(section.ctaUrl) && (
              <a
                href={section.ctaUrl}
                target={section.ctaUrl.startsWith('http') ? '_blank' : undefined}
                rel={section.ctaUrl.startsWith('http') ? 'noreferrer' : undefined}
                className="mt-7 inline-flex w-fit items-center gap-2 border-b border-[#18C98A]/60 pb-2 font-mono text-[10px] uppercase tracking-widest text-[#18C98A]"
              >
                {section.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  caseStudy,
  allCases,
  onSelectCase,
  onBack,
  theme,
  sharedHeroSize,
  isSharedHeroAnimating = false,
  onHeroImageReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const [heroScale, setHeroScale] = useState(1);
  const reduceMotion = useReducedMotion();
  const animationSettings = getProjectAnimationSettings(caseStudy);
  const animationEasing = getProjectMotionEasing(caseStudy);
  const presentationTheme: TimeTheme = {
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
  const fallbackStorySections: ProjectSection[] = caseStudy.contentMedia.map((media, index) => ({
    id: `existing-media-${index}`,
    layout: index % 2 === 0 ? 'image-left' : 'image-right',
    heading: media.caption,
    body: index === 0 ? caseStudy.description : '',
    image: media.type === 'image' ? media.src : '',
    imageAlt: media.caption || `${caseStudy.title.replace(/\n/g, ' ')} visual ${index + 1}`,
    caption: media.caption,
    imagePosition: index % 2 === 0 ? 'left' : 'right',
    imageSize: media.aspect === 'portrait' ? 'compact' : 'standard',
  }));
  const useStorySections =
    Boolean(caseStudy.sections?.length) ||
    (caseStudy.contentMedia.length > 0 &&
      caseStudy.contentMedia.every((media) => media.type === 'image'));
  const storySections = (caseStudy.sections?.length
    ? caseStudy.sections
    : fallbackStorySections
  ).map(normalizeProjectSection);
  const currentIndex = allCases.findIndex((c) => c.id === caseStudy.id);
  const nextCase = allCases.length
    ? allCases[(currentIndex + 1 + allCases.length) % allCases.length]
    : caseStudy;

  // Attach Lenis smooth scrolling to the container
  useLenis(true, containerRef);

  // Scroll to top on case study change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setHeroScale(1);
  }, [caseStudy.id]);

  useLayoutEffect(() => {
    if (!isSharedHeroAnimating || !heroMediaRef.current) return;

    const element = heroMediaRef.current;
    const rect = element.getBoundingClientRect();
    let entranceOffsetX = 0;
    let entranceOffsetY = 0;

    for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
      const transform = window.getComputedStyle(ancestor).transform;
      if (transform === 'none') continue;
      const matrix = new DOMMatrixReadOnly(transform);
      entranceOffsetX += matrix.m41;
      entranceOffsetY += matrix.m42;
    }

    onHeroImageReady?.({
      left: rect.left - entranceOffsetX,
      top: rect.top - entranceOffsetY,
      width: rect.width,
      height: rect.height,
    });
  }, [caseStudy.id, isSharedHeroAnimating, onHeroImageReady]);

  // Scroll-linked hero scale animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = el.scrollTop;
      // Gently scale down hero image from 1.0 to 0.96 as user scrolls first 600px
      const scale = Math.max(0.955, 1 - (scrollY / 1400) * 0.05);
      setHeroScale(scale);
      updateScrollDepthFrames(el, Boolean(reduceMotion));
    };

    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(handleScroll);
    resizeObserver?.observe(el);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver?.disconnect();
    };
  }, [reduceMotion]);

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
      className="relative h-full w-full pt-20 sm:pt-28 pb-24 overflow-y-auto no-scrollbar transition-colors duration-700"
      style={{
        backgroundColor: presentationTheme.bg,
        color: presentationTheme.text,
      }}
    >
      <div className="mx-auto max-w-[1720px] px-5 sm:px-10 lg:px-14">
        {/* Back Link */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors cursor-pointer"
            style={{ color: presentationTheme.textMuted }}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span className="group-hover:text-[#16845f]">Back to All Cases</span>
          </button>
        </div>

        <div
          className="grid grid-cols-1 items-start gap-x-8 gap-y-8 border-b pb-14 sm:pb-20 lg:grid-cols-12 lg:gap-x-12"
          style={{ borderColor: presentationTheme.border }}
        >
          <div className="pt-2 lg:col-span-6 lg:pt-10">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: presentationTheme.textMuted }}>
              {caseStudy.client} <span className="px-2 text-[#16845f]">/</span> {caseStudy.year}
            </p>
            <h1
              className="max-w-3xl text-5xl font-sans font-light tracking-[-0.06em] leading-[0.9] text-balance sm:text-7xl xl:text-[7.5rem]"
              style={{ color: presentationTheme.text }}
            >
              {caseStudy.title}
            </h1>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: presentationTheme.textMuted }}>
              {caseStudy.category}
            </p>
          </div>

          <div
            ref={heroMediaRef}
            style={{
              width: sharedHeroSize?.width,
              height: sharedHeroSize?.height,
              visibility: isSharedHeroAnimating ? 'hidden' : 'visible',
              transform: `scale(${heroScale})`,
              transition: 'transform 0.1s ease-out',
            }}
            className="relative h-[58vh] min-h-[360px] max-h-[680px] w-full max-w-[480px] shrink-0 overflow-hidden border border-black/10 bg-[#16181e] shadow-none will-change-transform lg:col-span-5 lg:col-start-8 lg:row-span-2"
          >
            {caseStudy.coverVideo ? (
              <video
                src={caseStudy.coverVideo}
                poster={caseStudy.coverPoster || caseStudy.coverImage}
                autoPlay={!isSharedHeroAnimating}
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <ProjectShutterImage
                src={caseStudy.coverPoster || caseStudy.coverImage}
                alt={caseStudy.title.replace(/\n/g, ' ')}
                durationMs={animationSettings.transitionDurationMs}
                loading="eager"
                reducedMotionFallback={animationSettings.reducedMotionFallback}
              />
            )}
          </div>

          <div className="min-w-0 pt-1 lg:col-span-4 lg:col-start-8 lg:row-start-2 lg:pt-0">
            <p
              className="max-w-xl text-sm font-light leading-7 sm:text-base sm:leading-8"
              style={{ color: presentationTheme.textMuted }}
            >
              {caseStudy.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 font-mono text-[10px] tracking-[0.12em] uppercase">
              <div>
                <span className="mb-1 block" style={{ color: presentationTheme.textMuted }}>Client</span>
                <span className="font-semibold" style={{ color: presentationTheme.text }}>{caseStudy.client}</span>
              </div>
              <div>
                <span className="mb-1 block" style={{ color: presentationTheme.textMuted }}>Year</span>
                <span className="font-semibold text-[#16845f]">{caseStudy.year}</span>
              </div>
              <div className="col-span-2">
                <span className="mb-1 block" style={{ color: presentationTheme.textMuted }}>Services</span>
                <span className="font-semibold" style={{ color: presentationTheme.text }}>
                  {caseStudy.services?.length ? caseStudy.services.join(' · ') : caseStudy.role}
                </span>
              </div>
              {caseStudy.tools?.length ? (
                <div className="col-span-2">
                  <span className="mb-1 block" style={{ color: presentationTheme.textMuted }}>Tools</span>
                  <span className="font-semibold" style={{ color: presentationTheme.text }}>
                    {caseStudy.tools.join(' · ')}
                  </span>
                </div>
              ) : null}
            </div>

            {caseStudy.challenge && (
              <div
                className="col-span-full mt-2 space-y-2 border p-5 transition-colors duration-500"
                style={{
                  backgroundColor: presentationTheme.surface,
                  borderColor: presentationTheme.border,
                }}
              >
                <div className="font-mono text-[10px] tracking-widest uppercase text-[#16845f]">
                  Design Mandate
                </div>
                <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: presentationTheme.text }}>
                  {caseStudy.challenge}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Content Sections */}
          {useStorySections ? (
            <ProjectStorySections
              sections={storySections}
              theme={presentationTheme}
              fallbackImage={caseStudy.coverImage}
              scrollRootRef={containerRef}
              durationMs={animationSettings.transitionDurationMs}
              stickyEnabled={animationSettings.stickyImageBehavior === 'enabled'}
              textRevealStyle={animationSettings.textRevealStyle}
              easing={animationEasing}
              reducedMotionFallback={animationSettings.reducedMotionFallback}
            />
          ) : (
            <div className="space-y-16 sm:space-y-24 my-16">
              {caseStudy.contentMedia.map((media, idx) => (
              <div key={idx} className={`space-y-3 ${idx % 3 === 1 ? 'lg:ml-[16.666%] lg:w-5/6' : idx % 3 === 2 ? 'lg:mr-[16.666%] lg:w-5/6' : 'w-full'}`}>
              <ScrollDepthFrame direction={idx % 2 === 0 ? 1 : -1}>
              <div className="relative w-full overflow-hidden border border-black/10 bg-[#e8e5de] shadow-none">
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
              </ScrollDepthFrame>

              {media.caption && (
                <div className="flex items-center justify-between pt-2 px-1 text-[10px] font-mono tracking-widest uppercase" style={{ color: presentationTheme.textMuted }}>
                  <span className="text-[#16845f]">{media.caption}</span>
                  <span>{caseStudy.client} · {caseStudy.year}</span>
                </div>
              )}
            </div>
            ))}
          </div>
        )}

        {/* Dual-Row Horizontal Filmstrip with Momentum Drag */}
        {caseStudy.scrollGalleryRow1 && caseStudy.scrollGalleryRow1.length > 0 && (
          <div className="my-20 space-y-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#16845f]">
                Multi-Touch Brand & Digital Interface Screens
              </div>
              <span className="text-[10px] font-mono tracking-wider uppercase hidden sm:inline" style={{ color: presentationTheme.textMuted }}>
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
                  className="flex-shrink-0 w-[240px] sm:w-[280px] h-[360px] sm:h-[420px] overflow-hidden border border-black/10 bg-[#e8e5de]"
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
                    className="flex-shrink-0 w-[240px] sm:w-[280px] h-[360px] sm:h-[420px] overflow-hidden border border-black/10 bg-[#e8e5de]"
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
        <div className="mt-24 border-t pt-20" style={{ borderColor: presentationTheme.border }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            <div>
              <span className="mb-3 block font-mono text-[11px] tracking-widest uppercase text-[#16845f]">
                Next Case Study
              </span>
              <button
                onClick={() => onSelectCase(nextCase)}
                className="text-4xl sm:text-6xl font-sans font-light tracking-tight hover:text-[#18C98A] transition-colors text-left flex items-center gap-4 group cursor-pointer"
                style={{ color: presentationTheme.text }}
              >
                <span>{nextCase.title.replace('\n', ' ')}</span>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-300 text-[#18C98A]" />
              </button>
            </div>

            <button
              onClick={onBack}
              className="cursor-pointer border px-6 py-3 font-mono text-[11px] tracking-widest uppercase transition-all hover:bg-[#16845f]/10 hover:border-[#16845f]"
              style={{
                borderColor: presentationTheme.border,
                color: presentationTheme.text,
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
