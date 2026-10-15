import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";

export type StatTone = "default" | "gold" | "blue" | "purple" | "orange" | "green" | "gray" | "red";

const TONE: Record<StatTone, string> = {
  default: "bg-brand-red/15 text-brand-red",
  gold: "bg-brand-gold/15 text-brand-gold",
  blue: "bg-sky-500/15 text-sky-300",
  purple: "bg-violet-500/15 text-violet-300",
  orange: "bg-orange-500/15 text-orange-300",
  green: "bg-emerald-500/15 text-emerald-300",
  gray: "bg-muted text-muted-foreground",
  red: "bg-red-500/15 text-red-300",
};

export function StatCard({ label, value, hint, href, loading, icon: Icon, tone = "default", className }: { label: string; value: React.ReactNode; hint?: string; href?: string; loading?: boolean; icon?: LucideIcon; tone?: StatTone; className?: string }) {
  const body = (
    <div className={cn("group/stat relative flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4 transition", href && "hover:border-brand-gold/50", className)}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        {Icon ? (
          <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", TONE[tone])}>
            <Icon className="size-4" />
          </span>
        ) : href ? (
          <ArrowUpRight className="size-4 text-muted-foreground/50 transition-colors group-hover/stat:text-brand-gold" />
        ) : null}
      </div>
      <div className="space-y-1">
        {loading ? <Skeleton className="h-8 w-20" /> : <p className="font-display text-3xl font-semibold tabular-nums tracking-tight">{value}</p>}
        {hint && !loading && <p className="truncate text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
  return href ? (
    <Link href={href} className="block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
      {body}
    </Link>
  ) : (
    body
  );
}
