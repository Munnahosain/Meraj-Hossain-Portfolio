import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../../server/utils/db";
import { Category } from "../../../../server/models/Category";
import { extractTokenFromHeader, verifyToken } from "../../../../server/utils/jwt";

export const Route = createFileRoute("/api/categories/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          await connectDB();
          const category = await Category.findById(params.id).lean();
          if (!category) {
            return Response.json(
              { success: false, message: "Category not found" },
              { status: 404 },
            );
          }
          return Response.json({ success: true, data: category });
        } catch (error) {
          console.error("API /api/categories/$id GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch category" },
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

          const updated = await Category.findByIdAndUpdate(params.id, { $set: body }, { new: true });

          if (!updated) {
            return Response.json(
              { success: false, message: "Category not found" },
              { status: 404 },
            );
          }

          return Response.json({
            success: true,
            data: updated,
            message: "Category updated successfully",
          });
        } catch (error) {
          console.error("API /api/categories/$id PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update category" },
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
          const deleted = await Category.findByIdAndDelete(params.id);
          if (!deleted) {
            return Response.json(
              { success: false, message: "Category not found" },
              { status: 404 },
            );
          }

          return Response.json({
            success: true,
            message: "Category deleted successfully",
          });
        } catch (error) {
          console.error("API /api/categories/$id DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete category" },
            { status: 500 },
          );
        }
      },
    },
  },
});
