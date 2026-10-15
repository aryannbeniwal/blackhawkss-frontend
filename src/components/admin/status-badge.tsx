import { cn } from "cn";
import { enumLabel } from "@/components/admin/format";

const TONE: Record<string, string> = {
  NEW: "gold",
  CONTACTED: "blue",
  REQUIREMENT_CONFIRMED: "purple",
  QUOTATION_SENT: "orange",
  WON: "green",
  LOST: "gray",
  CALLED: "blue",
  SHORTLISTED: "purple",
  JOINED: "green",
  REJECTED: "gray",
  EVENTS: "gold",
  SITES: "blue",
  TEAM: "purple",
};

const TONE_CLASSES: Record<string, { badge: string; dot: string }> = {
  gray: { badge: "bg-muted text-muted-foreground ring-foreground/10", dot: "bg-muted-foreground/70" },
  gold: { badge: "bg-brand-gold/10 text-brand-gold ring-brand-gold/30", dot: "bg-brand-gold" },
  blue: { badge: "bg-sky-500/10 text-sky-300 ring-sky-500/25", dot: "bg-sky-400" },
  purple: { badge: "bg-violet-500/10 text-violet-300 ring-violet-500/25", dot: "bg-violet-400" },
  orange: { badge: "bg-orange-500/10 text-orange-300 ring-orange-500/25", dot: "bg-orange-400" },
  green: { badge: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/25", dot: "bg-emerald-400" },
  red: { badge: "bg-red-500/10 text-red-300 ring-red-500/25", dot: "bg-red-400" },
};

export function StatusBadge({ status, label, size = "default", className }: { status: string | null | undefined; label?: string; size?: "sm" | "default" | "lg"; className?: string }) {
  if (!status) return <span className="text-muted-foreground">—</span>;
  const tone = TONE_CLASSES[TONE[status] ?? "gray"];
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full font-medium whitespace-nowrap ring-1 ring-inset",
        size === "sm" && "h-5 px-1.5 text-[11px]",
        size === "default" && "h-6 px-2 text-xs",
        size === "lg" && "h-7 px-2.5 text-[13px]",
        tone.badge,
        className,
      )}
    >
      <span className={cn("inline-flex size-1.5 rounded-full", tone.dot)} />
      {label ?? enumLabel(status)}
    </span>
  );
}
