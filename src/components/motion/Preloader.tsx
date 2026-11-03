import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import type { TimeTheme } from '../../types';
import { motionTokens } from '../../lib/motion';

interface PreloaderProps {
  /** True once data, fonts and the first images are in. */
  isReady: boolean;
  /** Shorter hold when the visitor has already seen the full loader this session. */
  compact?: boolean;
  theme: TimeTheme;
  /** Fired when the curtain starts lifting, so the page behind can begin its entrance. */
  onReveal: () => void;
  /** Fired once the curtain has fully left the screen. */
  onDone: () => void;
}

const SIGNATURE_M =
  'M4 36 C 8 20, 16 8, 22 12 C 28 16, 30 38, 34 38 C 38 38, 44 14, 50 14 C 56 14, 62 36, 68 38';
const SIGNATURE_H = 'M72 10 C 74 6, 77 8, 77 24 C 77 34, 84 22, 90 28 C 94 32, 95 38, 98 37';

/**
 * Full-screen loader: the signature draws itself while a counter climbs with
 * real readiness, then two curtains (accent, then page colour) lift away.
 */
export function Preloader({ isReady, compact = false, theme, onReveal, onDone }: PreloaderProps) {
  const progress = useMotionValue(0);
  const barScale = useTransform(progress, (value) => value / 100);
  const [display, setDisplay] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const mountedAt = useRef(performance.now());
  const onRevealRef = useRef(onReveal);
  const onDoneRef = useRef(onDone);
  onRevealRef.current = onReveal;
  onDoneRef.current = onDone;
  const minimumMs = compact ? 450 : 1300;

  useMotionValueEvent(progress, 'change', (value) => setDisplay(Math.round(value)));

  // Creep towards 88% on a timer so the counter never looks frozen.
  useEffect(() => {
    const creep = animate(progress, 88, {
      duration: compact ? 0.9 : 2.4,
      ease: motionTokens.easing.out,
    });
    return () => creep.stop();
  }, [compact, progress]);

  // Once everything is ready (and the minimum time has passed) finish at 100 and lift.
  useEffect(() => {
    if (!isReady) return;
    let cancelled = false;
    let holdTimer = 0;
    const wait = Math.max(0, minimumMs - (performance.now() - mountedAt.current));
    const startTimer = window.setTimeout(() => {
      if (cancelled) return;
      animate(progress, 100, {
        duration: 0.35,
        ease: motionTokens.easing.standard,
        onComplete: () => {
          if (cancelled) return;
          holdTimer = window.setTimeout(() => {
            if (cancelled) return;
            setLeaving(true);
            onRevealRef.current();
          }, 160);
        },
      });
    }, wait);
    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(holdTimer);
    };
  }, [isReady, minimumMs, progress]);

  const lift = {
    duration: motionTokens.duration.loaderExit,
    ease: motionTokens.easing.menu,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[300] overflow-hidden"
      style={{ pointerEvents: leaving ? 'none' : 'auto' }}
    >
      {/* Accent curtain peeks out under the main one as both lift */}
      <motion.div
        className="absolute inset-0 bg-[#18C98A]"
        initial={{ clipPath: 'inset(0 0 0% 0)' }}
        animate={{ clipPath: leaving ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)' }}
        transition={{ ...lift, delay: leaving ? 0.12 : 0 }}
        onAnimationComplete={() => {
          if (leaving) onDoneRef.current();
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: theme.bg, color: theme.text }}
        initial={{ clipPath: 'inset(0 0 0% 0)' }}
        animate={{ clipPath: leaving ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)' }}
        transition={lift}
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{ opacity: leaving ? 0 : 1, y: leaving ? -24 : 0 }}
          transition={{ duration: 0.35, ease: motionTokens.easing.standard }}
        >
          <svg width="152" height="78" viewBox="0 0 102 52" fill="none" aria-hidden="true">
            <motion.path
              d={SIGNATURE_M}
              stroke="#18C98A"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.95, delay: 0.1, ease: motionTokens.easing.standard }}
            />
            <motion.path
              d={SIGNATURE_H}
              stroke="#18C98A"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.95, ease: motionTokens.easing.standard }}
            />
            <motion.circle
              cx="99"
              cy="37"
              r="1.7"
              fill="#18C98A"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.55, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: '99px 37px' }}
            />
          </svg>
        </motion.div>

        {/* Corner meta + counter */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-6 font-mono text-[11px] uppercase tracking-[0.18em] sm:px-10 sm:pb-9"
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.25, ease: motionTokens.easing.standard }}
        >
          <span className="opacity-60">Meraj Hossain / Selected work</span>
          <span className="tabular-nums text-[clamp(2.5rem,8vw,6rem)] font-light leading-none tracking-[-0.04em] [font-family:var(--font-sans)]">
            {String(display).padStart(3, '0')}
          </span>
        </motion.div>

        {/* Hairline progress */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#18C98A]"
          style={{ scaleX: barScale }}
        />
      </motion.div>
    </div>
  );
}
