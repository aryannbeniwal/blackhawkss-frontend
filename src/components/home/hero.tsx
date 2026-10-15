"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { ClawMark } from "@/components/brand/claw-mark";
import { HawkMark } from "@/components/brand/hawk-mark";
import { CallSheet } from "@/components/site/call-sheet";
import { Button } from "@/components/ui/button";
import { site, trustPoints } from "@/content/site";
import { track } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay: reduce ? 0 : delay },
  });
  // The headline is the LCP element: it must paint immediately (opacity stays 1), so it only rises slightly.
  const rise = {
    initial: { y: reduce ? 0 : 14 },
    animate: { y: 0 },
    transition: { duration: 0.6, ease },
  };

  return (
    <section className="relative isolate overflow-hidden bg-brand-black">
      {/* Imagery */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-guard.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_20%] opacity-55 grayscale-[35%] lg:object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/60" />
        <div className="bg-red-glow absolute inset-0 opacity-80" />
      </div>
      <HawkMark className="-left-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.05] sm:h-[34rem] sm:w-[34rem]" tone="gold" />

      <div className="container-x relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center pb-20 pt-32 sm:pb-24 sm:pt-40">
        <motion.p {...rise} className="eyebrow">
          <ClawMark />
          {site.serviceArea} · Licensed security agency
        </motion.p>
        <motion.h1 {...rise} className="display-xl mt-5 max-w-4xl text-balance">
          Security Built on <span className="text-brand-gold">Discipline.</span>
          <br />
          Service Driven by <span className="text-brand-gold">Trust.</span>
        </motion.h1>
        <motion.p {...fade(0.16)} className="mt-6 max-w-2xl text-lg font-medium text-foreground/90 sm:text-xl">
          {site.subTagline}
        </motion.p>
        <motion.p {...fade(0.22)} className="lead mt-4 max-w-2xl">
          {site.description}
        </motion.p>
        <motion.div {...fade(0.3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-13 bg-brand-red px-8 text-base font-semibold uppercase tracking-wider text-white shadow-[0_10px_30px_-10px_rgba(224,32,32,0.7)] hover:bg-brand-red-deep">
            <Link href="/quote" onClick={() => track("quote_open", { placement: "hero" })}>
              Request a Quote
            </Link>
          </Button>
          <CallSheet>
            <Button size="lg" variant="outline" className="h-13 border-foreground/30 bg-transparent px-8 text-base font-semibold uppercase tracking-wider hover:border-brand-gold hover:bg-transparent hover:text-brand-gold">
              <Phone className="size-5" /> Talk to Our Team
            </Button>
          </CallSheet>
        </motion.div>

        <motion.ul {...fade(0.42)} className="mt-14 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/75">
          {trustPoints.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition hover:text-brand-gold motion-safe:animate-bounce sm:block"
      >
        <ChevronDown className="size-6" />
      </a>
    </section>
  );
}
