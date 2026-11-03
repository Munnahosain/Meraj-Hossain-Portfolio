import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { motionSprings } from '../../lib/motion';

interface MagneticProps {
  children: ReactNode;
  /** How far the element follows the pointer (0–1 of the offset from its centre). */
  strength?: number;
  /** Distance in px from the element's edge at which the pull begins. */
  radius?: number;
  className?: string;
}

/**
 * Pulls its content a few pixels toward the mouse pointer when it gets close,
 * then springs back. Mouse only; touch and reduced-motion users get a plain box.
 */
export function Magnetic({ children, strength = 0.3, radius = 56, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, motionSprings.magnetic);
  const springY = useSpring(y, motionSprings.magnetic);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const update = () => {
      frame = 0;
      if (!pointer) return;
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = pointer.x - centerX;
      const dy = pointer.y - centerY;
      const reachX = rect.width / 2 + radius;
      const reachY = rect.height / 2 + radius;
      const inside = Math.abs(dx) < reachX && Math.abs(dy) < reachY;
      x.set(inside ? dx * strength : 0);
      y.set(inside ? dy * strength : 0);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      pointer = null;
      x.set(0);
      y.set(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [radius, reduceMotion, strength, x, y]);

  return (
    <motion.div ref={ref} className={className} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}
