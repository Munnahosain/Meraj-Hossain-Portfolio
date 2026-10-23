import { createFileRoute } from "@tanstack/react-router";
import bcrypt from "bcryptjs";

import { connectDB } from "../../../../server/utils/db";
import { generateToken } from "../../../../server/utils/jwt";
import { User } from "../../../../server/models/User";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          await connectDB();

          const body = await request.json().catch(() => ({}));
          const email = String(body.email || "")
            .trim()
            .toLowerCase();
          const password = String(body.password || "");

          if (!email || !password) {
            return Response.json(
              { success: false, message: "Email and password are required" },
              { status: 400 },
            );
          }

          const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
          const viteAdminEmail = process.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
          const devEmail = process.env.DEV_ADMIN_EMAIL?.trim().toLowerCase();
          const viteDevEmail = process.env.VITE_DEV_ADMIN_EMAIL?.trim().toLowerCase();

          const envAdminEmail = allowedEmail || viteAdminEmail;
          const envDevEmail = devEmail || viteDevEmail;

          const envAdminPassword =
            process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASS || "";
          const envDevPassword =
            process.env.DEV_ADMIN_PASSWORD || process.env.VITE_DEV_ADMIN_PASS || envAdminPassword;

          const isAllowedAdmin = envAdminEmail ? email === envAdminEmail : false;
          const isAllowedDev = envDevEmail ? email === envDevEmail : false;
          const isAllowed = isAllowedAdmin || isAllowedDev;

          if (!isAllowed) {
            return Response.json(
              {
                success: false,
                message: "Access Denied. This email is not authorized to access the admin panel.",
              },
              { status: 403 },
            );
          }

          const user = await User.findOne({ email });

          if (user && user.passwordHash) {
            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPassword) {
              return Response.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 },
              );
            }
            user.lastLogin = new Date();
            await user.save();

            const token = generateToken({
              id: user._id.toString(),
              email: user.email,
            });

            return Response.json({
              success: true,
              token,
              user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
              },
            });
          }

          const envPasswordValid =
            (isAllowedAdmin && envAdminPassword && password === envAdminPassword) ||
            (isAllowedDev && envDevPassword && password === envDevPassword);

          if (envPasswordValid) {
            const token = generateToken({
              id: isAllowedAdmin ? "admin-env" : "dev-admin",
              email,
            });

            return Response.json({
              success: true,
              token,
              user: {
                id: isAllowedAdmin ? "admin-env" : "dev-admin",
                email,
                name: isAllowedDev
                  ? process.env.DEV_ADMIN_NAME || "Dev Admin"
                  : process.env.ADMIN_NAME || "Admin",
                picture: process.env.DEV_ADMIN_PICTURE || process.env.ADMIN_PICTURE || "",
              },
            });
          }

          return Response.json(
            { success: false, message: "Invalid email or password" },
            { status: 401 },
          );
        } catch (error) {
          console.error("Login error:", error);
          return Response.json({ success: false, message: "Login failed" }, { status: 500 });
        }
      },
    },
  },
});
