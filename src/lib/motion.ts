import type { Easing, Transition, Variants } from 'framer-motion';

const easing = {
  standard: [0.2, 0, 0, 1] as Easing,
  enter: [0.16, 1, 0.3, 1] as Easing,
  exit: [0.7, 0, 0.84, 0] as Easing,
  menu: [0.76, 0, 0.24, 1] as Easing,
  linear: 'linear' as Easing,
};

export const motionEngineTokens = {
  gsap: {
    pageExit: 'power2.in',
    pageEnter: 'power3.out',
    scrollReveal: 'power3.out',
  },
} as const;

export const motionTokens = {
  duration: {
    instant: 0.12,
    fast: 0.18,
    standard: 0.28,
    enter: 0.42,
    emphasis: 0.65,
    ambient: 1.2,
    navigation: 0.72,
    navigationExit: 0.65,
    navigationDepth: 0.75,
    navigationLabel: 0.55,
    pageExit: 0.3,
    pageEnter: 0.55,
    reveal: 0.7,
  },
  easing,
  distance: {
    small: 8,
    medium: 16,
    large: 24,
    reveal: 24,
  },
  stagger: {
    tight: 0.04,
    standard: 0.08,
    relaxed: 0.12,
    maximum: 0.28,
  },
} as const;

export const motionTransitions = {
  standard: {
    duration: motionTokens.duration.standard,
    ease: motionTokens.easing.standard,
  },
  enter: {
    duration: motionTokens.duration.enter,
    ease: motionTokens.easing.enter,
  },
  exit: {
    duration: motionTokens.duration.fast,
    ease: motionTokens.easing.exit,
  },
  interaction: {
    duration: motionTokens.duration.fast,
    ease: motionTokens.easing.standard,
  },
} satisfies Record<string, Transition>;

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { ...motionTransitions.enter, delay },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.medium },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...motionTransitions.enter, delay },
  }),
};

export const motionVariants = {
  fadeIn: fadeInVariants,
  fadeUp: fadeUpVariants,
  stagger: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: motionTokens.stagger.tight,
        staggerChildren: motionTokens.stagger.standard,
      },
    },
  } satisfies Variants,
  card: {
    hidden: { opacity: 0, y: motionTokens.distance.medium },
    visible: (custom = {}) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...motionTransitions.enter,
        delay: custom.delay ?? 0,
      },
    }),
    rest: { opacity: 1, y: 0, scale: 1 },
    hover: (custom = {}) => ({
      y: -(custom.lift ?? 4),
      transition: motionTransitions.interaction,
    }),
    tap: { scale: 0.99, transition: motionTransitions.interaction },
  } satisfies Variants,
  button: {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: motionTransitions.interaction,
    },
    tap: {
      scale: 0.98,
      transition: motionTransitions.interaction,
    },
  } satisfies Variants,
  modalBackdrop: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: motionTransitions.standard,
    },
    exit: {
      opacity: 0,
      transition: motionTransitions.exit,
    },
  } satisfies Variants,
  modalContent: {
    hidden: {
      opacity: 0,
      y: motionTokens.distance.large,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: motionTransitions.enter,
    },
    exit: {
      opacity: 0,
      y: motionTokens.distance.small,
      scale: 0.98,
      transition: motionTransitions.exit,
    },
  } satisfies Variants,
  tabPanel: {
    hidden: { opacity: 0, y: motionTokens.distance.medium },
    visible: {
      opacity: 1,
      y: 0,
      transition: motionTransitions.standard,
    },
    exit: {
      opacity: 0,
      y: -motionTokens.distance.small,
      transition: motionTransitions.exit,
    },
  } satisfies Variants,
  dropdown: {
    hidden: {
      opacity: 0,
      y: -motionTokens.distance.small,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: motionTransitions.interaction,
    },
    exit: {
      opacity: 0,
      y: -motionTokens.distance.small,
      scale: 0.98,
      transition: motionTransitions.exit,
    },
  } satisfies Variants,
} satisfies Record<string, Variants>;
