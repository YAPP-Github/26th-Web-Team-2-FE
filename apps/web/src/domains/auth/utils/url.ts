import { btoa } from "node:buffer";

export const state = {
  encode: (value: Record<string, string>) => {
    return btoa(JSON.stringify(value));
  },
  decode: <T = Record<string, string>>(value: string): T => {
    return JSON.parse(atob(value)) as T;
  },
};
