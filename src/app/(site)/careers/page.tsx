import { CheckCircle2, FileText, MessageCircle } from "lucide-react";
import { ApplicationForm } from "@/components/forms/application-form";
import { HawkMark } from "@/components/brand/hawk-mark";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { careersPage } from "@/content/careers";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { PageSeo } from "@/components/site/page-seo";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const metadata = buildMetadata({ ...pageSeo.careers, path: "/careers" });

export default function CareersPage() {
  return (
    <>
      <PageSeo name={pageSeo.careers.title} description={pageSeo.careers.description} path="/careers" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} />
      <section className="relative overflow-hidden bg-brand-black">
        <div className="bg-gold-glow absolute inset-0" aria-hidden />
        <HawkMark className="-right-24 top-6 h-[26rem] w-[26rem] opacity-[0.05]" />
        <div className="container-x relative pb-14 pt-32 sm:pt-40">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} className="mb-5" />
        <SectionHeading as="h1" size="xl" eyebrow="Careers · नौकरी" title={careersPage.heading} lead={careersPage.tagline} />
          <div className="mt-8 max-w-2xl space-y-4 text-foreground/85">
            {careersPage.intro.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <a
            href={whatsappLink("Namaste Black Hawk Security Solution, main naukri ke liye apply karna chahta/chahti hoon. Mera naam: ___, district: ___, role: ___")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-black hover:brightness-110"
          >
            <MessageCircle className="size-4" /> WhatsApp par apply karein
          </a>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-5">
          <Reveal>
            <SectionHeading eyebrow="Open roles" title="Roles we hire for" size="md" />
            <RevealGroup className="mt-6 space-y-3" as="ul">
              {careersPage.roles.map((r) => (
                <RevealItem key={r.value} as="li" className="rounded-xl border border-border bg-card p-4">
                  <p className="font-semibold">{r.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Eligibility · योग्यता</p>
            <ul className="mt-4 space-y-2 text-sm">
              {careersPage.eligibility.map((e) => (
                <li key={e} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-gold" /> {e}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Documents · दस्तावेज़</p>
            <ul className="mt-4 space-y-2 text-sm">
              {careersPage.documents.map((d) => (
                <li key={d} className="flex gap-2">
                  <FileText className="mt-0.5 size-4 shrink-0 text-brand-gold" /> {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Process</p>
            <ol className="mt-4 space-y-3 text-sm">
              {careersPage.process.map((p, i) => (
                <li key={p} className="flex gap-3">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-brand-gold font-display text-xs text-brand-gold">{i + 1}</span>
                  <span className="text-foreground/85">{p}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
            <h2 className="display-md">Apply now · अभी आवेदन करें</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">Fill in what you can. We call every applicant when a suitable assignment comes up.</p>
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
