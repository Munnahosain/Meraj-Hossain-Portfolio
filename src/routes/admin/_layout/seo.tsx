import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Save, Search, AlertCircle } from "lucide-react";
import { fetchWithAuth } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/_layout/seo")({
  component: AdminSEO,
});

export function AdminSEO() {
  const [token] = useLocalStorage("admin_token", "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [form, setForm] = useState({
    homepageTitle: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    robots: "index, follow",
  });

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        if (json.success && json.data?.seo) {
          const seo = json.data.seo;
          setForm({
            homepageTitle: seo.homepageTitle || "",
            metaTitle: seo.metaTitle || "",
            metaDescription: seo.metaDescription || "",
            keywords: Array.isArray(seo.keywords) ? seo.keywords.join(", ") : "",
            canonicalUrl: seo.canonicalUrl || "",
            ogImage: seo.ogImage || "",
            twitterCard: seo.twitterCard || "summary_large_image",
            robots: seo.robots || "index, follow",
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchSEO();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const keywordsArray = form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      await fetchWithAuth(token, "/api/settings", { method: "PUT", body: JSON.stringify({ seo: { ...form, keywords: keywordsArray } }) });
      setIsError(false);
      setMessage("SEO settings saved successfully!");
    } catch {
      setIsError(true);
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">SEO Settings</h1>
        <p className="text-gray-400">
          Configure search engine optimization meta tags and search presence
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400">
              Homepage browser Title
            </label>
            <input
              type="text"
              value={form.homepageTitle}
              onChange={(e) => setForm({ ...form, homepageTitle: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
              placeholder="e.g. Meraj Hossain — Graphics & Motion Designer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400">
              Meta Title
            </label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
              placeholder="e.g. Meraj Hossain Portfolio"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-widest text-gray-400">
            Meta Description
          </label>
          <textarea
            rows={3}
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm resize-none"
            placeholder="A short summary of your portfolio for search engine snippets..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-widest text-gray-400">
            Keywords (Comma-separated)
          </label>
          <input
            type="text"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
            placeholder="e.g. graphics design, video editing, motion graphics, portfolio"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400">
              Canonical URL
            </label>
            <input
              type="url"
              value={form.canonicalUrl}
              onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
              placeholder="https://merajhossain.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400">
              OG Image URL (Social Share Image)
            </label>
            <input
              type="text"
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
              placeholder="https://merajhossain.com/og-image.jpg"
            />
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded text-sm flex items-center gap-3 font-mono ${isError ? "bg-red-950/60 border border-red-800 text-red-400" : "bg-emerald-950/60 border border-emerald-800 text-emerald-400"}`}
          >
            <AlertCircle size={18} />
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary text-white font-semibold py-2.5 px-6 rounded disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <Save size={18} />
          {isSubmitting ? "Saving SEO settings..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}


