import { createFileRoute } from "@tanstack/react-router";

import { extractTokenFromHeader, verifyToken } from "../../../../server/utils/jwt";

export const Route = createFileRoute("/api/auth/check")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = extractTokenFromHeader(request.headers.get("authorization") || undefined);

        if (!token) {
          return Response.json(
            { success: false, message: "Unauthorized - No token provided" },
            { status: 401 },
          );
        }

        const payload = verifyToken(token);
        const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const viteAdminEmail = process.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
        const devEmail = process.env.DEV_ADMIN_EMAIL?.trim().toLowerCase();
        const viteDevEmail = process.env.VITE_DEV_ADMIN_EMAIL?.trim().toLowerCase();

        const allowedEmails = [allowedEmail, viteAdminEmail, devEmail, viteDevEmail].filter(
          Boolean,
        ) as string[];

        if (!payload || !allowedEmails.includes(payload.email)) {
          return Response.json(
            { success: false, message: "Unauthorized - Invalid token" },
            { status: 401 },
          );
        }

        return Response.json({
          success: true,
          user: {
            id: payload.id,
            email: payload.email,
          },
        });
      },
    },
  },
});
