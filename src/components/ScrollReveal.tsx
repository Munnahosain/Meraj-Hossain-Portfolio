import {
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [delay]);

  if (stagger) {
    const items = Children.toArray(children);
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) =>
          isValidElement(child) ? (
            <div
              key={i}
              className="scroll-reveal-item"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + i * staggerMs}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + i * staggerMs}ms`,
                willChange: "opacity, transform",
              }}
            >
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
    <div ref={ref} className={`scroll-reveal ${isVisible ? "reveal-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
