"use client";
import { useRef, useEffect, useCallback } from "react";
import reel1 from "@/assets/reel-01.jpg";
import reel2 from "@/assets/reel-02.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel4 from "@/assets/reel-04.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";
import reel7 from "@/assets/reel-07.jpg";

const shots = [reel1, reel2, reel3, reel4, reel5, reel6, reel7];
const DOUBLED = [...shots, ...shots];

// ── Scroll wheel geometry ─────────────────────────────────────────
const RIB_WIDTH = 6; // px per rib groove
const RIB_COUNT = 200; // total ribs in the repeating strip
const RIB_STRIP_W = RIB_COUNT * RIB_WIDTH;
const R_LABEL = 5; // major tick every N ribs (used for ratio calc)
const WHEEL_TICK = RIB_WIDTH; // px per "tick" for ratio math

// ─────────────────────────────────────────────────────────────────
export function ReelMarquee() {
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
    const pi = hw / shots.length; // px per image slot
    s.current.halfWidth = hw;
    // 1 image = R_LABEL ribs on wheel → ratio = (R_LABEL * WHEEL_TICK) / perImage
    s.current.rulerRatio = (R_LABEL * WHEEL_TICK) / pi;

    s.current.autoRaf = requestAnimationFrame(auto);

    return () => {
      cancelAnimationFrame(s.current.autoRaf);
      cancelAnimationFrame(s.current.glideRaf);
    };
  }, [auto]);

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full select-none">
      {/* ── Image strip ─────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden py-1"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          cursor: "grab",
        }}
        onPointerDown={(e) => onDown(e, "img")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
          {DOUBLED.map((src, i) => (
            <div
              key={i}
              className="relative w-[220px] md:w-[280px] aspect-[4/5] shrink-0 overflow-hidden bg-neutral-900 rounded-sm"
            >
              <img
                src={src}
                alt=""
                width={800}
                height={1000}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 pointer-events-none"
              />
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

      {/* Curved masks that blend the strip into the background */}
      <div className="curved-mask-top z-20" />
      <div className="curved-mask-bottom z-20" />

      {/* ── Skeuomorphic Scroll Wheel ────────────────────────── */}
      <div
        ref={rulerWrapRef}
        className="relative w-full mt-8 flex justify-center"
        style={{ height: 56, cursor: "ew-resize" }}
        onPointerDown={(e) => onDown(e, "ruler")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {/* Blue recessed frame */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "min(100%, 640px)",
            height: 56,
            borderRadius: 6,
            background:
              "linear-gradient(180deg, #2a6fc4 0%, #3d7fd4 35%, #4a90e2 50%, #3d7fd4 65%, #2a6fc4 100%)",
            boxShadow:
              "inset 0 3px 8px rgba(0,0,0,0.55), inset 0 -2px 4px rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.4)",
            padding: "6px 12px",
          }}
        >
          {/* Inner recess */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              borderRadius: 4,
              background: "linear-gradient(180deg, #1a4a8a 0%, #2563a8 50%, #1a4a8a 100%)",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            {/* Edge fade */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, #1a4a8a 0%, transparent 12%, transparent 88%, #1a4a8a 100%)",
              }}
            />

            {/* Ribbed cylinder strip */}
            <div
              ref={rulerRef}
              className="absolute top-0 left-0 will-change-transform"
              style={{
                width: RIB_STRIP_W,
                height: "100%",
                background: `repeating-linear-gradient(
                  90deg,
                  #0a0a0a 0px,
                  #1a1a1a 1px,
                  #2a2a2a 2px,
                  #3d3d3d 3px,
                  #555 4px,
                  #3d3d3d 5px,
                  #2a2a2a ${RIB_WIDTH - 1}px,
                  #0a0a0a ${RIB_WIDTH}px
                )`,
                boxShadow:
                  "inset 0 4px 8px rgba(255,255,255,0.06), inset 0 -4px 8px rgba(0,0,0,0.5)",
              }}
            />

            {/* Cylinder highlight (top gloss) */}
            <div
              className="absolute inset-x-0 top-0 z-[5] pointer-events-none"
              style={{
                height: "45%",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)",
                borderRadius: "4px 4px 50% 50%",
              }}
            />

            {/* Drop shadow under wheel */}
            <div
              className="absolute inset-x-[8%] bottom-0 z-[5] pointer-events-none"
              style={{
                height: 4,
                background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.45))",
                filter: "blur(2px)",
              }}
            />

            {/* Fixed centre indicator */}
            <div
              className="absolute top-0 left-1/2 -translate-x-px z-20 pointer-events-none"
              style={{
                width: 2,
                height: "100%",
                background: "var(--brand-red)",
                boxShadow: "0 0 6px var(--brand-red)",
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
