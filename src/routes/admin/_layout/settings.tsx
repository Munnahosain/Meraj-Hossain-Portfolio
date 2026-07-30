import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fetchWithAuth } from "@/lib/admin-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/_layout/settings")({
  component: AdminSettings,
});

type SettingsData = Record<string, Record<string, unknown>>;

function AdminSettings() {
  const [token] = useLocalStorage("admin_token", "");
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      await fetchWithAuth(token, "/api/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });
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
