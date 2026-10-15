"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase, CalendarClock, Inbox, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable, type Column } from "@/components/admin/data-table";
import { formatDate, formatPhone } from "@/components/admin/format";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminApi } from "@/lib/api/endpoints/admin";
import { keys } from "@/lib/api/keys";
import type { Enquiry, EnquiryStatus } from "@/lib/api/types";
import { enumLabel } from "@/components/admin/format";

const STATUSES: { status: EnquiryStatus; tone: "gold" | "blue" | "purple" | "orange" | "green" | "gray" }[] = [
  { status: "NEW", tone: "gold" },
  { status: "CONTACTED", tone: "blue" },
  { status: "REQUIREMENT_CONFIRMED", tone: "purple" },
  { status: "QUOTATION_SENT", tone: "orange" },
  { status: "WON", tone: "green" },
  { status: "LOST", tone: "gray" },
];

export default function DashboardPage() {
  const router = useRouter();
  const q = useQuery({ queryKey: keys.dashboard(), queryFn: adminApi.dashboard });
  const recent = useQuery({ queryKey: keys.enquiries.list({ page: 0, size: 6 }), queryFn: () => adminApi.enquiries.list({ page: 0, size: 6 }) });
  const d = q.data;

  const columns: Column<Enquiry>[] = [
    { key: "ref", header: "Ref", cell: (r) => <span className="font-mono text-xs text-brand-gold">{r.referenceCode}</span> },
    { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.fullName}</span> },
    { key: "phone", header: "Phone", cell: (r) => <span className="tabular-nums">{formatPhone(r.phone)}</span>, hideOnMobile: true },
    { key: "service", header: "Service", cell: (r) => enumLabel(r.serviceCategory), hideOnMobile: true },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} size="sm" /> },
    { key: "created", header: "Received", cell: (r) => <span className="text-xs text-muted-foreground">{formatDate(r.createdAt, true)}</span>, hideOnMobile: true },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Enquiries and applications at a glance." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New this week" value={d?.enquiriesThisWeek ?? 0} loading={q.isPending} icon={Sparkles} tone="gold" href="/admin/enquiries?status=NEW" />
        <StatCard label="Follow-ups due today" value={d?.followUpsDueToday ?? 0} loading={q.isPending} icon={CalendarClock} tone="orange" href="/admin/enquiries" />
        <StatCard label="Open enquiries" value={d ? (d.enquiriesByStatus.NEW ?? 0) + (d.enquiriesByStatus.CONTACTED ?? 0) + (d.enquiriesByStatus.REQUIREMENT_CONFIRMED ?? 0) + (d.enquiriesByStatus.QUOTATION_SENT ?? 0) : 0} loading={q.isPending} icon={Inbox} tone="blue" href="/admin/enquiries" />
        <StatCard label="New applications" value={d?.newApplications ?? 0} loading={q.isPending} icon={Briefcase} tone="purple" href="/admin/applications?status=NEW" />
      </div>

      <section className="space-y-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Pipeline</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STATUSES.map((s) => (
            <StatCard key={s.status} label={enumLabel(s.status)} value={d?.enquiriesByStatus[s.status] ?? 0} loading={q.isPending} tone={s.tone} href={`/admin/enquiries?status=${s.status}`} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Recent enquiries</h3>
        <DataTable columns={columns} rows={recent.data?.items} rowKey={(r) => r.id} loading={recent.isPending} error={recent.error} onRetry={() => recent.refetch()} onRowClick={(r) => router.push(`/admin/enquiries/${r.id}`)} emptyTitle="No enquiries yet" emptyDescription="New quote requests from the website will appear here." />
      </section>
    </>
  );
}
