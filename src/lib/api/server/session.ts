import "server-only";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import type { AdminUser, TokenPair } from "@/lib/api/types";

/**
 * The httpOnly cookie set is the browser's whole admin session — tokens never reach
 * client-side JS. `bh_user` is display data for the shell, not a security boundary:
 * the backend authorises every proxied call by JWT.
 */
export const COOKIE_ACCESS = "bh_access";
export const COOKIE_REFRESH = "bh_refresh";
export const COOKIE_EXP = "bh_exp";
export const COOKIE_USER = "bh_user";

const REFRESH_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // mirrors the backend's 7d refresh TTL

const BASE = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;

export type Session = { accessToken: string | null; refreshToken: string; expiresAtMs: number; user: AdminUser | null };

export async function readSession(): Promise<Session | null> {
  const store = await cookies();
  const refreshToken = store.get(COOKIE_REFRESH)?.value;
  if (!refreshToken) return null;
  let user: AdminUser | null = null;
  const raw = store.get(COOKIE_USER)?.value;
  if (raw) {
    try {
      user = JSON.parse(decodeURIComponent(raw)) as AdminUser;
    } catch {
      user = null;
    }
  }
  return {
    accessToken: store.get(COOKIE_ACCESS)?.value ?? null,
    refreshToken,
    expiresAtMs: Number(store.get(COOKIE_EXP)?.value ?? 0) || 0,
    user,
  };
}

export function applySessionCookies(res: NextResponse, tokens: TokenPair, user?: AdminUser | null): void {
  const expiresAtMs = Date.now() + tokens.expiresIn * 1000;
  res.cookies.set(COOKIE_ACCESS, tokens.accessToken, { ...BASE, maxAge: tokens.expiresIn });
  res.cookies.set(COOKIE_REFRESH, tokens.refreshToken, { ...BASE, maxAge: REFRESH_MAX_AGE_SECONDS });
  res.cookies.set(COOKIE_EXP, String(expiresAtMs), { ...BASE, maxAge: REFRESH_MAX_AGE_SECONDS });
  if (user) res.cookies.set(COOKIE_USER, encodeURIComponent(JSON.stringify(user)), { ...BASE, maxAge: REFRESH_MAX_AGE_SECONDS });
}

export function clearSessionCookies(res: NextResponse): void {
  for (const name of [COOKIE_ACCESS, COOKIE_REFRESH, COOKIE_EXP, COOKIE_USER]) {
    res.cookies.set(name, "", { ...BASE, maxAge: 0 });
  }
}
