"use client";
import { useRef, useEffect, useCallback, useMemo } from "react";
import reel1 from "@/assets/reel-01.jpg";
import reel2 from "@/assets/reel-02.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel4 from "@/assets/reel-04.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";
import reel7 from "@/assets/reel-07.jpg";
import { getImageSrc } from "@/lib/utils";

export const DEFAULT_REEL_IMAGES = [reel1, reel2, reel3, reel4, reel5, reel6, reel7];

// ── Scroll wheel geometry ─────────────────────────────────────────
const RIB_WIDTH = 6; // px per rib groove
const RIB_COUNT = 200; // total ribs in the repeating strip
const RIB_STRIP_W = RIB_COUNT * RIB_WIDTH;
const R_LABEL = 5; // major tick every N ribs (used for ratio calc)
const WHEEL_TICK = RIB_WIDTH; // px per "tick" for ratio math

// ── 3D curved-wall geometry ───────────────────────────────────────
// Cells sit on the inside of a cylinder: centre is flat, the edges wrap toward the viewer.
const EDGE_ANGLE = 0.72; // rad (~41°) — how far round the cylinder the frame edge is
const THETA_CLAMP = 1.0; // rad — cells further out than this are off-screen anyway
const EDGE_FADE = 0.35; // opacity lost at the frame edge
const PERSPECTIVE_RATIO = 0.9; // perspective distance as a fraction of frame width
const PERSPECTIVE_MIN = 900; // px

