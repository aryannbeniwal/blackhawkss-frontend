import type { LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "security-guards"
  | "bouncers-event-security"
  | "personal-security-officers"
  | "security-supervisors"
  | "manpower-supply"
  | "housekeeping-services";

/** Values sent to the backend enquiry API. Keep in sync with the Java enum ServiceCategory. */
export type ServiceCategory =
  | "SECURITY_GUARDS"
  | "BOUNCERS_EVENT_SECURITY"
  | "PERSONAL_SECURITY_OFFICERS"
  | "SECURITY_SUPERVISORS"
  | "MANPOWER_SUPPLY"
  | "HOUSEKEEPING"
  | "OTHER";

export type Service = {
  slug: ServiceSlug;
  category: ServiceCategory;
  /** Short name for cards and nav, e.g. "Security Guards" */
  name: string;
  /** Full page title, e.g. "Security Guard Services" */
  title: string;
  /** One line for cards (max ~110 chars) */
  summary: string;
  /** 2–3 sentence intro for the service page hero */
  intro: string;
  /** "support" services (housekeeping) render on the light sand theme */
  tone: "core" | "support";
  icon: LucideIcon;
  image: { src: string; alt: string } | null;
  whoItsFor: string[];
  included: string[];
  /** How a deployment is arranged, 3–5 ordered steps */
  howWeDeploy: string[];
  useCases: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Fields the quote form should emphasise for this service */
  quoteHints: string[];
  seo: { title: string; description: string; keywords: string[] };
};

export type IndustrySlug =
  | "corporate-commercial"
  | "residential-societies"
  | "educational-institutions"
  | "industrial-premises"
  | "hospitality-venues"
  | "events-private-functions";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  typicalNeeds: string[];
  relatedServices: ServiceSlug[];
};

export type ClientCity =
  | "Panipat"
  | "Samalkha"
  | "Chulkana"
  | "Sonipat"
  | "Gurugram"
  | "New Delhi"
  | "Gohana";

export type ClientOrg = {
  name: string;
  area: string;
  city: ClientCity;
  sector: "Hospitality" | "Healthcare" | "Industrial" | "Textile" | "Retail" | "Religious" | "Education" | "Residential" | "Commercial" | "Agri" | "Trading";
  /** Optional verified highlight (only from documents) */
  highlight?: string;
};

export type CitySlug =
  | "panipat"
  | "samalkha"
  | "sonipat"
  | "karnal"
  | "kurukshetra"
  | "gurugram"
  | "delhi"
  | "noida"
  | "faridabad";

export type City = {
  slug: CitySlug;
  name: string;
  state: "Haryana" | "Delhi" | "Uttar Pradesh";
  /** Unique 2–3 paragraph copy; must not be templated text with the city swapped */
  intro: string[];
  /** Localities/landmarks used naturally in copy */
  localities: string[];
  /** Service slugs most relevant here, in order */
  featuredServices: ServiceSlug[];
  /** Names from clients.ts served in/near this city (empty allowed) */
  servedOrgs: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
  /** Approx distance/time from Samalkha office for honest "we cover" copy */
  fromOffice: string;
};

export type Leader = {
  id: "sandeep" | "aryan";
  name: string;
  title: string;
  shortBio: string;
  bio: string[];
  focusAreas: string[];
  quote?: string;
  contactId: "sandeep" | "aryan";
  portrait: { src: string; alt: string } | null;
};

export type Faq = { q: string; a: string };
