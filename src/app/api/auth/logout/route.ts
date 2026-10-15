import { NextResponse } from "next/server";
import { backendUrl } from "@/lib/api/server/backend";
import { clearSessionCookies, readSession } from "@/lib/api/server/session";

/** Revokes the refresh token server-side (best-effort) and clears the session cookies. */
export async function POST(): Promise<NextResponse> {
  const session = await readSession();
  if (session?.refreshToken) {
    try {
      await fetch(backendUrl("/api/v1/auth/logout"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
        },
        body: JSON.stringify({ refreshToken: session.refreshToken }),
        cache: "no-store",
      });
    } catch {
      // best-effort: clearing cookies ends the browser session regardless
    }
  }
  const res = NextResponse.json({ success: true, data: null });
  clearSessionCookies(res);
  return res;
}
