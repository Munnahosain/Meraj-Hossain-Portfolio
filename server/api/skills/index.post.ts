import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Skill } from "~/server/models/Skill";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const body = await readBody(event);
    if (!body.name || body.percentage === undefined) {
      throw createError({ statusCode: 400, statusMessage: "Name and percentage required" });
    }
    const skill = await Skill.create(body);
    return { success: true, message: "Skill created", data: skill };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Create skill error:", error);
    throw createError({ statusCode: 500, statusMessage: "Failed to create skill" });
  }
});
