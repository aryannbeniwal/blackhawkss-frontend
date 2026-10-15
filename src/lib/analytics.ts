/**
 * Conversion events. Works with GA4 (gtag) or GTM (dataLayer) when configured
 * via NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GTM_ID. Safe no-op otherwise.
 */
export type ConversionEvent =
  | "quote_submit"
  | "quote_open"
  | "contact_submit"
  | "application_submit"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "service_cta"
  | "profile_download";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: ConversionEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...params });
    } else if (process.env.NODE_ENV !== "production") {
      console.debug("[analytics]", event, params);
    }
  } catch {
    /* analytics must never break the page */
  }
}
