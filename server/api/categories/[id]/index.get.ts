import { connectDB } from "~/server/utils/db";
import { Category } from "~/server/models/Category";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const { id } = event.context.params;
    const category = await Category.findById(id);
    if (!category) throw createError({ statusCode: 404, statusMessage: "Category not found" });
    return { success: true, data: category };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch category" });
  }
});
