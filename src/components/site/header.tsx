"use client";

import { ChevronDown, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "cn";
import { Logo } from "@/components/brand/logo";
import { ClawMark } from "@/components/brand/claw-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { contacts, nav, primaryContact } from "@/content/site";
import { services } from "@/content/services";
import { track } from "@/lib/analytics";
import { telLink, whatsappLink } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border bg-brand-black/90 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)] backdrop-blur supports-[backdrop-filter]:bg-brand-black/75"
          : "border-b border-transparent bg-gradient-to-b from-brand-black/80 to-transparent",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3">
        <Logo size={40} priority />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden min-w-0 items-center gap-0.5 xl:flex">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  onClick={() => setServicesOpen((o) => !o)}
                  className={cn(
                    "link-underline inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.08em] transition hover:text-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold",
                    isActive(item.href) ? "text-brand-gold after:scale-x-100" : "text-foreground/85",
                  )}
                >
                  {item.short}
                  <ChevronDown className={cn("size-3.5 transition", servicesOpen && "rotate-180")} />
                </button>
                {servicesOpen && (
                  <div role="menu" className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-card p-2 shadow-2xl shadow-black/60">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          role="menuitem"
                          href={`/services/${s.slug}`}
                          onClick={closeMenus}
                          className="group flex gap-3 rounded-lg p-3 transition hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                        >
                          <s.icon className="mt-0.5 size-5 shrink-0 text-brand-gold" />
                          <span>
                            <span className="block text-sm font-semibold text-foreground group-hover:text-brand-gold">{s.name}</span>
                            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{s.summary}</span>
                          </span>
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        role="menuitem"
                        onClick={closeMenus}
                        className="col-span-2 mt-1 flex items-center justify-center gap-2 rounded-lg border border-dashed border-brand-gold/40 p-2.5 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:bg-muted"
                      >
                        <ClawMark className="h-3 w-5" /> View all services
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "link-underline whitespace-nowrap rounded-md px-2 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.08em] transition hover:text-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold",
                  isActive(item.href) ? "text-brand-gold after:scale-x-100" : "text-foreground/85",
                )}
              >
                {item.short}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={telLink(primaryContact)}
            onClick={() => track("call_click", { placement: "header" })}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-border px-3.5 py-2 text-sm font-semibold tabular-nums transition hover:border-brand-gold hover:text-brand-gold md:inline-flex xl:hidden 2xl:inline-flex"
          >
            <Phone className="size-4 text-brand-gold" />
            {primaryContact.display}
          </a>
          <Button asChild size="lg" className="hidden whitespace-nowrap bg-brand-red px-3.5 font-semibold uppercase tracking-wide text-white hover:bg-brand-red-deep sm:inline-flex">
            <Link href="/quote" onClick={() => track("quote_open", { placement: "header" })}>
              Request a Quote
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="xl:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto border-border bg-brand-charcoal">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <Logo size={36} href={null} />
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "border-b border-border py-3.5 font-display text-xl uppercase tracking-wider transition hover:text-brand-gold",
                      isActive(item.href) ? "text-brand-gold" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/compliance" onClick={closeMenus} className="border-b border-border py-3.5 font-display text-xl uppercase tracking-wider text-foreground hover:text-brand-gold">
                  Compliance
                </Link>
              </nav>
              <div className="px-4 pb-6 pt-4">
                <Button asChild size="lg" className="w-full bg-brand-red font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
                  <Link href="/quote" onClick={closeMenus}>Request a Quote</Link>
                </Button>
                <p className="eyebrow mt-6 mb-3">Tap to call</p>
                <ul className="space-y-2">
                  {contacts.map((c) => (
                    <li key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-semibold">{c.label}</p>
                        <p className="font-mono text-sm tabular-nums text-brand-gold">{c.display}</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={telLink(c)} aria-label={`Call ${c.label}`} className="inline-flex size-10 items-center justify-center rounded-full bg-brand-red text-white">
                          <Phone className="size-4" />
                        </a>
                        <a href={whatsappLink(undefined, c)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${c.label}`} className="inline-flex size-10 items-center justify-center rounded-full bg-[#25D366] text-black text-xs font-bold">
                          WA
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
