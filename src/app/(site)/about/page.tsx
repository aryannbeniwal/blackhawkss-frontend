import Image from "next/image";
import { Phone } from "lucide-react";
import { HawkMark } from "@/components/brand/hawk-mark";
import { ClawMark } from "@/components/brand/claw-mark";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { aboutPage, aboutPhoto, leaders } from "@/content/leadership";
import { pageSeo } from "@/content/seo";
import { contacts } from "@/content/site";
import { buildMetadata, personNode } from "@/lib/seo";
import { telLink } from "@/lib/whatsapp";
import { PageSeo } from "@/components/site/page-seo";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const metadata = buildMetadata({ ...pageSeo.about, path: "/about", image: aboutPhoto.src });

export default function AboutPage() {
  return (
    <>
      <PageSeo
        name={pageSeo.about.title}
        description={pageSeo.about.description}
        path="/about"
        image={aboutPhoto.src}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]}
        nodes={leaders.map((l) => personNode({ id: l.id, name: l.name, jobTitle: l.title, description: l.shortBio, image: l.portrait?.src }))}
      />
      <section className="relative overflow-hidden bg-brand-black">
        <div className="bg-red-glow absolute inset-0" aria-hidden />
        <HawkMark className="-left-28 top-10 h-[30rem] w-[30rem] opacity-[0.05]" />
        <div className="container-x relative pb-16 pt-32 sm:pt-40">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]} className="mb-5" />
          <SectionHeading as="h1" size="xl" eyebrow="About us" title={aboutPage.heading} lead={aboutPage.tagline} />
        </div>
      </section>

      <section className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-8 lg:col-span-7">
          <Reveal className="space-y-5">
            {aboutPage.story.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg leading-relaxed text-foreground/90" : "leading-relaxed text-muted-foreground"}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-7">
              <p className="eyebrow">
                <ClawMark /> {aboutPage.openDoor.title}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{aboutPage.openDoor.text}</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="flex items-center justify-center lg:col-span-5">
          <figure className="w-full max-w-md overflow-hidden rounded-2xl border border-border">
            <div className="relative aspect-[4/5]">
              <Image src={aboutPhoto.src} alt={aboutPhoto.alt} fill className="object-cover object-[50%_35%]" sizes="(min-width: 1024px) 26rem, 100vw" />
            </div>
            <figcaption className="bg-card px-4 py-3 text-xs text-muted-foreground">{aboutPhoto.caption}</figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Leaders */}
      <section className="border-y border-border bg-brand-charcoal bg-brick">
        <div className="container-x space-y-10 py-20">
          {leaders.map((l, idx) => {
            const contact = contacts.find((c) => c.id === l.contactId);
            return (
              <Reveal key={l.id}>
                <article className={`grid gap-8 rounded-2xl border border-border bg-brand-black/70 p-7 sm:p-9 lg:grid-cols-12 lg:items-center ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="flex items-center lg:col-span-4">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-brand-steel">
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
                    <p className="eyebrow">Co-Founder</p>
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
                      <blockquote className="relative mt-6 border-l-2 border-brand-gold py-1 pl-5 text-foreground/90">
                        <span aria-hidden className="absolute -top-3 left-3 font-display text-5xl leading-none text-brand-gold/70">&ldquo;</span>
                        <p className="relative pl-5 italic">{l.quote}</p>
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
                      <a
                        href={telLink(contact)}
                        className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-gold/50 px-4 py-2 text-sm font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
                      >
                        <Phone className="size-4" /> Call {l.name.split(" ")[0]} · <span className="tabular-nums">{contact.display}</span>
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
