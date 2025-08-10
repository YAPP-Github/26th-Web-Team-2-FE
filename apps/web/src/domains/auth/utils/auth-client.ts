import * as jose from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
  type AuthConfig,
  AuthError,
  type SessionData,
} from "@/domains/auth/types";
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
      if (encoded) {
        const { to } = state.decode<{ to: string }>(encoded);
        return NextResponse.redirect(new URL(to, request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  public async logout(request: NextRequest) {
    const cookieStore = await cookies();
    cookieStore.delete(this.config.sessionCookieName);
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

  public async getSession() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(this.config.sessionCookieName);
    if (!cookie?.value) {
      return null;
    }
    return (await this.decrypt(cookie.value)) as SessionData;
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

  public async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
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
