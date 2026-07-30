import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Skill } from "~/server/models/Skill";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const { id } = event.context.params;
    const body = await readBody(event);
    const skill = await Skill.findByIdAndUpdate(id, body, { new: true });
    if (!skill) throw createError({ statusCode: 404, statusMessage: "Skill not found" });
    return { success: true, message: "Skill updated", data: skill };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to update skill" });
  }
});
