import { exchangeKakaoToken, getKakaoAuthorizeUrl } from "@ssok/api";
import type { NextRequest } from "next/server";
import { AuthClient } from "@/domains/auth/utils/auth-client";

export const auth = new AuthClient({
  secret: process.env.INTERNAL_AUTH_SECRET,
  sessionCookieName: "ssok.session",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  authorize: async (request: NextRequest) => {
    const response = await getKakaoAuthorizeUrl(
      { baseUrl: request.nextUrl.origin },
      { next: { revalidate: 60 * 60 } }, // 1 hour
    );
    return response.data.result?.authorizeUrl || null;
  },
  callback: async (request: NextRequest) => {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
      return null;
    }

    const response = await exchangeKakaoToken({
      code,
      baseUrl: request.nextUrl.origin,
    });
    if (
      !response.data.result ||
      !response.data.result.userId ||
      !response.data.result.nickname ||
      !response.data.result.token ||
      !response.data.result.token.accessToken ||
      !response.data.result.token.refreshToken
    ) {
      console.error({ data: response.data });
      return null;
    }

    return {
      user: {
        userId: response.data.result.userId,
        nickname: response.data.result.nickname,
      },
      tokenSet: {
        accessToken: response.data.result.token.accessToken,
        refreshToken: response.data.result.token.refreshToken,
      },
    };
  },
});
