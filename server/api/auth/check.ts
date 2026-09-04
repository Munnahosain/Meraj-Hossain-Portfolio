import { connectDB } from "~/server/utils/db";
import { getAllowedAdminEmails, requireAdminEmail } from "~/server/utils/auth";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const user = await requireAuth(event);
    const allowedEmails = getAllowedAdminEmails();

    if (!allowedEmails.length || !allowedEmails.includes(user.email?.trim().toLowerCase())) {
      throw createError({
        statusCode: 403,
        statusMessage: "Access Denied - Admin email not authorized",
      });
    }

    const fullUser = await User.findById(user.id);

    if (fullUser) {
      return {
        success: true,
        user: {
          id: fullUser._id,
          email: fullUser.email,
          name: fullUser.name,
          picture: fullUser.picture,
        },
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || "Admin",
        picture: user.picture || "",
      },
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Check auth error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to check authentication",
    });
  }
});
