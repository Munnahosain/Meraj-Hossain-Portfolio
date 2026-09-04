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

const emptyProject = (): Omit<Project, "_id"> & {
  liveWebsite: string;
  googleDriveLink: string;
  youtubeLink: string;
  behanceLink: string;
  githubLink: string;
  clientName: string;
  galleryImages: string[];
  tags: string[];
} => ({
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
  liveWebsite: "",
  googleDriveLink: "",
  youtubeLink: "",
  behanceLink: "",
  githubLink: "",
  clientName: "",
  galleryImages: [],
  tags: [],
});

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Helpers to generate preview thumbnails for common link types
function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

function getYouTubeThumb(url: string) {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : url;
}

function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function getDriveThumb(url: string) {
  const id = extractGoogleDriveId(url);
  return id ? `https://drive.google.com/uc?id=${id}&export=view` : url;
}

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
      liveWebsite: (project as any).liveWebsite || "",
      googleDriveLink: (project as any).googleDriveLink || "",
      youtubeLink: (project as any).youtubeLink || "",
      behanceLink: (project as any).behanceLink || "",
      githubLink: (project as any).githubLink || "",
      clientName: (project as any).clientName || "",
      galleryImages: Array.isArray((project as any).galleryImages) ? (project as any).galleryImages : [],
      tags: Array.isArray((project as any).tags) ? (project as any).tags : [],
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        category: form.category || categories[0]?._id || "Uncategorized",
        slug: form.slug?.trim() || generateSlug(form.title || "project"),
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.fullDescription.trim(),
        galleryImages: Array.isArray(form.galleryImages) ? form.galleryImages : [],
        tags: Array.isArray(form.tags) ? form.tags : [],
      };

      if (!payload.title) {
        throw new Error("Project title is required");
      }

      if (editing) {
        await fetchWithAuth(token, `/api/projects/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await fetchWithAuth(token, "/api/projects", {
          method: "POST",
          body: JSON.stringify(payload),
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
        <Button onClick={openCreate} className="btn-primary">
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
                  <TableCell className="text-gray-400">{project.featured ? "Yes" : "No"}</TableCell>
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
              <div className="mt-2 text-xs text-gray-400">Or upload a file</div>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const reader = new FileReader();
                    reader.onload = async () => {
                      const dataUrl = String(reader.result || "");
                      // Upload to server
                      const res = await fetchWithAuth<{ success: boolean; data?: { url?: string }; message?: string }>(token, "/api/media", {
                        method: "POST",
                        body: JSON.stringify({
                          data: dataUrl,
                          filename: file.name,
                          title: form.title || file.name,
                          alt: form.shortDescription || file.name,
                        }),
                      });
                      if (res?.success && res.data?.url) {
                        setForm({ ...form, thumbnail: res.data.url });
                      } else {
                        setError(res?.message || "Upload failed");
                      }
                    };
                    reader.readAsDataURL(file);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Upload failed");
                  }
                }}
                className="mt-2 text-sm text-white"
              />
              {form.thumbnail ? (
                <div className="mt-3">
                  <div className="text-xs text-gray-400 mb-1">Preview</div>
                  <div className="w-40 h-24 bg-neutral-900 border border-gray-800 overflow-hidden rounded">
                    {/* Attempt to render image/video thumbnail */}
                    {form.thumbnail.includes("youtube.com") || form.thumbnail.includes("youtu.be") ? (
                      <img src={getYouTubeThumb(form.thumbnail)} alt="preview" className="w-full h-full object-cover" />
                    ) : form.thumbnail.includes("drive.google.com") ? (
                      <img src={getDriveThumb(form.thumbnail)} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <img src={form.thumbnail} alt="preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              ) : null}
            </FormField>
            <FormField label="Client Name">
              <Input
                value={(form as any).clientName || ""}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="border-gray-800 bg-black"
                placeholder="Client or brand"
              />
            </FormField>
            <FormField label="Live Website URL">
              <Input
                value={(form as any).liveWebsite || ""}
                onChange={(e) => setForm({ ...form, liveWebsite: e.target.value })}
                className="border-gray-800 bg-black"
                placeholder="https://example.com"
              />
            </FormField>
            <FormField label="Google Drive Link">
              <Input
                value={(form as any).googleDriveLink || ""}
                onChange={(e) => setForm({ ...form, googleDriveLink: e.target.value })}
                className="border-gray-800 bg-black"
                placeholder="https://drive.google.com/..."
              />
            </FormField>
            <FormField label="YouTube Link">
              <Input
                value={(form as any).youtubeLink || ""}
                onChange={(e) => setForm({ ...form, youtubeLink: e.target.value })}
                className="border-gray-800 bg-black"
                placeholder="https://youtube.com/watch?v=..."
              />
            </FormField>
            <FormField label="Behance Link">
              <Input
                value={(form as any).behanceLink || ""}
                onChange={(e) => setForm({ ...form, behanceLink: e.target.value })}
                className="border-gray-800 bg-black"
                placeholder="https://behance.net/..."
              />
            </FormField>
            <FormField label="GitHub Link">
              <Input
                value={(form as any).githubLink || ""}
                onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                className="border-gray-800 bg-black"
                placeholder="https://github.com/..."
              />
            </FormField>
            <FormField label="Gallery Images">
              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2">
                  Add multiple images to the project gallery
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Array.isArray((form as any).galleryImages) &&
                    (form as any).galleryImages.map((img: string, idx: number) => (
                      <div key={idx} className="relative group">
                        <div className="w-full aspect-square bg-neutral-900 border border-gray-800 overflow-hidden rounded">
                          <img src={img} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(form as any).galleryImages];
                            updated.splice(idx, 1);
                            setForm({ ...form, galleryImages: updated });
                          }}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <Input
                    value={(form as any)._galleryImageUrl || ""}
                    onChange={(e) => setForm({ ...form, _galleryImageUrl: e.target.value })}
                    className="border-gray-800 bg-black text-sm"
                    placeholder="Paste image URL or Google Drive link"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const url = (form as any)._galleryImageUrl;
                        if (url) {
                          const current = Array.isArray((form as any).galleryImages) ? (form as any).galleryImages : [];
                          setForm({
                            ...form,
                            galleryImages: [...current, url],
                            _galleryImageUrl: "",
                          });
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium"
                    >
                      Add Image
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const reader = new FileReader();
                          reader.onload = async () => {
                            const dataUrl = String(reader.result || "");
                            const res = await fetchWithAuth<{
                              success: boolean;
                              data?: { url?: string };
                              message?: string;
                            }>(token, "/api/media", {
                              method: "POST",
                              body: JSON.stringify({
                                data: dataUrl,
                                filename: file.name,
                                title: form.title || file.name,
                                alt: "Gallery image",
                              }),
                            });
                            if (res?.success && res.data?.url) {
                              const current = Array.isArray((form as any).galleryImages)
                                ? (form as any).galleryImages
                                : [];
                              setForm({
                                ...form,
                                galleryImages: [...current, res.data.url],
                              });
                            } else {
                              setError(res?.message || "Upload failed");
                            }
                          };
                          reader.readAsDataURL(file);
                        } catch (err) {
                          setError(err instanceof Error ? err.message : "Upload failed");
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium cursor-pointer"
                      style={{ appearance: "none" }}
                    />
                    <label htmlFor="gallery-upload" className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium cursor-pointer text-center">
                      Upload
                    </label>
                  </div>
                </div>
              </div>
            </FormField>
            <FormField label="Status">
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v as "draft" | "published" })}
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
              className="w-full btn-primary"
            >
              {isSaving ? "Saving..." : editing ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-gray-400">{label}</Label>
      {children}
    </div>
  );
}



