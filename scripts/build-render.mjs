process.env.NITRO_PRESET = "node-server";
process.env.NODE_ENV = "production";
const { build } = await import("vite");
await build();
