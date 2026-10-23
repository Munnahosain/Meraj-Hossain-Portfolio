import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Media } from "../../../server/models/Media";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";
import { parseMediaUrl } from "../../../server/utils/media-helper";
import { uploadToCloudinary } from "../../../server/utils/cloudinary";

export const Route = createFileRoute("/api/media")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const items = await Media.find().sort({ createdAt: -1 }).lean();
          return Response.json({ success: true, data: items });
        } catch (error) {
          console.error("API /api/media GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch media" },
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
          const { url, title, alt, data, filename } = body as any;

          // If client sent base64 data (data URL), upload to Cloudinary
          if (data) {
            const match = String(data).match(/^data:(.+);base64,(.+)$/);
            if (!match) {
              return Response.json({ success: false, message: "Invalid data format" }, { status: 400 });
            }

            const mime = match[1];
            const b64 = match[2];
            const buffer = Buffer.from(b64, "base64");

            const result: any = await uploadToCloudinary(buffer, filename || title || `upload-${Date.now()}`);

            const newMedia = await Media.create({
              fileName: result.public_id || title || filename || "upload",
              originalName: title || filename || "upload",
              url: result.secure_url,
              mimeType: mime,
              fileType: mime.startsWith("video/") ? "video" : "image",
              size: result.bytes || buffer.length,
              altText: alt || title || "",
              tags: [mime.startsWith("video/") ? "video" : "image"],
            });

            return Response.json({ success: true, data: newMedia, message: "Upload successful" });
          }

          if (!url) {
            return Response.json(
              { success: false, message: "Media URL is required" },
              { status: 400 },
            );
          }

          const parsed = parseMediaUrl(url);

          const newMedia = await Media.create({
            fileName: title || url.split("/").pop() || "media-item",
            originalName: title || "media-item",
            url: parsed.originalUrl,
            mimeType: parsed.type,
            fileType: parsed.type,
            size: 0,
            altText: alt || title || "",
            tags: [parsed.type],
          });

          return Response.json({
            success: true,
            data: newMedia,
            message: "Media added to library",
          });
        } catch (error) {
          console.error("API /api/media POST error:", error);
          return Response.json({ success: false, message: "Failed to add media" }, { status: 500 });
        }
      },

      DELETE: async ({ request }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          if (!id)
            return Response.json({ success: false, message: "ID required" }, { status: 400 });

          await Media.findByIdAndDelete(id);
          return Response.json({ success: true, message: "Media deleted" });
        } catch (error) {
          console.error("API /api/media DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete media" },
            { status: 500 },
          );
        }
      },
    },
  },
});
