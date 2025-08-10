import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/domains/auth";

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ auth: string[] }> },
): Promise<NextResponse> => {
  const { auth: segments } = await params;
  const [action] = segments;

  switch (action) {
    case "login": {
      return auth.authorize(request);
    }
    case "callback": {
      return auth.callback(request);
    }
    case "logout": {
      return auth.logout(request);
    }
    default: {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }
};

export { handler as GET, handler as POST };
