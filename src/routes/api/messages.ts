import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { ContactMessage } from "../../../server/models/ContactMessage";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";

export const Route = createFileRoute("/api/messages")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);
          if (!token || !verifyToken(token)) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
          }

          await connectDB();
          const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
          return Response.json({ success: true, data: messages });
        } catch (error) {
          console.error("API /api/messages GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch messages" },
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

          await ContactMessage.findByIdAndDelete(id);
          return Response.json({ success: true, message: "Message deleted successfully" });
        } catch (error) {
          console.error("API /api/messages DELETE error:", error);
          return Response.json(
            { success: false, message: "Failed to delete message" },
            { status: 500 },
          );
        }
      },
    },
  },
});
