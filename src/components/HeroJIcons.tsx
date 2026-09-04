import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

interface HeroIconPosition {
  x: number;
  y: number;
  size: number;
}

interface HeroIconConfig {
  id: string;
  label: string;
  src: string;
  floatDelay: number;
  positions: Record<Breakpoint, HeroIconPosition>;
}

const iconConfig: HeroIconConfig[] = [
  {
    id: "photoshop",
    label: "Photoshop",
    src: "/ps.png",
    floatDelay: 0,
    positions: {
      desktop: { x: -96, y: -22, size: 56 },
      tablet: { x: -74, y: -18, size: 48 },
      mobile: { x: -58, y: -14, size: 40 },
    },
  },
  {
    id: "illustrator",
    label: "Illustrator",
    src: "/ai.png",
    floatDelay: 0.4,
    positions: {
      desktop: { x: 84, y: -24, size: 54 },
      tablet: { x: 64, y: -18, size: 46 },
      mobile: { x: 52, y: -14, size: 40 },
    },
  },
  {
    id: "after-effects",
    label: "After Effects",
    src: "/ae.png",
    floatDelay: 0.8,
    positions: {
      desktop: { x: 104, y: 58, size: 52 },
      tablet: { x: 82, y: 46, size: 44 },
      mobile: { x: 64, y: 38, size: 38 },
    },
  },
  {
    id: "premiere-pro",
    label: "Premiere Pro",
    src: "/pr.png",
    floatDelay: 1.2,
    positions: {
      desktop: { x: -12, y: 84, size: 50 },
      tablet: { x: -10, y: 66, size: 42 },
      mobile: { x: -10, y: 54, size: 36 },
    },
  },
  {
    id: "substance",
    label: "Substance 3D",
    src: "/st.png",
    floatDelay: 1.6,
    positions: {
      desktop: { x: 32, y: 108, size: 48 },
      tablet: { x: 24, y: 90, size: 40 },
      mobile: { x: 18, y: 74, size: 34 },
    },
  },
];

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

export function HeroJIcons() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getBreakpoint(window.innerWidth));
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  const icons = useMemo(
    () => iconConfig.map((icon) => ({
      ...icon,
      position: icon.positions[breakpoint],
    })),
    [breakpoint],
  );

  return (
    <div className="hero-icon-cloud pointer-events-none absolute inset-0 z-20">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="hero-icon-item pointer-events-auto"
          style={{
            left: `calc(50% + ${icon.position.x}px)`,
            top: `calc(50% + ${icon.position.y}px)`,
            width: icon.position.size,
            height: icon.position.size,
            cursor: "grab",
          }}
          drag
          dragElastic={0.18}
          dragMomentum={false}
          dragSnapToOrigin
          dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.98 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: icon.floatDelay,
          }}
          dragTransition={{
            bounceStiffness: 500,
            bounceDamping: 26,
          }}
        >
          <motion.div
            className="hero-icon-item-inner"
            whileHover={{ scale: 1.05, boxShadow: "0 18px 45px rgba(0, 0, 0, 0.16)" }}
            transition={{ duration: 0.18 }}
          >
            <img
              src={icon.src}
              alt={icon.label}
              className="h-3/5 w-3/5 object-contain"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
