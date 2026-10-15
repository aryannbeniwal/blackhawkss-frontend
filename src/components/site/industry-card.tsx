import Link from "next/link";
import type { Industry } from "@/content/types";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/industries#${industry.slug}`}
      className="card-lift group flex items-start gap-4 rounded-xl border border-border bg-card/60 p-5 transition hover:border-brand-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
    >
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-steel text-brand-gold">
        <industry.icon className="size-5" />
      </span>
      <span>
        <span className="block font-display text-lg font-semibold uppercase tracking-wide group-hover:text-brand-gold">{industry.name}</span>
        <span className="mt-1 block text-sm leading-snug text-muted-foreground">{industry.summary}</span>
      </span>
    </Link>
  );
}
