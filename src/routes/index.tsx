import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { ReelMarquee } from "@/components/ReelMarquee";
import { Timecode } from "@/components/Timecode";
import meraj from "@/assets/meraj.jpg";
import merajPng from "@/assets/meraj.png";
import reel1 from "@/assets/reel-01.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  useWebsiteSettings,
  useCMSProjects,
  useCMSServices,
  useCMSSkills,
  useCMSExperience,
} from "@/hooks/use-cms";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Meraj Hossain â€” Graphics Designer & Motion Artist" },
      {
        name: "description",
        content:
          "Portfolio of Meraj Hossain â€” Graphics Designer, Video Editor and Motion Graphics Designer based in Dhaka, Bangladesh.",
      },
      { property: "og:title", content: "Meraj Hossain â€” Graphics & Motion Designer" },
      {
        property: "og:description",
        content: "Branding, motion graphics, video editing and visual storytelling.",
      },
    ],
  }),
});

const defaultProjects = [
  { title: "Micro Electronic Campaign", year: "2025", cat: "Branding · Print", img: reel1 },
  { title: "Adobe Stock â€” Motion Pack", year: "2024", cat: "Motion Graphics", img: reel3 },
  { title: "Social Reels Series", year: "2025", cat: "Video Editing", img: reel5 },
  { title: "Promo Cutdowns", year: "2024", cat: "Promo · Color", img: reel6 },
];

const defaultServices = [
  {
    n: "01",
    t: "Graphic Design",
    d: "Posters, social creatives, and print collateral built with typographic precision.",
  },
  {
    n: "02",
    t: "Motion Graphics",
    d: "Kinetic type, logo stings, and animated explainers in After Effects.",
  },
  {
    n: "03",
    t: "Video Editing",
    d: "Story-driven cuts for reels, ads, and long-form in Premiere Pro.",
  },
  {
    n: "04",
    t: "Color Grading",
    d: "Cinematic looks and consistent finishing across every deliverable.",
  },
  {
    n: "05",
    t: "Branding Design",
    d: "Logo systems, guidelines, and identity that scales across media.",
  },
  {
    n: "06",
    t: "Visual Storytelling",
    d: "Concept to screen â€” turning briefs into moments people remember.",
  },
];

const defaultStack = [
  { name: "Adobe Photoshop", role: "Retouch · Composite" },
  { name: "Adobe Illustrator", role: "Vector · Logo" },
  { name: "Adobe After Effects", role: "Motion · VFX" },
  { name: "Adobe Premiere Pro", role: "Edit Â· Color" },
];

const defaultExp = [
  {
    role: "Graphics Designer",
    org: "Micro Electronic, Dhaka",
    years: "2025 â€” Present",
    note: "Marketing campaigns, social creatives, print & branding.",
  },
  {
    role: "Contributor",
    org: "Adobe Stock",
    years: "2023 â€” Present",
    note: "Motion graphics templates and stock assets for global clients.",
  },
  {
    role: "Computer Operator",
    org: "KBS Network, Savar",
    years: "2022 â€” 2025",
    note: "Documentation and support for media & promotional projects.",
  },
];

