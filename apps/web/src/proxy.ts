import { type NextRequest, NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {
  const headers = new Headers(request.headers);
  headers.set("x-next-url", request.nextUrl.href);
  return NextResponse.next({ headers });
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
