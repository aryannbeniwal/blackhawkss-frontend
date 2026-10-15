import type { Metadata } from "next";
import { SITE_URL, contacts, site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  image?: string;
  noIndex?: boolean;
};

/** Builds route metadata with canonical + Open Graph from a small input. */
export function buildMetadata({ title, description, path, keywords, image, noIndex }: PageMeta): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: site.name,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/** LocalBusiness JSON-LD using only verified facts. */
export function localBusinessJsonLd(extra: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SecurityService"],
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/black-hawk-logo-512.png`,
    image: `${SITE_URL}/opengraph-image`,
    description: site.description,
    email: site.email,
    telephone: `+${contacts[0].e164}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "State", name: "Haryana" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
    ],
    founder: [
      { "@type": "Person", name: "Sandeep Beniwal" },
      { "@type": "Person", name: "Aryan Beniwal" },
    ],
    vatID: site.gstin,
    ...extra,
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: new URL(input.path, SITE_URL).toString(),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["Haryana", "Delhi NCR"],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
