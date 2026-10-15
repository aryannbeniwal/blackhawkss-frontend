import { cn } from "cn";

/**
 * Large low-contrast watermark of the hawk shield, drawn from the mono logo via CSS mask.
 * Purely decorative (aria-hidden); never carries content.
 */
export function HawkMark({ className, tone = "gold" }: { className?: string; tone?: "gold" | "white" | "red" }) {
  const color = tone === "gold" ? "#f5b400" : tone === "red" ? "#e02020" : "#ffffff";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
      style={{
        backgroundColor: color,
        WebkitMaskImage: "url(/brand/black-hawk-logo-mono.png)",
        maskImage: "url(/brand/black-hawk-logo-mono.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
