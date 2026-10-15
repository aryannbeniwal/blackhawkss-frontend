"use client";

import { MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { contacts } from "@/content/site";
import { track } from "@/lib/analytics";
import { telLink, whatsappLink } from "@/lib/whatsapp";

/**
 * "Talk to our team" — one tap, then choose Office / Sandeep / Aryan.
 * Each row has tap-to-call and WhatsApp.
 */
export function CallSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="mx-auto max-w-lg rounded-t-2xl border-border bg-card pb-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 sm:rounded-2xl sm:border">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl uppercase tracking-wide">Talk to our team</SheetTitle>
          <SheetDescription>Choose who to reach. Calls and WhatsApp open in your phone&apos;s apps.</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-2 px-4 pb-2">
          {contacts.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-3">
              <div className="min-w-0">
                <p className="truncate font-semibold">{c.label}</p>
                <p className="truncate text-xs text-muted-foreground">{c.role}</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-brand-gold">{c.display}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <a
                  href={telLink(c)}
                  onClick={() => track("call_click", { contact: c.id })}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-brand-red text-white transition hover:bg-brand-red-deep focus-visible:ring-2 focus-visible:ring-brand-gold"
                  aria-label={`Call ${c.label}`}
                >
                  <Phone className="size-5" />
                </a>
                {c.whatsapp && (
                  <a
                    href={whatsappLink(undefined, c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { contact: c.id })}
                    className="inline-flex size-11 items-center justify-center rounded-full bg-[#25D366] text-black transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand-gold"
                    aria-label={`WhatsApp ${c.label}`}
                  >
                    <MessageCircle className="size-5" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
