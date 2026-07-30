import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Plus, Trash2, Edit2 } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/education")({
  component: AdminEducation,
});

export function AdminEducation() {
  const [token] = useLocalStorage("admin_token", "");
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    degree: "",
    institution: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
    displayOrder: 1,
  });

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/education");
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
      const url = "/api/education";
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { _id: editingId, ...form } : form;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (json.success) {
        setForm({
          degree: "",
          institution: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
          displayOrder: items.length + 1,
        });
        setEditingId(null);
        fetchItems();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this education entry?")) return;
    try {
      const res = await fetch(`/api/education?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Education Settings</h1>
        <p className="text-gray-400">Manage your educational qualification details</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <form
          onSubmit={handleSave}
          className="md:col-span-5 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            {editingId ? "Edit Entry" : "Add Education Entry"}
          </h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Degree / Qualification
            </label>
            <input
              type="text"
              required
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="e.g. Higher Secondary Certificate"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Institution
            </label>
            <input
              type="text"
              required
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="e.g. Savar Cantonment Public School"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                Start Date
              </label>
              <input
                type="text"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
                placeholder="2020"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                End Date
              </label>
              <input
                type="text"
                required
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
                placeholder="2022"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Field of Study / Info
            </label>
            <input
              type="text"
              value={form.fieldOfStudy}
              onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="Science / Humanities"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white resize-none"
              placeholder="Key accomplishments or details..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[var(--brand-red)] text-white font-semibold py-2 rounded hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              {editingId ? "Update Entry" : "Add Entry"}
            </button>
          </div>
        </form>

        <div className="md:col-span-7 bg-gray-950 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Education Timeline</h2>
          {isLoading ? (
            <p className="text-gray-400">Loading timeline...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-500">No education records yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((x) => (
                <div
                  key={x._id}
                  className="p-4 bg-black border border-gray-800 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <span className="font-mono text-xs text-[var(--brand-red)]">
                      {x.startDate} — {x.endDate}
                    </span>
                    <h3 className="font-bold text-white text-lg mt-1">{x.degree}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{x.institution}</p>
                    {x.description && <p className="text-sm text-gray-300 mt-2">{x.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(x._id);
                        setForm({
                          degree: x.degree,
                          institution: x.institution,
                          fieldOfStudy: x.fieldOfStudy || "",
                          startDate: x.startDate,
                          endDate: x.endDate,
                          description: x.description || "",
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
