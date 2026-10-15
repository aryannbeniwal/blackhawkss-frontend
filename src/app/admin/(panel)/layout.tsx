"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Bell, Briefcase, Building2, ExternalLink, Images, Inbox, LayoutDashboard, LogOut, Menu, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "cn";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { authApi } from "@/lib/api/endpoints/auth";
import { keys } from "@/lib/api/keys";

type NavItem = { href: string; label: string; icon: LucideIcon; exact?: boolean };

const NAV: readonly NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/applications", label: "Applications", icon: Briefcase },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/clients", label: "Clients", icon: Building2 },
  { href: "/admin/announcements", label: "Announcements", icon: Bell },
];

function pageTitle(pathname: string): string {
  const match = [...NAV].reverse().find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)));
  return match?.label ?? "Admin";
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              active ? "bg-brand-gold/12 text-brand-gold" : "text-foreground/75 hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className={cn("size-4.5", active ? "text-brand-gold" : "text-muted-foreground")} />
            {item.label}
          </Link>
        );
      })}
      <a href="/" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/75 transition hover:bg-muted hover:text-foreground">
        <ExternalLink className="size-4.5 text-muted-foreground" />
        View site
      </a>
    </nav>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const session = useQuery({ queryKey: keys.session(), queryFn: authApi.session, retry: false });
  const logout = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => router.replace("/admin/login"),
    meta: { suppressGlobalError: true },
  });

  const title = pageTitle(pathname);

  return (
    <div className="flex min-h-svh">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <div className="mb-6 px-1">
          <Logo size={36} href="/admin" />
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Owner panel</p>
        </div>
        <NavLinks pathname={pathname} />
        <div className="mt-auto border-t border-sidebar-border pt-4">
          <p className="truncate px-1 text-xs text-muted-foreground">{session.data?.email ?? "…"}</p>
          <Button variant="ghost" size="sm" className="mt-2 w-full justify-start text-foreground/75" onClick={() => logout.mutate()} disabled={logout.isPending}>
            <LogOut className="size-4" /> Log out
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-4">
                <SheetHeader className="p-0 text-left">
                  <SheetTitle>
                    <Logo size={32} href={null} />
                  </SheetTitle>
                  <SheetDescription className="sr-only">Admin navigation</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
                </div>
                <div className="mt-6 border-t border-sidebar-border pt-4">
                  <p className="truncate text-xs text-muted-foreground">{session.data?.email ?? ""}</p>
                  <Button variant="ghost" size="sm" className="mt-2 w-full justify-start" onClick={() => logout.mutate()} disabled={logout.isPending}>
                    <LogOut className="size-4" /> Log out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">{title}</h2>
          </div>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">{session.data?.displayName ?? session.data?.email ?? ""}</p>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
