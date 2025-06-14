import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const plugins = [
  (config: NextConfig): NextConfig => ({
    ...config,
    webpack(config, options) {
      if (!config.module) config.module = { rules: [] };

      config.module.rules.push({
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

      if (typeof config.webpack === "function") {
        return config.webpack(config, options);
      }

      return config;
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
