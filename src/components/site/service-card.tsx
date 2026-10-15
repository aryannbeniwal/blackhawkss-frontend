import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";
import type { Service } from "@/content/types";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const support = service.tone === "support";
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
        support
          ? "theme-sand border-brand-sand-deep bg-brand-sand hover:border-brand-red/60"
          : "border-border bg-card hover:border-brand-gold/50",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-xl",
            support ? "bg-brand-black/90 text-brand-gold" : "bg-brand-steel text-brand-gold",
          )}
        >
          <service.icon className="size-6" />
        </span>
        {typeof index === "number" && (
          <span className={cn("font-display text-sm tracking-widest", support ? "text-brand-black/50" : "text-muted-foreground")}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold uppercase tracking-wide">{service.name}</h3>
      <p className={cn("mt-2 flex-1 text-sm leading-relaxed", support ? "text-brand-black/75" : "text-muted-foreground")}>
        {service.summary}
      </p>
      <span className={cn("mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em]", support ? "text-brand-red" : "text-brand-gold")}>
        Learn more
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      {!support && (
        <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand-red/0 blur-2xl transition group-hover:bg-brand-red/20" />
      )}
    </Link>
  );
}
