import { NextRequest, NextResponse } from "next/server";

// Inlined (not imported from session.ts) — proxy must not pull in next/headers.
const COOKIE_REFRESH = "bh_refresh";

/**
 * /admin route guard — a UX gate only. It checks cookie *presence* (no JWT
 * verification): real authorisation is the backend's ROLE_ADMIN check on every
 * proxied call. Next 16 naming: this is the old middleware.ts.
 */
export default function proxy(req: NextRequest): NextResponse {
  const hasSession = Boolean(req.cookies.get(COOKIE_REFRESH)?.value);
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    if (hasSession) return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }

  if (!hasSession) {
    const login = new URL("/admin/login", req.url);
    if (pathname !== "/admin") login.searchParams.set("next", pathname + req.nextUrl.search);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
