import type { MagnitudeConfig } from "magnitude-test";

export default {
  url: "http://localhost:5173",
  llm: {
    provider: "openai-generic",
    options: {
      baseUrl: process.env.MAGNITUDE_LLM_BASE_URL || "",
      model: process.env.MAGNITUDE_LLM_MODEL || "",
      apiKey: process.env.MAGNITUDE_LLM_API_KEY,
    },
  },
  telemetry: false,
  webServer: {
    command: "pnpm run dev --port 5173",
    url: "http://localhost:5173",
    timeout: 10_000,
    reuseExistingServer: true,
  },
} satisfies MagnitudeConfig;
