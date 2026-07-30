import { connectDB } from "~/server/utils/db";
import { Category } from "~/server/models/Category";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const categories = await Category.find().sort({ displayOrder: 1 });
    return { success: true, data: categories };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch categories" });
  }
});
