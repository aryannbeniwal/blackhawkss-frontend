/**
 * Lead capture mode.
 *  - "api"      → forms POST to the Spring backend through /api/backend (default when BACKEND_URL exists).
 *  - "whatsapp" → no backend yet: forms validate, then open WhatsApp with the details pre-filled.
 * Set NEXT_PUBLIC_LEAD_MODE=whatsapp for a frontend-only deployment (e.g. Vercel before the VM is ready).
 */
export type LeadMode = "api" | "whatsapp";

export const leadMode: LeadMode = process.env.NEXT_PUBLIC_LEAD_MODE === "whatsapp" ? "whatsapp" : "api";

/** Formats labelled lines into a WhatsApp message body. Empty values are skipped. */
export function formatLeadMessage(title: string, fields: [label: string, value: string | number | boolean | undefined | null][]): string {
  const lines = fields
    .filter(([, v]) => v !== undefined && v !== null && v !== "" && v !== false)
    .map(([k, v]) => `${k}: ${v === true ? "Yes" : v}`);
  return [`${title}`, "", ...lines, "", "— sent from blackhawkss.in"].join("\n");
}
