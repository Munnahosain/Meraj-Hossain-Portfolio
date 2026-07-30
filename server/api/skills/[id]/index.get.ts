import { connectDB } from "~/server/utils/db";
import { Skill } from "~/server/models/Skill";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const { id } = event.context.params;
    const skill = await Skill.findById(id);
    if (!skill) throw createError({ statusCode: 404, statusMessage: "Skill not found" });
    return { success: true, data: skill };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch skill" });
  }
});
