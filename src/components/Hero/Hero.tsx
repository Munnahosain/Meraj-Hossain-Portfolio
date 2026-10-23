import { InteractiveJ } from "./InteractiveJ";

export function Hero({ children }: { children: React.ReactNode }) {
  return <div className="hero-root relative">{children}</div>;
}