function Index() {
  const { data: settings } = useWebsiteSettings();
  const { data: dbProjects } = useCMSProjects();
  const { data: dbServices } = useCMSServices();
  const { data: dbSkills } = useCMSSkills();
  const { data: dbExperience } = useCMSExperience();

  // Dynamic values with fallbacks
  const heroTitle = settings?.hero?.title || "Meraj Hossain";
  const titleParts = heroTitle.split(" ");
  const firstName = titleParts[0] || "Meraj";
  const lastName = titleParts.slice(1).join(" ") || "Hossain";

  const heroSubtitle =
    settings?.general?.shortDescription ||
    "Graphics designer, video editor and motion graphics artist. I build brands, cuts, and animations that stay on the retina.";
  const heroImage = settings?.hero?.profileImage || merajPng;
  const aboutImage = settings?.about?.profileImage || meraj;
  const aboutDesc =
    settings?.about?.description ||
    "I'm Meraj Hossain â€” a graphics designer and motion artist based in Savar, Dhaka. I work across branding, social media design, video editing and promotional content, powered by the Adobe Creative Suite and a real love for visual storytelling.";

  const displayProjects = dbProjects?.length
    ? dbProjects.slice(0, 4).map((p: any) => ({
        title: p.title,
        year: p.createdAt ? new Date(p.createdAt).getFullYear().toString() : "2025",
        cat: p.category || "Project",
        img: p.thumbnail || reel1,
        id: p._id,
      }))
    : defaultProjects;

  const displayServices = dbServices?.length
    ? dbServices.map((s: any, i: number) => ({
        n: s.number || `0${i + 1}`,
        t: s.title,
        d: s.description,
      }))
    : defaultServices;

  const displayStack = dbSkills?.length
    ? dbSkills.map((sk: any) => ({
        name: sk.name,
        role: sk.role || sk.category || "Design",
      }))
    : defaultStack;

  const displayExp = dbExperience?.length
    ? dbExperience.map((ex: any) => ({
        role: ex.position || ex.role || "Role",
        org: ex.company || ex.org || "Company",
        years: ex.period || ex.years || "Present",
        note: ex.description || ex.note || "",
      }))
    : defaultExp;

  const contactEmail = settings?.contact?.email || "munnahosain042@gmail.com";
  const contactPhone = settings?.contact?.phone || "+880 1300-294781";
  const contactLocation = settings?.contact?.address || "Nagar Kanda 1216 · Savar · Dhaka";

  return (
    <SiteChrome>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 py-10">
        {/* Meta bar â€” first to appear */}
        <div
          className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12"
          style={{
            animation: "heroFadeUp 1s cubic-bezier(0.19,1,0.22,1) 0.1s both",
          }}
        >
          <span>Portfolio / {new Date().getFullYear()}</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-red)] animate-hero-dot" />
            LIVE · <Timecode />
          </span>
        </div>

        {/* 3D Sandwich Name Container */}
        <div className="relative flex flex-col items-center justify-center my-6 md:my-10 w-full select-none">
          {/* Back Layer: First Name */}
          <h1
            className="font-display uppercase leading-[0.9] tracking-tight text-center relative z-10 hero-name"
            style={{
              fontSize: "clamp(3.5rem, 16vw, 16rem)",
              animation: "heroClip 1.3s cubic-bezier(0.19,1,0.22,1) 0.2s both",
            }}
          >
            <span className="block bg-gradient-to-b from-white via-white/80 to-white/30 bg-clip-text text-transparent">
              {firstName}
            </span>
          </h1>

          {/* Middle Layer: Portrait */}
          <div
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] aspect-square flex items-center justify-center z-20 hero-portrait"
            style={{
              animation: "heroScale 1.6s cubic-bezier(0.22,1,0.36,1) 0.45s both",
            }}
          >
            <img
              src={heroImage}
              alt={`${heroTitle} Portrait`}
              className="h-[105%] md:h-[115%] w-auto object-contain object-center transition-transform duration-700 ease-out will-change-transform"
            />
          </div>

          {/* Front Layer: Last Name */}
          <h1
            className="font-display uppercase leading-[0.9] tracking-tight text-center relative z-30 hero-name"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 15rem)",
              animation: "heroClip 1.3s cubic-bezier(0.19,1,0.22,1) 0.55s both",
            }}
          >
            <span className="block text-white/95 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
              {lastName}
            </span>
          </h1>
        </div>

        {/* Marquee */}
        <div
          className="mt-12"
          style={{ animation: "heroFadeUp 1s cubic-bezier(0.19,1,0.22,1) 0.7s both" }}
        >
          <ReelMarquee />
        </div>

        {/* Bottom descriptor row */}
        <div
          className="mt-10 flex items-center justify-center md:justify-start max-w-6xl mx-auto w-full px-6 md:px-0"
          style={{ animation: "heroFadeUp 1s cubic-bezier(0.19,1,0.22,1) 0.9s both" }}
        >
          <p className="max-w-md text-center md:text-left text-sm md:text-base text-white/60 leading-relaxed uppercase tracking-wider font-mono">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <ScrollReveal className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)]">
              [ 01 ] About
            </div>
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10 max-w-xs">
              <img
                src={aboutImage}
                alt="Portrait"
                className="w-full h-full object-cover grayscale-[20%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/80">
                {heroTitle} · Dhaka
              </div>
            </div>
          </div>
          <div className="md:col-span-8 space-y-8">
            <h2 className="font-display uppercase leading-[0.95] text-4xl md:text-7xl">
              Creative designer shaping brands that refuse to{" "}
              <span className="text-[var(--brand-red)]">whisper</span>.
            </h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">{aboutDesc}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              {displayStack.map((s: any) => (
                <div key={s.name} className="border-t border-white/10 pt-4">
                  <div className="font-display uppercase text-lg">{s.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-1">
                    {s.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* PROJECTS */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <ScrollReveal className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-4">
                [ 02 ] Selected work
              </div>
              <h2 className="font-display uppercase text-5xl md:text-7xl">Projects</h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:block font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-all"
            >
              View all â†’
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {displayProjects.map((p: any, i: number) => (
              <div
                key={p.title + i}
                className={`group cursor-pointer ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur px-2 py-1 border border-white/10">
                    {p.cat}
                  </div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-white/30 grid place-items-center backdrop-blur bg-black/40 group-hover:bg-[var(--brand-red)] group-hover:border-[var(--brand-red)] transition-all">
                    <span className="text-white text-lg">â–¶</span>
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display uppercase text-2xl md:text-3xl group-hover:text-[var(--brand-red)] transition-colors">
                    {p.title}
                  </h3>
                  <span className="font-mono text-xs text-white/40">{p.year}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* SERVICES */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)]">
              [ 03 ] What I do
            </div>
            <h2 className="md:col-span-8 font-display uppercase text-5xl md:text-7xl leading-[0.95]">
              Design. Motion. Cut.
            </h2>
          </ScrollReveal>
          <ScrollReveal
            stagger
            staggerMs={70}
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {displayServices.map((s: any) => (
              <div
                key={s.n + s.t}
                className="grid md:grid-cols-12 gap-8 py-8 md:py-10 group hover:bg-white/[0.02] transition-colors px-2"
              >
                <div className="md:col-span-1 font-mono text-xs text-white/40">{s.n}</div>
                <h3 className="md:col-span-5 font-display uppercase text-3xl md:text-5xl group-hover:text-[var(--brand-red)] transition-colors">
                  {s.t}
                </h3>
                <p className="md:col-span-5 text-white/60 leading-relaxed">{s.d}</p>
                <div className="md:col-span-1 flex md:justify-end items-center text-white/40 group-hover:text-white transition-colors">
                  â†’
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex items-end justify-between mb-16">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-4">
                [ 04 ] Experience
              </div>
              <h2 className="font-display uppercase text-5xl md:text-7xl">Career</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal
            stagger
            staggerMs={100}
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {displayExp.map((x: any) => (
              <div
                key={x.role + x.years}
                className="grid md:grid-cols-12 gap-6 py-8 md:py-10 group hover:bg-white/[0.02] transition-colors px-2"
              >
                <div className="md:col-span-3 font-mono text-xs text-white/40 uppercase tracking-widest">
                  {x.years}
                </div>
                <div className="md:col-span-4">
                  <div className="font-display uppercase text-2xl md:text-3xl group-hover:text-[var(--brand-red)] transition-colors">
                    {x.role}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-2">
                    {x.org}
                  </div>
                </div>
                <p className="md:col-span-5 text-white/60 leading-relaxed">{x.note}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <ScrollReveal className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-8">
            [ 05 ] Get in touch
          </div>
          <h2 className="font-display uppercase leading-[0.9] text-6xl md:text-[10rem] mb-16">
            Let's make <br />
            <span
              className="text-[var(--brand-red)] italic font-normal"
              style={{ fontFamily: "serif" }}
            >
              something
            </span>{" "}
            loud.
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div className="space-y-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  Email
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors break-all"
                >
                  {contactEmail}
                </a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  Phone
                </div>
                <a
                  href={`tel:${contactPhone}`}
                  className="font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors"
                >
                  {contactPhone}
                </a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  Based in
                </div>
                <div className="text-lg">{contactLocation}</div>
              </div>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-white/60">
                <a
                  href={settings?.social?.linkedin?.url || "https://linkedin.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  LinkedIn â†—
                </a>
                <a
                  href={settings?.social?.behance?.url || "https://behance.net"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Behance â†—
                </a>
                <a
                  href={settings?.social?.instagram?.url || "https://instagram.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Instagram â†—
                </a>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-between border border-white/20 hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)] transition-all px-8 py-6 group"
            >
              <span className="font-mono text-xs uppercase tracking-widest">Start a project</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">â†’</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </SiteChrome>
  );
}

