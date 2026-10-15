import { CtaBand } from "@/components/site/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { pageSeo } from "@/content/seo";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/site/page-seo";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const metadata = buildMetadata({ ...pageSeo.services, path: "/services" });

export default function ServicesPage() {
  const core = services.filter((s) => s.tone === "core");
  const support = services.filter((s) => s.tone === "support");
  return (
    <>
      <PageSeo name={pageSeo.services.title} description={pageSeo.services.description} path="/services" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <div className="container-x pt-28 sm:pt-36">
        <Reveal>
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} className="mb-5" />
        <SectionHeading as="h1" size="xl" eyebrow="Services" title="Security & manpower services" lead="Every assignment starts with a conversation about the site, the event or the role. These are the services we currently accept." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((s, i) => (
            <RevealItem key={s.slug} className="h-full">
              <ServiceCard service={s} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-16">
          <SectionHeading eyebrow="Support staffing" title="Beyond security" size="md" lead="Domestic and facility support staff, arranged with the same coordination — kept visually and operationally separate from security deployments." />
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {support.map((s, i) => (
            <RevealItem key={s.slug} className="h-full">
              <ServiceCard service={s} index={core.length + i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <CtaBand />
    </>
  );
}
