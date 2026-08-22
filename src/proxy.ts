import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sessionCookieName, verifySessionToken } from "./lib/session-token";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(sessionCookieName)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/contatos/:path*"],
};
