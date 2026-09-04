import { createFileRoute } from "@tanstack/react-router";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
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
            const uploadName = filename || title || `upload-${Date.now()}`;
            const type = mime.startsWith("video/") ? "video" : mime.startsWith("image/") ? "image" : "document";
            const hasCloudinaryConfig = !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET;

            if (hasCloudinaryConfig) {
              const buffer = Buffer.from(b64, "base64");
              const result: any = await uploadToCloudinary(buffer, uploadName, { folder: "creative-canvas-hub/portfolio" });

              const newMedia = await Media.create({
                name: title || uploadName,
                filename: uploadName,
                url: result?.secure_url || result?.url,
                publicId: result?.public_id,
                type,
                size: result?.bytes || buffer.length,
                mimeType: mime,
                folder: "portfolio",
                altText: alt || title || "",
                tags: [type],
                uploadedBy: "admin",
              });

              return Response.json({ success: true, data: newMedia, message: "Upload successful" });
            }

            const buffer = Buffer.from(b64, "base64");
            const extensionFromMime = mime.split("/")[1]?.split("+")[0] || "bin";
            const safeBaseName = String(uploadName)
              .replace(/\.[a-z0-9]+$/i, "")
              .replace(/[^a-z0-9_-]+/gi, "-")
              .replace(/^-+|-+$/g, "")
              .slice(0, 60) || "upload";
            const safeFilename = `${safeBaseName}-${randomUUID()}.${extensionFromMime}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");
            await mkdir(uploadDir, { recursive: true });
            await writeFile(path.join(uploadDir, safeFilename), buffer);

            const fallbackUrl = `/api/uploads/${encodeURIComponent(safeFilename)}`;
            const newMedia = await Media.create({
              name: title || uploadName,
              filename: safeFilename,
              url: fallbackUrl,
              publicId: `local-${Date.now()}`,
              type,
              size: buffer.length,
              mimeType: mime,
              folder: "portfolio",
              altText: alt || title || "",
              tags: [type],
              uploadedBy: "admin",
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
            name: title || url.split("/").pop() || "media-item",
            filename: title || url.split("/").pop() || "media-item",
            url: parsed.streamUrl || parsed.originalUrl,
            type: parsed.type === "video" ? "video" : parsed.type === "youtube" ? "video" : "image",
            size: 0,
            mimeType: parsed.type,
            folder: "portfolio",
            altText: alt || title || "",
            tags: [parsed.type],
            uploadedBy: "admin",
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
