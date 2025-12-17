import { refreshTokens } from "@ssok/api";
import * as jose from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
  type AuthConfig,
  AuthError,
  type SessionData,
} from "@/domains/auth/types";
import { isTokenExpired } from "@/domains/auth/utils/jwt";
import { state } from "@/domains/auth/utils/url";

export class AuthClient {
  private readonly config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  public async authorize(request: NextRequest) {
    const to = request.nextUrl.searchParams.get("to") || "/";

    try {
      const authorizeUrl = await this.config.authorize(request);
      if (!authorizeUrl) {
        throw new AuthError("Failed to get authorize URL");
      }
      const authorizeUrlWithState = new URL(authorizeUrl);
      authorizeUrlWithState.searchParams.set("state", state.encode({ to }));
      return NextResponse.redirect(authorizeUrlWithState.toString());
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  public async callback(request: NextRequest) {
    try {
      const session = await this.config.callback(request);
      if (!session) {
        return NextResponse.redirect(new URL("/error", request.url));
      }
      await this.setSession(session);

      const encoded = request.nextUrl.searchParams.get("state");
      const redirectUrl = new URL(
        encoded ? state.decode<{ to: string }>(encoded).to : "/",
        request.url,
      );
      redirectUrl.searchParams.set("auth", "callback");
      if (session.user.newUser) {
        redirectUrl.searchParams.set("newUser", "true");
      }
      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  public async logout(request: NextRequest) {
    const cookieStore = await cookies();
    cookieStore.delete({
      name: this.config.sessionCookieName,
      ...this.config.cookieOptions,
    });

    const to = request.nextUrl.searchParams.get("to") || "/";
    return NextResponse.redirect(new URL(to, request.url));
  }

  public async setSession(session: SessionData) {
    const cookieStore = await cookies();
    const encrypted = await this.encrypt(session);

    cookieStore.set(
      this.config.sessionCookieName,
      encrypted,
      this.config.cookieOptions,
    );
  }

  public async getSession(options: { refresh?: boolean } = { refresh: true }) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(this.config.sessionCookieName);
    console.log({ cookie });
    console.log({ cookieValue: cookie?.value });
    if (!cookie?.value) {
      return null;
    }

    const session = (await this.decrypt(cookie.value)) as SessionData;
    if (!session || !options.refresh) {
      return session;
    }
    if (isTokenExpired(session.tokenSet.accessToken)) {
      const refreshed = await this.refreshSession(session);
      if (!refreshed) {
        cookieStore.delete(this.config.sessionCookieName);
        return null;
      }
      return refreshed;
    }

    return session;
  }

  public async getClientSession() {
    const session = await this.getSession();
    if (!session) {
      return null;
    }
    return {
      ...session,
      tokenSet: { accessToken: session.tokenSet.accessToken },
    };
  }

  private async refreshSession({
    tokenSet: { refreshToken },
    ...prev
  }: SessionData): Promise<SessionData | null> {
    try {
      const response = await refreshTokens({ refreshToken });

      if (
        response.status === 200 &&
        response.data.result?.accessToken &&
        response.data.result?.refreshToken
      ) {
        const session: SessionData = {
          ...prev,
          tokenSet: {
            accessToken: response.data.result.accessToken,
            refreshToken: response.data.result.refreshToken,
          },
        };

        await this.setSession(session);
        return session;
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private get secret(): Uint8Array {
    const bytes = new Uint8Array(Buffer.from(this.config.secret, "base64"));
    if (bytes.length !== 32) {
      throw new AuthError(
        `Invalid secret key length: ${bytes.length} bytes (expected 32 bytes for A256GCM)`,
      );
    }

    return bytes;
  }

  private async encrypt(session: SessionData) {
    try {
      return new jose.EncryptJWT(session as unknown as jose.JWTPayload)
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .encrypt(this.secret);
    } catch (error) {
      console.error(error);
      throw new AuthError("Failed to encrypt session data");
    }
  }

  private async decrypt(jwe: string) {
    try {
      const { payload } = await jose.jwtDecrypt<SessionData>(jwe, this.secret);
      return payload;
    } catch {
      return null;
    }
  }
}
