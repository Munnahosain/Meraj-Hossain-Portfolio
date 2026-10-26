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
import { InteractiveJ } from "@/components/Hero/InteractiveJ";
import { gsap, useGSAP } from "@/lib/gsap";
import { getExternalUrl, getImageSrc } from "@/lib/utils";
import { useRef } from "react";
import {
  useWebsiteSettings,
  useCMSProjects,
  useCMSServices,
  useCMSSkills,
  useCMSExperience,
  type CMSProject,
  type CMSService,
  type CMSSkill,
  type CMSExperience,
} from "@/hooks/use-cms";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Meraj Hossain — Graphics Designer & Motion Artist" },
      {
        name: "description",
        content:
          "Portfolio of Meraj Hossain — Graphics Designer, Video Editor and Motion Graphics Designer based in Dhaka, Bangladesh.",
      },
      { property: "og:title", content: "Meraj Hossain — Graphics & Motion Designer" },
      {
        property: "og:description",
        content: "Branding, motion graphics, video editing and visual storytelling.",
      },
    ],
  }),
});

interface HomepageProject {
  id?: string;
  title: string;
  year: string;
  cat: string;
  img: string;
}

interface HomepageService {
  n: string;
  t: string;
  d: string;
}

interface HomepageSkill {
  name: string;
  role: string;
}

interface HomepageExperience {
  role: string;
  org: string;
  years: string;
  note: string;
}

const defaultProjects: HomepageProject[] = [
  { title: "Micro Electronic Campaign", year: "2025", cat: "Branding · Print", img: reel1 },
  { title: "Adobe Stock — Motion Pack", year: "2024", cat: "Motion Graphics", img: reel3 },
  { title: "Social Reels Series", year: "2025", cat: "Video Editing", img: reel5 },
  { title: "Promo Cutdowns", year: "2024", cat: "Promo · Color", img: reel6 },
];

const defaultServices: HomepageService[] = [
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
    d: "Concept to screen — turning briefs into moments people remember.",
  },
];

const defaultStack: HomepageSkill[] = [
  { name: "Adobe Photoshop", role: "Retouch · Composite" },
  { name: "Adobe Illustrator", role: "Vector · Logo" },
  { name: "Adobe After Effects", role: "Motion · VFX" },
  { name: "Adobe Premiere Pro", role: "Edit · Color" },
];

const defaultExp: HomepageExperience[] = [
  {
    role: "Graphics Designer",
    org: "Micro Electronic, Dhaka",
    years: "2025 — Present",
    note: "Marketing campaigns, social creatives, print & branding.",
  },
  {
    role: "Contributor",
    org: "Adobe Stock",
    years: "2023 — Present",
    note: "Motion graphics templates and stock assets for global clients.",
  },
  {
    role: "Computer Operator",
    org: "KBS Network, Savar",
    years: "2022 — 2025",
    note: "Documentation and support for media & promotional projects.",
  },
];

