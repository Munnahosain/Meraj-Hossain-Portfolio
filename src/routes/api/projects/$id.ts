import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../../server/utils/db";
import { Project } from "../../../../server/models/Project";
import { extractTokenFromHeader, verifyToken } from "../../../../server/utils/jwt";
import { parseMediaUrl } from "../../../../server/utils/media-helper";

export const Route = createFileRoute("/api/projects/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          await connectDB();
          const project = await Project.findById(params.id).lean();
          if (!project) {
            return Response.json({ success: false, message: "Project not found" }, { status: 404 });
          }

          const driveMedia = project.googleDriveLink
            ? parseMediaUrl(project.googleDriveLink)
            : null;
          const youtubeMedia = project.youtubeLink ? parseMediaUrl(project.youtubeLink) : null;

          return Response.json({
            success: true,
            data: {
              ...project,
              mediaInfo: {
                googleDriveEmbed: driveMedia?.embedUrl || "",
                googleDriveStream: driveMedia?.streamUrl || "",
                youtubeEmbed: youtubeMedia?.embedUrl || "",
                youtubeStream: youtubeMedia?.streamUrl || "",
              },
            },
          });
        } catch (error) {
          console.error("API /api/projects/$id GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch project" },
            { status: 500 },
          );
        }
      },
      PUT: async ({ params, request }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const body = await request.json().catch(() => ({}));

          const updated = await Project.findByIdAndUpdate(params.id, { $set: body }, { new: true });

          if (!updated) {
            return Response.json({ success: false, message: "Project not found" }, { status: 404 });
          }

          return Response.json({
            success: true,
            data: updated,
            message: "Project updated successfully",
          });
        } catch (error) {
          console.error("API /api/projects/$id PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update project" },
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params, request }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const deleted = await Project.findByIdAndDelete(params.id);
          if (!deleted) {
            return Response.json({ success: false, message: "Project not found" }, { status: 404 });
          }

          return Response.json({ success: true, message: "Project deleted successfully" });
        } catch (error) {
          console.error("API /api/projects/$id DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete project" },
            { status: 500 },
          );
        }
      },
    },
  },
});
