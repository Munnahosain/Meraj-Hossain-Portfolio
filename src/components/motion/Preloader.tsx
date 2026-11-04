import { useEffect } from 'react';
import type { TimeTheme } from '../../types';

interface PreloaderProps {
  isReady?: boolean;
  compact?: boolean;
  theme?: TimeTheme;
  onReveal?: () => void;
  onDone?: () => void;
}

/**
 * Preloader disabled per user request: site boots immediately without
 * any splash screen, signature drawing, counter numbers, or shutter curtain animations.
 */
export function Preloader({ onReveal, onDone }: PreloaderProps) {
  useEffect(() => {
    onReveal?.();
    onDone?.();
  }, [onReveal, onDone]);

  return null;
}

