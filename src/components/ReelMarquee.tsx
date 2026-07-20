import reel1 from "@/assets/reel-01.jpg";
import reel2 from "@/assets/reel-02.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel4 from "@/assets/reel-04.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";

const shots = [reel1, reel2, reel3, reel4, reel5, reel6];

export function ReelMarquee() {
  const doubled = [...shots, ...shots];
  return (
    <div className="relative w-full overflow-hidden py-12 select-none">
      {/* Curved Mask Overlays */}
      <div className="curved-mask-top" />
      <div className="curved-mask-bottom" />
      
      <div className="relative w-full overflow-hidden py-4"
        style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 25%, black 75%, transparent 100%)" }}>
        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((src, i) => (
            <div key={i} className="relative w-[220px] md:w-[280px] aspect-[4/5] shrink-0 overflow-hidden bg-neutral-900">
              <img src={src} alt="" width={800} height={1000} loading="lazy" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" />
              {i % 5 === 0 && (
                <div className="absolute inset-0 mix-blend-multiply"
                  style={{ background: "linear-gradient(135deg, var(--brand-red) 0%, transparent 70%)", opacity: 0.4 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

