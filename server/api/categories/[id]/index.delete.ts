import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Category } from "~/server/models/Category";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const { id } = event.context.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw createError({ statusCode: 404, statusMessage: "Category not found" });
    return { success: true, message: "Category deleted" };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to delete category" });
  }
});
