import { connectDB } from "~/server/utils/db";
import { Project } from "~/server/models/Project";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const { id } = event.context.params;

    const project = await Project.findById(id);

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Get project error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch project",
    });
  }
});
