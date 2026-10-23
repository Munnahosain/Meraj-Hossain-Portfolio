import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onCompleteRef.current();
      return;
    }

    const duration = 1200; // 1.2 seconds
    const startTime = performance.now();
    let animationFrameId: number;
    let completionTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let fadeTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let lastCount = -1;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      const rounded = Math.round(progress);

      if (rounded !== lastCount) {
        lastCount = rounded;
        setCount(rounded);
      }

      if (progress < 100) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        completionTimeoutId = setTimeout(() => {
          setIsFadingOut(true);
          fadeTimeoutId = setTimeout(() => {
            onCompleteRef.current();
          }, 600);
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (completionTimeoutId) clearTimeout(completionTimeoutId);
      if (fadeTimeoutId) clearTimeout(fadeTimeoutId);
    };
  }, []);

  return (
    <div className={`preloader-overlay ${isFadingOut ? "preloader-hidden" : ""}`}>
      <div className="flex items-center gap-4 font-mono select-none">
        <span className="font-display text-4xl md:text-6xl text-white tracking-widest min-w-[3ch] text-right">
          {count}%
        </span>
        <span className="w-3.5 h-3.5 rounded-full bg-[var(--brand-red)] animate-blink-dot" />
      </div>
    </div>
  );
}
