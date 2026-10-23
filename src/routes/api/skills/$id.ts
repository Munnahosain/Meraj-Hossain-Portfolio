import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../../server/utils/db";
import { Skill } from "../../../../server/models/Skill";
import { extractTokenFromHeader, verifyToken } from "../../../../server/utils/jwt";

export const Route = createFileRoute("/api/skills/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          await connectDB();
          const skill = await Skill.findById(params.id).lean();
          if (!skill) {
            return Response.json(
              { success: false, message: "Skill not found" },
              { status: 404 },
            );
          }
          return Response.json({ success: true, data: skill });
        } catch (error) {
          console.error("API /api/skills/$id GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch skill" },
            { status: 500 },
          );
        }
      },
      PUT: async ({ request, params }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const body = await request.json().catch(() => ({}));

          const updated = await Skill.findByIdAndUpdate(params.id, { $set: body }, { new: true });
          if (!updated) {
            return Response.json(
              { success: false, message: "Skill not found" },
              { status: 404 },
            );
          }

          return Response.json({
            success: true,
            data: updated,
            message: "Skill updated successfully",
          });
        } catch (error) {
          console.error("API /api/skills/$id PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update skill" },
            { status: 500 },
          );
        }
      },
      DELETE: async ({ request, params }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const deleted = await Skill.findByIdAndDelete(params.id);
          if (!deleted) {
            return Response.json(
              { success: false, message: "Skill not found" },
              { status: 404 },
            );
          }

          return Response.json({
            success: true,
            message: "Skill deleted successfully",
          });
        } catch (error) {
          console.error("API /api/skills/$id DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete skill" },
            { status: 500 },
          );
        }
      },
    },
  },
});
