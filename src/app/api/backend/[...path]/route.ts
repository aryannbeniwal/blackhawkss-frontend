import { NextResponse, type NextRequest } from "next/server";
import { backendUrl } from "@/lib/api/server/backend";
import { refreshIfNeeded } from "@/lib/api/server/refresh";
import { applySessionCookies, clearSessionCookies, readSession } from "@/lib/api/server/session";

/**
 * Browser → backend proxy. Public endpoints pass straight through (with the client IP
 * forwarded for rate limiting). Admin endpoints get the JWT from the httpOnly cookie,
 * refreshing it when it is about to expire. Admin/auth paths are never cached.
 */
async function handle(req: NextRequest, ctx: RouteContext<"/api/backend/[...path]">): Promise<Response> {
  const { path } = await ctx.params;
  const target = backendUrl(`/${path.join("/")}${req.nextUrl.search}`);
  const isPublic = path[0] === "api" && path[2] === "public";
  const isAuth = path[0] === "api" && path[2] === "auth";

  const headers = new Headers();
  const ct = req.headers.get("content-type");
  if (ct) headers.set("content-type", ct);
  headers.set("accept", "application/json");
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");
  if (ip) headers.set("x-forwarded-for", ip);
  const ua = req.headers.get("user-agent");
  if (ua) headers.set("user-agent", ua);

  let rotated: Awaited<ReturnType<typeof refreshIfNeeded>> = null;
  if (!isPublic && !isAuth) {
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Please sign in." } }, { status: 401 });
    }
    rotated = await refreshIfNeeded(session);
    const token = rotated?.accessToken ?? session.accessToken;
    if (!token) {
      const res = NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Session expired. Please sign in again." } }, { status: 401 });
      clearSessionCookies(res);
      return res;
    }
    headers.set("authorization", `Bearer ${token}`);
  }

  const method = req.method.toUpperCase();
  const body = method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer();

  let upstream: Response;
  try {
    upstream = await fetch(target, { method, headers, body, cache: "no-store", redirect: "manual" });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "The service is temporarily unavailable. Please try again or call us." } },
      { status: 502 },
    );
  }

  const res = new NextResponse(upstream.body, {
    status: upstream.status,
    headers: { "content-type": upstream.headers.get("content-type") ?? "application/json", "cache-control": "no-store" },
  });
  if (rotated) applySessionCookies(res, rotated);
  if (upstream.status === 401 && !isPublic && !isAuth) clearSessionCookies(res);
  return res;
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