// ─────────────────────────────────────────────────────────────────
export function ReelMarquee({ images }: { images?: string[] }) {
  const activeShots = useMemo(
    () => (images?.filter(Boolean).length ? images.filter(Boolean) : DEFAULT_REEL_IMAGES),
    [images],
  );
  const doubledShots = useMemo(() => [...activeShots, ...activeShots], [activeShots]);

  const frameRef = useRef<HTMLDivElement>(null);
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
    inView: false,
    reducedMotion: false,
    cells: [] as HTMLElement[],
    cellW: 0,
    stride: 0, // cell width + gap
    frameW: 0,
    radius: 0, // cylinder radius in px
  });

  // ── Paint DOM ──────────────────────────────────────────────────
  const draw = useCallback(() => {
    const { offset, halfWidth, rulerRatio } = s.current;

    // Carousel: wrap offset so it loops seamlessly
    if (trackRef.current && halfWidth > 0) {
      const w = ((offset % halfWidth) + halfWidth) % halfWidth;
      trackRef.current.style.transform = `translateX(-${w}px)`;

      // Wrap the strip round a cylinder: x → arc angle, then place + tilt each cell on it.
      const { cells, cellW, stride, frameW, radius } = s.current;
      const half = frameW / 2;
      if (half > 0 && radius > 0) {
        for (let i = 0; i < cells.length; i++) {
          const x = i * stride + cellW / 2 - w - half; // px from the frame centre
          const th = Math.max(-THETA_CLAMP, Math.min(THETA_CLAMP, x / radius));
          const dx = radius * Math.sin(th) - x; // pull inward as the surface curves away
          const z = radius * (1 - Math.cos(th)); // edges come toward the viewer
          const f = Math.min(1, (th / EDGE_ANGLE) ** 2);
          const cell = cells[i];
          cell.style.transform = `translate3d(${dx.toFixed(1)}px,0,${z.toFixed(1)}px) rotateY(${(-th).toFixed(4)}rad)`;
          cell.style.opacity = String(1 - EDGE_FADE * f);
        }
      }
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
    const st = s.current;
    st.autoRaf = 0;
    if (st.active || !st.inView || st.reducedMotion || document.hidden) return;
    st.offset += 1.0; // px / frame
    draw();
    st.autoRaf = requestAnimationFrame(auto);
  }, [draw]);

  const startAuto = useCallback(() => {
    const st = s.current;
    if (st.active || !st.inView || st.reducedMotion || document.hidden) return;
    cancelAnimationFrame(st.glideRaf);
    cancelAnimationFrame(st.autoRaf);
    st.glideRaf = 0;
    st.autoRaf = requestAnimationFrame(auto);
  }, [auto]);

  // ── Momentum glide (runs after pointer release) ────────────────
  const glide = useCallback(() => {
    const st = s.current;
    st.glideRaf = 0;
    if (!st.inView || st.reducedMotion || document.hidden) {
      startAuto();
      return;
    }
    st.vel *= 0.92;
    if (Math.abs(st.vel) < 0.3) {
      startAuto();
      return;
    }
    st.offset -= st.vel;
    draw();
    st.glideRaf = requestAnimationFrame(glide);
  }, [draw, startAuto]);

  // ── Pointer down ───────────────────────────────────────────────
  const onDown = useCallback((e: React.PointerEvent, src: "img" | "ruler") => {
    const st = s.current;
    cancelAnimationFrame(st.autoRaf);
    cancelAnimationFrame(st.glideRaf);
    st.autoRaf = 0;
    st.glideRaf = 0;
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
    if (st.reducedMotion || !st.inView || document.hidden) {
      startAuto();
    } else {
      st.glideRaf = requestAnimationFrame(glide);
    }
  }, [glide, startAuto]);

  // ── Measure responsively and only animate while visible ───────
  useEffect(() => {
    const el = trackRef.current;
    const frame = frameRef.current;
    if (!el || !frame) return;
    const state = s.current;

    const measure = () => {
      const firstCopy = el.children.item(0);
      const secondCopy = el.children.item(activeShots.length);
      if (!(firstCopy instanceof HTMLElement) || !(secondCopy instanceof HTMLElement)) return;

      // offsetLeft ignores CSS transforms (getBoundingClientRect would include the 3D tilt)
      const width = secondCopy.offsetLeft - firstCopy.offsetLeft;
      if (width <= 0) return;
      state.halfWidth = width;
      state.cells = Array.from(el.children) as HTMLElement[];
      state.cellW = firstCopy.offsetWidth;
      state.stride = width / activeShots.length;
      state.frameW = el.parentElement?.clientWidth ?? 0;
      state.radius = state.frameW / 2 / EDGE_ANGLE;
      if (el.parentElement) {
        el.parentElement.style.perspective = `${Math.max(PERSPECTIVE_MIN, state.frameW * PERSPECTIVE_RATIO)}px`;
      }
      state.offset = ((state.offset % width) + width) % width;
      const perImage = width / activeShots.length;
      state.rulerRatio = (R_LABEL * WHEEL_TICK) / perImage;
      draw();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    if (el.parentElement) resizeObserver.observe(el.parentElement);

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.reducedMotion = motionPreference.matches;
    const updateMotionPreference = () => {
      state.reducedMotion = motionPreference.matches;
      if (motionPreference.matches) {
        cancelAnimationFrame(state.autoRaf);
        cancelAnimationFrame(state.glideRaf);
        state.autoRaf = 0;
        state.glideRaf = 0;
      } else {
        startAuto();
      }
    };
    const updateVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(state.autoRaf);
        cancelAnimationFrame(state.glideRaf);
        state.autoRaf = 0;
        state.glideRaf = 0;
      } else {
        startAuto();
      }
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      state.inView = entry.isIntersecting;
      if (entry.isIntersecting) {
        startAuto();
      } else {
        cancelAnimationFrame(state.autoRaf);
        cancelAnimationFrame(state.glideRaf);
        state.autoRaf = 0;
        state.glideRaf = 0;
      }
    });

    intersectionObserver.observe(frame);
    motionPreference.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      cancelAnimationFrame(state.autoRaf);
      cancelAnimationFrame(state.glideRaf);
    };
  }, [activeShots.length, draw, startAuto]);

  // ─────────────────────────────────────────────────────────────
  return (
    <div ref={frameRef} className="relative w-full select-none hero-marquee-frame">
      <div
        className="relative w-full overflow-hidden py-12 hero-marquee-inner"
        style={{
          cursor: "grab",
          touchAction: "pan-y",
          perspective: `${PERSPECTIVE_MIN}px`, // replaced with a width-based value on measure
          perspectiveOrigin: "50% 50%",
        }}
        onPointerDown={(e) => onDown(e, "img")}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {/* soft brand-green glow on both edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-[rgba(25,194,130,0.22)] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-[rgba(25,194,130,0.22)] to-transparent"
        />
        <div
          ref={trackRef}
          className="flex gap-6 w-max"
          style={{ transformStyle: "preserve-3d" }}
        >
          {doubledShots.map((src, i) => (
            <div
              key={i}
              className="relative w-[220px] md:w-[280px] aspect-[4/5] shrink-0 bg-neutral-900 filmstrip-cell"
            >
              <img
                src={getImageSrc(src)}
                alt=""
                width={800}
                height={1000}
                draggable={false}
                onError={(event) => {
                  event.currentTarget.src = DEFAULT_REEL_IMAGES[i % DEFAULT_REEL_IMAGES.length];
                }}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
