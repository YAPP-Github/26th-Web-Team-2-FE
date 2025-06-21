import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [react(), tsconfigPaths()],
        test: {
          name: "js-dom",
          environment: "jsdom",
          include: ["tests/**/*.browser.{test,spec}.?(c|m)[jt]s?(x)"],
        },
      },
      {
        extends: true,
        plugins: [tsconfigPaths()],
        test: {
          name: "node",
          environment: "node",
          include: ["tests/**/*.node.{test,spec}.?(c|m)[jt]s?(x)"],
        },
      },
    ],
  },
});
