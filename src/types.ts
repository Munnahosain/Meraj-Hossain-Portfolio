export type ViewMode = 'home' | 'cases' | 'archive' | 'about' | 'case-detail';

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  role: string;
  coverImage: string;
  coverVideo?: string;
  coverPoster?: string;
  description: string;
  challenge?: string;
  outcome?: string;
  featured?: boolean;
  heroVisible?: boolean;
  status?: 'draft' | 'published';
  services?: string[];
  tools?: string[];
  sections?: ProjectSection[];
  animationSettings?: ProjectAnimationSettings;
  heroAspect?: string;
  contentMedia: {
    type: 'image' | 'video';
    src: string;
    caption?: string;
    aspect?: 'landscape' | 'portrait' | 'square' | 'wide';
  }[];
  scrollGalleryRow1?: string[];
  scrollGalleryRow2?: string[];
}

export type ProjectSectionLayout =
  | 'image-left'
  | 'image-right'
  | 'full-width'
  | 'sticky-story'
  | 'cinematic-gallery';

export interface ProjectSection {
  id?: string;
  layout: ProjectSectionLayout;
  heading?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  galleryImages?: string[];
  galleryCaptions?: string[];
  galleryAltTexts?: string[];
  textAlignment?: 'left' | 'center' | 'right';
  imagePosition?: 'left' | 'right';
  imageSize?: 'compact' | 'standard' | 'immersive';
  backgroundTreatment?: 'none' | 'panel' | 'accent';
  spacing?: 'compact' | 'comfortable' | 'spacious';
  stickyEnabled?: boolean;
  animationPreset?: 'cinematic' | 'smooth' | 'minimal' | 'reduced-motion';
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface ProjectAnimationSettings {
  preset?: 'cinematic' | 'smooth' | 'minimal' | 'reduced-motion';
  transitionDurationMs?: number;
  easingPreset?: 'cinematic' | 'smooth' | 'minimal';
  shutterDirection?: 'upward';
  imageTransitionStyle?: 'shutter';
  textRevealStyle?: 'rise' | 'fade' | 'none';
  stickyImageBehavior?: 'enabled' | 'disabled';
  reducedMotionFallback?: 'instant' | 'fade';
}

export interface ArchiveItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  aspect?: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface MerajProfile {
  name: string;
  title: string;
  subtitle: string;
  headline: string;
  location: string;
  timezoneOffset: number; // UTC+6 for Dhaka
  avatarImage: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  aboutText: {
    intro: string;
    background: string;
    philosophy: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  experience: WorkExperience[];
  education: EducationItem[];
  values: {
    number: string;
    title: string;
    description: string;
  }[];
  process: {
    step: string;
    title: string;
    sub: string;
    description: string;
  }[];
  clients: string[];
}

export interface PortfolioData {
  profile: MerajProfile;
  caseStudies: CaseStudy[];
  archiveItems: ArchiveItem[];
}

export interface TimeTheme {
  name: string;
  bg: string;
  text: string;
  textMuted: string;
  surface: string;
  surfaceHover: string;
  border: string;
  accent: string;
  isLight: boolean;
  isGreen?: boolean;
}
