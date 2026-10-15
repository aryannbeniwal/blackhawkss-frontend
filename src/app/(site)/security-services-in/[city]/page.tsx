import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HawkMark } from "@/components/brand/hawk-mark";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { ServiceAreaMap } from "@/components/site/service-area-map";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cities, getCity } from "@/content/cities";
import { clientsByName } from "@/content/clients";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/security-services-in/[city]">) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  return buildMetadata({ title: c.seo.title, description: c.seo.description, path: `/security-services-in/${c.slug}` });
}

export default async function CityPage({ params }: PageProps<"/security-services-in/[city]">) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const served = clientsByName(c.servedOrgs);
  const featured = c.featuredServices.map(getService).filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd({ areaServed: [{ "@type": "City", name: c.name }], url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackhawkss.in"}/security-services-in/${c.slug}` }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: `Security services in ${c.name}`, path: `/security-services-in/${c.slug}` }]),
          faqJsonLd(c.faqs),
        ]}
      />
      <section className="relative overflow-hidden bg-brand-black">
        <div className="bg-red-glow absolute inset-0" aria-hidden />
        <HawkMark className="-right-24 top-6 h-[26rem] w-[26rem] opacity-[0.05]" />
        <div className="container-x relative grid gap-10 pb-16 pt-32 sm:pt-40 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <MapPin className="size-4" /> {c.name}, {c.state}
            </p>
            <h1 className="display-xl mt-5 text-balance">Security guards, bouncers & manpower in {c.name}</h1>
            <p className="lead mt-6 max-w-2xl">{c.fromOffice}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-brand-red px-7 text-base font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
                <Link href="/quote">Request a quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-brand-gold/50 px-7 text-base font-semibold uppercase tracking-wider text-brand-gold hover:bg-brand-gold hover:text-brand-black">
                <Link href="/contact">Contact the team</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ServiceAreaMap highlight={c.slug} />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-12">
        <Reveal className="space-y-5 lg:col-span-7">
          {c.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lg leading-relaxed text-foreground/90" : "leading-relaxed text-muted-foreground"}>
              {p}
            </p>
          ))}
          <p className="text-sm text-muted-foreground">Areas we are regularly asked about: {c.localities.join(", ")}.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow">Served in and around {c.name}</p>
            {served.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {served.map((o) => (
                  <li key={o.name} className="flex justify-between gap-3 border-b border-border py-2 text-sm last:border-0">
                    <span className="font-medium">{o.name}</span>
                    <span className="shrink-0 text-muted-foreground">{o.area}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                We deploy to {c.name} on request. Our published client register currently lists assignments in Panipat, Samalkha, Sonipat, Gurugram and Delhi — see{" "}
                <Link href="/clients" className="text-brand-gold hover:underline">
                  Our Clients
                </Link>
                .
              </p>
            )}
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-brand-charcoal bg-brick">
        <div className="container-x py-20">
          <Reveal>
            <SectionHeading eyebrow="Services in this area" title={`What we arrange in ${c.name}`} />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <RevealItem key={s.slug} className="h-full">
                <ServiceCard service={s} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="container-x grid gap-10 py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title={`Working with us in ${c.name}`} size="md" />
          <p className="mt-4 text-sm text-muted-foreground">Registered office: {site.address.display}</p>
        </Reveal>
        <Reveal className="lg:col-span-8">
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-5">
            {c.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <section className="container-x pb-16">
        <p className="eyebrow">Other areas</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {cities
            .filter((o) => o.slug !== c.slug)
            .map((o) => (
              <li key={o.slug}>
                <Link href={`/security-services-in/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-brand-gold hover:text-brand-gold">
                  {o.name} <ArrowRight className="size-3.5" />
                </Link>
              </li>
            ))}
        </ul>
      </section>
      <CtaBand title={`Need security staff in ${c.name}?`} />
    </>
  );
}
