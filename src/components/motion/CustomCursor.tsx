import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { motionSprings, motionTokens } from '../../lib/motion';

type CursorMode = 'default' | 'link' | 'label' | 'hidden';

interface CursorState {
  mode: CursorMode;
  label: string;
  pressed: boolean;
}

const INTERACTIVE = 'a, button, [role="button"], [role="slider"], [role="checkbox"], summary, label';
const TEXT_FIELD = 'input, textarea, select, [contenteditable="true"]';

/**
 * A small dot + trailing ring for mouse users. Elements opt in to a labelled
 * state with `data-cursor="view | drag | open | close | next"`; everything else
 * clickable just swells the ring. Touch, coarse pointers and reduced-motion
 * users keep the normal cursor.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({ mode: 'hidden', label: '', pressed: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, motionSprings.cursor);
  const dotY = useSpring(y, motionSprings.cursor);
  const ringX = useSpring(x, motionSprings.cursorRing);
  const ringY = useSpring(y, motionSprings.cursorRing);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const resolve = (target: EventTarget | null): Pick<CursorState, 'mode' | 'label'> => {
      if (!(target instanceof Element)) return { mode: 'default', label: '' };
      if (target.closest(TEXT_FIELD)) return { mode: 'hidden', label: '' };
      const labelled = target.closest<HTMLElement>('[data-cursor]');
      if (labelled?.dataset.cursor) return { mode: 'label', label: labelled.dataset.cursor };
      if (target.closest(INTERACTIVE)) return { mode: 'link', label: '' };
      return { mode: 'default', label: '' };
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const next = resolve(event.target);
      setState((current) =>
        current.mode === next.mode && current.label === next.label ? current : { ...current, ...next },
      );
    };
    const onDown = () => setState((current) => ({ ...current, pressed: true }));
    const onUp = () => setState((current) => ({ ...current, pressed: false }));
    const onLeave = () => setState((current) => ({ ...current, mode: 'hidden', label: '' }));

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
      setEnabled(false);
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  const isLabel = state.mode === 'label';
  const isLink = state.mode === 'link';
  const hidden = state.mode === 'hidden';
  const ringScale = hidden ? 0.4 : isLabel ? 1 : isLink ? 1.7 : state.pressed ? 0.7 : 1;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[400] mix-blend-difference"
    >
      {/* Trailing ring (also the label bubble) */}
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full border border-white text-white"
          animate={{
            width: isLabel ? 76 : 34,
            height: isLabel ? 76 : 34,
            scale: ringScale,
            opacity: hidden ? 0 : isLabel ? 1 : 0.7,
            backgroundColor: isLabel ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: motionTokens.duration.standard, ease: motionTokens.easing.standard }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLabel && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: motionTokens.easing.standard }}
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-black"
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precise dot */}
      <motion.div className="absolute left-0 top-0" style={{ x: dotX, y: dotY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: 6,
            height: 6,
            opacity: hidden || isLabel || isLink ? 0 : 1,
            scale: state.pressed ? 1.8 : 1,
          }}
          transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.standard }}
        />
      </motion.div>
    </div>
  );
}
