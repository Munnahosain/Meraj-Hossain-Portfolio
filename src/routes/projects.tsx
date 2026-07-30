import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { useCMSProjects } from "@/hooks/use-cms";
import reel1 from "@/assets/reel-01.jpg";
import reel2 from "@/assets/reel-02.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel4 from "@/assets/reel-04.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Meraj Hossain" },
      {
        name: "description",
        content: "Selected graphics, motion and video projects by Meraj Hossain.",
      },
      { property: "og:title", content: "Projects — Meraj Hossain" },
      { property: "og:description", content: "Selected graphics, motion and video work." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

const defaultAll = [
  {
    title: "Micro Electronic Campaign",
    year: "2025",
    cat: "Branding · Print",
    client: "Micro Electronic, Dhaka",
    img: reel1,
  },
  {
    title: "Product Launch Reel",
    year: "2025",
    cat: "Video Editing",
    client: "In-house",
    img: reel2,
  },
  {
    title: "Adobe Stock — Motion Pack",
    year: "2024",
    cat: "Motion Graphics",
    client: "Adobe Stock",
    img: reel3,
  },
  {
    title: "Ramadan Social Series",
    year: "2025",
    cat: "Social · Design",
    client: "Freelance",
    img: reel4,
  },
  {
    title: "Promo Cutdowns",
    year: "2024",
    cat: "Promo · Color",
    client: "KBS Network",
    img: reel5,
  },
  {
    title: "Logo Sting Library",
    year: "2024",
    cat: "Motion Graphics",
    client: "Adobe Stock",
    img: reel6,
  },
];

function ProjectsPage() {
  const { data: dbProjects } = useCMSProjects();

  const displayProjects = dbProjects?.length
    ? dbProjects.map((p: any) => ({
        title: p.title,
        year: p.createdAt ? new Date(p.createdAt).getFullYear().toString() : "2025",
        cat: p.category || "Project",
        client: p.clientName || p.shortDescription || "Client Work",
        img: p.thumbnail || reel1,
        mediaInfo: p.mediaInfo,
      }))
    : defaultAll;

  return (
    <SiteChrome>
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6">
            Archive / 2022 — {new Date().getFullYear()}
          </div>
          <h1 className="font-display uppercase text-6xl md:text-[10rem] leading-[0.85]">
            Projects
          </h1>
        </div>
      </section>
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20">
          {displayProjects.map((p: any, i: number) => (
            <article key={p.title + i} className={`group ${i % 2 === 1 ? "md:mt-32" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
                {p.mediaInfo?.youtubeEmbed ? (
                  <iframe
                    src={p.mediaInfo.youtubeEmbed}
                    title={p.title}
                    className="w-full h-full object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : p.mediaInfo?.googleDriveEmbed ? (
                  <iframe
                    src={p.mediaInfo.googleDriveEmbed}
                    title={p.title}
                    className="w-full h-full object-cover border-0"
                    allow="autoplay"
                  />
                ) : (
                  <img
                    src={p.img}
                    alt={p.title}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur px-2 py-1 border border-white/10">
                  {p.cat}
                </div>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-display uppercase text-3xl md:text-4xl group-hover:text-[var(--brand-red)] transition-colors">
                    {p.title}
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-2">
                    {p.client}
                  </p>
                </div>
                <span className="font-mono text-xs text-white/40 shrink-0">{p.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
