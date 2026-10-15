import Image from "next/image";
import { Quote } from "lucide-react";
import { HawkMark } from "@/components/brand/hawk-mark";
import { ClawMark } from "@/components/brand/claw-mark";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { aboutPage, leaders } from "@/content/leadership";
import { pageSeo } from "@/content/seo";
import { contacts } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { telLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({ ...pageSeo.about, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }])} />
      <section className="relative overflow-hidden bg-brand-black">
        <div className="bg-red-glow absolute inset-0" aria-hidden />
        <HawkMark className="-left-28 top-10 h-[30rem] w-[30rem] opacity-[0.05]" />
        <div className="container-x relative pb-16 pt-32 sm:pt-40">
          <SectionHeading as="h1" size="xl" eyebrow="About us" title={aboutPage.heading} lead={aboutPage.tagline} />
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-12">
        <Reveal className="space-y-5 lg:col-span-7">
          {aboutPage.story.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lg leading-relaxed text-foreground/90" : "leading-relaxed text-muted-foreground"}>
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-card p-7">
            <p className="eyebrow">
              <ClawMark /> {aboutPage.openDoor.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{aboutPage.openDoor.text}</p>
          </div>
        </Reveal>
      </section>

      {/* Leaders */}
      <section className="border-y border-border bg-brand-charcoal bg-brick">
        <div className="container-x space-y-10 py-20">
          {leaders.map((l, idx) => {
            const contact = contacts.find((c) => c.id === l.contactId);
            return (
              <Reveal key={l.id}>
                <article className={`grid gap-8 rounded-2xl border border-border bg-brand-black/70 p-7 sm:p-9 lg:grid-cols-12 ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-brand-steel">
                      {l.portrait ? (
                        <Image src={l.portrait.src} alt={l.portrait.alt} fill className="object-cover" sizes="(min-width: 1024px) 24rem, 100vw" />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                          <span className="font-display text-7xl font-bold text-brand-gold/25">{l.name.split(" ").map((n) => n[0]).join("")}</span>
                          <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Portrait to follow</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="eyebrow">Partner</p>
                    <h2 className="display-md mt-3">{l.name}</h2>
                    <p className="mt-1 font-medium text-brand-gold">{l.title}</p>
                    <div className="mt-5 space-y-4">
                      {l.bio.map((p, i) => (
                        <p key={i} className="leading-relaxed text-foreground/85">
                          {p}
                        </p>
                      ))}
                    </div>
                    {l.quote && (
                      <blockquote className="mt-6 flex gap-3 border-l-2 border-brand-gold pl-4 text-foreground/90">
                        <Quote className="size-5 shrink-0 text-brand-gold" />
                        <p className="italic">{l.quote}</p>
                      </blockquote>
                    )}
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {l.focusAreas.map((f) => (
                        <li key={f} className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                          {f}
                        </li>
                      ))}
                    </ul>
                    {contact && (
                      <a href={telLink(contact)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold link-underline">
                        Call {l.name.split(" ")[0]} · {contact.display}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-20">
        <Reveal>
          <SectionHeading eyebrow="Our values" title="What we hold personnel to" align="center" />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" as="ul">
          {aboutPage.values.map((v, i) => (
            <RevealItem key={v.title} as="li" className="rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-sm tracking-widest text-brand-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-wide">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <CtaBand />
    </>
  );
}
