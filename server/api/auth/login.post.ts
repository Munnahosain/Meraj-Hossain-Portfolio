import bcrypt from "bcryptjs";
import { connectDB } from "~/server/utils/db";
import { User } from "~/server/models/User";
import { generateToken } from "~/server/utils/jwt";
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, getAllowedAdminEmails } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const body = await readBody(event);
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email and password are required",
      });
    }

    const allowedEmails = getAllowedAdminEmails();
    const isAllowed = allowedEmails.includes(email);

    if (!isAllowed) {
      throw createError({
        statusCode: 403,
        statusMessage: "Access Denied. This email is not authorized to access the admin panel.",
      });
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

      return {
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name || "Demo Admin",
          picture: user.picture || "",
        },
      };
    }

    if (envPasswordValid) {
      const token = generateToken({
        id: "admin-env",
        email,
      });

      return {
        success: true,
        token,
        user: {
          id: "admin-env",
          email,
          name: process.env.ADMIN_NAME || "Admin",
          picture: process.env.ADMIN_PICTURE || "",
        },
      };
    }

    const user = await User.findOne({ email });

    if (!user || !user.passwordHash) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    user.lastLogin = new Date();
    user.save().catch((e: Error) => console.error("lastLogin save error:", e.message));

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Login error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Login failed",
    });
  }
});
