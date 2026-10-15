import type { ClientCity, ClientOrg } from "./types";

/**
 * Organisations Black Hawk Security Solution has served, as listed in the company's client register
 * (BHSS-Companies.pdf). Names are preserved as recorded. Listing does not imply a current contract.
 */
export const clients: ClientOrg[] = [
  { name: "The Shivalika Rugs", area: "Rishalu Road", city: "Panipat", sector: "Textile" },
  { name: "Ayushman Hospital", area: "Sewah", city: "Panipat", sector: "Healthcare" },
  { name: "SR Traders", area: "Jhattipur", city: "Panipat", sector: "Trading" },
  { name: "Shree Shyam Baba Mandir", area: "Chulkana Dham", city: "Chulkana", sector: "Religious" },
  { name: "Star Vintage Textile", area: "Plot 185, Sector 29 Part II", city: "Panipat", sector: "Textile" },
  { name: "Satguru Enterprises", area: "Shastri Colony, Chulkana Road", city: "Samalkha", sector: "Commercial" },
  { name: "The Utsav Greens", area: "Main GT Road", city: "Samalkha", sector: "Hospitality" },
  { name: "Arihant Jewellers", area: "Railway Road", city: "Samalkha", sector: "Retail" },
  { name: "Mittal Polymers", area: "Near Gate No. 2, Anaj Mandi", city: "Samalkha", sector: "Industrial" },
  { name: "Mannat Hotel Group", area: "Jhattipur", city: "Panipat", sector: "Hospitality" },
  { name: "Shivpriya Hotel", area: "Pattikalyana", city: "Samalkha", sector: "Hospitality" },
  { name: "Daawat Hotel", area: "Pattikalyana", city: "Samalkha", sector: "Hospitality" },
  { name: "Krishna Hotel", area: "Pattikalyana", city: "Samalkha", sector: "Hospitality" },
  { name: "Hatchery c/o Ex. MLA Sh. Ravinder", area: "Khalila", city: "Panipat", sector: "Agri" },
  { name: "Sundram Industries", area: "Khalila Road", city: "Panipat", sector: "Industrial" },
  { name: "Home Linen", area: "Manana", city: "Samalkha", sector: "Textile" },
  { name: "Sartaj Dhaba", area: "Main GT Road", city: "Samalkha", sector: "Hospitality" },
  { name: "SRM University, Delhi NCR", area: "Rai", city: "Sonipat", sector: "Education", highlight: "160 bouncers deployed for PRISMA Fest 2026" },
  { name: "Gymkhana Club", area: "Sector 7", city: "Sonipat", sector: "Hospitality" },
  { name: "Eldeco Amor (Society)", area: "Sector 33", city: "Sonipat", sector: "Residential" },
  { name: "Landmark Tower", area: "South City I", city: "Gurugram", sector: "Commercial" },
  { name: "La-Wistria Hotel", area: "Sector 12, Dwarka", city: "New Delhi", sector: "Hospitality" },
  { name: "Tri-shakti Realtech", area: "Jharoda", city: "New Delhi", sector: "Commercial" },
  { name: "Shubham Hotel", area: "Gohana", city: "Gohana", sector: "Hospitality" },
];

export const cityOrder: ClientCity[] = ["Panipat", "Samalkha", "Chulkana", "Sonipat", "Gohana", "Gurugram", "New Delhi"];

export function clientsByCity(): { city: ClientCity; orgs: ClientOrg[] }[] {
  return cityOrder
    .map((city) => ({ city, orgs: clients.filter((c) => c.city === city) }))
    .filter((group) => group.orgs.length > 0);
}

export function clientsByName(names: string[]): ClientOrg[] {
  return names.map((n) => clients.find((c) => c.name === n)).filter((c): c is ClientOrg => Boolean(c));
}

export const clientCount = clients.length;
