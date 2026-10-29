import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ProjectMotionEasing } from '../lib/project-motion';

interface ProjectShutterImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  durationMs?: number;
  loading?: 'eager' | 'lazy';
  easing?: ProjectMotionEasing;
  reducedMotionFallback?: 'instant' | 'fade';
}

export function ProjectShutterImage({
  src,
  alt,
  fallbackSrc,
  className = '',
  durationMs = 850,
  loading = 'lazy',
  easing = [0.76, 0, 0.24, 1],
  reducedMotionFallback = 'instant',
}: ProjectShutterImageProps) {
  const reduceMotion = useReducedMotion();
  const fadeForReducedMotion =
    Boolean(reduceMotion) && reducedMotionFallback === 'fade' && durationMs > 0;
  const motionDisabled = durationMs <= 0 || (Boolean(reduceMotion) && !fadeForReducedMotion);
  const [visibleSrc, setVisibleSrc] = useState(src);
  const [incomingSrc, setIncomingSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src || src === visibleSrc) return;

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) return;
      if (motionDisabled) {
        setVisibleSrc(src);
        setIncomingSrc(null);
      } else {
        setIncomingSrc(src);
      }
    };
    image.onerror = () => {
      if (active && fallbackSrc && visibleSrc !== fallbackSrc) {
        setIncomingSrc(fallbackSrc);
      }
    };
    image.src = src;

    return () => {
      active = false;
    };
  }, [fallbackSrc, motionDisabled, src, visibleSrc]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <img
        src={visibleSrc}
        alt={alt}
        loading={loading}
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          if (fallbackSrc && visibleSrc !== fallbackSrc) {
            setVisibleSrc(fallbackSrc);
            return;
          }
          event.currentTarget.style.visibility = 'hidden';
        }}
      />
      {incomingSrc && (
        <motion.div
          key={incomingSrc}
          initial={{
            clipPath:
              motionDisabled || fadeForReducedMotion
                ? 'inset(0 0 0 0)'
                : 'inset(100% 0 0 0)',
            opacity: fadeForReducedMotion ? 0 : 1,
          }}
          animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
          transition={{
            duration: motionDisabled
              ? 0
              : fadeForReducedMotion
                ? 0.25
                : Math.min(1000, Math.max(700, durationMs)) / 1000,
            ease: easing,
          }}
          onAnimationComplete={() => {
            setVisibleSrc(incomingSrc);
            setIncomingSrc(null);
          }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <img
            src={incomingSrc}
            alt=""
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden';
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
