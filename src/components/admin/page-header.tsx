import { ArrowLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

export function PageHeader({ title, description, actions, icon: Icon, backHref, backLabel = "Back", meta, className }: { title: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; icon?: LucideIcon; backHref?: string; backLabel?: string; meta?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-6 gap-y-3", className)}>
      <div className="min-w-0 space-y-1.5">
        {backHref && (
          <Link href={backHref} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-brand-gold">
            <ArrowLeft className="size-3.5" /> {backLabel}
          </Link>
        )}
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
              <Icon className="size-5" />
            </span>
          )}
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-semibold uppercase tracking-wide md:text-3xl">{title}</h1>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        {meta && <div className="flex flex-wrap items-center gap-2 pt-0.5">{meta}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
