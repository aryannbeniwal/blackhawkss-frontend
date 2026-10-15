"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = { value: number; suffix?: string; label: string; source?: string };

/** Counts up once when scrolled into view. Only for verified numbers. */
export function StatCounter({ value, suffix = "", label, source }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className="border-l-2 border-brand-gold/70 pl-5">
      <div className="font-display text-5xl font-bold leading-none text-brand-gold tabular-nums sm:text-6xl">
        {display}
        {suffix}
      </div>
      <p className="mt-3 max-w-[22ch] text-sm leading-snug text-foreground/85">{label}</p>
      {source && <p className="mt-1 text-[0.7rem] uppercase tracking-wider text-muted-foreground">{source}</p>}
    </div>
  );
}
