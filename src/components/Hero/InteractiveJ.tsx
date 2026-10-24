import { useEffect, useMemo, useRef, useState } from "react";
import { Bodies, Body, Engine, Events, Mouse, MouseConstraint, Runner, World } from "matter-js";
import { iconPositions, Breakpoint } from "./iconPositions";

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const initialOffsets = [
  { x: -48, y: -42 },
  { x: 42, y: -34 },
  { x: 10, y: 18 },
  { x: -42, y: 44 },
  { x: 44, y: 10 },
];

export function InteractiveJ() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "desktop",
  );

  const stageRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const icons = useMemo(() => iconPositions, []);

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const engine = Engine.create();
    engine.gravity.y = 0.8;
    const world = engine.world;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const thickness = 60;

    World.add(world, [
      Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, {
        isStatic: true,
      }),
      Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, {
        isStatic: true,
      }),
      Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, {
        isStatic: true,
      }),
    ]);

    const iconBodies = icons.map((icon, index) => {
      const size = icon.positions[breakpoint].size;
      const offset = initialOffsets[index] ?? { x: 0, y: 0 };
      const startX = width / 2 + offset.x;
      const startY = height / 2 + offset.y - 20;
      const body = Bodies.rectangle(startX, startY, size, size, {
        restitution: 0.45,
        friction: 0.25,
        frictionAir: 0.03,
        chamfer: { radius: 12 },
      });

      Body.setAngle(body, (Math.random() - 0.5) * 0.8);
      World.add(world, body);

      return {
        icon,
        body,
        el: iconRefs.current[icon.id],
      };
    });

    const mouse = Mouse.create(stage);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.18, render: { visible: false } },
    });
    World.add(world, mouseConstraint);

    const runner = Runner.create();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isIntersecting = false;
    let isRunning = false;
    const syncRunner = () => {
      const shouldRun = isIntersecting && !document.hidden && !motionPreference.matches;
      if (shouldRun === isRunning) return;
      isRunning = shouldRun;
      if (shouldRun) {
        Runner.run(runner, engine);
      } else {
        Runner.stop(runner);
      }
    };

    const renderIcons = () => {
      // transform-only: moving left/top every frame forces layout, transform stays on the compositor
      iconBodies.forEach(({ body, el }) => {
        if (!el) return;
        el.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
    };
    iconBodies.forEach(({ el }) => {
      if (!el) return;
      el.style.left = "0px";
      el.style.top = "0px";
    });
    renderIcons();
    Events.on(engine, "afterUpdate", renderIcons);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      syncRunner();
    });
    intersectionObserver.observe(stage);
    const handleVisibilityChange = () => syncRunner();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", syncRunner);

    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    return () => {
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", syncRunner);
      Events.off(engine, "afterUpdate", renderIcons);
      Runner.stop(runner);
      Mouse.clear(mouse);
      World.remove(world, mouseConstraint);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [breakpoint, icons]);

  return (
    <div className="physics-stage" ref={stageRef}>
      {icons.map((icon, index) => (
        <div
          key={icon.id}
          ref={(element) => {
            iconRefs.current[icon.id] = element;
          }}
          className="hero-icon-item pointer-events-auto"
          style={{
            width: icon.positions[breakpoint].size,
            height: icon.positions[breakpoint].size,
            left: `calc(50% + ${(initialOffsets[index] ?? { x: 0 }).x}px)`,
            top: `calc(50% + ${(initialOffsets[index] ?? { y: 0 }).y - 20}px)`,
            zIndex: icon.zIndex,
          }}
          aria-label={icon.label}
        >
          <div className="hero-icon-item-inner">
            <img
              src={icon.src}
              alt={icon.label}
              className="hero-icon-image"
              draggable={false}
              style={{ transform: `scale(${icon.scale})` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
