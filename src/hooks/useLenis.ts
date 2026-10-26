/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Hook to initialize Lenis smooth scroll for editorial motion
 * Supports scrolling custom containers or window
 */
export function useLenis(
  enabled = true,
  wrapperRef?: React.RefObject<HTMLElement | null>
) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const wrapper = wrapperRef?.current || undefined;

    const lenis = new Lenis({
      wrapper: wrapper,
      content: wrapper ? (wrapper.firstElementChild as HTMLElement) || wrapper : undefined,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, wrapperRef]);

  return lenisRef;
}
