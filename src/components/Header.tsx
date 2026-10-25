/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { MerajProfile, TimeTheme } from '../types';

interface HeaderProps {
  persona: MerajProfile;
  activeView: string;
  onNavigate: (view: 'home' | 'cases' | 'archive' | 'about') => void;
  onOpenMenu: () => void;
  onToggleMenu?: () => void;
  isMenuOpen?: boolean;
  onOpenContact: () => void;
  currentHour: number;
  onTimeChange: (hour: number) => void;
  onResetTime: () => void;
  isTimeOffset: boolean;
  menuFrameLeft: number;
  menuFrameTop: number;
  menuFrameWidth: number;
  menuSignatureWidth: number;
  viewportWidth: number;
  menuProgress: MotionValue<number>;
  theme: TimeTheme;
  onScrubStateChange?: (isScrubbing: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  persona,
  onNavigate,
  onOpenMenu,
  onToggleMenu,
  isMenuOpen = false,
  onOpenContact,
  currentHour,
  onTimeChange,
  onResetTime,
  isTimeOffset,
  menuFrameLeft,
  menuFrameTop,
  menuFrameWidth,
  menuSignatureWidth,
  viewportWidth,
  menuProgress,
  theme,
  onScrubStateChange,
}) => {
  const [signatureHovered, setSignatureHovered] = useState(false);
  const [isDraggingClock, setIsDraggingClock] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef<number | null>(null);

  // Entrance Reveal & Live Pen Signature Animation States
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMCompleted, setIsMCompleted] = useState(false);
  const [isHCompleted, setIsHCompleted] = useState(false);
  const [isDotCompleted, setIsDotCompleted] = useState(false);

  // Trigger loading animations
  const startSignatureDraw = useCallback(() => {
    setIsMCompleted(false);
    setIsHCompleted(false);
    setIsDotCompleted(false);

    // Step 1: Pen draws "M" (starts at 300ms, runs for 750ms)
    const t1 = setTimeout(() => {
      setIsMCompleted(true);
    }, 300);

    // Step 2: Pen immediately flows into "h" (starts at 1050ms, runs for 580ms)
    const t2 = setTimeout(() => {
      setIsHCompleted(true);
    }, 1050);

    // Step 3: Pen lifts and stamps the final period dot (at 1650ms)
    const t3 = setTimeout(() => {
      setIsDotCompleted(true);
    }, 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    // Reveal text lines from bottom to top
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 60);

    const cleanupSig = startSignatureDraw();

    return () => {
      clearTimeout(loadTimer);
      cleanupSig();
    };
  }, [startSignatureDraw]);

  // Click on signature re-runs the pen drawing animation
  const handleSignatureClick = () => {
    startSignatureDraw();
    onNavigate('home');
  };

  // Format hour for display: "20  .00" or "12  .21" exactly matching reference images
  const formattedHour = Math.floor(currentHour) % 24;
  const minutes = Math.floor((currentHour % 1) * 60);
  const displayTime = `${String(formattedHour).padStart(2, '0')}  .${String(minutes).padStart(2, '0')}`;

  /**
   * Clock Orientation Geometry (Strict User Requirement):
   * "circel jokhon soja thakbe tokhon 12 ta ar nice thakl e 6 ta ei vabe daw"
   * - 12:00 (Straight up / Soja / Top) -> 0°
   * - 3:00 (Right)                     -> 90°
   * - 6:00 (Bottom / Niche)            -> 180°
   * - 9:00 (Left)                      -> 270°
   * 
   * angleDeg = ((currentHour % 12) / 12) * 360
   */
  const angleDeg = ((currentHour % 12) / 12) * 360;

  // Handle dial pointer dragging and tapping
  const handleDialPointer = (clientX: number, clientY: number, isMove = false) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    // Angle clockwise from top (12 o'clock): 0° at top, 180° at bottom
    let degFromTop = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (degFromTop < 0) degFromTop += 360;

    if (isMove && lastAngleRef.current !== null) {
      let deltaAngle = degFromTop - lastAngleRef.current;
      // Handle 360 degree boundary crossing
      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;

      // 360° = 12 hours -> deltaHour = (deltaAngle / 360) * 12
      const deltaHour = (deltaAngle / 360) * 12;
      const nextHour = (((currentHour + deltaHour) % 24) + 24) % 24;
      onTimeChange(nextHour);
    } else {
      // Direct click / initial down:
      // Map to 12-hour face, keeping the current AM/PM hemisphere
      const hour12 = (degFromTop / 360) * 12;
      const isPM = currentHour >= 12;
      let targetHour = isPM ? 12 + hour12 : hour12;
      if (targetHour >= 24) targetHour -= 24;
      onTimeChange(targetHour);
    }
    lastAngleRef.current = degFromTop;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingClock(true);
    onScrubStateChange?.(true);
    lastAngleRef.current = null;
    handleDialPointer(e.clientX, e.clientY, false);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDraggingClock) {
        handleDialPointer(e.clientX, e.clientY, true);
      }
    };
    const handlePointerUp = () => {
      if (isDraggingClock) {
        setIsDraggingClock(false);
        lastAngleRef.current = null;
        onScrubStateChange?.(false);
      }
    };

    if (isDraggingClock) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingClock, currentHour, onScrubStateChange]);

  // Click on time digits to conveniently toggle key modes (Day 14:00 -> Evening Green 19:30 -> Night 23:00 -> Live)
  const handleQuickCycle = () => {
    if (!isTimeOffset) {
      onTimeChange(14.0); // Switch to Day
    } else if (currentHour >= 12 && currentHour < 17) {
      onTimeChange(19.5); // Switch to Evening Green
    } else if (currentHour >= 18 && currentHour < 21) {
      onTimeChange(23.0); // Switch to Night
    } else {
      onResetTime(); // Reset to live
    }
  };

  const headerTextColor = isMenuOpen ? '#A7F3D0' : theme.text;
  const brandLeft = useTransform(menuProgress, (progress) => progress * (menuFrameLeft + 8));
  const brandTop = useTransform(menuProgress, (progress) => progress * (menuFrameTop + 8));
  const signatureHomeLeft = (viewportWidth - 32) * 0.288;
  const signatureMenuLeft = menuFrameLeft + menuFrameWidth - menuSignatureWidth - 40;
  const signatureLeft = useTransform(
    menuProgress,
    (progress) => signatureHomeLeft + (signatureMenuLeft - signatureHomeLeft) * progress,
  );
  const signatureTop = useTransform(menuProgress, (progress) => progress * (menuFrameTop + 8));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 py-4 select-none bg-transparent ${
        isDraggingClock ? 'transition-none' : 'transition-colors duration-700'
      } pointer-events-auto`}
      style={{
        color: headerTextColor,
      }}
    >
      <div className="relative h-[52px] w-full flex items-start justify-between">
        {/* Left: 2-line Clean MERAJ / HOSSAIN with Bottom-to-Top Text Reveal */}
        <motion.div
          className="absolute left-0 top-0 cursor-pointer font-sans text-[12px] font-normal tracking-[0.14em] uppercase leading-[1.1] hover:text-[#18C98A]"
          style={{ color: theme.text, left: brandLeft, top: brandTop }}
          onClick={() => onNavigate('home')}
        >
          <div className="overflow-hidden">
            <div
              className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isLoaded ? 'translate-y-0' : 'translate-y-[115%]'
              }`}
              style={{ transitionDelay: '120ms' }}
            >
              MERAJ
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isLoaded ? 'translate-y-0' : 'translate-y-[115%]'
              }`}
              style={{ transitionDelay: '220ms' }}
            >
              HOSSAIN
            </div>
          </div>
        </motion.div>
        {/* Center: Live Handwritten Pen Signing Animation for "Mh." Script Mark */}
        <motion.div
          className="absolute top-0 cursor-pointer flex flex-col items-center group"
          style={{ left: signatureLeft, top: signatureTop }}
          onMouseEnter={() => setSignatureHovered(true)}
          onMouseLeave={() => setSignatureHovered(false)}
          onClick={handleSignatureClick}
          title="Click to replay signature pen drawing"
        >
          <svg
            width="101"
            height="52"
            viewBox="0 0 102 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[39px] w-[76px] lg:h-[52px] lg:w-[101px] transition-all duration-500 transform-gpu ${
              signatureHovered
                ? 'scale-110 drop-shadow-[0_0_12px_rgba(24,201,138,0.75)]'
                : 'drop-shadow-[0_0_5px_rgba(24,201,138,0.35)]'
            }`}
          >
            {/* 1. First Pen Stroke: Cursive "M" (flowing from left to right) */}
            <path
              d="M4 36 C 8 20, 16 8, 22 12 C 28 16, 30 38, 34 38 C 38 38, 44 14, 50 14 C 56 14, 62 36, 68 38"
              stroke="#18C98A"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              strokeDasharray="100"
              strokeDashoffset={isMCompleted ? 0 : 100}
              style={{
                transition: 'stroke-dashoffset 750ms cubic-bezier(0.35, 0.05, 0.2, 1)',
              }}
            />

            {/* 2. Second Pen Stroke: Cursive "h" looping right after "M" */}
            <path
              d="M72 10 C 74 6, 77 8, 77 24 C 77 34, 84 22, 90 28 C 94 32, 95 38, 98 37"
              stroke="#18C98A"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              strokeDasharray="100"
              strokeDashoffset={isHCompleted ? 0 : 100}
              style={{
                transition: 'stroke-dashoffset 580ms cubic-bezier(0.35, 0.05, 0.2, 1)',
              }}
            />

            {/* 3. Final Period Dot: Tapped with fountain pen bounce */}
            <circle
              cx="99"
              cy="37"
              r="1.6"
              fill="#18C98A"
              style={{
                transformOrigin: '99px 37px',
              }}
              className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isDotCompleted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
          </svg>
        </motion.div>

        {/* Right: Stacked MENU / CONTACT & Architectural Reference Clock Widget */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          {/* Stacked MENU / CONTACT with Bottom-to-Top Text Reveal */}
          <nav
            className="absolute left-[56.6%] top-[-9px] flex flex-col font-sans text-[12px] font-normal tracking-[0.14em] uppercase leading-[1.3] transition-colors duration-500"
            style={{ color: headerTextColor }}
          >
            <div className="overflow-hidden">
              <div
                className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isLoaded ? 'translate-y-0' : 'translate-y-[115%]'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <button
                  onClick={onToggleMenu || onOpenMenu}
                  className="hover:text-[#18C98A] transition-colors cursor-pointer text-left block"
                >
                  {isMenuOpen ? 'CLOSE ✕' : 'MENU'}
                </button>
              </div>
            </div>
            {!isMenuOpen && (
              <div className="overflow-hidden">
                <div
                  className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isLoaded ? 'translate-y-0' : 'translate-y-[115%]'
                  }`}
                  style={{ transitionDelay: '380ms' }}
                >
                  <button
                    onClick={onOpenContact}
                    className="hover:text-[#18C98A] transition-colors cursor-pointer text-left block"
                  >
                    CONTACT
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Minimalist Clock Widget: Exact match to Reference Images (image_86fef280.png & image_228dcdae.png) */}
          <div className="absolute right-0 top-12 flex items-start gap-[5px] lg:top-px">
            {/* Left of Dial: TIME TRAVEL ✕ and HH  .mm */}
            <div
              className="relative -top-3 flex flex-col items-end text-right font-sans text-[12px] font-normal tracking-[0.14em] uppercase leading-[1.3] transition-colors duration-500"
              style={{ color: headerTextColor }}
            >
              <div className="overflow-hidden">
                <div
                  className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isLoaded ? 'translate-y-0' : 'translate-y-[115%]'
                  }`}
                  style={{ transitionDelay: '360ms' }}
                >
                  {isTimeOffset ? (
                    <button
                      onClick={onResetTime}
                      className="text-[#18C98A] hover:opacity-80 transition-opacity cursor-pointer text-[10px] sm:text-[11px] font-medium tracking-[0.14em] flex items-center gap-1.5"
                      title="Click ✕ to reset to Live Dhaka Time"
                    >
                      <span>TIME TRAVEL</span>
                      <span className="text-[12px] leading-none">✕</span>
                    </button>
                  ) : (
                    <span className="opacity-80 tracking-[0.14em]">LOCAL TIME</span>
                  )}
                </div>
              </div>

              <div className="overflow-hidden">
                <div
                  className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isLoaded ? 'translate-y-0' : 'translate-y-[115%]'
                  }`}
                  style={{ transitionDelay: '440ms' }}
                >
                  <button
                    onClick={handleQuickCycle}
                    className="tabular-nums font-mono text-[11px] sm:text-[12px] hover:text-[#18C98A] transition-colors cursor-pointer block text-right"
                    title="Click to cycle themes (Day → Evening Green → Night → Live)"
                  >
                    {displayTime}
                  </button>
                </div>
              </div>
            </div>

            {/* Circular Wireframe Dial: Concentric outer circle with inner orbiting circle indicator */}
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ transitionDelay: '480ms' }}
            >
              <div
                ref={dialRef}
                onPointerDown={handlePointerDown}
                className="relative h-[52px] w-[52px] rounded-full border border-solid cursor-grab active:cursor-grabbing flex items-center justify-center select-none touch-none transition-colors duration-500"
                style={{
                  borderColor: theme.isLight
                    ? 'rgba(18, 20, 23, 0.38)'
                    : theme.isGreen
                    ? 'rgba(167, 243, 208, 0.45)'
                    : 'rgba(255, 255, 255, 0.45)',
                  backgroundColor: theme.isLight
                    ? 'rgba(0, 0, 0, 0.03)'
                    : theme.isGreen
                    ? 'rgba(167, 243, 208, 0.06)'
                    : 'rgba(255, 255, 255, 0.04)',
                }}
                title="Drag to travel time: Top (12:00 Day) → Right (3:00) → Bottom (6:00 Evening/Sunrise) → Left (9:00)"
              >
                {/* 4 Quadrant Subtle Tick Marks */}
                <span className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[1px] h-[3px] bg-current opacity-40" />
                <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[1px] h-[3px] bg-current opacity-40" />
                <span className="absolute left-[3px] top-1/2 -translate-y-1/2 w-[3px] h-[1px] bg-current opacity-40" />
                <span className="absolute right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-[1px] bg-current opacity-40" />

                {/* Center Pivot Dot */}
                <div
                  className="w-[2.5px] h-[2.5px] rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: theme.isLight
                      ? 'rgba(18, 20, 23, 0.55)'
                      : theme.isGreen
                      ? '#A7F3D0'
                      : 'rgba(255, 255, 255, 0.65)',
                  }}
                />

                {/* Rotating Indicator: When straight up (0°) it's 12:00; when at bottom (180°) it's 6:00 */}
                <div
                  className={`absolute inset-0 flex items-start justify-center ${
                    isDraggingClock ? 'transition-none' : 'transition-transform duration-150 ease-out'
                  }`}
                  style={{
                    transform: `rotate(${angleDeg}deg)`,
                  }}
                >
                  {/* Inner Indicator Circle orbiting on perimeter */}
                  <div
                    className={`w-[7.5px] h-[7.5px] sm:w-[8px] sm:h-[8px] rounded-full mt-[2px] transition-colors duration-300 ${
                      theme.isLight
                        ? 'bg-[#121417]'
                        : 'border-[1.5px] border-solid bg-transparent'
                    }`}
                    style={{
                      borderColor: theme.isGreen
                        ? '#A7F3D0'
                        : '#FFFFFF',
                      boxShadow: theme.isGreen
                        ? '0 0 6px rgba(167, 243, 208, 0.6)'
                        : 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
