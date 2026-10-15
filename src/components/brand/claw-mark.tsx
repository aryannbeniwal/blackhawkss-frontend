import { cn } from "cn";

/**
 * Eyebrow accent: a short rule in the current colour, placed before section labels.
 * (Replaces the earlier three-slash "claw" motif, which read as noise at small sizes.)
 */
export function ClawMark({ className }: { className?: string; color?: string }) {
  return <span aria-hidden className={cn("inline-block h-0.5 w-7 shrink-0 rounded-full bg-current", className)} />;
}
