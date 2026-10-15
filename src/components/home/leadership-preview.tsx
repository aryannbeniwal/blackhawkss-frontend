import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ClawMark } from "@/components/brand/claw-mark";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { leaders } from "@/content/leadership";

export function LeadershipPreview() {
  return (
    <section className="container-x py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Founders"
            title="The People Behind Black Hawk"
            lead="Military discipline meets modern thinking — united by a commitment to professional security."
          />
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold link-underline">
            Meet the founders <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {leaders.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-brand-steel">
                  {l.portrait ? (
                    <Image src={l.portrait.src} alt={l.portrait.alt} fill className="object-cover object-top" sizes="(min-width: 1024px) 20rem, 100vw" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-display text-6xl font-bold text-brand-gold/30">{l.name.split(" ").map((n) => n[0]).join("")}</span>
                    </div>
                  )}
                </div>
                <p className="eyebrow mt-5">
                  <ClawMark />
                  Co-Founder
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide">{l.name}</h3>
                <p className="text-sm font-medium text-brand-gold/90">{l.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.shortBio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
