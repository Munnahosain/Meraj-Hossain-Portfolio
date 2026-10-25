/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

/**
 * Magnetic custom cursor component with smooth physics interpolation.
 * - Precision trailing dot + fluid halo aura
 * - Magnetically pulls and snaps toward interactive buttons, links, and cards
 * - Scales smoothly on hover for tactile visual feedback
 * - Auto-disabled on touch/coarse pointer devices
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  // High-frequency coordinates tracked in refs to prevent React re-renders in rAF loop
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });

  // Magnetic snap targets
  const magneticCenter = useRef<{ x: number; y: number } | null>(null);
  const isHoveredRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const isVisibleRef = useRef(false);

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only mount and activate on desktop fine-pointer devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;
    setIsSupported(true);

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      isVisibleRef.current = true;

      // Detect closest interactive element
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'button, a, [data-magnetic], [role="button"], .cursor-pointer, input, textarea, select'
      ) as HTMLElement | null;

      if (interactiveEl) {
        isHoveredRef.current = true;
        const rect = interactiveEl.getBoundingClientRect();
        magneticCenter.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      } else {
        isHoveredRef.current = false;
        magneticCenter.current = null;
      }
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60-120fps physical lerp loop
    const renderLoop = () => {
      const dotEl = dotRef.current;
      const haloEl = haloRef.current;

      if (dotEl && haloEl) {
        if (!isVisibleRef.current) {
          dotEl.style.opacity = '0';
          haloEl.style.opacity = '0';
        } else {
          dotEl.style.opacity = '1';
          haloEl.style.opacity = '1';

          // 1. Calculate Target Coordinates (incorporating magnetic snap attraction)
          let targetHaloX = mousePos.current.x;
          let targetHaloY = mousePos.current.y;

          if (magneticCenter.current && isHoveredRef.current) {
            // Magnetic pull: smoothly snaps 75% toward interactive element center
            targetHaloX =
              targetHaloX * 0.25 + magneticCenter.current.x * 0.75;
            targetHaloY =
              targetHaloY * 0.25 + magneticCenter.current.y * 0.75;
          }

          // 2. Linear Interpolation (LERP) for fluid lag
          // Dot follows cursor tightly
          dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.45;
          dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.45;

          // Halo has smooth organic elasticity
          const haloLerp = isHoveredRef.current ? 0.22 : 0.16;
          haloPos.current.x += (targetHaloX - haloPos.current.x) * haloLerp;
          haloPos.current.y += (targetHaloY - haloPos.current.y) * haloLerp;

          // 3. Dynamic Scale Feedback
          let haloScale = 1;
          let dotScale = 1;

          if (isMouseDownRef.current) {
            haloScale = 0.85;
            dotScale = 0.7;
          } else if (isHoveredRef.current) {
            haloScale = 1.65; // Scales up on hover
            dotScale = 1.25;
          }

          // 4. Direct GPU Transform Updates
          dotEl.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
          haloEl.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0) translate(-50%, -50%) scale(${haloScale})`;

          // Dynamic styling for hover snap
          if (isHoveredRef.current) {
            haloEl.style.borderColor = 'rgba(24, 201, 138, 0.85)';
            haloEl.style.backgroundColor = 'rgba(24, 201, 138, 0.12)';
            haloEl.style.boxShadow = '0 0 16px rgba(24, 201, 138, 0.35)';
          } else {
            haloEl.style.borderColor = 'rgba(24, 201, 138, 0.38)';
            haloEl.style.backgroundColor = 'transparent';
            haloEl.style.boxShadow = 'none';
          }
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Outer Magnetic Snapping Halo Aura */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#18C98A]/40 will-change-transform transform-gpu transition-colors duration-300 pointer-events-none"
        style={{
          opacity: 0,
        }}
      />

      {/* Inner Precision Tracking Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#18C98A] shadow-[0_0_8px_#18C98A] will-change-transform transform-gpu pointer-events-none"
        style={{
          opacity: 0,
        }}
      />
    </div>
  );
};
