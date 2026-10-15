import { MapPin } from "lucide-react";
import { ProjectHighlight } from "@/components/home/project-highlight";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { clientCount, clientsByCity } from "@/content/clients";
import { pageSeo } from "@/content/seo";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...pageSeo.clients, path: "/clients" });

export default function ClientsPage() {
  const grouped = clientsByCity();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Our Clients", path: "/clients" }])} />
      <div className="container-x pt-28 sm:pt-36">
        <Reveal>
          <SectionHeading
            as="h1"
            size="xl"
            eyebrow="Client portfolio"
            title="Organisations we have served"
            lead={`${clientCount} hotels, hospitals, industries, societies, institutions and events across Haryana and Delhi NCR — past and present assignments, listed with their permission in our client register.`}
          />
        </Reveal>
        <div className="mt-14 space-y-12 pb-20">
          {grouped.map(({ city, orgs: list }) => {
            if (list.length === 0) return null;
            return (
              <section key={city} aria-labelledby={`city-${city}`}>
                <Reveal className="flex items-center gap-3">
                  <MapPin className="size-5 text-brand-gold" />
                  <h2 id={`city-${city}`} className="font-display text-2xl font-semibold uppercase tracking-wide">
                    {city}
                  </h2>
                  <span className="text-sm text-muted-foreground">({list.length})</span>
                </Reveal>
                <RevealGroup className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" as="ul">
                  {list.map((c) => (
                    <RevealItem key={c.name} as="li" className="rounded-xl border border-border bg-card p-5 transition hover:border-brand-gold/40">
                      <p className="font-semibold">{c.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{c.area}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-brand-steel px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-foreground/80">{c.sector}</span>
                        {c.highlight && <span className="rounded-full border border-brand-gold/40 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-brand-gold">{c.highlight}</span>}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            );
          })}
        </div>
      </div>
      <ProjectHighlight />
      <CtaBand />
    </>
  );
}
