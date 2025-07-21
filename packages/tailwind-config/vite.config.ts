import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    dts({ include: ["src"], entryRoot: "src", rollupTypes: true }),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["tailwindcss", "tailwindcss/plugin"],
    },
  },
});
