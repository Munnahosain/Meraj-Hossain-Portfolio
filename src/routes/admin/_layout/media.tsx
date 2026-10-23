import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Plus, Trash2, Search, Link as LinkIcon, Eye, Copy, Check } from "lucide-react";
import { fetchWithAuth } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/_layout/media")({
  component: AdminMedia,
});

export function AdminMedia() {
  const [token] = useLocalStorage("admin_token", "");
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    url: "",
    title: "",
    alt: "",
  });

  const fetchMedia = async () => {
    try {
      const result = await fetchWithAuth<{ data: any[] }>(token, "/api/media");
      if (result && (result as any).data) setMediaList((result as any).data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) return;

    try {
      const result = await fetchWithAuth<{ success: boolean }>(token, "/api/media", { method: "POST", body: JSON.stringify(form) });
      if (result && (result as any).success) {
        setForm({ url: "", title: "", alt: "" });
        fetchMedia();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const result = await fetchWithAuth<{ success: boolean }>(token, `/api/media?id=${id}`, { method: "DELETE" });
      if (result && (result as any).success) fetchMedia();
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter(
    (m) =>
      m.fileName?.toLowerCase().includes(search.toLowerCase()) ||
      m.url?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
        <p className="text-gray-400">
          Add external URLs, Google Drive links, and YouTube links here to reuse across pages
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <form
          onSubmit={handleSave}
          className="md:col-span-4 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4 h-fit"
        >
          <h2 className="text-xl font-bold text-white mb-2">Add Media URL</h2>
          <p className="text-xs text-gray-500 mb-4">
            Paste any image/video URL, Google Drive share URL, or YouTube video link.
          </p>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Media URL
            </label>
            <input
              type="url"
              required
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
              placeholder="https://drive.google.com/file/d/... or YouTube link"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Title / Name
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
              placeholder="e.g. Hero Cutdown"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white text-sm"
              placeholder="Describe this media..."
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary text-white font-semibold py-2 rounded transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} />
            Add to Library
          </button>
        </form>

        <div className="md:col-span-8 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="text-xl font-bold text-white">All Library Items</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search media..."
                className="w-full pl-9 pr-4 py-1.5 bg-black border border-gray-800 rounded-lg text-xs text-white outline-none focus:border-white"
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-gray-400">Loading Media Library...</p>
          ) : filteredMedia.length === 0 ? (
            <p className="text-gray-500 py-8 text-center text-sm">
              No media items found in the library.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedia.map((m) => (
                <div
                  key={m._id}
                  className="card overflow-hidden flex flex-col justify-between group"
                >
                  <div className="aspect-video bg-neutral-900 border-b border-gray-800 flex items-center justify-center relative overflow-hidden">
                    {m.fileType === "youtube" ? (
                      <div className="text-xs text-red-500 font-bold uppercase">YouTube Video</div>
                    ) : m.fileType === "gdrive" ? (
                      <div className="text-xs text-blue-500 font-bold uppercase">
                        Google Drive File
                      </div>
                    ) : m.fileType === "video" ? (
                      <video src={m.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={m.url} alt={m.altText} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-white text-xs truncate" title={m.fileName}>
                      {m.fileName}
                    </h3>
                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        onClick={() => copyToClipboard(m.url, m._id)}
                        className="p-1.5 border border-gray-800 hover:border-white rounded text-gray-400 hover:text-white transition-colors"
                        title="Copy direct URL"
                      >
                        {copiedId === m._id ? (
                          <Check size={14} className="text-emerald-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="p-1.5 border border-gray-800 hover:border-red-500 hover:bg-red-950/20 rounded text-red-400 hover:text-red-300 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

