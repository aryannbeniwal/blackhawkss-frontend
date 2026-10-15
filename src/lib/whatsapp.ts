import { primaryContact, WHATSAPP_DEFAULT_MESSAGE, type ContactPerson } from "@/content/site";

/** Builds a wa.me link with an encoded prefilled message. */
export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE, contact: ContactPerson = primaryContact): string {
  return `https://wa.me/${contact.e164}?text=${encodeURIComponent(message)}`;
}

export function whatsappServiceMessage(serviceName: string): string {
  return `Hello Black Hawk Security Solution, I would like to enquire about ${serviceName}. Please contact me regarding my requirements.`;
}

export function telLink(contact: ContactPerson): string {
  return `tel:+${contact.e164}`;
}

export function mailtoLink(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}
