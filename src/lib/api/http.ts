import type { ApiEnvelope } from "@/lib/api/types";

/** A backend error surfaced to UI code: stable `code` + display `message` + optional field errors. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * The one browser → proxy fetch every endpoint module uses. `path` is the backend
 * path without a leading slash, e.g. `api/v1/public/enquiries`.
 * The proxy (app/api/backend/[...path]) attaches the admin JWT from the httpOnly cookie.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/backend/${path}`, {
    ...init,
    headers: {
      ...(init?.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  let envelope: ApiEnvelope<T> | null = null;
  try {
    envelope = (await res.json()) as ApiEnvelope<T>;
  } catch {
    envelope = null;
  }

  if (!res.ok || !envelope?.success) {
    throw new ApiError(
      res.status,
      envelope?.error?.code ?? (res.status === 429 ? "RATE_LIMITED" : "INTERNAL_ERROR"),
      envelope?.error?.message ?? friendlyStatus(res.status),
      envelope?.error?.fields,
    );
  }
  return envelope.data as T;
}

function friendlyStatus(status: number): string {
  if (status === 429) return "Too many requests. Please wait a few minutes and try again, or call us.";
  if (status >= 500 || status === 0) return "We could not reach the server. Please try again or contact us by phone.";
  return `Request failed (${status})`;
}

/** Builds a query string from defined params only (0 and false are kept). */
export function query(params: object): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params) as [string, unknown][]) {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}
