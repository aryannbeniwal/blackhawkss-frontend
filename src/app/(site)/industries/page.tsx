import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { industries } from "@/content/industries";
import { pageSeo } from "@/content/seo";
import { getService } from "@/content/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...pageSeo.industries, path: "/industries" });

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <div className="container-x pt-28 sm:pt-36">
        <Reveal>
          <SectionHeading as="h1" size="xl" eyebrow="Industries we serve" title="Security planned around how your premises work" lead="Each sector brings its own access points, timings and risks. We discuss them before proposing a deployment." />
        </Reveal>
        <div className="mt-14 space-y-6 pb-20">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={Math.min(i * 0.05, 0.2)}>
              <article id={ind.slug} className="scroll-mt-28 grid gap-8 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-steel text-brand-gold">
                    <ind.icon className="size-6" />
                  </span>
                  <h2 className="display-md mt-5">{ind.name}</h2>
                  <p className="mt-3 text-muted-foreground">{ind.description}</p>
                </div>
                <div className="lg:col-span-4">
                  <p className="eyebrow">Typical needs</p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                    {ind.typicalNeeds.map((n) => (
                      <li key={n} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-3">
                  <p className="eyebrow">Relevant services</p>
                  <ul className="mt-4 space-y-2">
                    {ind.relatedServices.map((slug) => {
                      const s = getService(slug);
                      if (!s) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/services/${slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold link-underline">
                            {s.name} <ArrowRight className="size-3.5" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
