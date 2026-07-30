import { connectDB } from "~/server/utils/db";
import { requireAdminEmail } from "~/server/utils/auth";
import { Project } from "~/server/models/Project";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);

    const { id } = event.context.params;
    const body = await readBody(event);

    const project = await Project.findByIdAndUpdate(id, body, { new: true });

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    return {
      success: true,
      message: "Project updated successfully",
      data: project,
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Update project error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update project",
    });
  }
});
