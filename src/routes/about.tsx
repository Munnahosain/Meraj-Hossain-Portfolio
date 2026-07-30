import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import meraj from "@/assets/meraj.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Meraj Hossain" },
      {
        name: "description",
        content:
          "About Meraj Hossain — graphics designer, motion graphics artist and video editor based in Savar, Dhaka.",
      },
      { property: "og:title", content: "About — Meraj Hossain" },
      {
        property: "og:description",
        content: "Graphics designer and motion artist based in Dhaka, Bangladesh.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const skills = [
  "Graphic Design",
  "Motion Graphics",
  "Video Editing",
  "Color Grading",
  "Branding Design",
  "Visual Storytelling",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe After Effects",
  "Adobe Premiere Pro",
  "Microsoft Office",
];

const education = [
  {
    year: "2024",
    title: "Secondary School Certificate (SSC)",
    org: "Kondia High School & College",
  },
  { year: "2020", title: "Maulana — Quran Analyze", org: "Jamia Islamia Arabia, Savar" },
  { year: "2014", title: "Hafiz — Quran Memorization", org: "Nurul Quran Al-Islamia Academy" },
];

function AboutPage() {
  return (
    <SiteChrome>
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6">
            The designer
          </div>
          <h1 className="font-display uppercase text-6xl md:text-[10rem] leading-[0.85]">About</h1>
        </div>
      </section>
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10">
              <img
                src={meraj}
                alt="Meraj Hossain"
                className="w-full h-full object-cover grayscale-[15%]"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-8 text-lg md:text-xl text-white/70 leading-relaxed">
            <p>
              I'm Meraj Hossain — a creative graphics designer and motion graphics artist working
              across branding, social media design, video editing and promotional content.
            </p>
            <p>
              My craft sits in the Adobe Creative Suite — Photoshop, Illustrator, After Effects and
              Premiere Pro — powered by a love for visual storytelling, creative problem solving,
              and delivering high-quality designs for digital and print media.
            </p>
            <p className="text-white text-2xl md:text-4xl font-display uppercase leading-tight pt-4">
              Good design earns attention. Great design earns memory.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6">
            Skills
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span
                key={s}
                className="border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/70 hover:border-[var(--brand-red)] hover:text-white transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6">
            Education
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {education.map((e) => (
              <div key={e.title} className="grid md:grid-cols-12 gap-6 py-8">
                <div className="md:col-span-2 font-mono text-xs text-white/40 uppercase tracking-widest">
                  {e.year}
                </div>
                <div className="md:col-span-6 font-display uppercase text-2xl md:text-3xl">
                  {e.title}
                </div>
                <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-widest text-white/50 self-center">
                  {e.org}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
