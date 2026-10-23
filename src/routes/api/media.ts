import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Media } from "../../../server/models/Media";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";
import { parseMediaUrl } from "../../../server/utils/media-helper";
import {
  getImageUploadLimit,
  R2StorageError,
  uploadImageToR2,
  validateImageUpload,
} from "../../../server/utils/r2";

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

          if (request.headers.get("content-type")?.includes("multipart/form-data")) {
            const maxSize = getImageUploadLimit();
            const declaredSize = Number(request.headers.get("content-length"));
            if (Number.isFinite(declaredSize) && declaredSize > maxSize + 1024 * 1024) {
              return Response.json(
                {
                  success: false,
                  message: `Image exceeds the ${(maxSize / (1024 * 1024)).toFixed(1)} MB upload limit.`,
                },
                { status: 413 },
              );
            }

            const formData = await request.formData();
            const file = formData.get("file");

            if (!(file instanceof File)) {
              return Response.json(
                { success: false, message: "An image file is required." },
                { status: 400 },
              );
            }

            if (file.size === 0) {
              return Response.json(
                { success: false, message: "The uploaded image is empty." },
                { status: 400 },
              );
            }
            if (file.size > maxSize) {
              return Response.json(
                {
                  success: false,
                  message: `Image exceeds the ${(maxSize / (1024 * 1024)).toFixed(1)} MB upload limit.`,
                },
                { status: 413 },
              );
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            const validatedImage = validateImageUpload(file.type, buffer);
            await connectDB();

            const uploaded = await uploadImageToR2(
              buffer,
              validatedImage.mimeType,
              validatedImage.extension,
            );
            const originalName =
              Array.from(file.name.split(/[\\/]/).pop() || "")
                .filter(
                  (character) => character.charCodeAt(0) >= 32 && character.charCodeAt(0) !== 127,
                )
                .join("")
                .slice(0, 180) || "image";
            const title = String(formData.get("title") || originalName).slice(0, 180);
            const altText = String(formData.get("alt") || "").slice(0, 500);
            const folder = formData.get("folder") === "hero" ? "hero" : "portfolio";

            const newMedia = await Media.create({
              name: title,
              fileName: originalName,
              filename: uploaded.key,
              originalName,
              publicId: uploaded.key,
              url: uploaded.url,
              mimeType: file.type,
              type: "image",
              fileType: "image",
              size: buffer.length,
              folder,
              altText,
              tags: ["image", "r2"],
            });

            return Response.json({
              success: true,
              data: newMedia,
              message: "Image uploaded successfully.",
            });
          }

          const body = await request.json().catch(() => ({}));
          if (!body || typeof body !== "object" || Array.isArray(body)) {
            return Response.json(
              { success: false, message: "A JSON object is required." },
              { status: 400 },
            );
          }
          const { url, title, alt } = body as {
            url?: string;
            title?: string;
            alt?: string;
            data?: unknown;
          };

          if ("data" in body) {
            return Response.json(
              { success: false, message: "Upload image files using multipart form data." },
              { status: 400 },
            );
          }
          if (!url) {
            return Response.json(
              { success: false, message: "Media URL is required" },
              { status: 400 },
            );
          }

          const parsed = parseMediaUrl(url);

          const fileType = parsed.type;
          const fileName = title || url.split("/").pop() || "media-item";

          const newMedia = await Media.create({
            name: title || fileName,
            fileName,
            filename: fileName,
            originalName: title || "media-item",
            url: parsed.originalUrl,
            mimeType: parsed.type,
            type: fileType,
            fileType,
            size: 0,
            altText: alt || title || "",
            tags: [fileType],
          });

          return Response.json({
            success: true,
            data: newMedia,
            message: "Media added to library",
          });
        } catch (error) {
          console.error("API /api/media POST error:", error);
          if (error instanceof R2StorageError) {
            return Response.json(
              { success: false, message: error.message },
              { status: error.status },
            );
          }
          return Response.json(
            { success: false, message: "Failed to add media. Check server logs for details." },
            { status: 500 },
          );
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
