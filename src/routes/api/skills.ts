import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Skill } from "../../../server/models/Skill";
import { ensureInitialSeed } from "../../../server/utils/seed-defaults";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";

export const Route = createFileRoute("/api/skills")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectDB();
          await ensureInitialSeed();
          const skills = await Skill.find({ active: { $ne: false } })
            .sort({ displayOrder: 1 })
            .lean();
          return Response.json({ success: true, data: skills });
        } catch (error) {
          console.error("API /api/skills GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch skills" },
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
          const skill = await Skill.create(body);
          return Response.json({
            success: true,
            data: skill,
            message: "Skill created successfully",
          });
        } catch (error) {
          console.error("API /api/skills POST error:", error);
          return Response.json(
            { success: false, message: "Failed to create skill" },
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

          const updated = await Skill.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
          return Response.json({
            success: true,
            data: updated,
            message: "Skill updated successfully",
          });
        } catch (error) {
          console.error("API /api/skills PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update skill" },
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

          await Skill.findByIdAndDelete(id);
          return Response.json({ success: true, message: "Skill deleted successfully" });
        } catch (error) {
          console.error("API /api/skills DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete skill" },
            { status: 500 },
          );
        }
      },
    },
  },
});
