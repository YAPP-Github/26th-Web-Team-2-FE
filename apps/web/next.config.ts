import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const plugins = [
  (config: NextConfig): NextConfig => ({
    ...config,
    webpack(config, options) {
      const nextConfig =
        typeof config.webpack === "function"
          ? config.webpack(config, options)
          : config;

      nextConfig.module ||= {};
      nextConfig.module.rules ||= [];

      nextConfig.module.rules.push({
        test: /\.svg$/,
        issuer: /\.(js|ts)x?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              dimensions: false,
              icon: true,
            },
          },
        ],
      });

      return nextConfig;
    },
  }),
];

const baseConfig: NextConfig = {
  reactStrictMode: true,
};

const mergedConfig = plugins.reduce((acc, plugin) => plugin(acc), baseConfig);

export default withSentryConfig(mergedConfig, {
  org: "yapp-26th-web-2nd",
  project: "26th-web-team-2-fe-web",
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayShadowDom: true,
    excludeReplayIframe: true,
    excludeReplayWorker: true,
  },
  disableLogger: true,
  silent: !process.env.CI,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  telemetry: false,
  tunnelRoute: "/monitoring",
  widenClientFileUpload: true,
});
