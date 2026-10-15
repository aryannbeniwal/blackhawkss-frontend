import type { Metadata } from "next";
import { defaultSeo } from "@/content/seo";
import { OG_IMAGE, SITE_URL, contacts, site, social, twitterHandle } from "@/content/site";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Route metadata: title, description, merged keywords, canonical, Open Graph (locale, image), Twitter card, robots.
 * Page keywords are merged with the site-wide targets so every page carries the core local terms.
 */
export function buildMetadata({ title, description, path, keywords, image, noIndex, type = "website" }: PageMeta): Metadata {
  const url = abs(path);
  const img = image ? abs(image) : abs(OG_IMAGE.url);
  const imageMeta = image
    ? [{ url: img, alt: title }]
    : [{ url: img, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }];
  const mergedKeywords = Array.from(new Set([...(keywords ?? []), ...defaultSeo.keywords]));
  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: site.name,
      locale: defaultSeo.locale,
      images: imageMeta,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
      ...(twitterHandle ? { site: `@${twitterHandle}`, creator: `@${twitterHandle}` } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

/* ------------------------------------------------------------------ JSON-LD nodes (verified facts only) */

type Node = Record<string, unknown>;

/** Wraps nodes in one @graph block, the shape Google recommends for multiple entities per page. */
export function graph(...nodes: (Node | null | undefined | false)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) as Node[] };
}

export function organizationNode(): Node {
  return {
    "@type": ["LocalBusiness", "SecurityService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: abs("/brand/black-hawk-logo-512.png"), width: 431, height: 512 },
    image: abs(OG_IMAGE.url),
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
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsShareUrl,
    areaServed: [
      { "@type": "State", name: "Haryana" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
    ],
    contactPoint: contacts.map((c) => ({
      "@type": "ContactPoint",
      telephone: `+${c.e164}`,
      contactType: c.id === "office" ? "customer service" : "sales",
      name: c.label,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    })),
    founder: [
      { "@type": "Person", "@id": `${SITE_URL}/about#sandeep`, name: "Sandeep Beniwal" },
      { "@type": "Person", "@id": `${SITE_URL}/about#aryan`, name: "Aryan Beniwal" },
    ],
    vatID: site.gstin,
    sameAs: [...social, site.mapsShareUrl],
  };
}

export function webSiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageNode(input: { name: string; description: string; path: string; image?: string; breadcrumbId?: string }): Node {
  const url = abs(input.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: abs(input.image ?? OG_IMAGE.url) },
    ...(input.breadcrumbId ? { breadcrumb: { "@id": input.breadcrumbId } } : {}),
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]): Node {
  const last = items[items.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(last?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function serviceNode(input: { name: string; description: string; path: string; areaServed?: string[]; image?: string }): Node {
  return {
    "@type": "Service",
    "@id": `${abs(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: abs(input.path),
    serviceType: input.name,
    provider: { "@id": ORG_ID },
    areaServed: (input.areaServed ?? ["Haryana", "Delhi NCR"]).map((n) => ({ "@type": "AdministrativeArea", name: n })),
    ...(input.image ? { image: abs(input.image) } : {}),
  };
}

export function faqNode(faqs: { q: string; a: string }[], path: string): Node {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function personNode(input: { id: "sandeep" | "aryan"; name: string; jobTitle: string; description: string; image?: string }): Node {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/about#${input.id}`,
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    worksFor: { "@id": ORG_ID },
    ...(input.image ? { image: abs(input.image) } : {}),
  };
}

/* Backwards-compatible helpers used by existing pages */
export function localBusinessJsonLd(extra: Record<string, unknown> = {}) {
  return { "@context": "https://schema.org", ...organizationNode(), ...extra };
}
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", ...breadcrumbNode(items) };
}
export function faqJsonLd(faqs: { q: string; a: string }[], path = "/") {
  return { "@context": "https://schema.org", ...faqNode(faqs, path) };
}
export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return { "@context": "https://schema.org", ...serviceNode(input) };
}
