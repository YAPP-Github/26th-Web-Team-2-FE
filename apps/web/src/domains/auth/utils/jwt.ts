import { decodeJwt } from "jose";

export const isTokenExpired = (token: string, buffer = 300) => {
  try {
    const payload = decodeJwt(token);
    if (!payload.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1_000);
    const expirationTime = (payload.exp as number) - buffer;

    return currentTime >= expirationTime;
  } catch {
    return true;
  }
};
