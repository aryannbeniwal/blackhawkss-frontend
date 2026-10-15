import "server-only";

/** Server-side helpers to reach the Spring Boot backend. Never import from client code. */
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export function backendUrl(path: string): string {
  return `${BACKEND_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Public GET used by server components inside a "use cache" scope (gallery, announcements). Never throws. */
export async function backendGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(backendUrl(path), { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const json = (await res.json()) as { success: boolean; data?: T };
    return json.success ? (json.data as T) : null;
  } catch {
    return null;
  }
}
