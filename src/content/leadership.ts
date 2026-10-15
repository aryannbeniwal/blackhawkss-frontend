import type { Leader } from "./types";

export const leaders: Leader[] = [
  {
    id: "sandeep",
    name: "Sandeep Beniwal",
    title: "Military Veteran & Security Operations Leader",
    shortBio:
      "Retired Indian Army serviceman with over 17 years in the Jat Regiment and a former professional wrestler. He sets the operational standard for every Black Hawk deployment.",
    bio: [
      "Sandeep Beniwal served in the Indian Army for over 17 years in the Jat Regiment. A former professional wrestler, he brings physical resilience, fitness, discipline and determination to the private security sector.",
      "His leadership philosophy is simple: disciplined operations, professional conduct, close supervision and accountability. Guards are briefed properly, posts are checked, and problems are reported rather than hidden.",
      "At Black Hawk he leads security operations, personnel mentorship and site standards, and is the founder clients speak to about deployments on the ground.",
    ],
    focusAreas: ["Security operations", "Supervision and site standards", "Personnel mentorship", "Accountability and alertness"],
    quote: "Security is not just a service; it is a commitment to protection born from years of serving the nation.",
    contactId: "sandeep",
    portrait: { src: "/images/portrait-sandeep.jpg", alt: "Sandeep Beniwal, co-founder of Black Hawk Security Solution, at PRISMA Fest 2026" },
  },
  {
    id: "aryan",
    name: "Aryan Beniwal",
    title: "Technology & Business Development Leader",
    shortBio:
      "B.Tech graduate and a Software Engineer by profession. He runs the business side and the digital operations.",
    bio: [
      "Aryan Beniwal is a B.Tech graduate and works as a Software Engineer. During university he served as a Senior Under Officer in the National Cadet Corps.",
      "His background spans software engineering, team coordination, management, event organisation and digital operations. He brings a modern approach to how the business communicates with customers, plans deployments and keeps records.",
      "At Black Hawk he leads business development, customer communication, process improvement and the company's digital presence, so that enquiries, quotations and coordination run on clear systems rather than memory.",
    ],
    focusAreas: ["Business development", "Customer communication", "Technology and process improvement", "Organisational planning"],
    contactId: "aryan",
    portrait: { src: "/images/portrait-aryan.jpg", alt: "Aryan Beniwal, co-founder of Black Hawk Security Solution" },
  },
];

export function getLeader(id: Leader["id"]): Leader {
  return leaders.find((l) => l.id === id) as Leader;
}

export const aboutPhoto = {
  src: "/images/founders-prisma-2026.jpg",
  alt: "Sandeep Beniwal and Aryan Beniwal at PRISMA Fest 2026, SRM University, Sonipat",
  caption: "Sandeep and Aryan Beniwal on site at PRISMA Fest 2026, SRM University, Sonipat.",
};

export const aboutPage = {
  heading: "The People Behind Black Hawk",
  tagline: "Military discipline meets modern thinking — united by a commitment to professional security.",
  story: [
    "Black Hawk Security Solution was founded by Sandeep Beniwal and Aryan Beniwal, is based in Samalkha, Panipat, and serving clients across Haryana and Delhi NCR. It was built on a straightforward idea: security personnel should be led by someone who understands discipline from the inside, and the business should be run with the same clarity.",
    "Sandeep brings over 17 years of Indian Army service and the habits that come with it: briefings, post checks, supervision and accountability. He sets the operational standard and mentors the personnel who carry the Black Hawk badge.",
    "Aryan brings technology, management and modern business processes. He ensures enquiries are answered, quotations are clear, deployments are documented and clients have a reliable point of contact. Together, the two founders cover both sides of what a security agency has to get right: the people on the ground and the systems behind them.",
  ],
  values: [
    { title: "Professionalism", text: "Uniform, conduct and courtesy are part of the job, not extras." },
    { title: "Discipline", text: "Posts are manned on time, orders are followed, and shortcuts are not taken." },
    { title: "Vigilance", text: "Guards are briefed to notice, log and report, not just to be present." },
    { title: "Accountability", text: "Supervisors verify attendance and standards; problems are reported upward, not hidden." },
    { title: "Reliability", text: "Absences are covered, commitments are honoured, and invoices match the deployment log." },
    { title: "Coordination", text: "One office, clear contacts and documented plans for every assignment." },
  ],
  openDoor: {
    title: "Open-door policy",
    text: "Communication with our personnel and our clients is ongoing. We encourage feedback on every deployment so that the people posted at your site remain the right match for it, and we would rather hear about a concern early than discover it late. Our office numbers are published, and both founders are reachable directly.",
  },
};
