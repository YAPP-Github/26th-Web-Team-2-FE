import { exec } from "node:child_process";
import { appendFile, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

//tailwindcss 후처리를 위한 custom plugin
function tailwindBuildPlugin() {
  return {
    name: "tailwindcss-post-build",
    apply: "build" as const,
    closeBundle: async () => {
      const execAsync = promisify(exec);

      await execAsync("npx tailwindcss -i src/app.css -o dist/app.css");

      const css = await readFile("src/app.css", "utf-8");
      await appendFile("dist/app.css", css);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindBuildPlugin(),
    dts({
      include: ["src"],
      insertTypesEntry: true, // package.json에 "types" 필드 자동 추가
      outDir: "dist", // 타입 선언 출력 경로 (dist/types)
      entryRoot: "src",
      rollupTypes: true, // Rollup을 사용하여 타입 선언 생성
      tsconfigPath: "./tsconfig.json",
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": resolve(_dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(_dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
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
