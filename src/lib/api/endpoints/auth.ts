import type { AdminUser, ApiEnvelope } from "@/lib/api/types";
import { ApiError } from "@/lib/api/http";

/** Auth goes through our own route handlers (cookies), not the backend proxy. */
async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  let envelope: ApiEnvelope<T> | null = null;
  try {
    envelope = (await res.json()) as ApiEnvelope<T>;
  } catch {
    envelope = null;
  }
  if (!res.ok || !envelope?.success) {
    throw new ApiError(res.status, envelope?.error?.code ?? "INTERNAL_ERROR", envelope?.error?.message ?? `Request failed (${res.status})`);
  }
  return envelope.data as T;
}

export const authApi = {
  login: (email: string, password: string) =>
    call<AdminUser | null>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => call<null>("/api/auth/logout", { method: "POST" }),
  session: () => call<AdminUser>("/api/auth/session"),
};
