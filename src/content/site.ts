/**
 * Verified business facts for Black Hawk Security Solution.
 * Everything here comes from the owners' brief and company documents.
 * Do not add claims (24/7, "leading", staff counts, licence numbers) that are not in those sources.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackhawkss.in";

export const site = {
  name: "Black Hawk Security Solution",
  shortName: "Black Hawk",
  legalName: "Black Hawk Security Solution",
  tagline: "Security Built on Discipline. Service Driven by Trust.",
  subTagline: "Professional Security & Manpower Solutions Across Haryana and Delhi NCR.",
  description:
    "From security guards and event bouncers to personal security officers, supervisors and manpower supply, Black Hawk Security Solution helps businesses and individuals discuss and arrange personnel for their requirements.",
  serviceArea: "Haryana and Delhi NCR",
  foundedNote: "A partnership between Sandeep Beniwal and Aryan Beniwal",
  email: "helloblackhawkss@gmail.com",
  gstin: "06ABEFB7001K1ZP",
  pan: "ABEFB7001K",
  address: {
    line1: "Old Thana Road, Near Anaj Mandi Gate No. 1",
    locality: "Samalkha",
    city: "Panipat",
    region: "Haryana",
    postalCode: "132101",
    country: "IN",
    display: "Old Thana Road, Near Anaj Mandi Gate No. 1, Samalkha, Panipat, Haryana – 132101, India",
  },
  /** Office pin confirmed by the owners on 2026-10-15 (https://maps.app.goo.gl/J3yRT1jif6mAP8MG6). */
  geo: { lat: 29.243607, lng: 77.010575 },
  mapsShareUrl: "https://maps.app.goo.gl/J3yRT1jif6mAP8MG6",
  /** Keyless Google Maps embed centred on the confirmed pin; override with NEXT_PUBLIC_MAPS_EMBED_URL if needed. */
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_MAPS_EMBED_URL ??
    "https://maps.google.com/maps?q=29.243607,77.010575&z=16&hl=en&output=embed",
  mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=29.243607,77.010575",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=29.243607,77.010575",
} as const;

export type ContactPerson = {
  id: "office" | "sandeep" | "aryan";
  label: string;
  role: string;
  /** Display form, e.g. "+91 88010 00054" */
  display: string;
  /** E.164 digits only, e.g. "918801000054" */
  e164: string;
  whatsapp: boolean;
};

export const contacts: readonly ContactPerson[] = [
  {
    id: "office",
    label: "Office",
    role: "Enquiries & WhatsApp",
    display: "+91 88010 00054",
    e164: "918801000054",
    whatsapp: true,
  },
  {
    id: "sandeep",
    label: "Sandeep Beniwal",
    role: "Partner · Security Operations",
    display: "+91 92555 34554",
    e164: "919255534554",
    whatsapp: true,
  },
  {
    id: "aryan",
    label: "Aryan Beniwal",
    role: "Partner · Technology & Business",
    display: "+91 94668 80164",
    e164: "919466880164",
    whatsapp: true,
  },
] as const;

export const primaryContact = contacts[0];

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Black Hawk Security Solution, I would like to enquire about your security and manpower services. Please contact me regarding my requirements.";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/clients", label: "Our Clients" },
  { href: "/gallery", label: "Gallery" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

/** Verified facts that may be shown as numbers. Each has a source. */
export const verifiedStats = [
  { value: 17, suffix: "+", label: "Years of Indian Army service behind our leadership", source: "Sandeep Beniwal, Jat Regiment" },
  { value: 24, suffix: "", label: "Organisations served across Haryana & Delhi NCR", source: "BHSS client register" },
  { value: 160, suffix: "", label: "Bouncers deployed for PRISMA Fest 2026, SRM University", source: "Deployment invoice, March 2026" },
] as const;

export const trustPoints = [
  "Licensed security agency",
  "GST registered business",
  "Veteran-led operations",
  "Serving Haryana & Delhi NCR",
] as const;
