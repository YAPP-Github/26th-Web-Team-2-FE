declare module "next-plugin-svgr" {
  import type { Options as FileLoaderOptions } from "file-loader";
  import type { NextConfig } from "next";
  import type { Config as SvgrOptions } from "@svgr/core";

  interface NextPluginSvgrConfig extends NextConfig {
    assetPrefix?: string;
    fileLoader?: boolean | FileLoaderOptions;
    svgrOptions?: SvgrOptions & { babel?: boolean };
  }

  function nextPluginSvgr(nextConfig?: NextPluginSvgrConfig): NextConfig;

  export = nextPluginSvgr;
}
