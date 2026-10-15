import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail (pairs with the BreadcrumbList JSON-LD emitted by PageSeo). */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-foreground/80">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition hover:text-brand-gold">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight className="size-3.5 opacity-60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
