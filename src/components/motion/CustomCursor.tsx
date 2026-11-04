import { useEffect } from 'react';

/**
 * Custom cursor disabled per user request: native mouse pointer is preserved
 * without any secondary trailing pointer or custom cursor bubble.
 */
export function CustomCursor() {
  useEffect(() => {
    document.documentElement.classList.remove('has-custom-cursor');
  }, []);

  return null;
}

