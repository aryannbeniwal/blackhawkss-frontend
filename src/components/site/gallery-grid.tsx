"use client";

import { ImageOff, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "cn";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { GalleryItem } from "@/lib/api/types";

const categories: { value: GalleryItem["category"] | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "EVENTS", label: "Events" },
  { value: "SITES", label: "Sites" },
  { value: "TEAM", label: "Team" },
];

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]["value"]>("ALL");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const visible = filter === "ALL" ? items : items.filter((i) => i.category === filter);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
        <ImageOff className="size-10 text-muted-foreground" />
        <p className="mt-4 font-semibold">Photographs are being prepared</p>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">We publish authorised images from genuine assignments only. Check back soon, or ask us about recent deployments.</p>
      </div>
    );
  }

  return (
    <>
      <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            role="tab"
            aria-selected={filter === c.value}
            onClick={() => setFilter(c.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition",
              filter === c.value ? "border-brand-gold bg-brand-gold text-brand-black" : "border-border text-foreground/80 hover:border-brand-gold/60",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
        {visible.map((item) => (
          <li key={item.id}>
            <button onClick={() => setActive(item)} className="group relative block w-full overflow-hidden rounded-xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
              <Image src={item.thumbUrl} alt={item.title} width={item.width} height={item.height} className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black/80 to-transparent p-3 text-left text-sm font-medium">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl border-border bg-brand-black p-2" showCloseButton={false}>
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <Image src={active.url} alt={active.title} width={active.width} height={active.height} className="max-h-[80vh] w-auto rounded-lg object-contain" sizes="90vw" />
              <p className="px-2 pb-1 pt-2 text-sm text-muted-foreground">{active.title}</p>
              <button onClick={() => setActive(null)} aria-label="Close" className="absolute right-3 top-3 rounded-full bg-brand-black/70 p-2 text-foreground hover:text-brand-gold">
                <X className="size-5" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
