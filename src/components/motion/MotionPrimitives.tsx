import type { HTMLMotionProps, Variants } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { motionVariants } from '../../lib/motion';

type MotionDivProps = Omit<
  HTMLMotionProps<'div'>,
  'animate' | 'exit' | 'initial' | 'variants' | 'whileHover' | 'whileInView' | 'whileTap'
>;

type MotionButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'animate' | 'exit' | 'initial' | 'variants' | 'whileHover' | 'whileTap'
>;

interface RevealProps extends MotionDivProps {
  amount?: number;
  delay?: number;
  inView?: boolean;
  once?: boolean;
}

interface MotionCardProps extends MotionDivProps {
  amount?: number;
  delay?: number;
  inView?: boolean;
  lift?: number;
  once?: boolean;
}

const reducedFadeInVariants: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
  exit: { opacity: 0, y: 0, scale: 1, transition: { duration: 0 } },
  rest: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
  hover: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
  tap: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
};

export function FadeIn({
  delay = 0,
  inView = false,
  once = true,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      custom={delay}
      variants={shouldReduceMotion ? reducedFadeInVariants : motionVariants.fadeIn}
      initial={shouldReduceMotion ? false : 'hidden'}
      {...(inView && !shouldReduceMotion
        ? { whileInView: 'visible', viewport: { once } }
        : { animate: 'visible' })}
    />
  );
}

export function FadeUp({
  amount = 0,
  delay = 0,
  inView = false,
  once = true,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      custom={delay}
      variants={shouldReduceMotion ? reducedFadeInVariants : motionVariants.fadeUp}
      initial={shouldReduceMotion ? false : 'hidden'}
      {...(inView && !shouldReduceMotion
        ? { whileInView: 'visible', viewport: { once, amount } }
        : { animate: 'visible' })}
    />
  );
}

export function StaggerChildren({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      {...props}
      variants={motionVariants.stagger}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem(props: MotionDivProps) {
  return <motion.div {...props} variants={motionVariants.fadeUp} />;
}

export function MotionCard({
  amount = 0,
  delay = 0,
  inView = false,
  lift = 4,
  once = true,
  ...cardProps
}: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...cardProps}
      custom={{ delay, lift }}
      variants={shouldReduceMotion ? reducedMotionVariants : motionVariants.card}
      initial={shouldReduceMotion ? false : inView ? 'hidden' : 'rest'}
      {...(inView && !shouldReduceMotion
        ? { whileInView: 'visible', viewport: { once, amount } }
        : inView
          ? { animate: 'rest' }
          : {})}
      whileHover="hover"
      whileTap="tap"
    />
  );
}

export function MotionButton(props: MotionButtonProps) {
  return (
    <motion.button
      {...props}
      variants={motionVariants.button}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    />
  );
}

export function MotionModalBackdrop(props: MotionDivProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      variants={shouldReduceMotion ? reducedMotionVariants : motionVariants.modalBackdrop}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      exit="exit"
    />
  );
}

export function MotionModalContent(props: MotionDivProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      variants={shouldReduceMotion ? reducedMotionVariants : motionVariants.modalContent}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      exit="exit"
    />
  );
}

export function MotionTabPanel(props: MotionDivProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      variants={shouldReduceMotion ? reducedMotionVariants : motionVariants.tabPanel}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      exit="exit"
    />
  );
}

export function MotionDropdown(props: MotionDivProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      variants={shouldReduceMotion ? reducedMotionVariants : motionVariants.dropdown}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      exit="exit"
    />
  );
}