function Index() {
  const heroRef = useRef<HTMLElement>(null);
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
    "I'm Meraj Hossain — a graphics designer and motion artist based in Savar, Dhaka. I work across branding, social media design, video editing and promotional content, powered by the Adobe Creative Suite and a real love for visual storytelling.";

  const displayProjects: HomepageProject[] = dbProjects?.length
    ? dbProjects.slice(0, 4).map((p: CMSProject) => ({
        title: p.title,
        year: p.createdAt ? new Date(p.createdAt).getFullYear().toString() : "2025",
        cat: p.category || "Project",
        img: p.thumbnail || reel1,
        id: p._id,
      }))
    : defaultProjects;

  const displayServices: HomepageService[] = dbServices?.length
    ? dbServices.map((s: CMSService, i: number) => ({
        n: s.number || `0${i + 1}`,
        t: s.title,
        d: s.description,
      }))
    : defaultServices;

  const displayStack: HomepageSkill[] = dbSkills?.length
    ? dbSkills.map((sk: CMSSkill) => ({
        name: sk.name,
        role: sk.role || sk.category || "Design",
      }))
    : defaultStack;

  const displayExp: HomepageExperience[] = dbExperience?.length
    ? dbExperience.map((ex: CMSExperience) => ({
        role: ex.position || ex.role || "Role",
        org: ex.company || ex.org || "Company",
        years: ex.period || ex.years || "Present",
        note: ex.description || ex.note || "",
      }))
    : defaultExp;

  const contactEmail = settings?.contact?.email || "munnahosain042@gmail.com";
  const contactPhone = settings?.contact?.phone || "+880 1300-294781";
  const contactLocation = settings?.contact?.address || "Nagar Kanda 1216 · Savar · Dhaka";

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline.fromTo(
          ".hero-meta",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.55, clearProps: "opacity,visibility,transform" },
        );
        timeline.fromTo(
          ".hero-first, .hero-last",
          { clipPath: "inset(0 0 100% 0)", autoAlpha: 0, y: 18 },
          {
            clipPath: "inset(0 0 0% 0)",
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            clearProps: "clipPath,opacity,visibility,transform",
          },
          "-=0.32",
        );
        timeline.fromTo(
          ".hero-portrait",
          { clipPath: "inset(0 0 100% 0)", autoAlpha: 0, y: 12 },
          {
            clipPath: "inset(0 0 0% 0)",
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            clearProps: "clipPath,opacity,visibility,transform",
          },
          "-=0.62",
        );
        timeline.fromTo(
          ".hero-positioning, .hero-actions, .hero-marquee, .hero-copy",
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            clearProps: "opacity,visibility,transform",
          },
          "-=0.34",
        );
      });

      return () => media.revert();
    },
    { scope: heroRef },
  );

  return (
    <SiteChrome>
      {/* HERO */}
      <section
        ref={heroRef}
        className="hero-section relative flex min-h-[calc(100svh-5rem)] flex-col justify-center px-5 py-8 sm:px-8 md:px-12 md:py-10"
      >
        <div className="hero-meta mb-8 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 sm:mb-10">
          <span>Portfolio / {new Date().getFullYear()}</span>
          <span className="hero-legend flex items-center gap-2">
            <span className="hero-legend-dot" />
            LIVE · <Timecode />
          </span>
        </div>

        <div className="hero-editorial-layout">
          <div className="hero-editorial-copy">
            <div className="hero-title-wrap relative flex w-full select-none flex-col justify-center">
              <h1
                className="hero-name hero-first relative z-10 font-display uppercase leading-[0.84] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 10.5vw, 9.5rem)" }}
              >
                <span className="block">{firstName}</span>
              </h1>
              <div className="hero-line" aria-hidden="true" />
              <h2
                className="hero-name hero-last relative z-30 font-display uppercase leading-[0.84] tracking-tight"
                style={{ fontSize: "clamp(3.25rem, 9.2vw, 8.5rem)" }}
              >
                <span className="block">{lastName}</span>
              </h2>
            </div>

            <p className="hero-positioning mt-7 max-w-xl text-left font-sans text-sm leading-relaxed text-white/65 sm:mt-8 sm:text-base">
              {heroSubtitle}
            </p>

            <div className="hero-actions mt-7 flex flex-wrap items-center justify-start gap-x-8 gap-y-4 sm:mt-9">
              <Link to="/projects" className="hero-work-link">
                Explore selected work <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/contact" className="hero-contact-link">
                Start a conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual-column">
            <InteractiveJ />
            <div className="hero-portrait relative z-10 mx-auto flex aspect-[4/5] w-full max-w-[440px] items-end justify-center">
              <img
                src={getImageSrc(heroImage)}
                alt={`${heroTitle} portrait`}
                fetchPriority="high"
                className="h-full w-auto max-w-full object-contain object-bottom transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
            <div className="hero-visual-caption">
              <span>{contactLocation}</span>
              <span>Graphics · Motion · Video</span>
            </div>
          </div>
        </div>

        <div className="hero-marquee mt-10 sm:mt-12">
          <ReelMarquee images={settings?.hero?.reelImages} />
        </div>

        <div className="hero-copy mx-auto mt-6 flex w-full max-w-6xl items-center justify-between gap-4 px-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45 sm:mt-8 sm:text-[10px] sm:tracking-[0.22em] md:px-0">
          <span>Graphics · Motion · Video</span>
          <a href="#about" className="hero-scroll-link">
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section-block relative scroll-mt-24 border-t border-white/5 px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-32"
      >
        <ScrollReveal className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 space-y-6 md:sticky md:top-28">
            <div className="section-number font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)]">
              [ 01 ] About
            </div>
            <div className="section-image-card relative mx-auto aspect-[4/5] max-w-xs overflow-hidden border border-white/10 bg-[var(--card)] md:mx-0">
              <img
                src={getImageSrc(aboutImage)}
                alt={`${heroTitle} portrait`}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[20%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-white/80">
                {heroTitle} · Dhaka
              </div>
            </div>
          </div>
          <div className="space-y-8 md:col-span-8 md:pt-9">
            <h2 className="max-w-5xl font-display text-4xl uppercase leading-[0.98] sm:text-5xl md:text-6xl xl:text-7xl">
              Graphics, motion and visual stories — made to{" "}
              <span className="text-[var(--primary)]">resonate.</span>
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{aboutDesc}</p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 pt-5 sm:grid-cols-4 md:gap-6">
              {displayStack.map((s) => (
                <div key={s.name} className="border-t border-white/10 pt-4">
                  <div className="font-display text-base uppercase leading-tight sm:text-lg">
                    {s.name}
                  </div>
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
      <section
        id="selected-work"
        className="section-block relative scroll-mt-24 border-t border-white/5 px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-32"
      >
        <ScrollReveal className="max-w-7xl mx-auto">
          <div className="section-header mb-10 flex items-end justify-between gap-5 sm:mb-14 md:mb-16">
            <div>
              <div className="section-number font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)] mb-4">
                [ 02 ] Selected work · {displayProjects.length} projects
              </div>
              <h2 className="section-title font-display text-5xl uppercase sm:text-6xl md:text-7xl">
                The archive
              </h2>
            </div>
            <Link
              to="/projects"
              className="archive-link shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/65 sm:text-xs"
            >
              View archive <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ScrollReveal
            stagger
            staggerMs={90}
            className="projects-editorial-grid homepage-projects-grid grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-16"
          >
            {displayProjects.map((p, i) => (
              <Link
                key={p.title + i}
                to={p.id ? "/project" : "/projects"}
                search={p.id ? { id: p.id } : undefined}
                className={`project-card homepage-project-card group block ${i === 0 ? "homepage-project-card-featured" : ""}`}
                aria-label={`${p.title}, ${p.cat}, ${p.year}`}
              >
                <div
                  className={`project-card-inner relative overflow-hidden border border-white/10 bg-[var(--card)] ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}
                >
                  <img
                    src={getImageSrc(p.img)}
                    alt={`${p.title} — ${p.cat}`}
                    width={800}
                    height={1000}
                    loading={i === 0 ? "eager" : "lazy"}
                    onError={(event) => {
                      event.currentTarget.src = reel1;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="project-card-shade absolute inset-0" aria-hidden="true" />
                  <div className="project-card-index absolute left-4 top-4 font-mono text-[10px] tracking-widest text-white/80 sm:left-5 sm:top-5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="project-card-category absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/80 sm:bottom-5 sm:left-5 sm:text-[10px]">
                    {p.cat}
                  </div>
                  <div className="project-card-arrow absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-[rgba(4,10,7,0.55)] text-lg text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] sm:bottom-5 sm:right-5">
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-white/10 pt-4 sm:mt-5">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl uppercase leading-tight transition-colors group-hover:text-[var(--primary)] sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45 sm:text-[10px] sm:tracking-widest">
                      {p.cat}
                    </p>
                  </div>
                  <span className="shrink-0 pt-1 font-mono text-[10px] text-white/45">
                    {p.year}
                  </span>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </ScrollReveal>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="relative scroll-mt-24 border-t border-white/5 px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-32"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10 grid gap-5 md:mb-14 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)]">
              [ 03 ] What I do
            </div>
            <h2 className="font-display text-5xl uppercase leading-[0.95] sm:text-6xl md:col-span-8 md:text-7xl">
              Design. Motion. Cut.
            </h2>
          </ScrollReveal>
          <ScrollReveal
            stagger
            staggerMs={70}
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {displayServices.map((s) => (
              <div
                key={s.n + s.t}
                className="service-row grid gap-x-5 gap-y-3 px-2 py-6 transition-colors group hover:bg-white/[0.02] sm:grid-cols-12 sm:gap-5 sm:py-8 md:py-10"
              >
                <div className="font-mono text-[10px] text-white/40 sm:col-span-1 sm:pt-2 sm:text-xs">
                  {s.n}
                </div>
                <h3 className="font-display text-3xl uppercase leading-tight transition-colors group-hover:text-[var(--primary)] sm:col-span-5 md:text-5xl">
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed text-white/60 sm:col-span-5 sm:pt-2 sm:text-base">
                  {s.d}
                </p>
                <div className="hidden items-center justify-end text-white/40 transition-colors group-hover:text-white sm:col-span-1 sm:flex">
                  →
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="relative scroll-mt-24 border-t border-white/5 px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-32"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10 flex items-end justify-between sm:mb-14">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-4">
                [ 04 ] Experience
              </div>
              <h2 className="font-display text-5xl uppercase sm:text-6xl md:text-7xl">Career</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal
            stagger
            staggerMs={100}
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {displayExp.map((x) => (
              <div
                key={x.role + x.years}
                className="experience-row grid gap-4 px-2 py-6 transition-colors group hover:bg-white/[0.02] sm:grid-cols-12 sm:gap-5 sm:py-8 md:py-10"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 sm:col-span-3 sm:pt-1 sm:text-xs">
                  {x.years}
                </div>
                <div className="sm:col-span-4">
                  <div className="font-display text-2xl uppercase leading-tight transition-colors group-hover:text-[var(--brand-red)] md:text-3xl">
                    {x.role}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
                    {x.org}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/60 sm:col-span-5 sm:pt-1 sm:text-base">
                  {x.note}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative scroll-mt-24 border-t border-white/5 px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-32"
      >
        <ScrollReveal className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-8">
            [ 05 ] Get in touch
          </div>
          <h2 className="mb-10 font-display text-[clamp(3.25rem,10vw,10rem)] uppercase leading-[0.9] sm:mb-14 md:mb-16">
            Let's make <br />
            <span
              className="text-[var(--brand-red)] italic font-normal"
              style={{ fontFamily: "serif" }}
            >
              something
            </span>{" "}
            loud.
          </h2>
          <div className="grid items-end gap-10 md:grid-cols-2 md:gap-16">
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
                  href={getExternalUrl(settings?.social?.linkedin?.url, "https://linkedin.com")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={getExternalUrl(settings?.social?.behance?.url, "https://behance.net")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Behance ↗
                </a>
                <a
                  href={getExternalUrl(settings?.social?.instagram?.url, "https://instagram.com")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
            <Link
              to="/contact"
              className="contact-card inline-flex items-center justify-between border border-white/20 hover:border-[var(--primary)] hover:bg-[var(--primary)] transition-all px-8 py-6 group"
            >
              <span className="font-mono text-xs uppercase tracking-widest">Start a project</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </SiteChrome>
  );
}
