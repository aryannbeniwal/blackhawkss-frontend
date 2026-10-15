import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HawkMark } from "@/components/brand/hawk-mark";
import { ClientMarquee } from "@/components/site/client-marquee";
import { IndustryCard } from "@/components/site/industry-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { engagementSteps, whyBlackHawk } from "@/content/whyUs";

export function ServicesSection() {
  return (
    <section id="services" className="container-x scroll-mt-24 py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="What we provide"
          title="Security & manpower, arranged to your requirement"
          lead="Six staffing services, each discussed and planned around the site, event or role you need covered."
        />
      </Reveal>
      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <RevealItem key={s.slug} className="h-full">
            <ServiceCard service={s} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-brand-charcoal bg-brick">
      <HawkMark className="-right-20 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 opacity-[0.05]" tone="gold" />
      <div className="container-x relative py-20 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow="Why Black Hawk" title="Disciplined conduct. Coordinated deployment." lead="What clients can expect from every assignment we take on." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4" as="ul">
          {whyBlackHawk.map((w, i) => (
            <RevealItem key={w.title} as="li" className="bg-brand-black/70 p-7">
              <div className="flex items-center justify-between">
                <w.icon className="size-6 text-brand-gold" />
                <span className="font-display text-sm tracking-widest text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold uppercase tracking-wide">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Industries we serve" title="Built for premises, institutions and events" />
        <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold link-underline">
          All industries <ArrowRight className="size-4" />
        </Link>
      </Reveal>
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind) => (
          <RevealItem key={ind.slug} className="h-full">
            <IndustryCard industry={ind} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

export function ClientsPreview() {
  return (
    <section className="border-t border-border py-16">
      <div className="container-x mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionHeading eyebrow="Client portfolio" title="Organisations we have served" size="md" lead="Hotels, hospitals, industries, societies, institutions and events across Haryana and Delhi NCR — past and present assignments." />
        </Reveal>
        <Link href="/clients" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold link-underline">
          View all <ArrowRight className="size-4" />
        </Link>
      </div>
      <ClientMarquee />
    </section>
  );
}

export function EngagementSteps() {
  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal>
        <SectionHeading eyebrow="How engagement works" title="From enquiry to supervised deployment" align="center" />
      </Reveal>
      <RevealGroup className="relative mt-14 grid gap-8 md:grid-cols-4" as="ol">
        <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent md:block" />
        {engagementSteps.map((s) => (
          <RevealItem key={s.step} as="li" className="relative">
            <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-black font-display text-lg font-bold text-brand-gold">
              {s.step}
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
