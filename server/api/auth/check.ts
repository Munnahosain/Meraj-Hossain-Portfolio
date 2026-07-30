import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const user = await requireAdminEmail(event);

    // Fetch full user data
    const fullUser = await User.findById(user.id);

    if (!fullUser) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    return {
      success: true,
      user: {
        id: fullUser._id,
        email: fullUser.email,
        name: fullUser.name,
        picture: fullUser.picture,
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
