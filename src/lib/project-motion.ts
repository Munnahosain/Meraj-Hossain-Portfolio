import type {
  CaseStudy,
  ProjectAnimationSettings,
  ProjectSection,
  ProjectSectionLayout,
} from '../types';

export const DEFAULT_PROJECT_ANIMATION_SETTINGS: Required<ProjectAnimationSettings> = {
  preset: 'cinematic',
  transitionDurationMs: 850,
  easingPreset: 'cinematic',
  shutterDirection: 'upward',
  imageTransitionStyle: 'shutter',
  textRevealStyle: 'rise',
  stickyImageBehavior: 'enabled',
  reducedMotionFallback: 'instant',
};

export type ProjectMotionEasing = [number, number, number, number];

const easings: Record<'cinematic' | 'smooth' | 'minimal', ProjectMotionEasing> = {
  cinematic: [0.76, 0, 0.24, 1],
  smooth: [0.2, 0, 0, 1],
  minimal: [0.16, 1, 0.3, 1],
};

const sectionLayouts: ProjectSectionLayout[] = [
  'image-left',
  'image-right',
  'full-width',
  'sticky-story',
  'cinematic-gallery',
];

export function getProjectAnimationSettings(
  caseStudy?: CaseStudy | null,
): Required<ProjectAnimationSettings> {
  const settings = caseStudy?.animationSettings || {};
  const duration = Number(settings.transitionDurationMs);
  const preset =
    settings.preset === 'smooth' ||
    settings.preset === 'minimal' ||
    settings.preset === 'reduced-motion'
      ? settings.preset
      : 'cinematic';
  const easingPreset =
    settings.easingPreset === 'smooth' || settings.easingPreset === 'minimal'
      ? settings.easingPreset
      : 'cinematic';

  return {
    ...DEFAULT_PROJECT_ANIMATION_SETTINGS,
    ...settings,
    preset,
    transitionDurationMs:
      preset === 'reduced-motion'
        ? 0
        : Number.isFinite(duration) && duration > 0
        ? Math.min(1000, Math.max(700, duration))
        : DEFAULT_PROJECT_ANIMATION_SETTINGS.transitionDurationMs,
    easingPreset,
    shutterDirection: 'upward',
    imageTransitionStyle: 'shutter',
    textRevealStyle:
      preset === 'reduced-motion'
        ? 'none'
        : settings.textRevealStyle === 'fade' || settings.textRevealStyle === 'none'
        ? settings.textRevealStyle
        : 'rise',
    stickyImageBehavior:
      preset === 'reduced-motion' || settings.stickyImageBehavior === 'disabled'
        ? 'disabled'
        : 'enabled',
    reducedMotionFallback:
      settings.reducedMotionFallback === 'fade' ? 'fade' : 'instant',
  };
}

export function normalizeProjectSection(section: ProjectSection): ProjectSection {
  return {
    ...section,
    layout: sectionLayouts.includes(section.layout) ? section.layout : 'image-left',
    textAlignment:
      section.textAlignment === 'center' || section.textAlignment === 'right'
        ? section.textAlignment
        : 'left',
    imagePosition: section.imagePosition === 'right' ? 'right' : 'left',
    imageSize:
      section.imageSize === 'compact' || section.imageSize === 'immersive'
        ? section.imageSize
        : 'standard',
    backgroundTreatment:
      section.backgroundTreatment === 'panel' || section.backgroundTreatment === 'accent'
        ? section.backgroundTreatment
        : 'none',
    spacing:
      section.spacing === 'compact' || section.spacing === 'spacious'
        ? section.spacing
        : 'comfortable',
    stickyEnabled: typeof section.stickyEnabled === 'boolean' ? section.stickyEnabled : true,
    animationPreset:
      section.animationPreset === 'smooth' ||
      section.animationPreset === 'minimal' ||
      section.animationPreset === 'reduced-motion'
        ? section.animationPreset
        : 'cinematic',
    galleryImages: Array.isArray(section.galleryImages)
      ? section.galleryImages.filter(
          (image): image is string => typeof image === 'string' && image.trim().length > 0,
        )
      : [],
    galleryCaptions: Array.isArray(section.galleryCaptions)
      ? section.galleryCaptions.filter((caption): caption is string => typeof caption === 'string')
      : [],
    galleryAltTexts: Array.isArray(section.galleryAltTexts)
      ? section.galleryAltTexts.filter((alt): alt is string => typeof alt === 'string')
      : [],
  };
}

export function getProjectMotionEasing(caseStudy?: CaseStudy | null): ProjectMotionEasing {
  return easings[getProjectAnimationSettings(caseStudy).easingPreset];
}
