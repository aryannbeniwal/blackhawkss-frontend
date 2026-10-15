export type CareerRoleValue = "SECURITY_GUARD" | "BOUNCER" | "PSO" | "SUPERVISOR" | "MANPOWER" | "HOUSEKEEPING";

export const careersPage = {
  heading: "Join Black Hawk",
  tagline: "Disciplined work, clear briefings and a veteran at the top.",
  intro: [
    "Black Hawk Security Solution hires as assignments require: security guards, bouncers for events, personal security officers, supervisors and manpower for client sites across Haryana and Delhi NCR. We are based in Samalkha, Panipat.",
    "Ex-servicemen are welcome and valued. Our operations are led by a retired Indian Army serviceman, and the way we brief, post and supervise will be familiar to anyone who has served.",
    "Submit the application form and we will call you when a suitable assignment comes up. Applying does not guarantee placement; we contact candidates as requirements arise.",
  ],
  roles: [
    { value: "SECURITY_GUARD" as CareerRoleValue, label: "Security Guard", summary: "Gate, reception and patrol duties at commercial, residential and industrial sites. Day, night and rotating shifts." },
    { value: "BOUNCER" as CareerRoleValue, label: "Bouncer / Event Security", summary: "Entry control and crowd management at fests, concerts, weddings and corporate events. Assignment-based work." },
    { value: "PSO" as CareerRoleValue, label: "Personal Security Officer", summary: "Accompanying a principal during movement and functions. Discretion and presentation essential." },
    { value: "SUPERVISOR" as CareerRoleValue, label: "Security Supervisor", summary: "Leading a guard team: rosters, attendance, post checks and daily reporting to the client." },
    { value: "MANPOWER" as CareerRoleValue, label: "Manpower / Support Staff", summary: "Helpers, loaders, housekeeping and event set-up roles at client sites." },
    { value: "HOUSEKEEPING" as CareerRoleValue, label: "Housekeeping / Gardener / Domestic Support", summary: "Housekeeping, gardening and household support placements with verified offices, households and societies." },
  ],
  eligibility: [
    "Age 18 or above (21 or above for bouncer and PSO roles)",
    "Physically fit and able to stand duty for a full shift",
    "Able to follow written standing orders and report clearly",
    "Clean record; references may be checked",
    "Ex-servicemen: discharge book and service particulars",
  ],
  documents: [
    "Aadhaar card",
    "PAN card or bank passbook",
    "Address proof",
    "Two passport-size photographs",
    "Previous employer or reference details, if any",
    "Discharge book (ex-servicemen)",
  ],
  process: [
    "Submit the application form or WhatsApp the office with your name, district and preferred role.",
    "We call you to discuss availability, experience and the kind of assignment you are looking for.",
    "Document check at our Samalkha office or at a deployment briefing.",
    "Briefing on uniform, conduct, standing orders and reporting.",
    "Deployment to a client site or event with a supervisor's contact.",
  ],
};

export function careerRoleLabel(value: string): string {
  return careersPage.roles.find((r) => r.value === value)?.label ?? value;
}
