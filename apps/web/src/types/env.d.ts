declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string;
      NEXT_PUBLIC_USER_1_ACCESS_TOKEN: string;
    }
  }
}

export {};
