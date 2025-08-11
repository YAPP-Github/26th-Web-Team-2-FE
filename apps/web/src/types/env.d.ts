declare global {
  namespace NodeJS {
    interface ProcessEnv {
      INTERNAL_AUTH_SECRET: string;
      NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string;
    }
  }
}

export {};
