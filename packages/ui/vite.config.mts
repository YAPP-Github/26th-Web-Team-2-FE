import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": resolve(_dirname, "src"),
    },
  },
  build: {
    outDir: "dist-dev",
    sourcemap: true,
  },
});
