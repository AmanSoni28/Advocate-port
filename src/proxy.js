import { NextResponse } from "next/server";
import { decryptSession, SESSION_COOKIE_NAME } from "@/lib/auth/session";

const LOGIN_PATH = "/admin/login";

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decryptSession(token);
  const isAuth = Boolean(session?.adminId);

  if (!isAuth && pathname !== LOGIN_PATH) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (isAuth && pathname === LOGIN_PATH) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
