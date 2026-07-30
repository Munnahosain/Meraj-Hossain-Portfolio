import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Category } from "~/server/models/Category";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const { id } = event.context.params;
    const body = await readBody(event);
    const category = await Category.findByIdAndUpdate(id, body, { new: true });
    if (!category) throw createError({ statusCode: 404, statusMessage: "Category not found" });
    return { success: true, message: "Category updated", data: category };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to update category" });
  }
});
