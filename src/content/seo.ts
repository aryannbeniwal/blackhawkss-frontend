export const defaultSeo = {
  titleTemplate: "%s | Black Hawk Security Solution",
  defaultTitle: "Security Guards, Bouncers & Manpower in Haryana & Delhi NCR | Black Hawk Security Solution",
  description:
    "Veteran-led security agency in Samalkha, Panipat. Security guards, event bouncers, PSOs, supervisors and manpower across Haryana and Delhi NCR. Request a quote.",
  keywords: [
    "security agency in Panipat",
    "security services in Samalkha",
    "security guards in Panipat",
    "bouncer services in Haryana",
    "event security services in Delhi NCR",
    "manpower supply in Haryana",
    "security agency in Haryana",
    "PSO services in Delhi NCR",
    "security supervisors in Panipat",
  ],
  locale: "en_IN",
};

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "industries"
  | "clients"
  | "gallery"
  | "careers"
  | "contact"
  | "quote"
  | "compliance"
  | "privacy"
  | "terms";

export const pageSeo: Record<PageKey, { title: string; description: string }> = {
  home: {
    title: "Security Guards, Bouncers & Manpower in Haryana & Delhi NCR",
    description: defaultSeo.description,
  },
  about: {
    title: "About Us — The People Behind Black Hawk",
    description:
      "Black Hawk Security Solution was founded by Sandeep Beniwal, a retired Indian Army serviceman, and Aryan Beniwal, a software engineer. Discipline on the ground, clear systems behind it.",
  },
  services: {
    title: "Security & Manpower Services",
    description:
      "Security guards, bouncers and event security, personal security officers, supervisors, manpower supply and domestic support staff across Haryana and Delhi NCR.",
  },
  industries: {
    title: "Industries We Serve",
    description:
      "Security and manpower for corporate premises, residential societies, educational institutions, industrial units, hospitality venues and events in Haryana and Delhi NCR.",
  },
  clients: {
    title: "Our Clients — Organisations We Have Served",
    description:
      "Hospitals, hotels, textile units, universities, societies and businesses in Panipat, Samalkha, Sonipat, Gurugram and Delhi served by Black Hawk Security Solution.",
  },
  gallery: {
    title: "Gallery — Deployments, Events & Team",
    description: "Photographs from Black Hawk Security Solution deployments, events and team activities across Haryana and Delhi NCR.",
  },
  careers: {
    title: "Careers — Join Black Hawk as a Guard, Bouncer or Supervisor",
    description:
      "Security guard, bouncer, PSO, supervisor and manpower roles with a veteran-led agency in Samalkha, Panipat. Ex-servicemen welcome. Apply online.",
  },
  contact: {
    title: "Contact Us — Office, WhatsApp & Phone",
    description:
      "Reach Black Hawk Security Solution in Samalkha, Panipat: office +91 88010 00054, Sandeep Beniwal +91 92555 34554, Aryan Beniwal +91 94668 80164, helloblackhawkss@gmail.com.",
  },
  quote: {
    title: "Request a Quote",
    description:
      "Tell us the service, location, dates and number of personnel you need. Black Hawk Security Solution will respond with a deployment plan and quotation.",
  },
  compliance: {
    title: "Compliance & Registrations",
    description: "Black Hawk Security Solution is a licensed, GST-registered partnership business based in Samalkha, Panipat, Haryana.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Black Hawk Security Solution collects, uses and stores the information submitted through this website.",
  },
  terms: {
    title: "Terms and Conditions",
    description: "Terms governing the use of the Black Hawk Security Solution website, quotations and engagements.",
  },
};
