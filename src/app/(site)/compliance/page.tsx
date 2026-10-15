import { BadgeCheck, FileText, Landmark, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { pageSeo } from "@/content/seo";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/site/page-seo";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const metadata = buildMetadata({ ...pageSeo.compliance, path: "/compliance" });

const items = [
  { icon: ShieldCheck, title: "Licensed security agency", value: "Licence details available on request", note: "Shared with clients during onboarding and on quotation documents." },
  { icon: Landmark, title: "GST registration", value: site.gstin, note: "All invoices are GST invoices issued under this registration (State: Haryana, code 06)." },
  { icon: FileText, title: "PAN & registration documents", value: "Shared on request for vendor onboarding", note: "Firm registered in the names of Sandeep Beniwal and Aryan Beniwal. Copies are sent to clients during onboarding, not published here." },
  { icon: BadgeCheck, title: "Registered office", value: site.address.display, note: "Service coverage across Haryana and Delhi NCR." },
];

export default function CompliancePage() {
  return (
    <>
      <PageSeo name={pageSeo.compliance.title} description={pageSeo.compliance.description} path="/compliance" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Compliance", path: "/compliance" }]} />
      <div className="container-x pb-20 pt-28 sm:pt-36">
        <Reveal>
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Compliance", path: "/compliance" }]} className="mb-5" />
        <SectionHeading as="h1" size="xl" eyebrow="Compliance & trust" title="The paperwork behind the deployment" lead="Corporate and institutional buyers ask for these before onboarding a security vendor. Here is what we hold and how to obtain copies." />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <div className="flex h-full gap-5 rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-steel text-brand-gold">
                  <it.icon className="size-6" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold uppercase tracking-wide">{it.title}</h2>
                  <p className="mt-1 font-mono text-sm text-brand-gold">{it.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{it.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-card/40 p-6 text-sm text-muted-foreground">
          Need copies of registration documents, a vendor onboarding form filled, or bank details on letterhead? Email{" "}
          <a href={`mailto:${site.email}`} className="text-brand-gold hover:underline">
            {site.email}
          </a>{" "}
          with your organisation name and we will send them.
        </Reveal>
      </div>
      <CtaBand />
    </>
  );
}
