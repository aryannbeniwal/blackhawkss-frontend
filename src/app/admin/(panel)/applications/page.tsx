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
import type { ApplicationStatus, JobApplication } from "@/lib/api/types";

export const APPLICATION_STATUSES: ApplicationStatus[] = ["NEW", "CALLED", "SHORTLISTED", "JOINED", "REJECTED"];
const ALL = "ALL";

function ApplicationsList() {
  const router = useRouter();
  const { get, set } = useUrlState();
  const status = get("status") as ApplicationStatus | "";
  const qParam = get("q");
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

  const params = { page, size: 20, status, q: qParam };
  const q = useQuery({ queryKey: keys.applications.list(params), queryFn: () => adminApi.applications.list(params), placeholderData: keepPreviousData });

  const columns: Column<JobApplication>[] = [
    { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.fullName}</span> },
    {
      key: "phone",
      header: "Phone",
      cell: (r) => (
        <a href={telHref(r.phone)} onClick={(e) => e.stopPropagation()} className="tabular-nums hover:text-brand-gold">
          {formatPhone(r.phone)}
        </a>
      ),
    },
    { key: "role", header: "Role", cell: (r) => enumLabel(r.roleApplied) },
    { key: "city", header: "City", cell: (r) => r.city, hideOnMobile: true },
    { key: "exp", header: "Exp", cell: (r) => <span className="tabular-nums">{r.experienceYears} yr</span>, hideOnMobile: true },
    { key: "ex", header: "Ex-serviceman", cell: (r) => (r.exServiceman ? <span className="text-brand-gold">Yes{r.serviceUnit ? ` · ${r.serviceUnit}` : ""}</span> : "No"), hideOnMobile: true },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} size="sm" /> },
    { key: "created", header: "Applied", cell: (r) => <span className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(r.createdAt, true)}</span>, hideOnMobile: true },
  ];

  const hasFilters = Boolean(status || qParam);

  return (
    <>
      <PageHeader title="Applications" description="Candidates who applied through the careers page." />
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, city…" className="pl-8" />
        </div>
        <Select value={status || ALL} onValueChange={(v) => set({ status: v === ALL ? "" : v, page: 0 })}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {APPLICATION_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {enumLabel(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => set({ status: "", q: "", page: 0 })}>
            <X className="size-3.5" /> Clear
          </Button>
        )}
      </div>
      <DataTable columns={columns} rows={q.data?.items} rowKey={(r) => r.id} loading={q.isPending} error={q.error} onRetry={() => q.refetch()} onRowClick={(r) => router.push(`/admin/applications/${r.id}`)} emptyTitle="No applications" emptyDescription="Candidates who apply on the careers page will appear here." />
      {q.data && <Pagination page={q.data.page} totalPages={q.data.totalPages} totalElements={q.data.totalItems} onChange={(p) => set({ page: p })} />}
    </>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense>
      <ApplicationsList />
    </Suspense>
  );
}
