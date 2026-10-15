"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { DataTable, type Column } from "@/components/admin/data-table";
import { enumLabel, formatDate, formatPhone, telHref } from "@/components/admin/format";
import { PageHeader } from "@/components/admin/page-header";
import { Pagination } from "@/components/admin/pagination";
import { StatusBadge } from "@/components/admin/status-badge";
import { useUrlState } from "@/components/admin/use-url-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminApi } from "@/lib/api/endpoints/admin";
import { keys } from "@/lib/api/keys";
import type { Enquiry, EnquiryStatus } from "@/lib/api/types";

export const ENQUIRY_STATUSES: EnquiryStatus[] = ["NEW", "CONTACTED", "REQUIREMENT_CONFIRMED", "QUOTATION_SENT", "WON", "LOST"];
const ALL = "ALL";

function EnquiriesList() {
  const router = useRouter();
  const { get, set } = useUrlState();
  const status = get("status") as EnquiryStatus | "";
  const qParam = get("q");
  const from = get("from");
  const to = get("to");
  const page = Number(get("page", "0")) || 0;
  const [search, setSearch] = useState(qParam);
  // Re-sync the input when the URL param changes externally (back button, Clear).
  const [prevQ, setPrevQ] = useState(qParam);
  if (prevQ !== qParam) {
    setPrevQ(qParam);
    setSearch(qParam);
  }
  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== qParam) set({ q: search, page: 0 });
    }, 350);
    return () => clearTimeout(t);
  }, [search, qParam, set]);

  const params = { page, size: 20, status, q: qParam, from, to };
  const q = useQuery({ queryKey: keys.enquiries.list(params), queryFn: () => adminApi.enquiries.list(params), placeholderData: keepPreviousData });

  const columns: Column<Enquiry>[] = [
    { key: "ref", header: "Ref", cell: (r) => <span className="font-mono text-xs text-brand-gold">{r.referenceCode}</span> },
    {
      key: "name",
      header: "Name",
      cell: (r) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{r.fullName}</p>
          {r.organisation && <p className="truncate text-xs text-muted-foreground">{r.organisation}</p>}
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (r) => (
        <a href={telHref(r.phone)} onClick={(e) => e.stopPropagation()} className="tabular-nums hover:text-brand-gold">
          {formatPhone(r.phone)}
        </a>
      ),
    },
    { key: "service", header: "Service", cell: (r) => enumLabel(r.serviceCategory), hideOnMobile: true },
    { key: "location", header: "Location", cell: (r) => <span className="line-clamp-1">{r.location}</span>, hideOnMobile: true },
    { key: "personnel", header: "Personnel", cell: (r) => <span className="tabular-nums">{r.personnelCount}</span>, hideOnMobile: true, className: "text-right" },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} size="sm" /> },
    { key: "created", header: "Received", cell: (r) => <span className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(r.createdAt, true)}</span>, hideOnMobile: true },
  ];

  const hasFilters = Boolean(status || qParam || from || to);

  return (
    <>
      <PageHeader title="Enquiries" description="Quote requests from the website, newest first." />
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, reference…" className="pl-8" />
        </div>
        <Select value={status || ALL} onValueChange={(v) => set({ status: v === ALL ? "" : v, page: 0 })}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {ENQUIRY_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {enumLabel(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="date" value={from} onChange={(e) => set({ from: e.target.value, page: 0 })} aria-label="From date" className="w-40" />
        <Input type="date" value={to} onChange={(e) => set({ to: e.target.value, page: 0 })} aria-label="To date" className="w-40" />
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => set({ status: "", q: "", from: "", to: "", page: 0 })}>
            <X className="size-3.5" /> Clear
          </Button>
        )}
      </div>
      <DataTable columns={columns} rows={q.data?.items} rowKey={(r) => r.id} loading={q.isPending} error={q.error} onRetry={() => q.refetch()} onRowClick={(r) => router.push(`/admin/enquiries/${r.id}`)} emptyTitle="No enquiries match" emptyDescription={hasFilters ? "Try clearing the filters." : "New quote requests will appear here."} />
      {q.data && <Pagination page={q.data.page} totalPages={q.data.totalPages} totalElements={q.data.totalItems} onChange={(p) => set({ page: p })} />}
    </>
  );
}

export default function EnquiriesPage() {
  return (
    <Suspense>
      <EnquiriesList />
    </Suspense>
  );
}
