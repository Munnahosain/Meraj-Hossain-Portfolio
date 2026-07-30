import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Project } from "../../../server/models/Project";
import { ensureInitialSeed } from "../../../server/utils/seed-defaults";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";
import { parseMediaUrl } from "../../../server/utils/media-helper";

export const Route = createFileRoute("/api/projects")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          await connectDB();
          await ensureInitialSeed();

          const url = new URL(request.url);
          const showAll = url.searchParams.get("all") === "true";

          let query = {};
          if (!showAll) {
            query = { hidden: { $ne: true } };
          }

          const rawProjects = await Project.find(query)
            .sort({ displayOrder: 1, createdAt: -1 })
            .lean();

          // Process Google Drive & YouTube links automatically for every project
          const processedProjects = rawProjects.map((p) => {
            const driveMedia = p.googleDriveLink ? parseMediaUrl(p.googleDriveLink) : null;
            const youtubeMedia = p.youtubeLink ? parseMediaUrl(p.youtubeLink) : null;

            return {
              ...p,
              mediaInfo: {
                googleDriveEmbed: driveMedia?.embedUrl || "",
                googleDriveStream: driveMedia?.streamUrl || "",
                youtubeEmbed: youtubeMedia?.embedUrl || "",
                youtubeStream: youtubeMedia?.streamUrl || "",
              },
            };
          });

          return Response.json({ success: true, data: processedProjects });
        } catch (error) {
          console.error("API /api/projects GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch projects" },
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const body = await request.json().catch(() => ({}));

          if (!body.title) {
            return Response.json(
              { success: false, message: "Project title is required" },
              { status: 400 },
            );
          }

          const slug =
            body.slug ||
            body.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, "");

          const newProject = await Project.create({
            title: body.title,
            slug: `${slug}-${Date.now().toString().slice(-4)}`,
            category: body.category || "Uncategorized",
            shortDescription: body.shortDescription || "",
            fullDescription: body.fullDescription || "",
            thumbnail: body.thumbnail || "/assets/reel-01.jpg",
            galleryImages: Array.isArray(body.galleryImages) ? body.galleryImages : [],
            googleDriveLink: body.googleDriveLink || "",
            youtubeLink: body.youtubeLink || "",
            liveWebsite: body.liveWebsite || "",
            behanceLink: body.behanceLink || "",
            githubLink: body.githubLink || "",
            tags: Array.isArray(body.tags) ? body.tags : [],
            featured: Boolean(body.featured),
            hidden: Boolean(body.hidden),
            displayOrder: Number(body.displayOrder) || 0,
            status: body.status || "published",
          });

          return Response.json({
            success: true,
            data: newProject,
            message: "Project created successfully",
          });
        } catch (error) {
          console.error("API /api/projects POST error:", error);
          return Response.json(
            { success: false, message: "Failed to create project" },
            { status: 500 },
          );
        }
      },
    },
  },
});
