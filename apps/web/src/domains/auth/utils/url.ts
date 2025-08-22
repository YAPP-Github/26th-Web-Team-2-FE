import { btoa } from "node:buffer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const state = {
  encode: (value: Record<string, string>) => {
    return btoa(JSON.stringify(value));
  },
  decode: <T = Record<string, string>>(value: string): T => {
    return JSON.parse(atob(value)) as T;
  },
};

export const redirectToLogin = async () => {
  const to = await getToUrl();
  redirect(`/api/auth/login?to=${encodeURIComponent(to)}`);
};

const getToUrl = async () => {
  const readonly = await headers();
  const nextUrl = readonly.get("x-next-url");
  if (!nextUrl) {
    return "/";
  }
  const url = new URL(nextUrl);
  return url.pathname + url.search;
};
