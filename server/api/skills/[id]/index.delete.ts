import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Skill } from "~/server/models/Skill";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const { id } = event.context.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) throw createError({ statusCode: 404, statusMessage: "Skill not found" });
    return { success: true, message: "Skill deleted" };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to delete skill" });
  }
});
