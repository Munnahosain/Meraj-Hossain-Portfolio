import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/services")({
  component: AdminServices,
});

export function AdminServices() {
  const [token] = useLocalStorage("admin_token", "");
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    number: "01",
    title: "",
    description: "",
    icon: "Palette",
    displayOrder: 1,
    active: true,
  });

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const json = await res.json();
      if (json.success) setServices(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/api/services";
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
          number: `0${services.length + 1}`,
          title: "",
          description: "",
          icon: "Palette",
          displayOrder: services.length + 1,
          active: true,
        });
        setEditingId(null);
        fetchServices();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) fetchServices();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (s: any) => {
    setEditingId(s._id);
    setForm({
      number: s.number || "01",
      title: s.title || "",
      description: s.description || "",
      icon: s.icon || "Palette",
      displayOrder: s.displayOrder || 1,
      active: s.active !== false,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Services Management</h1>
        <p className="text-gray-400">Manage the services displayed on your website</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <form
          onSubmit={handleSave}
          className="md:col-span-5 bg-gray-950 border border-gray-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            {editingId ? "Edit Service" : "Add New Service"}
          </h2>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Number / Code
            </label>
            <input
              type="text"
              required
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="01"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Service Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              placeholder="e.g. Graphic Design"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white resize-none"
              placeholder="Brief service description..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                Order
              </label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                className="w-full rounded bg-black border border-gray-800 px-3 py-2 text-white outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[var(--brand-red)] text-white font-semibold py-2 rounded hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              {editingId ? "Update Service" : "Add Service"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    number: "01",
                    title: "",
                    description: "",
                    icon: "Palette",
                    displayOrder: 1,
                    active: true,
                  });
                }}
                className="px-4 py-2 border border-gray-800 rounded text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="md:col-span-7 bg-gray-950 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Existing Services</h2>
          {isLoading ? (
            <p className="text-gray-400">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500">No services found. Add your first service on the left.</p>
          ) : (
            <div className="space-y-3">
              {services.map((s) => (
                <div
                  key={s._id}
                  className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--brand-red)] font-bold">
                        {s.number}
                      </span>
                      <h3 className="font-semibold text-white">{s.title}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="p-2 text-red-400 hover:text-red-300"
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
