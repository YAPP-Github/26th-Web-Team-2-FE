import { defineConfig, type InputOptions } from "orval";

const input: InputOptions = {
  filters: { mode: "exclude", tags: ["Health"] },
  override: { transformer: "./src/api/transformer.js" },
  target: "./src/api/openapi.json",
};

export default defineConfig({
  api: {
    input,
    output: {
      baseUrl: "https://api.ssok.info",
      client: "react-query",
      httpClient: "fetch",
      mode: "split",
      mock: { type: "msw", delay: 500 },
      override: {
        enumGenerationType: "union",
        mock: { arrayMin: 4, arrayMax: 4 },
        mutator: { path: "./src/api/http.ts", name: "http" },
        operations: {
          getAccommodationByBoardIdAndUserId: {
            query: { useInfinite: true },
          },
        },
        query: { usePrefetch: true, useSuspenseQuery: true },
        useDates: true,
      },
      target: "./src/index.ts",
      urlEncodeParameters: true,
    },
    hooks: { afterAllFilesWrite: "biome check --write --unsafe" },
  },
});
