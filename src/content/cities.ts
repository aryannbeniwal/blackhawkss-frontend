import type { City } from "./types";

/**
 * City pages for local search. Each entry has its own copy — the intro paragraphs are written
 * for the place, not templated. Distances from the Samalkha office are approximate.
 */
export const cities: City[] = [
  {
    slug: "panipat",
    name: "Panipat",
    state: "Haryana",
    fromOffice: "Our office in Samalkha is within Panipat district, about 20 km from the city centre.",
    intro: [
      "Panipat is our home district. Black Hawk Security Solution operates from Samalkha, and most of the organisations in our client register are Panipat businesses: textile and handloom units around Sector 29 Part II and Rishalu Road, a hospital at Sewah, hotels and traders at Jhattipur, and industrial premises along Khalila Road.",
      "Textile and export units here run on material movement, which is why our Panipat deployments lean on gate registers, vehicle checks and night patrols with a supervisor over multi-gate teams. For hospitals and hotels on the GT Road corridor, the emphasis shifts to courteous entry control and parking discipline.",
      "Because the office is close, a partner can visit a Panipat site before quoting and a supervisor can reach a post quickly when something needs attention.",
    ],
    localities: ["Sector 29 Part II", "GT Road", "Sewah", "Jhattipur", "Rishalu Road", "Khalila Road", "Model Town", "Tehsil Camp"],
    featuredServices: ["security-guards", "security-supervisors", "manpower-supply", "bouncers-event-security"],
    servedOrgs: ["The Shivalika Rugs", "Ayushman Hospital", "SR Traders", "Star Vintage Textile", "Mannat Hotel Group", "Hatchery c/o Ex. MLA Sh. Ravinder", "Sundram Industries"],
    faqs: [
      { q: "Do you provide security guards for textile units in Panipat?", a: "Yes. Several of our Panipat clients are textile and handloom businesses. Deployments typically cover gate control, material registers and night patrols." },
      { q: "Can someone visit our Panipat site before quoting?", a: "Yes. For sites in Panipat district we normally visit before preparing the deployment plan." },
      { q: "Do you supply helpers and loaders in Panipat?", a: "Yes, through our manpower supply service, including seasonal dispatch periods." },
    ],
    seo: {
      title: "Security Agency in Panipat — Guards, Supervisors & Manpower",
      description: "Black Hawk Security Solution is a Samalkha-based security agency serving Panipat's textile units, hospitals, hotels and industries with guards, supervisors and manpower.",
    },
  },
  {
    slug: "samalkha",
    name: "Samalkha",
    state: "Haryana",
    fromOffice: "Our office is in Samalkha itself, on Old Thana Road near Anaj Mandi Gate No. 1.",
    intro: [
      "Samalkha is where Black Hawk Security Solution is based. Our office sits on Old Thana Road near Anaj Mandi Gate No. 1, and our earliest assignments were for local businesses: a jeweller on Railway Road, hotels at Pattikalyana, a banquet venue and a dhaba on the Main GT Road, a polymer unit by the Anaj Mandi and a textile business at Manana.",
      "Being local means the partners know the town's venues, the mandi's rhythms and the GT Road traffic that shapes function nights. It also means a guard who does not report is replaced from nearby, and a client can walk into the office rather than wait on a call.",
      "For Samalkha households and farmhouses we also arrange gardeners and domestic support staff through the same office.",
    ],
    localities: ["Old Thana Road", "Anaj Mandi", "Railway Road", "Main GT Road", "Pattikalyana", "Chulkana Road", "Manana", "Shastri Colony"],
    featuredServices: ["security-guards", "bouncers-event-security", "gardeners-maids", "manpower-supply"],
    servedOrgs: ["Satguru Enterprises", "The Utsav Greens", "Arihant Jewellers", "Mittal Polymers", "Shivpriya Hotel", "Daawat Hotel", "Krishna Hotel", "Home Linen", "Sartaj Dhaba", "Shree Shyam Baba Mandir"],
    faqs: [
      { q: "Where is your office in Samalkha?", a: "Old Thana Road, Near Anaj Mandi Gate No. 1, Samalkha, Panipat, Haryana 132101. Call ahead on +91 88010 00054 so a partner is available." },
      { q: "Do you provide bouncers for weddings in Samalkha?", a: "Yes. Wedding and function-night deployments at local banquet venues are a regular part of our work." },
      { q: "Can I hire a gardener or maid through you?", a: "Yes. Gardeners and domestic support staff are arranged as a separate support service with document verification." },
    ],
    seo: {
      title: "Security Services in Samalkha — Black Hawk Security Solution",
      description: "Samalkha-based security agency providing guards, bouncers, supervisors, manpower and domestic support staff to local businesses, venues and households.",
    },
  },
  {
    slug: "sonipat",
    name: "Sonipat",
    state: "Haryana",
    fromOffice: "Our office in Samalkha is about 25 km from Sonipat city along the GT Road.",
    intro: [
      "Sonipat is the district where Black Hawk handled its largest single event deployment: 160 bouncers for PRISMA Fest 2026 at SRM University in Rai's education city. We have also served a club in Sector 7 and a residential society in Sector 33, so our Sonipat work spans campus events, hospitality and society gates.",
      "The Kundli industrial area and the units along the Gohana road bring the same requirements we handle in Panipat: gate registers, vehicle checks and supervised multi-gate teams. Rai's institutions add campus security and large-event crowd management.",
      "Sonipat is close enough to Samalkha for a site visit before quoting and for quick supervisor response once a deployment is running.",
    ],
    localities: ["Rai Education City", "Kundli Industrial Area", "Gohana Road", "Sector 7", "Sector 33", "Murthal", "Ganaur"],
    featuredServices: ["bouncers-event-security", "security-guards", "security-supervisors", "manpower-supply"],
    servedOrgs: ["SRM University, Delhi NCR", "Gymkhana Club", "Eldeco Amor (Society)"],
    faqs: [
      { q: "Can you staff a college fest in Sonipat?", a: "Yes. We deployed 160 bouncers for PRISMA Fest 2026 at SRM University, Rai, and plan fest deployments with the organiser in advance." },
      { q: "Do you cover Kundli industrial units?", a: "Yes. Kundli and the Gohana road industrial belt are within our regular deployment area for guards and supervisors." },
      { q: "Do you provide society security in Sonipat?", a: "Yes. We have served a residential society in Sector 33 and can staff gates, patrols and supervision." },
    ],
    seo: {
      title: "Security Guards & Event Bouncers in Sonipat",
      description: "Security guards, event bouncers, supervisors and manpower in Sonipat, Rai, Kundli and Murthal. Black Hawk deployed 160 bouncers for PRISMA Fest 2026 at SRM University.",
    },
  },
  {
    slug: "karnal",
    name: "Karnal",
    state: "Haryana",
    fromOffice: "Our office in Samalkha is about 55 km from Karnal along NH-44.",
    intro: [
      "Karnal sits an hour up the GT Road from our Samalkha office, close enough for a partner to visit before a deployment and for supervisors to cover sites on a regular schedule. We deploy guards and supervisors to Karnal's commercial areas around Model Town, Sector 12 and the GT Road belt, and manpower to units along the highway.",
      "Karnal's mix of agricultural institutions, rice and dairy industry, hotels along NH-44 and a growing residential sector produces the same core needs we see elsewhere: controlled gates, night cover and someone accountable on site. For functions at venues near Liberty Chowk and the highway, we provide bouncers and event teams.",
      "We do not yet have a Karnal client in our published register, so our Karnal deployments are quoted after a site visit and a direct discussion with the partners.",
    ],
    localities: ["Model Town", "Sector 12", "GT Road", "Liberty Chowk", "Kunjpura Road", "Nilokheri"],
    featuredServices: ["security-guards", "security-supervisors", "bouncers-event-security", "manpower-supply"],
    servedOrgs: [],
    faqs: [
      { q: "Do you deploy to Karnal?", a: "Yes. Karnal is about an hour from our office and within our regular deployment area for guards, supervisors, event teams and manpower." },
      { q: "Will someone visit our Karnal site?", a: "Yes. For new Karnal clients we visit the site or venue before preparing a deployment plan and quotation." },
      { q: "Can you provide guards for highway hotels near Karnal?", a: "Yes. Entrance, parking and night cover for hotels on NH-44 is a straightforward deployment for us." },
    ],
    seo: {
      title: "Security Agency Serving Karnal — Guards, Bouncers & Manpower",
      description: "Black Hawk deploys security guards, supervisors, event bouncers and manpower to Karnal from its Samalkha office, about an hour away on NH-44.",
    },
  },
  {
    slug: "kurukshetra",
    name: "Kurukshetra",
    state: "Haryana",
    fromOffice: "Our office in Samalkha is about 90 km from Kurukshetra by NH-44.",
    intro: [
      "Kurukshetra brings a particular kind of work: large gatherings. Religious and cultural events around Brahma Sarovar, fairs at Pipli and festivals on the university campus draw crowds that need planned lanes, entry control and a team lead who coordinates with organisers and local authorities.",
      "We deploy event teams and bouncers to Kurukshetra for such occasions, and guards and supervisors to institutions and commercial premises in Thanesar and along the Pipli–Pehowa road for longer assignments.",
      "Kurukshetra is at the edge of our regular range, so assignments here are planned with a little more lead time and quoted after a direct discussion with the partners.",
    ],
    localities: ["Pipli", "Thanesar", "Brahma Sarovar", "University Area", "Sector 7", "Pehowa Road"],
    featuredServices: ["bouncers-event-security", "security-guards", "manpower-supply", "security-supervisors"],
    servedOrgs: [],
    faqs: [
      { q: "Can you handle crowd management for events in Kurukshetra?", a: "Yes. Event and bouncer deployments for gatherings and festivals are planned in advance with the organiser and sized to the expected attendance." },
      { q: "How much notice do you need for Kurukshetra?", a: "More than for Panipat or Sonipat because of the distance. Share the date as early as you can and we will confirm what is possible." },
      { q: "Do you provide long-term guards in Kurukshetra?", a: "Yes, for institutions and commercial premises, with supervisor visits on a regular schedule." },
    ],
    seo: {
      title: "Event Security & Guards Serving Kurukshetra",
      description: "Black Hawk provides event bouncers, crowd management teams and security guards to Kurukshetra, Thanesar and Pipli from its Haryana base in Samalkha.",
    },
  },
  {
    slug: "gurugram",
    name: "Gurugram",
    state: "Haryana",
    fromOffice: "Our office in Samalkha is about 110 km from Gurugram via Delhi.",
    intro: [
      "Gurugram is corporate and residential work for us. Our register includes Landmark Tower in South City I, and the demand we see from Gurugram is for well-presented guards at commercial and residential buildings, supervisors who can report to a facility manager, and bouncers for corporate events and launches.",
      "Deployments along Sohna Road, Golf Course Road and Udyog Vihar are staffed with personnel who are comfortable with visitor management systems, parking discipline and the courteous front that corporate premises expect.",
      "Gurugram sits at the far end of our Delhi NCR range, so for multi-post assignments we deploy a local supervisor so the client has someone accountable nearby.",
    ],
    localities: ["South City I", "Sohna Road", "Golf Course Road", "Udyog Vihar", "DLF Phases", "Sector 29", "Manesar"],
    featuredServices: ["security-guards", "security-supervisors", "bouncers-event-security", "personal-security-officers"],
    servedOrgs: ["Landmark Tower"],
    faqs: [
      { q: "Do you provide security guards in Gurugram?", a: "Yes. We have served a commercial tower in South City I and deploy guards and supervisors across Gurugram." },
      { q: "Can you staff corporate events in Gurugram?", a: "Yes. Bouncers and event security for launches, dealer meets and corporate functions are a regular requirement." },
      { q: "Do you provide PSOs in Gurugram?", a: "Yes, subject to applicable legal requirements. Discuss the assignment with us directly." },
    ],
    seo: {
      title: "Security Guards & Event Security in Gurugram",
      description: "Security guards, supervisors, corporate event security and PSOs in Gurugram, from South City to Sohna Road and Udyog Vihar. Black Hawk Security Solution.",
    },
  },
  {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi",
    fromOffice: "Our office in Samalkha is about 85 km from central Delhi along NH-44.",
    intro: [
      "Our Delhi work has been in the west and south-west of the city: a hotel in Sector 12, Dwarka and a real-estate business at Jharoda near Najafgarh. Hotels, builders and commercial premises in Dwarka, Najafgarh, Rohini and along the Rohtak Road corridor are the kind of clients we are set up to serve.",
      "Delhi assignments typically need presentable guards for entrances and lobbies, parking management, and bouncers for function nights at hotels and banquet halls. For principals attending events in the city we also arrange personal security officers within applicable legal requirements.",
      "We reach Delhi by the GT Road, and for ongoing deployments we assign a supervisor who covers the posts on a regular rota.",
    ],
    localities: ["Dwarka", "Najafgarh", "Jharoda", "Rohini", "Rohtak Road", "Pitampura", "Janakpuri"],
    featuredServices: ["security-guards", "bouncers-event-security", "personal-security-officers", "security-supervisors"],
    servedOrgs: ["La-Wistria Hotel", "Tri-shakti Realtech"],
    faqs: [
      { q: "Which parts of Delhi do you cover?", a: "We have served clients in Dwarka and Jharoda and deploy across west and south-west Delhi, Rohini and the Rohtak Road corridor. Other areas are quoted on request." },
      { q: "Do you provide hotel security in Delhi?", a: "Yes. Entrance, lobby and function-night cover for hotels is part of our Delhi work." },
      { q: "Can you arrange PSOs in Delhi?", a: "Yes, subject to legal requirements. Share the assignment details and we will confirm what can be provided." },
    ],
    seo: {
      title: "Security Services in Delhi — Guards, Bouncers & PSOs",
      description: "Security guards, event bouncers, PSOs and supervisors for hotels, builders and businesses in Dwarka, Najafgarh, Rohini and across Delhi. Black Hawk Security Solution.",
    },
  },
  {
    slug: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    fromOffice: "Our office in Samalkha is about 115 km from Noida via Delhi.",
    intro: [
      "Noida's requirement profile is corporate offices and IT parks in Sectors 62 and 63, media and production houses around Film City, and large residential developments stretching into Greater Noida. We deploy guards and supervisors for office entrances and residential gates, and bouncers for corporate events, shoots and launches.",
      "Noida is across the Yamuna from our Haryana base, so assignments here are planned with a supervisor on the ground and a little more lead time than our Panipat and Sonipat work.",
      "We have not yet published a Noida client in our register. New Noida deployments are quoted after a direct discussion with the partners and, for multi-post sites, a visit.",
    ],
    localities: ["Sector 62", "Sector 63", "Film City", "Sector 18", "Greater Noida", "Noida Expressway"],
    featuredServices: ["security-guards", "bouncers-event-security", "security-supervisors", "manpower-supply"],
    servedOrgs: [],
    faqs: [
      { q: "Do you deploy to Noida and Greater Noida?", a: "Yes. Noida is within our Delhi NCR range. We plan assignments with a supervisor on the ground and quote after a direct discussion." },
      { q: "Can you provide security for shoots and events near Film City?", a: "Yes. Bouncers and event teams for shoots, launches and corporate functions can be arranged." },
      { q: "Do you provide manpower in Noida?", a: "Yes. Helpers, support staff and event set-up personnel are available through our manpower service." },
    ],
    seo: {
      title: "Security Guards & Event Security Serving Noida",
      description: "Black Hawk deploys security guards, supervisors, event bouncers and manpower to offices, residential projects and events in Noida and Greater Noida.",
    },
  },
  {
    slug: "faridabad",
    name: "Faridabad",
    state: "Haryana",
    fromOffice: "Our office in Samalkha is about 120 km from Faridabad via Delhi.",
    intro: [
      "Faridabad is an industrial city, and our deployments here follow the pattern we know from Panipat: multi-gate factory premises in the Ballabgarh industrial belt and the NIT sectors, with gate registers, vehicle checks, night patrols and a supervisor accountable for the team. Commercial complexes in Sectors 15 and 16 bring the usual entrance and parking requirements.",
      "As the southern-most point of our NCR range, Faridabad assignments are set up with a local supervisor and planned a little further ahead than our Haryana-north work.",
      "We have not yet published a Faridabad client in our register. We quote after a direct discussion with the partners and a site visit for multi-post deployments.",
    ],
    localities: ["Sector 15", "Sector 16", "NIT", "Ballabgarh Industrial Area", "Old Faridabad", "Sector 12"],
    featuredServices: ["security-guards", "security-supervisors", "manpower-supply", "bouncers-event-security"],
    servedOrgs: [],
    faqs: [
      { q: "Do you provide factory security in Faridabad?", a: "Yes. Industrial gate control, patrols and supervisor-led teams are our core work, and Faridabad's industrial belt is within our range." },
      { q: "How soon can you start in Faridabad?", a: "We confirm after discussing the requirement. Faridabad is at the edge of our range, so allow more lead time than for Panipat or Sonipat." },
      { q: "Do you supply helpers and loaders in Faridabad?", a: "Yes, through our manpower supply service." },
    ],
    seo: {
      title: "Industrial Security & Manpower Serving Faridabad",
      description: "Security guards, supervisors and manpower for factories and commercial premises in Faridabad, Ballabgarh and NIT, from Black Hawk Security Solution.",
    },
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const citySlugs = cities.map((c) => c.slug);
