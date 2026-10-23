import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fetchWithAuth } from "@/lib/admin-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DEFAULT_REEL_IMAGES } from "@/components/ReelMarquee";

export const Route = createFileRoute("/admin/_layout/settings")({
  component: AdminSettings,
});

type SettingsData = Record<string, Record<string, unknown>>;

function getUploadImageSrc(src: string) {
  if (src.startsWith("/uploads/")) {
    return `/api/uploads/${encodeURIComponent(src.split("/").pop() || "")}`;
  }
  return src;
}

function AdminSettings() {
  const queryClient = useQueryClient();
  const [token] = useLocalStorage("admin_token", "");
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingReel, setIsUploadingReel] = useState(false);
  const [reelImageUrl, setReelImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchWithAuth<{ data: SettingsData }>(token, "/api/settings");
        setSettings(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [token]);

  const updateField = (section: string, field: string, value: unknown) => {
    setSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value },
      };
    });
  };

  const updateSocial = (platform: string, field: "url" | "enabled", value: string | boolean) => {
    setSettings((prev) => {
      if (!prev) return prev;
      const social = (prev.social || {}) as Record<string, { url: string; enabled: boolean }>;
      return {
        ...prev,
        social: {
          ...social,
          [platform]: { ...social[platform], [field]: value },
        },
      };
    });
  };

  const getReelImages = () => {
    const hero = (settings?.hero || {}) as Record<string, unknown>;
    return Array.isArray(hero.reelImages)
      ? hero.reelImages.filter((src): src is string => typeof src === "string" && src.trim() !== "")
      : [];
  };

  const updateReelImages = (images: string[]) => {
    updateField("hero", "reelImages", images);
  };

  const addReelImage = async (url: string) => {
    const cleanUrl = url.trim();
    if (!cleanUrl) return;
    setError("");
    try {
      const result = await fetchWithAuth<{
        success: boolean;
        data?: { url?: string };
        message?: string;
      }>(token, "/api/media", {
        method: "POST",
        body: JSON.stringify({
          url: cleanUrl,
          title: "Hero reel image",
          alt: "Hero reel image",
        }),
      });

      updateReelImages([...getReelImages(), result.data?.url || cleanUrl]);
      setReelImageUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add image URL");
    }
  };

  const removeReelImage = (index: number) => {
    updateReelImages(getReelImages().filter((_, i) => i !== index));
  };

  const loadDefaultReelImages = () => {
    updateReelImages(DEFAULT_REEL_IMAGES);
  };

  const uploadReelImage = async (file: File) => {
    setIsUploadingReel(true);
    setError("");
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      const result = await fetchWithAuth<{
        success: boolean;
        data?: { url?: string };
        message?: string;
      }>(token, "/api/media", {
        method: "POST",
        body: JSON.stringify({
          data: dataUrl,
          filename: file.name,
          title: file.name,
          alt: "Hero reel image",
        }),
      });

      if (!result.data?.url) {
        throw new Error(result.message || "Upload failed");
      }

      updateReelImages([...getReelImages(), result.data.url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploadingReel(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      const result = await fetchWithAuth<{ data?: SettingsData }>(token, "/api/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });
      queryClient.setQueryData(["website-settings"], result.data || settings);
      await queryClient.invalidateQueries({ queryKey: ["website-settings"] });
      setMessage("Settings saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="text-gray-400">Loading settings...</div>;
  if (!settings) return <div className="text-red-400">{error || "No settings found."}</div>;

  const socialPlatforms = [
    "facebook",
    "linkedin",
    "behance",
    "dribbble",
    "github",
    "instagram",
    "youtube",
    "twitter",
  ] as const;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Website Settings</h1>
          <p className="text-gray-500">Manage your portfolio content and branding</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[var(--brand-red)] hover:brightness-110"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && <p className="mb-4 text-sm text-green-400">{message}</p>}
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="reel">Hero Reel</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <SettingsSection title="Branding">
            {(["websiteName", "browserTitle", "websiteLogo", "favicon"] as const).map((field) => (
              <Field
                key={field}
                label={field}
                value={String((settings.branding as Record<string, string>)?.[field] || "")}
                onChange={(v) => updateField("branding", field, v)}
              />
            ))}
          </SettingsSection>
          <SettingsSection title="General Info">
            {(["ownerName", "profession", "tagline", "shortDescription"] as const).map((field) => (
              <Field
                key={field}
                label={field}
                value={String((settings.general as Record<string, string>)?.[field] || "")}
                onChange={(v) => updateField("general", field, v)}
                multiline={field === "shortDescription"}
              />
            ))}
          </SettingsSection>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <SettingsSection title="Contact Details">
            {(["email", "phone", "whatsapp", "address", "googleMapsLink"] as const).map((field) => (
              <Field
                key={field}
                label={field}
                value={String((settings.contact as Record<string, string>)?.[field] || "")}
                onChange={(v) => updateField("contact", field, v)}
              />
            ))}
          </SettingsSection>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4">
          <SettingsSection title="Hero Section">
            {(
              [
                "title",
                "subtitle",
                "description",
                "backgroundImage",
                "profileImage",
                "resumePdf",
                "resumeButtonText",
                "hireMeButtonText",
                "contactButtonText",
              ] as const
            ).map((field) => (
              <Field
                key={field}
                label={field}
                value={String((settings.hero as Record<string, string>)?.[field] || "")}
                onChange={(v) => updateField("hero", field, v)}
                multiline={field === "description"}
              />
            ))}
          </SettingsSection>
        </TabsContent>

        <TabsContent value="reel" className="space-y-4">
          <SettingsSection title="Hero Reel Images">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getReelImages().map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="overflow-hidden rounded-lg border border-gray-800 bg-black"
                >
                  <div className="aspect-[4/5] bg-neutral-950">
                    <img src={getUploadImageSrc(src)} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-3">
                    <span className="truncate text-xs text-gray-500">Image {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReelImage(index)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              {getReelImages().length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-800 bg-black p-6 text-sm text-gray-500">
                  <p className="mb-4">Default reel images are showing now.</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={loadDefaultReelImages}
                    className="border-gray-700 bg-gray-950 text-white hover:bg-gray-900"
                  >
                    Load Current Images
                  </Button>
                </div>
              )}
            </div>

            <div className="grid gap-3 rounded-lg border border-gray-800 bg-black p-4 md:grid-cols-[1fr_auto_auto] md:items-end">
              <div className="space-y-1.5">
                <Label htmlFor="hero-reel-url" className="text-gray-400">
                  Image URL
                </Label>
                <Input
                  id="hero-reel-url"
                  value={reelImageUrl}
                  onChange={(e) => setReelImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="border-gray-800 bg-gray-950 text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => void addReelImage(reelImageUrl)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus size={16} className="mr-2" />
                Add URL
              </Button>
              <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">
                <Upload size={16} className="mr-2" />
                {isUploadingReel ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingReel}
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (file) void uploadReelImage(file);
                  }}
                />
              </label>
            </div>
          </SettingsSection>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <SettingsSection title="Social Links">
            {socialPlatforms.map((platform) => {
              const entry = (
                settings.social as Record<string, { url: string; enabled: boolean }>
              )?.[platform] || { url: "", enabled: false };
              return (
                <div
                  key={platform}
                  className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900 p-4 sm:flex-row sm:items-center"
                >
                  <Label className="w-24 capitalize text-gray-400">{platform}</Label>
                  <Input
                    value={entry.url}
                    onChange={(e) => updateSocial(platform, "url", e.target.value)}
                    placeholder={`${platform} URL`}
                    className="flex-1 border-gray-800 bg-black text-white"
                  />
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={entry.enabled}
                      onCheckedChange={(v) => updateSocial(platform, "enabled", v)}
                    />
                    <span className="text-xs text-gray-500">Enabled</span>
                  </div>
                </div>
              );
            })}
          </SettingsSection>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <SettingsSection title="SEO">
            {(
              [
                "homepageTitle",
                "metaTitle",
                "metaDescription",
                "canonicalUrl",
                "ogImage",
                "robots",
              ] as const
            ).map((field) => (
              <Field
                key={field}
                label={field}
                value={String((settings.seo as Record<string, string>)?.[field] || "")}
                onChange={(v) => updateField("seo", field, v)}
                multiline={field === "metaDescription"}
              />
            ))}
          </SettingsSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const id = `field-${label}`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="capitalize text-gray-400">
        {label.replace(/([A-Z])/g, " $1").trim()}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-gray-800 bg-black text-white min-h-[80px]"
        />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-gray-800 bg-black text-white"
        />
      )}
    </div>
  );
}
