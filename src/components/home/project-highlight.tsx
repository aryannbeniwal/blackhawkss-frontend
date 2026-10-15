import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { StatCounter } from "@/components/site/stat-counter";
import { verifiedStats } from "@/content/site";

/** Genuine assignment: PRISMA Fest 2026 at SRM University (verified by deployment invoice). */
export function ProjectHighlight() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-brand-charcoal">
      <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-center">
        <Reveal className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image src="/images/guard-park.jpg" alt="Black Hawk personnel in uniform (representative image)" fill className="object-cover object-top" sizes="(min-width: 1024px) 40rem, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-md bg-brand-black/70 px-3 py-1.5 text-[0.65rem] uppercase tracking-widest text-foreground/80">
              Representative imagery
            </p>
          </div>
        </Reveal>
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Project highlight</p>
            <h2 className="display-lg mt-4 text-balance">PRISMA Fest 2026 — SRM University, Sonipat</h2>
            <p className="lead mt-5">
              Black Hawk Security Solution deployed a coordinated bouncer team for the university&apos;s PRISMA Fest, covering entry control, crowd
              movement and stage-front security across the event schedule under on-site supervision.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {verifiedStats.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} source={s.source} />
            ))}
          </div>
          <Reveal delay={0.1}>
            <Link href="/clients" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold link-underline">
              Organisations we have served <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
