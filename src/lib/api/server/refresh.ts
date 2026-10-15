import "server-only";
import { backendUrl } from "@/lib/api/server/backend";
import type { Session } from "@/lib/api/server/session";
import type { TokenPair } from "@/lib/api/types";

/** Returns a fresh token pair when the access token is missing/expiring, else null. */
export async function refreshIfNeeded(session: Session): Promise<TokenPair | null> {
  const soon = Date.now() + 30_000;
  if (session.accessToken && session.expiresAtMs > soon) return null;
  const res = await fetch(backendUrl("/api/v1/auth/refresh"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: session.refreshToken }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { success: boolean; data?: TokenPair };
  return json.success && json.data ? json.data : null;
}
