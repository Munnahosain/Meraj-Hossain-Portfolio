import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fetchWithAuth } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/_layout/categories")({
  component: AdminCategories,
});

interface Category {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  displayOrder: number;
  hidden: boolean;
}

const emptyCategory = (): Omit<Category, "_id"> => ({
  name: "",
  description: "",
  icon: "",
  displayOrder: 0,
  hidden: false,
});

function AdminCategories() {
  const [token] = useLocalStorage("admin_token", "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyCategory());
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const result = await fetchWithAuth<{ data: Category[] }>(token, "/api/categories");
      setCategories(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyCategory());
    setDialogOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setForm({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
      displayOrder: category.displayOrder,
      hidden: category.hidden,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      if (editing) {
        await fetchWithAuth(token, `/api/categories/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await fetchWithAuth(token, "/api/categories", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setDialogOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await fetchWithAuth(token, `/api/categories/${id}`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category");
    }
  };

  if (isLoading) return <div className="text-gray-400">Loading categories...</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="text-gray-500">Organize your portfolio projects</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--brand-red)] hover:brightness-110">
          <Plus size={16} className="mr-2" />
          Add Category
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Order</TableHead>
              <TableHead className="text-gray-400">Hidden</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                  No categories yet.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat._id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{cat.name}</TableCell>
                  <TableCell className="text-gray-400">{cat.displayOrder}</TableCell>
                  <TableCell className="text-gray-400">{cat.hidden ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(cat)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cat._id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-950 border-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-gray-400">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-gray-800 bg-black"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border-gray-800 bg-black min-h-[60px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400">Icon</Label>
              <Input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="Icon name or URL"
                className="border-gray-800 bg-black"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400">Display Order</Label>
              <Input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })}
                className="border-gray-800 bg-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.hidden}
                onCheckedChange={(v) => setForm({ ...form, hidden: v })}
              />
              <Label className="text-gray-400">Hidden</Label>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-[var(--brand-red)] hover:brightness-110"
            >
              {isSaving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
