import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Meraj Hossain" },
      { name: "description", content: "Get in touch with Meraj Hossain for graphic design, motion graphics and video editing projects." },
      { property: "og:title", content: "Contact — Meraj Hossain" },
      { property: "og:description", content: "Let's build something loud." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <SiteChrome>
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6">Get in touch</div>
          <h1 className="font-display uppercase text-6xl md:text-[10rem] leading-[0.85]">
            Let's <br />talk.
          </h1>
        </div>
      </section>
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Email</div>
              <a href="mailto:munnahosain042@gmail.com" className="font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors block break-all">munnahosain042@gmail.com</a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Phone</div>
              <a href="tel:+8801300294781" className="font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors">+880 1300-294781</a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Address</div>
              <div className="text-lg">1216 Nagar Kanda<br />Savar, Dhaka<br />Bangladesh</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Social</div>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-white/70">
                <a href="https://linkedin.com/in/merajhossain47" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a>
                <a href="#" className="hover:text-white">Behance ↗</a>
                <a href="#" className="hover:text-white">Instagram ↗</a>
              </div>
            </div>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">Name</label>
              <input type="text" className="w-full bg-transparent outline-none text-lg placeholder:text-white/20" placeholder="Your name" />
            </div>
            <div className="border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">Email</label>
              <input type="email" className="w-full bg-transparent outline-none text-lg placeholder:text-white/20" placeholder="you@studio.com" />
            </div>
            <div className="border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">Project</label>
              <textarea rows={4} className="w-full bg-transparent outline-none text-lg placeholder:text-white/20 resize-none" placeholder="Tell me what you're building" />
            </div>
            <button type="submit" className="w-full flex items-center justify-between border border-white/20 hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)] transition-all px-6 py-5 group">
              <span className="font-mono text-xs uppercase tracking-widest">Send message</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </form>
        </div>
      </section>
    </SiteChrome>
  );
}
