// Nitro plugin: warm up MongoDB connection as soon as the server starts.
// This ensures the first real user request (e.g. login) is not blocked
// waiting for Atlas to establish its initial connection.
import { connectDB } from "~/server/utils/db";

export default defineNitroPlugin(async () => {
  try {
    await connectDB();
    console.log("✓ MongoDB pre-warmed on server start");
  } catch (err) {
    console.error("⚠ MongoDB pre-warm failed — login will retry on first request:", err);
  }
});
