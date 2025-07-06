import { exec } from "node:child_process";
import { appendFile, readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { defineConfig } from "tsdown";

const execAsync = promisify(exec);

export default defineConfig({
  entry: "./src/*/*",
  clean: true,
  dts: true,
  format: "esm",
  sourcemap: true,
  minify: true,
  hooks: {
    "build:done": async () => {
      await execAsync("tailwindcss -i src/app.css -o dist/app.css");
      const css = await readFile("src/app.css", "utf-8");
      await appendFile("dist/app.css", css);
    },
  },
  external: ["react", "react-dom"],
});
