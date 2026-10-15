import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/lib/api/server/backend";
import { applySessionCookies } from "@/lib/api/server/session";
import type { ApiEnvelope, TokenPair } from "@/lib/api/types";

/** Exchanges email+password for a backend token pair and stores it in httpOnly cookies. */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.text();
  let backendRes: Response;
  try {
    backendRes = await fetch(backendUrl("/api/v1/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Could not reach the server. Please try again." } },
      { status: 502 },
    );
  }

  let envelope: ApiEnvelope<TokenPair>;
  try {
    envelope = (await backendRes.json()) as ApiEnvelope<TokenPair>;
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Unexpected backend response" } },
      { status: 502 },
    );
  }

  if (!envelope.success || !envelope.data) {
    return NextResponse.json(envelope, { status: backendRes.status });
  }

  const tokens = envelope.data;
  const user = tokens.user ?? null;
  if (user && user.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "This account is not authorised for the admin panel" } },
      { status: 403 },
    );
  }

  const res = NextResponse.json({ success: true, data: user });
  applySessionCookies(res, tokens, user);
  return res;
}
