import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { ContactMessage } from "../../../server/models/ContactMessage";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          await connectDB();
          const body = await request.json().catch(() => ({}));

          const { name, email, subject, message } = body;

          if (!name || !email || !message) {
            return Response.json(
              { success: false, message: "Name, email, and message are required fields" },
              { status: 400 },
            );
          }

          const newMessage = await ContactMessage.create({
            name: String(name).trim(),
            email: String(email).trim().toLowerCase(),
            subject: String(subject || "General Inquiry").trim(),
            message: String(message).trim(),
            status: "unread",
            createdAt: new Date(),
          });

          return Response.json({
            success: true,
            data: newMessage,
            message: "Thank you! Your message has been sent successfully.",
          });
        } catch (error) {
          console.error("API /api/contact POST error:", error);
          return Response.json(
            { success: false, message: "Failed to send message" },
            { status: 500 },
          );
        }
      },
    },
  },
});
