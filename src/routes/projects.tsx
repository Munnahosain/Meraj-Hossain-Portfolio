import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useCMSProjects, type CMSProject } from "@/hooks/use-cms";
import reel1 from "@/assets/reel-01.jpg";
import reel2 from "@/assets/reel-02.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel4 from "@/assets/reel-04.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";
import { getImageSrc } from "@/lib/utils";

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

interface ArchiveProject {
  id?: string;
  title: string;
  year: string;
  cat: string;
  client: string;
  img: string;
  mediaInfo?: CMSProject["mediaInfo"];
}

const defaultAll: ArchiveProject[] = [
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

  const displayProjects: ArchiveProject[] = dbProjects?.length
    ? dbProjects.map((p: CMSProject) => ({
        id: p._id,
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
      <section className="projects-page-intro px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24">
        <ScrollReveal className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] sm:mb-6">
            <span>Selected work / Archive</span>
            <span>{String(displayProjects.length).padStart(2, "0")} works</span>
          </div>
          <h1 className="font-display text-6xl uppercase leading-[0.85] sm:text-7xl md:text-[10rem]">
            Projects
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            A selection of graphics, motion and video work.
          </p>
        </ScrollReveal>
      </section>
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 md:px-12 md:pb-32">
        <ScrollReveal
          stagger
          staggerMs={90}
          className="projects-editorial-grid archive-project-grid mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-16"
        >
          {displayProjects.map((p, i) => {
            const card = (
              <article className="project-card group block">
                <div
                  className={`project-card-inner relative overflow-hidden border border-white/10 bg-[var(--card)] ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}
                >
                  {p.mediaInfo?.youtubeEmbed ? (
                    <iframe
                      src={p.mediaInfo.youtubeEmbed}
                      title={p.title}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : p.mediaInfo?.googleDriveEmbed ? (
                    <iframe
                      src={p.mediaInfo.googleDriveEmbed}
                      title={p.title}
                      className="h-full w-full border-0"
                      allow="autoplay"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={getImageSrc(p.img)}
                      alt={p.title}
                      width={800}
                      height={1000}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = reel1;
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  )}
                  <div className="project-card-index absolute left-4 top-4 font-mono text-[10px] tracking-widest text-white/80 sm:left-5 sm:top-5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-4 left-4 max-w-[calc(100%-4rem)] border border-white/10 bg-[rgba(4,10,7,0.7)] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white/75 backdrop-blur sm:bottom-5 sm:left-5 sm:text-[10px]">
                    {p.cat}
                  </div>
                  <div className="project-card-arrow absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-[rgba(4,10,7,0.55)] text-lg text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] sm:bottom-5 sm:right-5">
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-white/10 pt-4 sm:mt-5">
                  <div>
                    <h2 className="font-display text-2xl uppercase leading-tight transition-colors group-hover:text-[var(--brand-red)] md:text-3xl">
                      {p.title}
                    </h2>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">
                      {p.client}
                    </p>
                  </div>
                  <span className="shrink-0 pt-1 font-mono text-[10px] text-white/45">
                    {p.year}
                  </span>
                </div>
              </article>
            );

            return p.id ? (
              <Link
                key={p.id}
                to="/project"
                search={{ id: p.id }}
                className="project-card block"
                aria-label={`${p.title}, ${p.cat}, ${p.year}`}
              >
                {card}
              </Link>
            ) : (
              <div key={(p.title || "project") + i}>{card}</div>
            );
          })}
        </ScrollReveal>
      </section>
    </SiteChrome>
  );
}
