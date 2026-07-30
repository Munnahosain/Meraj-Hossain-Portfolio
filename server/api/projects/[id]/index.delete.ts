import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Project } from "~/server/models/Project";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);

    const { id } = event.context.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Delete project error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete project",
    });
  }
});
