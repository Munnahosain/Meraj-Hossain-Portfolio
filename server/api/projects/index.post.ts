import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Project } from "~/server/models/Project";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);

    const body = await readBody(event);

    // Validate required fields
    if (!body.title || !body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: "Title and category are required",
      });
    }

    // Generate slug if not provided
    const slug = body.slug || generateSlug(body.title);

    // Check if slug already exists
    const existing = await Project.findOne({ slug });
    if (existing) {
      throw createError({
        statusCode: 400,
        statusMessage: "Project with this slug already exists",
      });
    }

    const project = await Project.create({
      ...body,
      slug,
    });

    return {
      success: true,
      message: "Project created successfully",
      data: project,
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Create project error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create project",
    });
  }
});
