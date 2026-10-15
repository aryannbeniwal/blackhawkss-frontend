import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/site/json-ld";
import { SectionHeading } from "@/components/site/section-heading";
import { pageSeo } from "@/content/seo";
import { contacts, site } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { mailtoLink, telLink, whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({ ...pageSeo.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <div className="container-x pb-24 pt-28 sm:pt-36">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <SectionHeading as="h1" size="xl" eyebrow="Contact us" title="Reach the team directly" lead="Call, WhatsApp or write to us. For a deployment or event, the quote form gives us everything we need to respond quickly." />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {contacts.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow">{c.label}</p>
            <p className="mt-2 text-sm text-muted-foreground">{c.role}</p>
            <a href={telLink(c)} className="mt-4 block font-display text-3xl tabular-nums text-foreground transition hover:text-brand-gold">
              {c.display}
            </a>
            <div className="mt-5 flex gap-2">
              <a href={telLink(c)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-red py-2.5 text-sm font-semibold text-white hover:bg-brand-red-deep">
                <Phone className="size-4" /> Call
              </a>
              <a href={whatsappLink(undefined, c)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-sm font-semibold text-black hover:brightness-110">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div className="flex gap-4">
            <Mail className="mt-1 size-5 shrink-0 text-brand-gold" />
            <div>
              <p className="font-semibold">Email</p>
              <a href={mailtoLink(site.email, "Enquiry — Black Hawk Security Solution")} className="text-muted-foreground hover:text-brand-gold">
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin className="mt-1 size-5 shrink-0 text-brand-gold" />
            <div>
              <p className="font-semibold">Office</p>
              <address className="not-italic text-muted-foreground">{site.address.display}</address>
              <div className="mt-2 flex flex-wrap gap-4">
                <a href={site.mapsShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-gold underline underline-offset-2">
                  Open in Google Maps <ExternalLink className="size-3.5" />
                </a>
                <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-gold underline underline-offset-2">
                  Get directions <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
          {site.mapsEmbedUrl ? (
            <iframe
              title="Black Hawk Security Solution office location"
              src={site.mapsEmbedUrl}
              className="aspect-[4/3] w-full rounded-2xl border border-border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
              Map embed will appear here once the office pin is confirmed.
            </div>
          )}
          <p className="text-xs text-muted-foreground">Service coverage: {site.serviceArea}. GSTIN {site.gstin}.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 lg:col-span-7">
          <h2 className="display-md">Send a message</h2>
          <p className="mt-2 mb-6 text-sm text-muted-foreground">
            For deployment enquiries, the <a href="/quote" className="text-brand-gold underline underline-offset-2">quote form</a> is faster.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
