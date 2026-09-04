import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/project")({
  component: ProjectPage,
  head: () => ({
    meta: [{ title: "Project — Meraj Hossain" }],
  }),
});

function ProjectPage() {
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      setError("No project specified");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`);
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) {
          setError(json?.message || "Failed to load project");
        } else {
          setProject(json.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return (
    <SiteChrome>
      <div className="px-6 md:px-12 py-16">Loading project...</div>
    </SiteChrome>
  );

  if (error || !project) return (
    <SiteChrome>
      <div className="px-6 md:px-12 py-16 text-red-400">{error || 'Project not found'}</div>
    </SiteChrome>
  );

  return (
    <SiteChrome>
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display uppercase text-5xl mb-4">{project.title}</h1>
          <p className="text-white/60 mb-6">{project.shortDescription}</p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main thumbnail */}
          <div className="md:col-span-2">
            <div className="w-full bg-neutral-900 border border-white/5 overflow-hidden rounded">
              {project.mediaInfo?.youtubeEmbed ? (
                <iframe
                  src={project.mediaInfo.youtubeEmbed}
                  title={project.title}
                  className="w-full h-[480px] object-cover border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : project.mediaInfo?.googleDriveEmbed ? (
                <iframe
                  src={project.mediaInfo.googleDriveEmbed}
                  title={project.title}
                  className="w-full h-[480px] object-cover border-0"
                  allow="autoplay"
                />
              ) : (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-[480px] object-cover"
                />
              )}
            </div>

            {/* Gallery */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {(project.galleryImages || []).map((img: string, i: number) => (
                <div key={img + i} className="overflow-hidden rounded shadow-sm">
                  <a href={img} target="_blank" rel="noreferrer">
                    <img src={img} alt={`gallery-${i}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-400" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-neutral-900 border border-white/5 p-4 rounded">
              <h3 className="font-mono text-xs uppercase text-white/60">Details</h3>
              <div className="mt-3 text-sm text-white/80">
                <p><strong>Client:</strong> {project.clientName || "—"}</p>
                <p className="mt-2"><strong>Category:</strong> {project.category || "—"}</p>
                <p className="mt-2"><strong>Year:</strong> {project.createdAt ? new Date(project.createdAt).getFullYear() : "—"}</p>
                {project.liveWebsite && (
                  <p className="mt-2"><a href={project.liveWebsite} className="text-[var(--brand-green)] underline" target="_blank" rel="noreferrer">Live site</a></p>
                )}
                {project.behanceLink && (
                  <p className="mt-2"><a href={project.behanceLink} className="text-[var(--brand-green)] underline" target="_blank" rel="noreferrer">Behance</a></p>
                )}
                {project.githubLink && (
                  <p className="mt-2"><a href={project.githubLink} className="text-[var(--brand-green)] underline" target="_blank" rel="noreferrer">Repository</a></p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteChrome>
  );
}
