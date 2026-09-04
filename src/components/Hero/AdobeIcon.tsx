import { memo } from "react";
import { motion } from "framer-motion";
import type { AdobeIconConfig } from "./iconPositions";

type Breakpoint = "desktop" | "tablet" | "mobile";

type DragBoundingBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

interface AdobeIconProps {
  icon: AdobeIconConfig;
  breakpoint: Breakpoint;
  settings: {
    floating: boolean;
    draggable: boolean;
    returnToOrigin: boolean;
    hoverScale: number;
    floatingAmount: number;
    springStiffness: number;
    springDamping: number;
  };
  dragConstraints?: DragBoundingBox;
}

function AdobeIconComponent({ icon, breakpoint, settings, dragConstraints }: AdobeIconProps) {
  const position = icon.positions[breakpoint];

  return (
    <motion.button
      type="button"
      aria-label={icon.label}
      className="hero-icon-button pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        width: position.size,
        height: position.size,
        zIndex: icon.zIndex,
        transform: `rotate(${icon.rotation}deg)`,
      }}
      drag={settings.draggable}
      dragElastic={0.2}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragTransition={{
        bounceStiffness: settings.springStiffness,
        bounceDamping: settings.springDamping,
      }}
      dragSnapToOrigin={settings.returnToOrigin}
      whileHover={{
        scale: settings.hoverScale,
      }}
      whileTap={{ scale: 0.98 }}
      animate={
        settings.floating
          ? {
              y: [0, settings.floatingAmount, 0],
            }
          : undefined
      }
      transition={
        settings.floating
          ? {
              y: {
                duration: icon.floatDuration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                delay: icon.delay,
              },
            }
          : undefined
      }
    >
      <img
        src={icon.src}
        alt={icon.label}
        aria-label={icon.label}
        className="hero-icon-image"
        draggable={false}
        style={{ transform: `scale(${icon.scale})` }}
      />
    </motion.button>
  );
}

export const AdobeIcon = memo(AdobeIconComponent);
