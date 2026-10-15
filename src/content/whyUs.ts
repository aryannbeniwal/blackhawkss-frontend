import { ClipboardList, MapPinned, Medal, Users, type LucideIcon } from "lucide-react";

export const whyBlackHawk: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Veteran-led discipline",
    text: "Operations are led by a retired Indian Army serviceman with over 17 years in the Jat Regiment. Briefings, post checks and accountability come from that background.",
    icon: Medal,
  },
  {
    title: "Flexible staffing options",
    text: "Security guards, bouncers, personal security officers, supervisors and manpower from one office, scaled to a single post or a multi-day event.",
    icon: Users,
  },
  {
    title: "Coordinated deployment and supervision",
    text: "Every assignment starts with a written plan. Supervisors verify attendance and standards, and you have a direct line to the office and both partners.",
    icon: ClipboardList,
  },
  {
    title: "Regional coverage",
    text: "Based in Samalkha, Panipat, with deployments across Haryana and Delhi NCR, from Kurukshetra and Karnal to Gurugram, Delhi, Noida and Faridabad.",
    icon: MapPinned,
  },
];

export const engagementSteps: { step: number; title: string; text: string }[] = [
  { step: 1, title: "Enquire", text: "Send a quote request, WhatsApp or call. Tell us the service, location, headcount and dates." },
  { step: 2, title: "Requirement discussion", text: "We discuss the site or event, visit where needed, and confirm posts, shifts and reporting lines." },
  { step: 3, title: "Deployment plan and quotation", text: "You receive a written plan and a clear quotation. Nothing starts until you confirm it." },
  { step: 4, title: "Supervised deployment", text: "Personnel are briefed and deployed on the agreed date, with supervision, attendance verification and your feedback built in." },
];
