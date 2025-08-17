import type { cookies } from "next/headers";
import type { NextRequest } from "next/server";

// @ssok/api에서 OAuth 관련 타입 가져오기
export type {
  OauthLoginResponse as OAuthLoginResponse,
  StandardResponseOauthLoginResponse,
  TokenSuccessResponse,
} from "@ssok/api/schemas";

export interface AuthConfig {
  secret: string;
  sessionCookieName: string;
  cookieOptions: CookieOptions;
  authorize: (request: NextRequest) => Promise<string | null>;
  callback: (request: NextRequest) => Promise<SessionData | null>;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export interface CookieOptions
  extends NonNullable<
    Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2]
  > {}

export interface SessionData {
  user: {
    userId: number;
    nickname: string;
  };
  tokenSet: {
    accessToken: string;
    refreshToken: string;
  };
}
