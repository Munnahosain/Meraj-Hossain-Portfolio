import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fetchWithAuth } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/_layout/skills")({
  component: AdminSkills,
});

interface Skill {
  _id: string;
  name: string;
  percentage: number;
  category?: string;
  color?: string;
  displayOrder: number;
  hidden: boolean;
}

const emptySkill = (): Omit<Skill, "_id"> => ({
  name: "",
  percentage: 50,
  category: "",
  color: "#ffffff",
  displayOrder: 0,
  hidden: false,
});

function AdminSkills() {
  const [token] = useLocalStorage("admin_token", "");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptySkill());
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const result = await fetchWithAuth<{ data: Skill[] }>(token, "/api/skills?limit=1000");
      setSkills(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load skills");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptySkill());
    setDialogOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setForm({
      name: skill.name,
      percentage: skill.percentage,
      category: skill.category || "",
      color: skill.color || "#ffffff",
      displayOrder: skill.displayOrder,
      hidden: skill.hidden,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      if (editing) {
        await fetchWithAuth(token, `/api/skills/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await fetchWithAuth(token, "/api/skills", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setDialogOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save skill");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await fetchWithAuth(token, `/api/skills/${id}`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete skill");
    }
  };

  if (isLoading) return <div className="text-gray-400">Loading skills...</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <p className="text-gray-500">Manage your skill set</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--brand-red)] hover:brightness-110">
          <Plus size={16} className="mr-2" />
          Add Skill
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Percentage</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                  No skills yet.
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill._id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{skill.name}</TableCell>
                  <TableCell className="text-gray-400">{skill.percentage}%</TableCell>
                  <TableCell className="text-gray-400">{skill.category || "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(skill)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(skill._id)}
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
            <DialogTitle>{editing ? "Edit Skill" : "Add Skill"}</DialogTitle>
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
            <div className="space-y-2">
              <Label className="text-gray-400">Percentage: {form.percentage}%</Label>
              <Slider
                value={[form.percentage]}
                onValueChange={([v]) => setForm({ ...form, percentage: v })}
                max={100}
                step={1}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400">Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border-gray-800 bg-black"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400">Color</Label>
              <Input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="border-gray-800 bg-black h-10 w-20"
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
