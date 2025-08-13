import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    dts({ include: ["src"], entryRoot: "src", rollupTypes: true }),
    tsConfigPaths(),
    externalizeDeps(),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es"],
    },
  },
});
