import { useRef, Children, isValidElement, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** If true, direct children animate in with a stagger */
  stagger?: boolean;
  /** Stagger interval in ms (default 80) */
  staggerMs?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
  staggerMs = 80,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger
          ? gsap.utils.toArray<HTMLElement>(".scroll-reveal-item", element)
          : [element];

        if (!targets.length) return;

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: delay / 1000,
            stagger: stagger ? staggerMs / 1000 : 0,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [delay, stagger, staggerMs], revertOnUpdate: true },
  );

  if (stagger) {
    const items = Children.toArray(children);
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) =>
          isValidElement(child) ? (
            <div key={i} className="scroll-reveal-item">
              {child}
            </div>
          ) : (
            child
          ),
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
