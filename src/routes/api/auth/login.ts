import { createFileRoute } from "@tanstack/react-router";
import bcrypt from "bcryptjs";

import { connectDB } from "../../../../server/utils/db";
import { generateToken } from "../../../../server/utils/jwt";
import { User } from "../../../../server/models/User";
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, getAllowedAdminEmails } from "../../../../server/utils/auth";

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

          const allowedEmails = getAllowedAdminEmails();
          const isAllowed = allowedEmails.includes(email);

          if (!isAllowed) {
            return Response.json(
              {
                success: false,
                message: "Access Denied. This email is not authorized to access the admin panel.",
              },
              { status: 403 },
            );
          }

          const defaultEmailMatch = email === DEFAULT_ADMIN_EMAIL;
          const defaultPasswordMatch = password === DEFAULT_ADMIN_PASSWORD;
          const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || process.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
          const envPassword = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASS || "";
          const envPasswordValid = envEmail === email && !!envPassword && password === envPassword;

          if (defaultEmailMatch && defaultPasswordMatch) {
            let user = await User.findOne({ email });
            if (!user) {
              user = await User.create({
                email,
                name: "Demo Admin",
                passwordHash: await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10),
                lastLogin: new Date(),
              });
            }

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
                name: user.name || "Demo Admin",
                picture: user.picture,
              },
            });
          }

          if (envPasswordValid) {
            const token = generateToken({
              id: "admin-env",
              email,
            });

            return Response.json({
              success: true,
              token,
              user: {
                id: "admin-env",
                email,
                name: process.env.ADMIN_NAME || "Admin",
                picture: process.env.ADMIN_PICTURE || "",
              },
            });
          }

          const user = await User.findOne({ email });

          if (!user || !user.passwordHash) {
            return Response.json(
              { success: false, message: "Invalid email or password" },
              { status: 401 },
            );
          }

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
        } catch (error) {
          console.error("Login error:", error);
          return Response.json({ success: false, message: "Login failed" }, { status: 500 });
        }
      },
    },
  },
});
