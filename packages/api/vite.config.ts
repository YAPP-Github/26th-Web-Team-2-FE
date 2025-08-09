import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    dts({ include: ["src/**/*.ts"], entryRoot: "src" }),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        "index.msw": "src/index.msw.ts",
        "index.schemas": "src/index.schemas.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["@faker-js/faker", "@tanstack/react-query", "msw"],
    },
  },
});
