"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { enumLabel, formatDate, formatPhone, telHref, toDateInput, waHref } from "@/components/admin/format";
import { PageHeader } from "@/components/admin/page-header";
import { ErrorState } from "@/components/admin/states";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { adminApi } from "@/lib/api/endpoints/admin";
import { keys } from "@/lib/api/keys";
import type { Enquiry, EnquiryStatus } from "@/lib/api/types";

const STATUSES: EnquiryStatus[] = ["NEW", "CONTACTED", "REQUIREMENT_CONFIRMED", "QUOTATION_SENT", "WON", "LOST"];

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid gap-0.5 border-b border-border py-2.5 last:border-0 sm:grid-cols-[10rem_1fr]">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value ?? "—"}</dd>
    </div>
  );
}

export default function EnquiryDetailPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const id = Number(idParam);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: keys.enquiries.detail(id), queryFn: () => adminApi.enquiries.get(id), enabled: Number.isFinite(id) });
  const [note, setNote] = useState("");

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: keys.enquiries.all });
    qc.invalidateQueries({ queryKey: keys.dashboard() });
  };

  const patch = useMutation({
    mutationFn: (body: { status?: EnquiryStatus; followUpAt?: string | null }) => adminApi.enquiries.patch(id, body),
    onSuccess: (data: Enquiry) => {
      qc.setQueryData(keys.enquiries.detail(id), (prev: Enquiry | undefined) => ({ ...(prev ?? data), ...data, notes: data.notes ?? prev?.notes }));
      invalidate();
      toast.success("Enquiry updated");
    },
  });

  const addNote = useMutation({
    mutationFn: (body: string) => adminApi.enquiries.addNote(id, body),
    onSuccess: () => {
      setNote("");
      qc.invalidateQueries({ queryKey: keys.enquiries.detail(id) });
      toast.success("Note added");
    },
  });

  if (q.error) return <ErrorState error={q.error} onRetry={() => q.refetch()} />;
  const e = q.data;

  const waMessage = e ? `Hello ${e.fullName}, this is Black Hawk Security Solution regarding your enquiry ${e.referenceCode}.` : "";

  return (
    <>
      <PageHeader
        backHref="/admin/enquiries"
        backLabel="Enquiries"
        title={e ? e.fullName : <Skeleton className="h-7 w-48" />}
        description={e ? `${e.referenceCode} · received ${formatDate(e.createdAt, true)}` : undefined}
        meta={e && <StatusBadge status={e.status} />}
        actions={
          e && (
            <>
              <Button asChild variant="outline" size="sm">
                <a href={telHref(e.phone)}>
                  <Phone className="size-4 text-brand-gold" /> Call
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={waHref(e.phone, waMessage)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4 text-[#25D366]" /> WhatsApp
                </a>
              </Button>
              {e.email && (
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${e.email}?subject=${encodeURIComponent(`Your enquiry ${e.referenceCode} — Black Hawk Security Solution`)}`}>
                    <Mail className="size-4" /> Email
                  </a>
                </Button>
              )}
            </>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-wide">Requirement</h3>
            {q.isPending || !e ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <dl>
                <Row label="Service" value={enumLabel(e.serviceCategory)} />
                <Row label="Location" value={e.location} />
                <Row label="Preferred date" value={formatDate(e.preferredDate)} />
                <Row label="Personnel" value={e.personnelCount} />
                <Row label="Duration / shift" value={e.durationShift} />
                <Row label="Requirements" value={<p className="whitespace-pre-wrap">{e.requirements}</p>} />
                {e.siteName && <Row label="Site / event" value={e.siteName} />}
                {e.eventVenue && <Row label="Venue" value={e.eventVenue} />}
                {e.expectedCrowd != null && <Row label="Expected crowd" value={e.expectedCrowd} />}
                {(e.eventStart || e.eventEnd) && <Row label="Event timing" value={`${e.eventStart ?? "?"} → ${e.eventEnd ?? "?"}`} />}
              </dl>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-wide">Contact</h3>
            {e && (
              <dl>
                <Row label="Phone" value={<a href={telHref(e.phone)} className="tabular-nums hover:text-brand-gold">{formatPhone(e.phone)}</a>} />
                <Row label="Email" value={e.email ? <a href={`mailto:${e.email}`} className="hover:text-brand-gold">{e.email}</a> : "—"} />
                <Row label="Organisation" value={e.organisation} />
                <Row label="Source" value={e.source ?? "website"} />
                {e.notifyFailed && <Row label="Email alert" value={<span className="text-destructive">Owner notification failed — check SMTP settings</span>} />}
              </dl>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide">Internal notes</h3>
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                if (note.trim()) addNote.mutate(note.trim());
              }}
              className="space-y-2"
            >
              <Textarea value={note} onChange={(ev) => setNote(ev.target.value)} placeholder="Call summary, quoted rate, next step…" rows={3} />
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={!note.trim() || addNote.isPending} className="bg-brand-gold text-brand-black hover:bg-brand-gold-soft">
                  {addNote.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Add note
                </Button>
              </div>
            </form>
            <ol className="mt-4 space-y-3">
              {(e?.notes ?? []).length === 0 && <li className="text-sm text-muted-foreground">No notes yet.</li>}
              {(e?.notes ?? []).map((n) => (
                <li key={n.id} className="rounded-lg border border-border bg-background/60 p-3">
                  <p className="whitespace-pre-wrap text-sm">{n.body}</p>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    {n.authorEmail} · {formatDate(n.createdAt, true)}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <Label htmlFor="status" className="text-xs uppercase tracking-wider text-muted-foreground">Status</Label>
            <Select value={e?.status ?? ""} onValueChange={(v) => patch.mutate({ status: v as EnquiryStatus })} disabled={!e || patch.isPending}>
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

            <Label htmlFor="followUp" className="mt-5 block text-xs uppercase tracking-wider text-muted-foreground">Follow-up date</Label>
            <Input id="followUp" type="date" className="mt-2" defaultValue={toDateInput(e?.followUpAt)} key={e?.followUpAt ?? "none"} disabled={!e || patch.isPending} onChange={(ev) => patch.mutate({ followUpAt: ev.target.value || null })} />
            <p className="mt-2 text-xs text-muted-foreground">Updated {e ? formatDate(e.updatedAt, true) : "—"}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
