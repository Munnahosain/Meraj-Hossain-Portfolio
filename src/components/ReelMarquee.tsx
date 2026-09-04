"use client";
import { useRef, useEffect, useCallback, useMemo } from "react";
import reel1 from "@/assets/reel-01.jpg";
import reel2 from "@/assets/reel-02.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel4 from "@/assets/reel-04.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";
import reel7 from "@/assets/reel-07.jpg";

export const DEFAULT_REEL_IMAGES = [reel1, reel2, reel3, reel4, reel5, reel6, reel7];

// ── Scroll wheel geometry ─────────────────────────────────────────
const RIB_WIDTH = 6; // px per rib groove
const RIB_COUNT = 200; // total ribs in the repeating strip
const RIB_STRIP_W = RIB_COUNT * RIB_WIDTH;
const R_LABEL = 5; // major tick every N ribs (used for ratio calc)
const WHEEL_TICK = RIB_WIDTH; // px per "tick" for ratio math

function getImageSrc(src: string) {
  if (src.startsWith("/uploads/")) {
    return `/api/uploads/${encodeURIComponent(src.split("/").pop() || "")}`;
  }
  return src;
}

// ─────────────────────────────────────────────────────────────────
export function ReelMarquee({ images }: { images?: string[] }) {
  const activeShots = useMemo(
    () => (images?.filter(Boolean).length ? images.filter(Boolean) : DEFAULT_REEL_IMAGES),
    [images],
  );
  const doubledShots = useMemo(() => [...activeShots, ...activeShots], [activeShots]);

  const trackRef = useRef<HTMLDivElement>(null); // image strip
  const rulerRef = useRef<HTMLDivElement>(null); // ruler strip
  const rulerWrapRef = useRef<HTMLDivElement>(null); // ruler container (for width)

  // All physics state lives here (no React re-renders needed)
  const s = useRef({
    offset: 0,
    halfWidth: 0, // carousel wrap threshold
    rulerRatio: 0.25, // ruler-px per carousel-px (recalculated on mount)
    active: false,
    src: "none" as "none" | "img" | "ruler",
    startX: 0,
    startOff: 0,
    vel: 0,
    lastX: 0,
    lastT: 0,
    autoRaf: 0,
    glideRaf: 0,
  });

  // ── Paint DOM ──────────────────────────────────────────────────
  const draw = useCallback(() => {
    const { offset, halfWidth, rulerRatio } = s.current;

    // Carousel: wrap offset so it loops seamlessly
    if (trackRef.current && halfWidth > 0) {
      const w = ((offset % halfWidth) + halfWidth) % halfWidth;
      trackRef.current.style.transform = `translateX(-${w}px)`;
    }

    // Wheel ribs: shift strip so centre aligns when offset=0
    if (rulerRef.current && rulerWrapRef.current) {
      const cw = rulerWrapRef.current.offsetWidth;
      const x = cw / 2 - RIB_STRIP_W / 2 - offset * rulerRatio;
      rulerRef.current.style.transform = `translateX(${x}px)`;
    }
  }, []);

  // ── Auto-scroll (runs when idle) ───────────────────────────────
  const auto = useCallback(() => {
    if (s.current.active) return;
    s.current.offset += 1.0; // px / frame
    draw();
    s.current.autoRaf = requestAnimationFrame(auto);
  }, [draw]);

  // ── Momentum glide (runs after pointer release) ────────────────
  const glide = useCallback(() => {
    const st = s.current;
    st.vel *= 0.92;
    if (Math.abs(st.vel) < 0.3) {
      st.autoRaf = requestAnimationFrame(auto);
      return;
    }
    st.offset -= st.vel;
    draw();
    st.glideRaf = requestAnimationFrame(glide);
  }, [draw, auto]);

  // ── Pointer down ───────────────────────────────────────────────
  const onDown = useCallback((e: React.PointerEvent, src: "img" | "ruler") => {
    const st = s.current;
    cancelAnimationFrame(st.autoRaf);
    cancelAnimationFrame(st.glideRaf);
    st.active = true;
    st.src = src;
    st.startX = e.clientX;
    st.startOff = st.offset;
    st.vel = 0;
    st.lastX = e.clientX;
    st.lastT = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  // ── Pointer move ───────────────────────────────────────────────
  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const st = s.current;
      if (!st.active) return;

      const now = performance.now();
      const dt = Math.max(now - st.lastT, 1);
      const dx = e.clientX - st.lastX;
      // rolling velocity in screen-px/frame (at 60 fps)
      st.vel = (dx / dt) * 16;
      st.lastX = e.clientX;
      st.lastT = now;

      const drag = e.clientX - st.startX;

      if (st.src === "img") {
        // Carousel drag: screen px === carousel px (1:1)
        st.offset = st.startOff - drag;
      } else {
        // Ruler drag: ruler px → carousel px via ratio
        // drag right (positive) → scroll backward (offset decreases)
        st.offset = st.startOff - drag / st.rulerRatio;
      }

      draw();
    },
    [draw],
  );

  // ── Pointer up / leave ─────────────────────────────────────────
  const onUp = useCallback(() => {
    const st = s.current;
    if (!st.active) return;
    const wasRuler = st.src === "ruler";
    st.active = false;
    st.src = "none";
    // Convert ruler velocity → carousel velocity so momentum feels right
    if (wasRuler) st.vel = st.vel / st.rulerRatio;
    st.glideRaf = requestAnimationFrame(glide);
  }, [glide]);

  // ── Mount: measure + derive ratio + start auto-scroll ─────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const hw = el.scrollWidth / 2; // one full loop
    const pi = hw / activeShots.length; // px per image slot
    s.current.halfWidth = hw;
    // 1 image = R_LABEL ribs on wheel → ratio = (R_LABEL * WHEEL_TICK) / perImage
    s.current.rulerRatio = (R_LABEL * WHEEL_TICK) / pi;

    s.current.autoRaf = requestAnimationFrame(auto);

    return () => {
      cancelAnimationFrame(s.current.autoRaf);
      cancelAnimationFrame(s.current.glideRaf);
    };
  }, [auto, activeShots.length]);

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full select-none hero-marquee-frame">
      <div
        className="relative w-full overflow-hidden py-1 hero-marquee-inner"
        style={{ cursor: "grab" }}
        onPointerDown={(e) => onDown(e, "img")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
          {doubledShots.map((src, i) => (
            <div
              key={i}
              className="relative w-[220px] md:w-[280px] aspect-[4/5] shrink-0 overflow-hidden bg-neutral-900 filmstrip-cell"
            >
              <img
                src={getImageSrc(src)}
                alt=""
                width={800}
                height={1000}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 pointer-events-none"
              />
              <div className="filmstrip-scratch" />
              {i % 5 === 0 && (
                <div
                  className="absolute inset-0 mix-blend-multiply pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, var(--brand-red) 0%, transparent 70%)",
                    opacity: 0.4,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
