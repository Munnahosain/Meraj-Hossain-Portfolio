import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fetchWithAuth } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/_layout/portfolio")({
  component: AdminPortfolio,
});

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  featured: boolean;
  hidden: boolean;
  status: "draft" | "published";
  displayOrder: number;
}

interface Category {
  _id: string;
  name: string;
}

const emptyProject = (): Omit<Project, "_id"> => ({
  title: "",
  slug: "",
  category: "",
  shortDescription: "",
  fullDescription: "",
  thumbnail: "",
  featured: false,
  hidden: false,
  status: "draft",
  displayOrder: 0,
});

function AdminPortfolio() {
  const [token] = useLocalStorage("admin_token", "");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject());
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetchWithAuth<{ data: Project[] }>(token, "/api/projects?limit=1000"),
        fetchWithAuth<{ data: Category[] }>(token, "/api/categories"),
      ]);
      setProjects(projectsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyProject());
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      thumbnail: project.thumbnail,
      featured: project.featured,
      hidden: project.hidden,
      status: project.status,
      displayOrder: project.displayOrder,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      if (editing) {
        await fetchWithAuth(token, `/api/projects/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await fetchWithAuth(token, "/api/projects", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setDialogOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetchWithAuth(token, `/api/projects/${id}`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  if (isLoading) return <div className="text-gray-400">Loading portfolio...</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-500">Manage your projects</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--brand-red)] hover:brightness-110">
          <Plus size={16} className="mr-2" />
          Add Project
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Featured</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                  No projects yet. Add your first project.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{project.title}</TableCell>
                  <TableCell className="text-gray-400 capitalize">{project.status}</TableCell>
                  <TableCell className="text-gray-400">
                    {project.featured ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(project)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project._id)}
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
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-gray-950 border-gray-800 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <FormField label="Title">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border-gray-800 bg-black"
              />
            </FormField>
            <FormField label="Slug">
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated if empty"
                className="border-gray-800 bg-black"
              />
            </FormField>
            <FormField label="Category">
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="border-gray-800 bg-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Short Description">
              <Textarea
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                className="border-gray-800 bg-black min-h-[60px]"
              />
            </FormField>
            <FormField label="Full Description">
              <Textarea
                value={form.fullDescription}
                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                className="border-gray-800 bg-black min-h-[100px]"
              />
            </FormField>
            <FormField label="Thumbnail URL">
              <Input
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                className="border-gray-800 bg-black"
              />
            </FormField>
            <FormField label="Status">
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({ ...form, status: v as "draft" | "published" })
                }
              >
                <SelectTrigger className="border-gray-800 bg-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.featured}
                  onCheckedChange={(v) => setForm({ ...form, featured: v })}
                />
                <Label className="text-gray-400">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.hidden}
                  onCheckedChange={(v) => setForm({ ...form, hidden: v })}
                />
                <Label className="text-gray-400">Hidden</Label>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-[var(--brand-red)] hover:brightness-110"
            >
              {isSaving ? "Saving..." : editing ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-gray-400">{label}</Label>
      {children}
    </div>
  );
}
