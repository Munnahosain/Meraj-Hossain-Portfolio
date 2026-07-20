import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Meraj Hossain" },
      { name: "description", content: "Graphic design, motion graphics, video editing, color grading and branding services by Meraj Hossain." },
      { property: "og:title", content: "Services — Meraj Hossain" },
      { property: "og:description", content: "Design, motion and edit services." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const services = [
  { n: "01", t: "Graphic Design", d: "Posters, social creatives and print collateral with typographic precision." },
  { n: "02", t: "Motion Graphics", d: "Kinetic type, logo stings and animated explainers in After Effects." },
  { n: "03", t: "Video Editing", d: "Story-driven cuts for reels, ads and long-form in Premiere Pro." },
  { n: "04", t: "Color Grading", d: "Cinematic looks and consistent finishing across every deliverable." },
  { n: "05", t: "Branding Design", d: "Logo systems, guidelines and identity that scales across media." },
  { n: "06", t: "Visual Storytelling", d: "Concept to screen — turning briefs into moments people remember." },
];

function ServicesPage() {
  return (
    <SiteChrome>
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6">Capabilities</div>
          <h1 className="font-display uppercase text-6xl md:text-[10rem] leading-[0.85]">Services</h1>
        </div>
      </section>
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto divide-y divide-white/10 border-y border-white/10">
          {services.map((s) => (
            <div key={s.n} className="grid md:grid-cols-12 gap-8 py-10 md:py-14 group hover:bg-white/[0.02] transition-colors px-2">
              <div className="md:col-span-1 font-mono text-xs text-white/40">{s.n}</div>
              <h2 className="md:col-span-5 font-display uppercase text-4xl md:text-6xl group-hover:text-[var(--brand-red)] transition-colors">{s.t}</h2>
              <p className="md:col-span-5 text-white/60 leading-relaxed text-lg">{s.d}</p>
              <div className="md:col-span-1 flex md:justify-end items-center text-white/40 group-hover:text-white transition-colors text-2xl">→</div>
            </div>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
