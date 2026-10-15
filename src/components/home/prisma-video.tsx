"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Short clip from PRISMA Fest 2026 (SRM University). Plays muted only while in view,
 * so the 3 MB file is never downloaded for visitors who do not scroll to it.
 */
export function PrismaVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <figure className="relative mx-auto aspect-[9/16] w-full max-w-[22rem] overflow-hidden rounded-2xl border border-border bg-brand-charcoal shadow-2xl shadow-black/50">
      <video
        ref={ref}
        src="/images/prisma-fest-2026.mp4"
        poster="/images/prisma-fest-2026-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label="Black Hawk bouncer team arriving at PRISMA Fest 2026, SRM University"
        className="h-full w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black/90 to-transparent px-4 pb-3 pt-10 text-[0.68rem] uppercase tracking-widest text-foreground/85">
        PRISMA&apos;26 · SRM University, Sonipat
      </figcaption>
    </figure>
  );
}
