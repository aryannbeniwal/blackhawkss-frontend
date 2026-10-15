import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/brand/instagram-icon";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { CopyrightYear } from "@/components/site/copyright-year";
import { contacts, nav, site, socialLinks } from "@/content/site";
import { services } from "@/content/services";
import { mailtoLink, telLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-brand-black pb-24 pt-14 sm:pb-12">
      <div className="divider-chevron absolute inset-x-0 top-0" aria-hidden />
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo size={52} priority={false} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Professional security and manpower staffing for businesses, institutions, societies and events across {site.serviceArea}.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["Licensed", "GST registered", "Veteran-led"].map((t) => (
              <li key={t} className="rounded-full border border-brand-gold/30 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-brand-gold">
                {t}
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex gap-2">
            {socialLinks.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${site.shortName} on ${s.label}`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:border-brand-gold hover:text-brand-gold"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-brand-gold">Services</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="inline-block py-1 text-foreground/80 transition hover:text-brand-gold">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-brand-gold">Company</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {nav
              .filter((n) => n.href !== "/")
              .map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block py-1 text-foreground/80 transition hover:text-brand-gold">
                    {n.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/compliance" className="inline-block py-1 text-foreground/80 transition hover:text-brand-gold">
                Compliance
              </Link>
            </li>
            <li>
              <Link href="/quote" className="inline-block py-1 font-semibold text-brand-gold underline underline-offset-4 transition hover:text-brand-gold-soft">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-brand-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                <div>
                  <a href={telLink(c)} className="font-mono tabular-nums text-foreground transition hover:text-brand-gold">
                    {c.display}
                  </a>
                  <span className="block text-xs text-muted-foreground">{c.label}</span>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-gold" />
              <a href={mailtoLink(site.email)} className="text-foreground transition hover:text-brand-gold">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" />
              <address className="not-italic text-foreground/85">{site.address.display}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CopyrightYear /> {site.legalName}. All rights reserved. GSTIN {site.gstin}.
        </p>
        <div className="flex gap-5">
          <Link href="/privacy" className="transition hover:text-brand-gold">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-brand-gold">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
