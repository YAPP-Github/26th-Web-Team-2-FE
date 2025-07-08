import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import fg from "fast-glob";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

//tailwindcss 후처리를 위한 custom plugin
function tailwindBuildPlugin() {
  return {
    name: "tailwindcss-post-build",
    apply: "build" as const,
    closeBundle: async () => {
      const { exec } = await import("node:child_process");
      const { promisify } = await import("node:util");
      const { readFile, appendFile } = await import("node:fs/promises");

      const execAsync = promisify(exec);

      await execAsync("npx tailwindcss -i src/app.css -o dist/app.css");

      const css = await readFile("src/app.css", "utf-8");
      await appendFile("dist/app.css", css);
    },
  };
}

const entryFiles = fg.sync("src/*/index.{ts,tsx}", { absolute: true });

const _entryObj = Object.fromEntries(
  entryFiles.map((file) => {
    const name = basename(dirname(file)); // 폴더명
    return [name, file];
  }),
);

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindBuildPlugin(),
    dts({
      insertTypesEntry: true, // package.json에 "types" 필드 자동 추가
      outDir: "dist/types", // 타입 선언 출력 경로 (dist/types)
      entryRoot: "src",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(_dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: _entryObj,
      fileName: (_format, entryName) => `${entryName}/index.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        entryFileNames: "[name]/index.js",
      },
    },
    sourcemap: true,
    outDir: "dist",
  },
});
