import { connectDB } from "~/server/utils/db";
import { Skill } from "~/server/models/Skill";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const query = getQuery(event);
    const { skip = "0", limit = "10" } = query;
    const skipNum = parseInt(skip as string) || 0;
    const limitNum = parseInt(limit as string) || 10;
    const total = await Skill.countDocuments();
    const skills = await Skill.find().sort({ displayOrder: 1 }).skip(skipNum).limit(limitNum);
    return { success: true, data: skills, total, skip: skipNum, limit: limitNum };
  } catch (error) {
    console.error("Get skills error:", error);
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch skills" });
  }
});
