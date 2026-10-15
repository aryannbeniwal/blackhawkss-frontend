"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { enumLabel, formatDate, formatPhone, telHref, waHref } from "@/components/admin/format";
import { PageHeader } from "@/components/admin/page-header";
import { ErrorState } from "@/components/admin/states";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { adminApi } from "@/lib/api/endpoints/admin";
import { keys } from "@/lib/api/keys";
import type { ApplicationStatus } from "@/lib/api/types";

const STATUSES: ApplicationStatus[] = ["NEW", "CALLED", "SHORTLISTED", "JOINED", "REJECTED"];

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-0.5 border-b border-border py-2.5 last:border-0 sm:grid-cols-[10rem_1fr]">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value ?? "—"}</dd>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const id = Number(idParam);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: keys.applications.detail(id), queryFn: () => adminApi.applications.get(id), enabled: Number.isFinite(id) });
  const patch = useMutation({
    mutationFn: (status: ApplicationStatus) => adminApi.applications.patch(id, { status }),
    onSuccess: (data) => {
      qc.setQueryData(keys.applications.detail(id), data);
      qc.invalidateQueries({ queryKey: keys.applications.all });
      qc.invalidateQueries({ queryKey: keys.dashboard() });
      toast.success("Application updated");
    },
  });

  if (q.error) return <ErrorState error={q.error} onRetry={() => q.refetch()} />;
  const a = q.data;
  const waMessage = a ? `Hello ${a.fullName}, this is Black Hawk Security Solution regarding your job application for ${enumLabel(a.roleApplied)}.` : "";

  return (
    <>
      <PageHeader
        backHref="/admin/applications"
        backLabel="Applications"
        title={a ? a.fullName : <Skeleton className="h-7 w-48" />}
        description={a ? `${enumLabel(a.roleApplied)} · applied ${formatDate(a.createdAt, true)}` : undefined}
        meta={a && <StatusBadge status={a.status} />}
        actions={
          a && (
            <>
              <Button asChild variant="outline" size="sm">
                <a href={telHref(a.phone)}>
                  <Phone className="size-4 text-brand-gold" /> Call
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={waHref(a.phone, waMessage)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4 text-[#25D366]" /> WhatsApp
                </a>
              </Button>
            </>
          )
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-wide">Candidate</h3>
          {!a ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <dl>
              <Row label="Phone" value={<a href={telHref(a.phone)} className="tabular-nums hover:text-brand-gold">{formatPhone(a.phone)}</a>} />
              <Row label="City" value={a.city} />
              <Row label="Role applied" value={enumLabel(a.roleApplied)} />
              <Row label="Experience" value={`${a.experienceYears} year${a.experienceYears === 1 ? "" : "s"}`} />
              <Row label="Ex-serviceman" value={a.exServiceman ? `Yes${a.serviceUnit ? ` · ${a.serviceUnit}` : ""}` : "No"} />
              <Row label="Age" value={a.age ?? "—"} />
              <Row label="Message" value={a.message ? <p className="whitespace-pre-wrap">{a.message}</p> : "—"} />
            </dl>
          )}
        </section>
        <aside className="rounded-xl border border-border bg-card p-5 lg:sticky lg:top-20 lg:self-start">
          <Label htmlFor="status" className="text-xs uppercase tracking-wider text-muted-foreground">Status</Label>
          <Select value={a?.status ?? ""} onValueChange={(v) => patch.mutate(v as ApplicationStatus)} disabled={!a || patch.isPending}>
            <SelectTrigger id="status" className="mt-2 w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {enumLabel(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </aside>
      </div>
    </>
  );
}
