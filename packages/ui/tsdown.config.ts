import { exec } from "node:child_process";
import { promisify } from "node:util";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/*/*",
  clean: true,
  dts: true,
  format: "esm",
  sourcemap: true,
  minify: true,
  hooks: {
    "build:done": async () => {
      const execAsync = promisify(exec);
      await execAsync("tailwindcss -i src/app.css -o dist/app.css");
    },
  },
  external: ["react", "react-dom"],
});
