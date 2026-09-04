import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { fetchWithAuth } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/_layout/experience")({
  component: AdminExperience,
});

export function AdminExperience() {
  const [token] = useLocalStorage("admin_token", "");
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    role: "",
    org: "",
    years: "2025 — Present",
    note: "",
    displayOrder: 1,
  });

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/experience");
      const json = await res.json();
      if (json.success) setItems(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/api/experience";
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { _id: editingId, ...form } : form;
      await fetchWithAuth(token, url, { method, body: JSON.stringify(body) });
      setForm({ role: "", org: "", years: "2025 � Present", note: "", displayOrder: items.length + 1 });
      setEditingId(null);
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    try {
      await fetchWithAuth(token, `/api/experience?id=${id}`, { method: "DELETE" });
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Experience & Career</h1>
        <p className="text-gray-400">Manage your work timeline and career experience</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <form
          onSubmit={handleSave}
          className="md:col-span-5 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            {editingId ? "Edit Entry" : "Add Experience Entry"}
          </h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Role / Position
            </label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="e.g. Senior Motion Designer"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Company / Organization
            </label>
            <input
              type="text"
              required
              value={form.org}
              onChange={(e) => setForm({ ...form, org: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="e.g. Micro Electronic, Dhaka"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Years / Period
            </label>
            <input
              type="text"
              required
              value={form.years}
              onChange={(e) => setForm({ ...form, years: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="2025 — Present"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Responsibilities / Notes
            </label>
            <textarea
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white resize-none"
              placeholder="Key accomplishments and role details..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 btn-primary text-white font-semibold py-2 rounded transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              {editingId ? "Update Entry" : "Add Entry"}
            </button>
          </div>
        </form>

        <div className="md:col-span-7 bg-gray-950 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Career Timeline</h2>
          {isLoading ? (
            <p className="text-gray-400">Loading timeline...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-500">No experience records yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((x) => (
                <div
                  key={x._id}
                  className="p-4 bg-black border border-gray-800 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <span className="font-mono text-xs text-[var(--primary)]">{x.years}</span>
                    <h3 className="font-bold text-white text-lg mt-1">{x.role}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{x.org}</p>
                    {x.note && <p className="text-sm text-gray-300 mt-2">{x.note}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(x._id);
                        setForm({
                          role: x.role,
                          org: x.org,
                          years: x.years,
                          note: x.note || "",
                          displayOrder: x.displayOrder || 1,
                        });
                      }}
                      className="p-1.5 text-gray-400 hover:text-white"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(x._id)}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
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

