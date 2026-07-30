import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { useWebsiteSettings } from "@/hooks/use-cms";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Meraj Hossain" },
      {
        name: "description",
        content:
          "Get in touch with Meraj Hossain for graphic design, motion graphics and video editing projects.",
      },
      { property: "og:title", content: "Contact — Meraj Hossain" },
      { property: "og:description", content: "Let's build something loud." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const { data: settings } = useWebsiteSettings();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const emailVal = settings?.contact?.email || "munnahosain042@gmail.com";
  const phoneVal = settings?.contact?.phone || "+880 1300-294781";
  const addressVal = settings?.contact?.address || "1216 Nagar Kanda, Savar, Dhaka, Bangladesh";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: "Portfolio Inquiry", message }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg(data.message || "Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedbackMsg(data.message || "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setFeedbackMsg("Network error. Please try again.");
    }
  };

  return (
    <SiteChrome>
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brand-red)] mb-6">
            Get in touch
          </div>
          <h1 className="font-display uppercase text-6xl md:text-[10rem] leading-[0.85]">
            Let's <br />
            talk.
          </h1>
        </div>
      </section>
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Email
              </div>
              <a
                href={`mailto:${emailVal}`}
                className="font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors block break-all"
              >
                {emailVal}
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Phone
              </div>
              <a
                href={`tel:${phoneVal}`}
                className="font-display uppercase text-2xl md:text-3xl hover:text-[var(--brand-red)] transition-colors"
              >
                {phoneVal}
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Address
              </div>
              <div className="text-lg leading-relaxed whitespace-pre-line">{addressVal}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Social
              </div>
              <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-white/70">
                <a
                  href={settings?.social?.linkedin?.url || "https://linkedin.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={settings?.social?.behance?.url || "https://behance.net"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Behance ↗
                </a>
                <a
                  href={settings?.social?.instagram?.url || "https://instagram.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none text-lg placeholder:text-white/20"
                placeholder="Your name"
              />
            </div>
            <div className="border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-lg placeholder:text-white/20"
                placeholder="you@studio.com"
              />
            </div>
            <div className="border-b border-white/20 focus-within:border-[var(--brand-red)] transition-colors pb-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                Project
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent outline-none text-lg placeholder:text-white/20 resize-none"
                placeholder="Tell me what you're building"
              />
            </div>

            {feedbackMsg && (
              <div
                className={`p-4 font-mono text-xs uppercase tracking-widest ${status === "success" ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800" : "bg-red-950/60 text-red-400 border border-red-800"}`}
              >
                {feedbackMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-between border border-white/20 hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)] transition-all px-6 py-5 group disabled:opacity-50"
            >
              <span className="font-mono text-xs uppercase tracking-widest">
                {status === "submitting" ? "Sending..." : "Send message"}
              </span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </form>
        </div>
      </section>
    </SiteChrome>
  );
}
