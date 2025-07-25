import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import withSvgr from "next-plugin-svgr";

const plugins = [
  (config: NextConfig) =>
    withSentryConfig(config, {
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
    }),
  (config: NextConfig): NextConfig =>
    withSvgr({ ...config, svgrOptions: { dimensions: false, icon: true } }),
];

export default plugins.reduce((acc, plugin) => plugin(acc), {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "*" },
      { protocol: "https", hostname: "*" },
    ],
  },
  reactStrictMode: true,
} as NextConfig);
