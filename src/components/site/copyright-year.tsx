"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Current year rendered on the client so the static shell never depends on build time.
 * Pass `start` (e.g. the founding year) to show a range like "2024–2026".
 */
export function CopyrightYear({ start }: { start?: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => start ?? 2026,
  );
  if (!start || year <= start) return <>{year}</>;
  return <>{`${start}–${year}`}</>;
}
