import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Education } from "../../../server/models/Education";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";

export const Route = createFileRoute("/api/education")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectDB();
          const items = await Education.find().sort({ displayOrder: 1, startDate: -1 }).lean();
          return Response.json({ success: true, data: items });
        } catch (error) {
          console.error("API /api/education GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch education" },
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
          const item = await Education.create(body);
          return Response.json({ success: true, data: item, message: "Education record added" });
        } catch (error) {
          console.error("API /api/education POST error:", error);
          return Response.json(
            { success: false, message: "Failed to add education" },
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

          const updated = await Education.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true },
          );
          return Response.json({
            success: true,
            data: updated,
            message: "Education record updated",
          });
        } catch (error) {
          console.error("API /api/education PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update education" },
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

          await Education.findByIdAndDelete(id);
          return Response.json({ success: true, message: "Education record deleted" });
        } catch (error) {
          console.error("API /api/education DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete education" },
            { status: 500 },
          );
        }
      },
    },
  },
});
