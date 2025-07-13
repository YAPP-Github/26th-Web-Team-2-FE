import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function _getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../src/*.mdx",
    "../src/*/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  staticDirs: [{ from: "../public/fonts", to: "/fonts" }],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": join(__dirname, "../src"),
    };
    return config;
  },
};
export default config;
