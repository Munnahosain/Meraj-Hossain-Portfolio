import { connectDB } from "~/server/utils/db";
import { Project } from "~/server/models/Project";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const query = getQuery(event);
    const { featured, hidden, status, category, skip = "0", limit = "10" } = query;

    // Build filter
    const filter: any = {};

    if (featured !== undefined) filter.featured = featured === "true";
    if (hidden !== undefined) filter.hidden = hidden === "true";
    if (status) filter.status = status;
    if (category) filter.category = category;

    const skipNum = parseInt(skip as string) || 0;
    const limitNum = parseInt(limit as string) || 10;

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return {
      success: true,
      data: projects,
      total,
      skip: skipNum,
      limit: limitNum,
    };
  } catch (error) {
    console.error("Get projects error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch projects",
    });
  }
});
