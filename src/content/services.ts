import { ClipboardCheck, Flower2, HardHat, ShieldCheck, UserCheck, Users } from "lucide-react";

import type { Service, ServiceCategory, ServiceSlug } from "./types";

export const services: Service[] = [
  {
    slug: "security-guards",
    category: "SECURITY_GUARDS",
    name: "Security Guards",
    title: "Security Guard Services",
    summary: "Uniformed, supervised guards for commercial, residential and industrial premises across Haryana and Delhi NCR.",
    intro:
      "Our guard deployments are built around the site, not a template. We discuss entry points, shift patterns, visitor flow and reporting lines before a single guard is posted, and a supervisor keeps the deployment on standard once it begins.",
    tone: "core",
    icon: ShieldCheck,
    image: { src: "/images/guard-street.jpg", alt: "Black Hawk security personnel in uniform (representative image)" },
    whoItsFor: [
      "Offices, showrooms and commercial complexes that need controlled entry and a professional front",
      "Residential societies and gated communities managing residents, visitors and vehicles",
      "Factories, warehouses and godowns with material movement and multiple gates",
      "Hospitals, clinics and institutions where conduct and courtesy matter as much as vigilance",
      "Banquet halls, hotels and venues with daily footfall",
    ],
    included: [
      "Uniformed guards briefed on your site's standing orders",
      "Gate and access control, visitor register and vehicle checks",
      "Day, night or rotating shifts as agreed in the deployment plan",
      "Patrolling schedule for larger premises",
      "Supervisor visits and attendance verification",
      "Replacement cover when a posted guard is absent",
      "Monthly GST invoicing with a deployment log",
    ],
    howWeDeploy: [
      "You share the site, number of posts, shift timing and any specific concerns.",
      "We visit or discuss the premises to confirm posts, duties and reporting lines.",
      "You receive a written deployment plan and quotation.",
      "Guards are briefed, documents verified, and deployment begins on the agreed date.",
      "A supervisor reviews the post regularly and you have a direct line to our office.",
    ],
    useCases: [
      { title: "Textile unit, Panipat", text: "Gate control across two entries with material-in and material-out registers and a night patrol round." },
      { title: "Residential society", text: "Main gate manning with visitor logging and coordination with the society office." },
      { title: "Hospital campus", text: "Entry regulation, parking discipline and courteous handling of attendants and visitors." },
    ],
    faqs: [
      { q: "Do you provide guards for a single post?", a: "Yes. Single-post deployments are common for shops, clinics and small offices. We still prepare a short deployment plan so duties are clear." },
      { q: "Can guards work rotating shifts?", a: "Yes. Day, night, 12-hour and rotating patterns are all possible. The shift pattern decides the number of personnel required, which we confirm in the quotation." },
      { q: "What happens if a guard does not report?", a: "Our supervisor arranges a replacement and the site is informed. Attendance is verified for invoicing." },
      { q: "Do you supply uniforms and equipment?", a: "Guards report in Black Hawk uniform. Site-specific items such as torches, registers or radios are agreed in the deployment plan." },
    ],
    quoteHints: ["Number of posts and gates", "Shift timing (day, night, rotating)", "Site address and type", "Start date and contract duration"],
    seo: {
      title: "Security Guard Services in Panipat, Haryana & Delhi NCR",
      description: "Uniformed, supervised security guards for offices, societies, factories and institutions in Panipat, Samalkha, Sonipat and Delhi NCR. Request a quote.",
      keywords: ["security guards in Panipat", "security agency in Panipat", "security services in Samalkha", "security agency in Haryana"],
    },
  },
  {
    slug: "bouncers-event-security",
    category: "BOUNCERS_EVENT_SECURITY",
    name: "Bouncers & Event Security",
    title: "Bouncers & Event Security",
    summary: "Crowd management and bouncer staffing for university fests, concerts, weddings, corporate functions and private events.",
    intro:
      "Event work is about preparation. We plan entry lanes, barricade points and escalation paths with the organiser in advance, then deploy a team under a lead who stays in contact with your event desk throughout.",
    tone: "core",
    icon: Users,
    image: { src: "/images/guard-park.jpg", alt: "Black Hawk event security personnel (representative image)" },
    whoItsFor: [
      "University and college festivals with large student crowds",
      "Concerts, exhibitions and public shows",
      "Weddings and private functions with VIP guests",
      "Corporate events, product launches and dealer meets",
      "Religious gatherings and community events",
    ],
    included: [
      "Bouncers and event security personnel in uniform or plain dress as required",
      "Entry control, pass or wristband checks and queue management",
      "Stage, green room and VIP movement cover",
      "A team lead on site coordinating with the organiser",
      "Pre-event walkthrough for larger venues",
      "Clear escalation to venue management or police where required",
      "Staffing sized to the venue, expected attendance and duration",
    ],
    howWeDeploy: [
      "Share the event date, venue, expected attendance, duration and any VIP or stage requirements.",
      "We propose the number of personnel, posts and reporting time, and quote accordingly.",
      "For large events we walk the venue with your team and agree barricade and entry plans.",
      "The team reports before gates open, is briefed by the lead and takes positions.",
      "The lead stays with your event desk until the venue is cleared.",
    ],
    useCases: [
      { title: "PRISMA Fest 2026, SRM University", text: "160 bouncers deployed across entry gates, stage front and campus movement for a multi-day university festival in Sonipat." },
      { title: "Wedding, Samalkha", text: "Gate and stage cover with discreet handling of guests and vendors through the evening." },
      { title: "Corporate dealer meet", text: "Registration-desk support, hall entry checks and parking coordination." },
    ],
    faqs: [
      { q: "How many bouncers do I need?", a: "It depends on venue layout, expected attendance, entry points and duration. Share these in the quote form and we will recommend a number rather than guess." },
      { q: "Can you handle multi-day events?", a: "Yes. Multi-day fests are staffed in shifts with the same lead so the plan stays consistent." },
      { q: "Do your teams coordinate with venue security or police?", a: "Yes. We work alongside venue staff and follow organiser and police instructions on the day." },
      { q: "Do you provide female security personnel for events?", a: "Where available for the assignment. Mention the requirement in your enquiry so we can plan for it." },
    ],
    quoteHints: ["Event date and timing", "Venue and city", "Expected attendance", "Number of entry points and VIPs"],
    seo: {
      title: "Bouncers & Event Security in Haryana and Delhi NCR",
      description: "Bouncer staffing and event security for college fests, weddings, concerts and corporate events across Haryana and Delhi NCR. Planned deployments with a team lead.",
      keywords: ["bouncer services in Haryana", "event security services in Delhi NCR", "bouncers for college fest", "event security Panipat"],
    },
  },
  {
    slug: "personal-security-officers",
    category: "PERSONAL_SECURITY_OFFICERS",
    name: "Personal Security Officers",
    title: "Personal Security Officers (PSOs)",
    summary: "Personal security staffing for individuals, families and executives, arranged in line with applicable legal requirements.",
    intro:
      "PSO assignments are arranged after a direct conversation about who is to be accompanied, where, and for how long. We staff what the assignment and the law permit, and we say so plainly when a requirement needs a different solution.",
    tone: "core",
    icon: UserCheck,
    image: null,
    whoItsFor: [
      "Business owners and executives with regular travel within Haryana and Delhi NCR",
      "Families requiring accompaniment for daily movement or specific occasions",
      "Public figures attending events and functions",
      "Visiting guests and delegates for the duration of their stay",
    ],
    included: [
      "A personal security officer assigned to the principal for the agreed period",
      "Accompaniment during movement, meetings and functions",
      "Coordination with drivers, venue staff and event security",
      "Daily or assignment-based scheduling",
      "A single point of contact at our office for changes",
      "Discreet conduct and confidentiality about the principal's schedule",
    ],
    howWeDeploy: [
      "We discuss the principal's routine, locations and the duration of the assignment.",
      "We confirm what can be provided under applicable legal requirements and quote accordingly.",
      "The officer is introduced to the principal and briefed on schedule and preferences.",
      "The assignment runs with regular check-ins from our office.",
    ],
    useCases: [
      { title: "Executive travel", text: "Accompaniment for a business owner moving between Panipat, Sonipat and Gurugram on working days." },
      { title: "Family function", text: "PSO cover for a family during a multi-day wedding across venues." },
      { title: "Visiting delegate", text: "Assignment for the duration of a guest's stay, coordinated with the host organisation." },
    ],
    faqs: [
      { q: "Are your PSOs armed?", a: "Armed assignments are subject to licensing and legal requirements. Discuss your requirement with us and we will confirm what can be provided lawfully." },
      { q: "Can I book a PSO for a single day?", a: "Yes. Single-day and short assignments are possible depending on availability." },
      { q: "Will the same officer be assigned throughout?", a: "We aim for continuity on longer assignments and plan cover in advance where a change is unavoidable." },
    ],
    quoteHints: ["Who is to be accompanied", "Locations and daily routine", "Duration of assignment", "Any specific requirements"],
    seo: {
      title: "Personal Security Officers (PSO) in Delhi NCR & Haryana",
      description: "Personal security officer staffing for executives, families and events in Delhi NCR and Haryana, arranged within applicable legal requirements. Discuss your requirement.",
      keywords: ["PSO services in Delhi NCR", "personal security officer Haryana", "bodyguard services Panipat"],
    },
  },
  {
    slug: "security-supervisors",
    category: "SECURITY_SUPERVISORS",
    name: "Security Supervisors",
    title: "Security Supervisors",
    summary: "Supervisory staffing to run guard teams, manage shifts and keep site reporting disciplined.",
    intro:
      "A good supervisor is the difference between a guard who stands at a gate and a security post that works. We provide supervisors to lead teams, manage shifts and attendance, and act as your single point of contact on site.",
    tone: "core",
    icon: ClipboardCheck,
    image: null,
    whoItsFor: [
      "Sites with four or more guards where shift coordination becomes a job in itself",
      "Industrial premises with multiple gates and material movement",
      "Residential societies that want one accountable person for the security team",
      "Organisations with in-house guards who need structured supervision",
    ],
    included: [
      "A supervisor responsible for the site's security team",
      "Shift rosters, attendance and relief management",
      "Daily occurrence reporting to your management",
      "Post checks and standing-order compliance",
      "Coordination with our office for replacements and escalation",
      "Incident reporting and follow-up",
    ],
    howWeDeploy: [
      "We review the site, team size and reporting expectations with you.",
      "A supervisor is proposed with a clear scope of responsibilities.",
      "Rosters and reporting formats are agreed before the start date.",
      "The supervisor takes charge of the team and reports to your nominated manager.",
    ],
    useCases: [
      { title: "Industrial unit", text: "One supervisor over a twelve-guard rotation across three gates with daily reporting." },
      { title: "Large residential society", text: "Supervisor coordinating gate guards, patrol rounds and the society office." },
      { title: "Supervising an in-house team", text: "Structured rosters and reporting for guards employed directly by the client." },
    ],
    faqs: [
      { q: "Can a supervisor manage guards we employ directly?", a: "Yes. Supervision-only arrangements are possible where you already have guards but need accountable leadership." },
      { q: "Does the supervisor work shifts?", a: "Supervisor timing is agreed with you. Larger sites may need more than one supervisor to cover both day and night." },
      { q: "What does the supervisor report?", a: "Attendance, post checks, incidents and anything requiring your decision, in a format agreed at the start." },
    ],
    quoteHints: ["Size of the team to be supervised", "Site type and number of gates", "Reporting expectations", "Timing of supervision"],
    seo: {
      title: "Security Supervisors in Panipat & Haryana",
      description: "Supervisory staffing for guard teams, shift management and site reporting in Panipat, Sonipat and across Haryana and Delhi NCR.",
      keywords: ["security supervisors in Panipat", "security supervisor services Haryana"],
    },
  },
  {
    slug: "manpower-supply",
    category: "MANPOWER_SUPPLY",
    name: "Manpower Supply",
    title: "Manpower Supply",
    summary: "Workforce and general support staffing for businesses, facilities and operational requirements.",
    intro:
      "Beyond security, we supply skilled and semi-skilled personnel for facilities, warehouses and events. Requirements are discussed openly, personnel are document-verified, and invoicing follows the same disciplined process as our security work.",
    tone: "core",
    icon: HardHat,
    image: null,
    whoItsFor: [
      "Factories and warehouses needing helpers, loaders and general workers",
      "Facility managers requiring housekeeping and support staff",
      "Event organisers needing set-up, usher and crowd-support staff",
      "Businesses with seasonal or project-based staffing needs",
    ],
    included: [
      "Personnel matched to the role you describe",
      "Document verification before deployment",
      "Shift-based or monthly arrangements",
      "A coordinator for attendance and replacements",
      "Transparent GST invoicing",
      "Scaling up or down as your requirement changes",
    ],
    howWeDeploy: [
      "You describe the roles, headcount, location and duration.",
      "We confirm availability and provide a quotation.",
      "Personnel are verified and briefed on the assignment.",
      "A coordinator manages attendance and stays in touch with your site manager.",
    ],
    useCases: [
      { title: "Warehouse loading", text: "Helpers and loaders for a dispatch season at a Panipat textile unit." },
      { title: "Event set-up", text: "Support staff for stage, seating and registration ahead of a corporate event." },
      { title: "Facility support", text: "Housekeeping and general support staff for a commercial building." },
    ],
    faqs: [
      { q: "What kinds of roles can you supply?", a: "Helpers, loaders, housekeeping, ushers, general support and similar roles. Tell us what you need and we will confirm what we can staff." },
      { q: "Is there a minimum duration?", a: "Short assignments are possible. Monthly arrangements are typical for ongoing facility needs." },
      { q: "Who handles attendance?", a: "Our coordinator keeps attendance and verifies it with your site manager for invoicing." },
    ],
    quoteHints: ["Roles and headcount", "Location", "Duration and shift pattern", "Start date"],
    seo: {
      title: "Manpower Supply in Haryana & Delhi NCR",
      description: "Skilled and semi-skilled manpower supply for factories, warehouses, facilities and events across Haryana and Delhi NCR. Verified personnel, transparent invoicing.",
      keywords: ["manpower supply in Haryana", "manpower agency Panipat", "labour supply Delhi NCR"],
    },
  },
  {
    slug: "gardeners-maids",
    category: "GARDENERS_MAIDS",
    name: "Gardeners & Maids",
    title: "Gardeners & Domestic Support",
    summary: "Gardening and domestic support staffing for homes, farmhouses, societies and institutions.",
    intro:
      "A separate line from our security work: gardeners, maids and domestic support staff for households, farmhouses and residential societies. Personnel are document-verified and arranged through the same office so you deal with one accountable team.",
    tone: "support",
    icon: Flower2,
    image: null,
    whoItsFor: [
      "Households and farmhouses needing regular gardening or domestic help",
      "Residential societies maintaining common gardens and lawns",
      "Institutions and offices with grounds to maintain",
      "Guest houses and small hospitality properties",
    ],
    included: [
      "Gardeners for lawns, plants and grounds maintenance",
      "Maids and domestic support staff on agreed schedules",
      "Document verification before placement",
      "Daily, part-time or full-time arrangements",
      "Replacement support when the placed person is unavailable",
    ],
    howWeDeploy: [
      "You tell us the work, timing and location.",
      "We confirm availability and the arrangement in writing.",
      "The person is introduced and the schedule begins.",
      "Our office stays reachable for changes or replacements.",
    ],
    useCases: [
      { title: "Farmhouse grounds", text: "A gardener on a weekly schedule for lawns and plantation around a farmhouse near Samalkha." },
      { title: "Society common areas", text: "Gardening staff for a society's green areas on fixed days." },
      { title: "Household support", text: "A verified maid for daily domestic work on agreed hours." },
    ],
    faqs: [
      { q: "Is this part of your security service?", a: "No. It is a separate support staffing service handled by the same office, with the same verification standard." },
      { q: "Can I request part-time help?", a: "Yes. Part-time and fixed-day arrangements are common for gardening and domestic work." },
      { q: "Are staff verified?", a: "Identity and address documents are checked before placement." },
    ],
    quoteHints: ["Type of work", "Days and hours", "Location", "Start date"],
    seo: {
      title: "Gardeners & Maids in Panipat and Samalkha",
      description: "Verified gardeners and domestic support staff for homes, farmhouses and societies in Panipat, Samalkha and nearby areas. Arranged through one accountable office.",
      keywords: ["gardener services Panipat", "maid services Samalkha", "domestic help Panipat"],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs: ServiceSlug[] = services.map((s) => s.slug);

export const serviceCategoryOptions: { value: ServiceCategory; label: string }[] = [
  { value: "SECURITY_GUARDS", label: "Security Guard Services" },
  { value: "BOUNCERS_EVENT_SECURITY", label: "Bouncers & Event Security" },
  { value: "PERSONAL_SECURITY_OFFICERS", label: "Personal Security Officers" },
  { value: "SECURITY_SUPERVISORS", label: "Security Supervisors" },
  { value: "MANPOWER_SUPPLY", label: "Manpower Supply" },
  { value: "GARDENERS_MAIDS", label: "Gardeners & Maids" },
  { value: "OTHER", label: "Other Enquiry" },
];

export function serviceCategoryLabel(category: ServiceCategory): string {
  return serviceCategoryOptions.find((o) => o.value === category)?.label ?? "Other Enquiry";
}

export function serviceForCategory(category: ServiceCategory): Service | undefined {
  return services.find((s) => s.category === category);
}
