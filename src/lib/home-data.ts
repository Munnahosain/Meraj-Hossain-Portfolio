import { createServerFn } from "@tanstack/react-start";

/**
 * Loads the website settings on the server so the first HTML paint already has the
 * final hero text/images. Without this, the page paints hardcoded defaults and swaps
 * them after hydration + an API round-trip (late LCP and layout shift).
 *
 * Never throws: on any failure or a slow DB it returns null and the client falls back
 * to its normal /api/settings fetch.
 */
export const getSettingsSSR = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { connectDB } = await import("../../server/utils/db");
    const { WebsiteSettings } = await import("../../server/models/WebsiteSettings");

    const load = (async () => {
      await connectDB();
      const doc = await WebsiteSettings.findOne().lean();
      return doc ? (JSON.parse(JSON.stringify(doc)) as Record<string, unknown>) : null;
    })();
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
    return await Promise.race([load, timeout]);
  } catch (error) {
    console.error("getSettingsSSR failed, falling back to client fetch:", error);
    return null;
  }
});
