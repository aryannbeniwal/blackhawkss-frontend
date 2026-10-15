import { Building2, Factory, GraduationCap, Home, Hotel, PartyPopper } from "lucide-react";

import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "corporate-commercial",
    name: "Corporate & Commercial",
    summary: "Offices, showrooms, banks and commercial complexes that need a controlled entry and a professional front.",
    description:
      "Commercial premises combine visitor traffic, staff movement and valuable assets. We staff reception and gate posts with guards who handle people courteously and keep registers accurately, with supervisors for multi-gate complexes.",
    icon: Building2,
    typicalNeeds: ["Reception and access control", "Visitor and vehicle registers", "After-hours premises cover", "Supervision for multi-tenant buildings"],
    relatedServices: ["security-guards", "security-supervisors", "manpower-supply"],
  },
  {
    slug: "residential-societies",
    name: "Residential Societies",
    summary: "Gated communities, apartment towers and housing societies managing residents, visitors and vehicles.",
    description:
      "Society security is daily and visible. Residents expect courteous guards who know the rules, log visitors properly and coordinate with the society office. We also place housekeeping staff and gardeners for common areas through the same office.",
    icon: Home,
    typicalNeeds: ["Main gate manning and visitor logging", "Night patrol rounds", "Coordination with the society office", "Garden and common-area staff"],
    relatedServices: ["security-guards", "security-supervisors", "housekeeping-services"],
  },
  {
    slug: "educational-institutions",
    name: "Educational Institutions",
    summary: "Schools, colleges and universities with campus gates, hostels and large-scale events.",
    description:
      "Campuses need two kinds of cover: steady day-to-day gate and hostel security, and planned crowd management for fests and convocations. Our bouncer deployment for PRISMA Fest 2026 at SRM University, Sonipat is an example of the latter.",
    icon: GraduationCap,
    typicalNeeds: ["Campus gate and hostel security", "Event and fest crowd management", "Exam-day access control", "Parking and visitor discipline"],
    relatedServices: ["security-guards", "bouncers-event-security", "security-supervisors"],
  },
  {
    slug: "industrial-premises",
    name: "Industrial Premises",
    summary: "Factories, warehouses, textile units and godowns with multiple gates and material movement.",
    description:
      "Industrial sites in Panipat, Sonipat and Kundli run on material movement. Our deployments cover gate registers, vehicle checks, night patrols and supervision, with manpower support for loading and facility work where required.",
    icon: Factory,
    typicalNeeds: ["Gate control with material-in and material-out registers", "Night patrols and perimeter checks", "Supervisor-led multi-gate teams", "Helpers and loaders during peak dispatch"],
    relatedServices: ["security-guards", "security-supervisors", "manpower-supply"],
  },
  {
    slug: "hospitality-venues",
    name: "Hospitality & Venues",
    summary: "Hotels, banquet halls, clubs and restaurants with daily footfall and function-night peaks.",
    description:
      "Hospitality properties need security that is firm without being unwelcoming. We staff entrances, parking and function nights for hotels, banquet halls and clubs across Panipat, Samalkha, Sonipat, Gurugram and Delhi.",
    icon: Hotel,
    typicalNeeds: ["Entrance and lobby security", "Parking and vehicle management", "Bouncers for function nights", "Support staff for facilities"],
    relatedServices: ["security-guards", "bouncers-event-security", "manpower-supply"],
  },
  {
    slug: "events-private-functions",
    name: "Events & Private Functions",
    summary: "Weddings, concerts, exhibitions, religious gatherings and corporate functions.",
    description:
      "Every event is planned before it is staffed. We agree entry lanes, stage cover and escalation with the organiser, deploy a team under a lead, and stay until the venue is cleared. PSOs can be arranged for principals attending the function.",
    icon: PartyPopper,
    typicalNeeds: ["Entry and pass checks", "Stage and VIP movement cover", "Crowd lanes and barricade points", "PSO cover for principals"],
    relatedServices: ["bouncers-event-security", "personal-security-officers", "manpower-supply"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
