import { cn } from "cn";

/** The three diagonal slashes from the logo — used as an accent next to eyebrow labels. */
export function ClawMark({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 20"
      className={cn("h-3.5 w-6 shrink-0", className)}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M4 18 L12 2" />
      <path d="M13 18 L21 2" />
      <path d="M22 18 L30 2" />
    </svg>
  );
}
