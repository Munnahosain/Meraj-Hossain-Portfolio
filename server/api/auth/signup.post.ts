import bcrypt from "bcryptjs";
import { connectDB } from "~/server/utils/db";
import { User } from "~/server/models/User";
import { generateToken } from "~/server/utils/jwt";
import { isAuthorizedAdminEmail } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const body = await readBody(event);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Name, email, and password are required",
      });
    }

    if (password.length < 6) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password must be at least 6 characters long",
      });
    }

    if (!isAuthorizedAdminEmail(email)) {
      throw createError({
        statusCode: 403,
        statusMessage: "Only the authorized admin email can create an admin account.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "An account with this email already exists.",
      });
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

    return {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture || "",
      },
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Signup error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Signup failed",
    });
  }
});
