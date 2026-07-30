import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Service } from "../../../server/models/Service";
import { ensureInitialSeed } from "../../../server/utils/seed-defaults";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";

export const Route = createFileRoute("/api/services")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectDB();
          await ensureInitialSeed();
          const services = await Service.find({ active: { $ne: false } })
            .sort({ displayOrder: 1 })
            .lean();
          return Response.json({ success: true, data: services });
        } catch (error) {
          console.error("API /api/services GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch services" },
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
          const service = await Service.create(body);
          return Response.json({
            success: true,
            data: service,
            message: "Service created successfully",
          });
        } catch (error) {
          console.error("API /api/services POST error:", error);
          return Response.json(
            { success: false, message: "Failed to create service" },
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

          const updated = await Service.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
          return Response.json({
            success: true,
            data: updated,
            message: "Service updated successfully",
          });
        } catch (error) {
          console.error("API /api/services PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update service" },
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

          await Service.findByIdAndDelete(id);
          return Response.json({ success: true, message: "Service deleted successfully" });
        } catch (error) {
          console.error("API /api/services DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete service" },
            { status: 500 },
          );
        }
      },
    },
  },
});
