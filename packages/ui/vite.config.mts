import { exec } from "node:child_process";
import { promisify } from "node:util";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const tailwindcss = () => {
  return {
    name: "tailwindcss",
    apply: "build",
    closeBundle: async () => {
      const execAsync = promisify(exec);
      await execAsync("npx tailwindcss -i src/app.css -o dist/app.css");
    },
  } satisfies Plugin;
};

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    dts({
      include: ["src"],
      exclude: ["**/*.stories.tsx"],
      entryRoot: "src",
      rollupTypes: true,
    }),
    tsconfigPaths(),
    externalizeDeps(),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        entryFileNames: "index.js",
      },
    },
    sourcemap: true,
    outDir: "dist",
  },
});
