export type Breakpoint = "mobile" | "tablet" | "desktop";

export interface IconBreakpointPosition {
  x: number;
  y: number;
  size: number;
}

export interface AdobeIconConfig {
  id: string;
  label: string;
  src: string;
  delay: number;
  floatDuration: number;
  rotation: number;
  zIndex: number;
  scale: number;
  positions: {
    desktop: IconBreakpointPosition;
    tablet: IconBreakpointPosition;
    mobile: IconBreakpointPosition;
  };
}

export const iconPositions: AdobeIconConfig[] = [
  {
    id: "ps",
    label: "Adobe Photoshop",
    src: "/icons/ps.png",
    delay: 0,
    floatDuration: 6.6,
    rotation: -7,
    zIndex: 22,
    scale: 1.02,
    positions: {
      desktop: { x: 897, y: 70, size: 30 },
      tablet: { x: 22, y: 14, size: 48 },
      mobile: { x: 18, y: 12, size: 36 },
    },
  },
  {
    id: "ai",
    label: "Adobe Illustrator",
    src: "/icons/ai.png",
    delay: 0.12,
    floatDuration: 6.8,
    rotation: 5,
    zIndex: 24,
    scale: 1,
    positions: {
      desktop: { x: 930, y: 70, size: 30 },
      tablet: { x: 80, y: 16, size: 44 },
      mobile: { x: 68, y: 14, size: 34 },
    },
  },
  {
    id: "ae",
    label: "Adobe After Effects",
    src: "/icons/ae.png",
    delay: 0.26,
    floatDuration: 6.5,
    rotation: 5,
    zIndex: 20,
    scale: 0.98,
    positions: {
      desktop: { x: 900, y: 38, size: 30 },
      tablet: { x: 72, y: 64, size: 40 },
      mobile: { x: 60, y: 48, size: 32 },
    },
  },
  {
    id: "pr",
    label: "Adobe Premiere Pro",
    src: "/icons/pr.png",
    delay: 0.4,
    floatDuration: 7.1,
    rotation: -4,
    zIndex: 23,
    scale: 1.01,
    positions: {
      desktop: { x: 930, y: 38, size: 35 },
      tablet: { x: 14, y: 70, size: 44 },
      mobile: { x: 12, y: 56, size: 34 },
    },
  },
  {
    id: "st",
    label: "Adobe Substance 3D",
    src: "/icons/st.png",
    delay: 0.58,
    floatDuration: 6.9,
    rotation: 7,
    zIndex: 21,
    scale: 0.96,
    positions: {
      desktop: { x: 1000, y: 1000, size: 35 },
      tablet: { x: 50, y: 96, size: 38 },
      mobile: { x: 40, y: 72, size: 30 },
    },
  },
];
