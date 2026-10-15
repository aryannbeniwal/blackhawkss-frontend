"use client";

import { MessageCircle, Phone, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryContact } from "@/content/site";
import { track } from "@/lib/analytics";
import { telLink, whatsappLink } from "@/lib/whatsapp";

/**
 * Floating WhatsApp action (desktop + mobile) and a mobile bottom bar:
 * Call · WhatsApp · Quote. Hidden on /quote and /admin.
 */
export function FloatingActions() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/quote") return null;

  return (
    <>
      {/* Desktop / tablet floating WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { placement: "fab" })}
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-5 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-sm font-semibold text-black shadow-lg shadow-black/40 transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand-gold sm:inline-flex"
      >
        <MessageCircle className="size-5" />
        WhatsApp us
      </a>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-brand-black/95 backdrop-blur supports-[backdrop-filter]:bg-brand-black/80 sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a href={telLink(primaryContact)} onClick={() => track("call_click", { placement: "bar" })} className="flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-foreground/90">
          <Phone className="size-5 text-brand-gold" />
          Call
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { placement: "bar" })} className="flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-foreground/90">
          <MessageCircle className="size-5 text-[#25D366]" />
          WhatsApp
        </a>
        <Link href="/quote" onClick={() => track("quote_open", { placement: "bar" })} className="flex flex-col items-center gap-1 bg-brand-red py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-white">
          <FileText className="size-5" />
          Quote
        </Link>
      </nav>
    </>
  );
}
