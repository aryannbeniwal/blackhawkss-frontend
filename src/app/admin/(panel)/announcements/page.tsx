"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DataTable, type Column } from "@/components/admin/data-table";
import { formatDate, toDateInput } from "@/components/admin/format";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminApi, type AnnouncementInput } from "@/lib/api/endpoints/admin";
import { keys } from "@/lib/api/keys";
import type { Announcement } from "@/lib/api/types";

const EMPTY: AnnouncementInput = { title: "", body: "", startsAt: "", endsAt: "", published: true };

export default function AnnouncementsPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: keys.announcements.all, queryFn: adminApi.announcements.list });
  const [editing, setEditing] = useState<Announcement | "new" | null>(null);
  const [form, setForm] = useState<AnnouncementInput>(EMPTY);
  const [toDelete, setToDelete] = useState<Announcement | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: keys.announcements.all });

  const save = useMutation({
    mutationFn: (input: AnnouncementInput) => (editing && editing !== "new" ? adminApi.announcements.patch(editing.id, input) : adminApi.announcements.create(input)),
    onSuccess: () => {
      invalidate();
      setEditing(null);
      toast.success("Announcement saved");
    },
  });
  const togglePublish = useMutation({
    mutationFn: ({ id, published }: { id: number; published: boolean }) => adminApi.announcements.patch(id, { published }),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: number) => adminApi.announcements.remove(id),
    onSuccess: () => {
      invalidate();
      setToDelete(null);
      toast.success("Announcement removed");
    },
  });

  function openEdit(a: Announcement) {
    setForm({ title: a.title, body: a.body, startsAt: toDateInput(a.startsAt), endsAt: toDateInput(a.endsAt), published: a.published ?? true });
    setEditing(a);
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    save.mutate({ ...form, startsAt: form.startsAt || undefined, endsAt: form.endsAt || undefined });
  }

  const columns: Column<Announcement>[] = [
    {
      key: "title",
      header: "Announcement",
      cell: (r) => (
        <div className="min-w-0">
          <p className="font-medium">{r.title}</p>
          <p className="line-clamp-1 text-xs text-muted-foreground">{r.body}</p>
        </div>
      ),
    },
    { key: "window", header: "Visible", cell: (r) => <span className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(r.startsAt)} → {formatDate(r.endsAt)}</span>, hideOnMobile: true },
    { key: "pub", header: "Published", cell: (r) => <Checkbox checked={Boolean(r.published)} aria-label="Published" onCheckedChange={(v) => togglePublish.mutate({ id: r.id, published: v === true })} /> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Edit" onClick={() => openEdit(r)}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Delete" onClick={() => setToDelete(r)}>
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Announcements"
        description="Short notices shown on the website (e.g. event-season availability, office holidays)."
        actions={
          <Button onClick={() => { setForm(EMPTY); setEditing("new"); }} className="bg-brand-gold text-brand-black hover:bg-brand-gold-soft">
            <Plus className="size-4" /> New announcement
          </Button>
        }
      />
      <DataTable columns={columns} rows={q.data} rowKey={(r) => r.id} loading={q.isPending} error={q.error} onRetry={() => q.refetch()} emptyTitle="No announcements" />

      <Dialog open={editing !== null} onOpenChange={(o) => !o && !save.isPending && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>{editing === "new" ? "New announcement" : "Edit announcement"}</DialogTitle>
              <DialogDescription>Leave the dates empty to show it until unpublished.</DialogDescription>
            </DialogHeader>
            <FieldGroup className="my-5 grid gap-4 sm:grid-cols-2">
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="a-title">Title</FieldLabel>
                <Input id="a-title" required maxLength={120} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="a-body">Message</FieldLabel>
                <Textarea id="a-body" required rows={4} maxLength={600} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              </Field>
              <Field>
                <FieldLabel htmlFor="a-start">Show from</FieldLabel>
                <Input id="a-start" type="date" value={form.startsAt ?? ""} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} />
              </Field>
              <Field>
                <FieldLabel htmlFor="a-end">Show until</FieldLabel>
                <Input id="a-end" type="date" value={form.endsAt ?? ""} onChange={(e) => setForm({ ...form, endsAt: e.target.value })} />
              </Field>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <Checkbox checked={Boolean(form.published)} onCheckedChange={(v) => setForm({ ...form, published: v === true })} /> Published
              </label>
            </FieldGroup>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditing(null)} disabled={save.isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={save.isPending} className="bg-brand-gold text-brand-black hover:bg-brand-gold-soft">
                {save.isPending && <Loader2 className="size-4 animate-spin" />} Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={Boolean(toDelete)} onOpenChange={(o) => !o && setToDelete(null)} title="Delete announcement?" description={<>“{toDelete?.title}” will be removed.</>} confirmLabel="Delete" destructive pending={remove.isPending} onConfirm={() => toDelete && remove.mutate(toDelete.id)} />
    </>
  );
}
