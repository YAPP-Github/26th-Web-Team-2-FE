import { type NextRequest, NextResponse } from "next/server";

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ provider: string[] }> },
) => {
  const { provider } = await params;
  const url = new URL(
    `/api/auth/callback/${provider}${request.nextUrl.search}`,
    request.url,
  );
  return NextResponse.redirect(url);
};

export { handler as GET };
