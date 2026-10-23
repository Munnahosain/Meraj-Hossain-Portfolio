import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { Category } from "../../../server/models/Category";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";

export const Route = createFileRoute("/api/categories")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectDB();
          const categories = await Category.find().sort({ displayOrder: 1 }).lean();
          return Response.json({ success: true, data: categories });
        } catch (error) {
          console.error("API /api/categories GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch categories" },
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

          if (!body.name) {
            return Response.json(
              { success: false, message: "Category name is required" },
              { status: 400 },
            );
          }

          const category = await Category.create(body);
          return Response.json({
            success: true,
            data: category,
            message: "Category created successfully",
          });
        } catch (error) {
          console.error("API /api/categories POST error:", error);
          return Response.json(
            { success: false, message: "Failed to create category" },
            { status: 500 },
          );
        }
      },
    },
  },
});
