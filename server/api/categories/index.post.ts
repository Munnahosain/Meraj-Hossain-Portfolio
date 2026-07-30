import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Category } from "~/server/models/Category";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const body = await readBody(event);
    if (!body.name) throw createError({ statusCode: 400, statusMessage: "Name required" });
    const category = await Category.create(body);
    return { success: true, message: "Category created", data: category };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Failed to create category" });
  }
});
