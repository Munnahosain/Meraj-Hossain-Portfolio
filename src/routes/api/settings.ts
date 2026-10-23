import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../../../server/utils/db";
import { WebsiteSettings } from "../../../server/models/WebsiteSettings";
import { ensureInitialSeed } from "../../../server/utils/seed-defaults";
import { extractTokenFromHeader, verifyToken } from "../../../server/utils/jwt";

export const Route = createFileRoute("/api/settings")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectDB();
          await ensureInitialSeed();
          let settings = await WebsiteSettings.findOne().lean();

          if (!settings) {
            settings = {
              branding: {
                websiteName: "Meraj Hossain",
                browserTitle: "Meraj Hossain",
                websiteLogo: "/MCU-LOGO-0.2V-1.png",
                footerLogo: "/MCU-LOGO-0.2V-1.png",
              },
              general: {
                ownerName: "Meraj Hossain",
                profession: "Graphics Designer & Motion Artist",
              },
              contact: { email: "merajhossain042@gmail.com" },
              social: {},
              hero: {
                title: "Meraj Hossain",
                reelImages: [],
                subtitle: "Graphics Designer · Video Editor · Motion Artist",
              },
              about: { title: "About Meraj" },
              seo: { metaTitle: "Meraj Hossain Portfolio" },
            } as any;
          }

          return Response.json({ success: true, data: settings });
        } catch (error) {
          console.error("API /api/settings GET error:", error);
          return Response.json(
            { success: false, message: "Failed to fetch settings" },
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

          const updated = await WebsiteSettings.findOneAndUpdate(
            {},
            { $set: body },
            { new: true, upsert: true },
          );

          return Response.json({
            success: true,
            data: updated,
            message: "Settings updated successfully",
          });
        } catch (error) {
          console.error("API /api/settings PUT error:", error);
          return Response.json(
            { success: false, message: "Failed to update settings" },
            { status: 500 },
          );
        }
      },
    },
  },
});
