import { createFileRoute } from "@tanstack/react-router";
import { readFile } from "node:fs/promises";
import path from "node:path";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export const Route = createFileRoute("/api/uploads/$filename")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const filename = path.basename(decodeURIComponent(params.filename));
          const filePath = path.join(process.cwd(), "public", "uploads", filename);
          const file = await readFile(filePath);
          const ext = path.extname(filename).toLowerCase();

          return new Response(file, {
            headers: {
              "Cache-Control": "public, max-age=31536000, immutable",
              "Content-Type": contentTypes[ext] || "application/octet-stream",
            },
          });
        } catch {
          return Response.json({ success: false, message: "Upload not found" }, { status: 404 });
        }
      },
    },
  },
});
