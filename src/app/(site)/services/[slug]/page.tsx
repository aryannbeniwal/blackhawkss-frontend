import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "cn";
import { HawkMark } from "@/components/brand/hawk-mark";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/content/services";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { whatsappLink, whatsappServiceMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.seo.title, description: s.seo.description, keywords: s.seo.keywords, path: `/services/${s.slug}`, image: s.image?.src });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const support = s.tone === "support";
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: s.title, description: s.seo.description, path: `/services/${s.slug}` }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }]),
          faqJsonLd(s.faqs),
        ]}
      />

      {/* Hero */}
      <section className={cn("relative overflow-hidden", support ? "theme-sand" : "bg-brand-black")}>
        {s.image && (
          <div className="absolute inset-0 -z-10">
            <Image src={s.image.src} alt="" fill priority sizes="100vw" className="object-cover object-[65%_25%] opacity-40 grayscale-[40%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent" />
          </div>
        )}
        {!s.image && !support && <div className="bg-red-glow absolute inset-0" aria-hidden />}
        <HawkMark className="-right-24 top-10 h-[28rem] w-[28rem] opacity-[0.05]" tone={support ? "red" : "gold"} />
        <div className="container-x relative pb-16 pt-32 sm:pb-20 sm:pt-40">
          <p className="eyebrow">
            <s.icon className="size-4" /> {support ? "Support staffing" : "Core security service"}
          </p>
          <h1 className="display-xl mt-5 max-w-4xl text-balance">{s.title}</h1>
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", support ? "text-brand-black/80" : "text-foreground/85")}>{s.intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-brand-red px-7 text-base font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
              <Link href={`/quote?service=${s.category}`}>Request a quote for {s.name}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={cn("h-12 px-7 text-base font-semibold uppercase tracking-wider", support ? "border-brand-black/30 text-brand-black hover:bg-brand-black hover:text-brand-gold" : "border-brand-gold/50 text-brand-gold hover:bg-brand-gold hover:text-brand-black")}>
              <a href={whatsappLink(whatsappServiceMessage(s.title))} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Who / Included */}
      <section className="container-x grid gap-12 py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading eyebrow="Who it's for" title="Where this service fits" size="md" />
          <ul className="mt-7 space-y-3">
            {s.whoItsFor.map((w) => (
              <li key={w} className="flex gap-3 text-foreground/90">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
            <h2 className="display-md">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.included.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* How we deploy */}
      <section className="border-y border-border bg-brand-charcoal bg-brick">
        <div className="container-x py-20">
          <Reveal>
            <SectionHeading eyebrow="How we deploy" title="From requirement to deployment" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4" as="ol">
            {s.howWeDeploy.map((step, i) => (
              <RevealItem key={step} as="li" className="rounded-xl border border-border bg-brand-black/60 p-6">
                <span className="font-display text-3xl font-bold text-brand-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{step}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Use cases */}
      <section className="container-x py-20">
        <Reveal>
          <SectionHeading eyebrow="Customer use cases" title="Typical assignments" />
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {s.useCases.map((u) => (
            <RevealItem key={u.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{u.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* FAQ */}
      <section className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Common questions" size="md" />
            <p className="mt-4 text-sm text-muted-foreground">For the quote, it helps to know: {s.quoteHints.join(", ").toLowerCase()}.</p>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-5">
              {s.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CtaBand title={`Need ${s.name.toLowerCase()}?`} text="Tell us the site or event, the dates and the headcount. We will discuss the requirement and send a quotation." service={s.category} />

      {/* Other services */}
      <section className="container-x py-16">
        <p className="eyebrow">Other services</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-brand-gold hover:text-brand-gold">
                <o.icon className="size-4" /> {o.name} <ArrowRight className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
