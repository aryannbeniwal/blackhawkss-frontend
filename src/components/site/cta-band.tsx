import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { HawkMark } from "@/components/brand/hawk-mark";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

export function CtaBand({
  title = "Let's Discuss Your Security Requirements.",
  text = "Tell us about your site, event or staffing need. We will discuss the requirement and come back with a deployment plan and quotation.",
  service,
}: {
  title?: string;
  text?: string;
  service?: string;
}) {
  const quoteHref = service ? `/quote?service=${encodeURIComponent(service)}` : "/quote";
  return (
    <section className="relative overflow-hidden border-y border-border bg-brand-charcoal bg-brick">
      <HawkMark className="-right-16 -top-10 h-[120%] w-72 opacity-[0.06] sm:w-96" tone="gold" />
      <div className="bg-red-glow absolute inset-0" aria-hidden />
      <div className="container-x relative flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="display-lg text-balance">{title}</h2>
          <p className="lead mt-4">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 bg-brand-red px-7 text-base font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
            <Link href={quoteHref}>Request a Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 border-brand-gold/50 px-7 text-base font-semibold uppercase tracking-wider text-brand-gold hover:bg-brand-gold hover:text-brand-black">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" /> WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
