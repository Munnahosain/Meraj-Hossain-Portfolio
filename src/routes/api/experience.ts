import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Experience } from "../../../server/models/Experience";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";

export const Route = createFileRoute("/api/experience")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectDB();
          const items = await Experience.find().sort({ displayOrder: 1, startDate: -1 }).lean();
          return Response.json({ success: true, data: items });
        } catch (error) {
          console.error("API /api/experience GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch experience" },
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
          const item = await Experience.create(body);
          return Response.json({ success: true, data: item, message: "Experience added" });
        } catch (error) {
          console.error("API /api/experience POST error:", error);
          return Response.json(
            { success: false, message: "Failed to add experience" },
            { status: 500 },
          );
        }
      },
      PUT: async ({ request }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const body = await request.json().catch(() => ({}));
          const { _id, ...updateData } = body;

          const updated = await Experience.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true },
          );
          return Response.json({ success: true, data: updated, message: "Experience updated" });
        } catch (error) {
          console.error("API /api/experience PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update experience" },
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

          await Experience.findByIdAndDelete(id);
          return Response.json({ success: true, message: "Experience deleted" });
        } catch (error) {
          console.error("API /api/experience DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete experience" },
            { status: 500 },
          );
        }
      },
    },
  },
});
