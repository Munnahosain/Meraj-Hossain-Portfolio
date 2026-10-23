import { createFileRoute } from "@tanstack/react-router";
import bcrypt from "bcryptjs";

import { connectDB } from "../../../../server/utils/db";
import { User } from "../../../../server/models/User";
import { generateToken } from "../../../../server/utils/jwt";
import { isAuthorizedAdminEmail } from "../../../../server/utils/auth";

export const Route = createFileRoute("/api/auth/signup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          await connectDB();

          const body = await request.json().catch(() => ({}));
          const name = String(body.name || "").trim();
          const email = String(body.email || "").trim().toLowerCase();
          const password = String(body.password || "");

          if (!name || !email || !password) {
            return Response.json(
              { success: false, message: "Name, email, and password are required" },
              { status: 400 },
            );
          }

          if (password.length < 6) {
            return Response.json(
              { success: false, message: "Password must be at least 6 characters long" },
              { status: 400 },
            );
          }

          if (!isAuthorizedAdminEmail(email)) {
            return Response.json(
              {
                success: false,
                message: "Only the authorized admin email can create an admin account.",
              },
              { status: 403 },
            );
          }

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return Response.json(
              { success: false, message: "An account with this email already exists." },
              { status: 409 },
            );
          }

          const passwordHash = await bcrypt.hash(password, 10);
          const user = await User.create({
            name,
            email,
            passwordHash,
            lastLogin: new Date(),
          });

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
              picture: user.picture || "",
            },
          });
        } catch (error) {
          console.error("Signup error:", error);
          return Response.json({ success: false, message: "Signup failed" }, { status: 500 });
        }
      },
    },
  },
});
