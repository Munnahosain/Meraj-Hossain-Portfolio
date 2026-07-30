import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { WebsiteSettings } from "~/server/models/WebsiteSettings";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const user = await requireAdminEmail(event);

    const body = await readBody(event);

    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = await WebsiteSettings.create(body);
    } else {
      Object.assign(settings, body);
      settings.updatedBy = user.id;
    }

    await settings.save();

    return {
      success: true,
      message: "Website settings updated successfully",
      data: settings,
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Update settings error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update website settings",
    });
  }
});
