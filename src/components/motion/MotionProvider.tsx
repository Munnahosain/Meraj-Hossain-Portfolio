import type { PropsWithChildren } from 'react';
import { MotionConfig } from 'framer-motion';
import { motionTransitions } from '../../lib/motion';

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <MotionConfig reducedMotion="user" transition={motionTransitions.standard}>
      {children}
    </MotionConfig>
  );
}
