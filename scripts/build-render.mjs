process.env.NITRO_PRESET = "node-server";
process.env.NODE_ENV = "production";
const { createBuilder } = await import("vite");
// build() only builds the client environment; buildApp() builds client + server (Nitro).
const builder = await createBuilder();
await builder.buildApp();
