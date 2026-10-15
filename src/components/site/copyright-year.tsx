"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year rendered on the client so the static shell never depends on build time. */
export function CopyrightYear({ start = 2025 }: { start?: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => start,
  );
  if (year <= start) return <>{start}</>;
  return <>{`${start}–${year}`}</>;
}
