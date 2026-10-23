import bcrypt from "bcryptjs";
import { connectDB } from "~/server/utils/db";
import { User } from "~/server/models/User";
import { generateToken } from "~/server/utils/jwt";

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

    const envAdminEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase() ||
      process.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
    const envDevEmail =
      process.env.DEV_ADMIN_EMAIL?.trim().toLowerCase() ||
      process.env.VITE_DEV_ADMIN_EMAIL?.trim().toLowerCase();

    const envAdminPassword =
      process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASS || "";
    const envDevPassword =
      process.env.DEV_ADMIN_PASSWORD || process.env.VITE_DEV_ADMIN_PASS || envAdminPassword;

    const isAllowedAdmin = envAdminEmail ? email === envAdminEmail : false;
    const isAllowedDev = envDevEmail ? email === envDevEmail : false;
    const isAllowed = isAllowedAdmin || isAllowedDev;

    if (!isAllowed) {
      throw createError({
        statusCode: 403,
        statusMessage: "Access Denied. This email is not authorized to access the admin panel.",
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

      return {
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

    // Fire-and-forget — don't block the login response for a non-critical update
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
