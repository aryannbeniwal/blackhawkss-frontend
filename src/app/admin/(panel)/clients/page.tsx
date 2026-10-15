"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DataTable, type Column } from "@/components/admin/data-table";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { adminApi, type AdminClientOrg, type ClientOrgInput } from "@/lib/api/endpoints/admin";
import { keys } from "@/lib/api/keys";

const EMPTY: ClientOrgInput = { name: "", area: "", city: "", sector: "", highlight: "", published: true, sortOrder: 0 };

export default function ClientsPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: keys.clients.all, queryFn: adminApi.clients.list });
  const [editing, setEditing] = useState<AdminClientOrg | "new" | null>(null);
  const [form, setForm] = useState<ClientOrgInput>(EMPTY);
  const [toDelete, setToDelete] = useState<AdminClientOrg | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: keys.clients.all });

  const save = useMutation({
    mutationFn: (input: ClientOrgInput) => (editing && editing !== "new" ? adminApi.clients.patch(editing.id, input) : adminApi.clients.create(input)),
    onSuccess: () => {
      invalidate();
      setEditing(null);
      toast.success("Client saved");
    },
  });
  const togglePublish = useMutation({
    mutationFn: ({ id, published }: { id: number; published: boolean }) => adminApi.clients.patch(id, { published }),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: number) => adminApi.clients.remove(id),
    onSuccess: () => {
      invalidate();
      setToDelete(null);
      toast.success("Client removed");
    },
  });

  function openNew() {
    setForm({ ...EMPTY, sortOrder: (q.data?.length ?? 0) + 1 });
    setEditing("new");
  }
  function openEdit(c: AdminClientOrg) {
    setForm({ name: c.name, area: c.area, city: c.city, sector: c.sector, highlight: c.highlight ?? "", published: c.published, sortOrder: c.sortOrder });
    setEditing(c);
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    save.mutate({ ...form, highlight: form.highlight?.trim() || null });
  }

  const columns: Column<AdminClientOrg>[] = [
    { key: "order", header: "#", cell: (r) => <span className="tabular-nums text-muted-foreground">{r.sortOrder}</span>, className: "w-12" },
    {
      key: "name",
      header: "Organisation",
      cell: (r) => (
        <div>
          <p className="font-medium">{r.name}</p>
          {r.highlight && <p className="text-xs text-brand-gold">{r.highlight}</p>}
        </div>
      ),
    },
    { key: "area", header: "Area", cell: (r) => r.area, hideOnMobile: true },
    { key: "city", header: "City", cell: (r) => r.city },
    { key: "sector", header: "Sector", cell: (r) => r.sector, hideOnMobile: true },
    {
      key: "pub",
      header: "Published",
      cell: (r) => <Checkbox checked={r.published} aria-label="Published" onCheckedChange={(v) => togglePublish.mutate({ id: r.id, published: v === true })} />,
    },
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
        title="Clients"
        description="Organisations shown under “Organisations we have served”. Only list those you have permission to name."
        actions={
          <Button onClick={openNew} className="bg-brand-gold text-brand-black hover:bg-brand-gold-soft">
            <Plus className="size-4" /> Add organisation
          </Button>
        }
      />
      <DataTable columns={columns} rows={q.data} rowKey={(r) => r.id} loading={q.isPending} error={q.error} onRetry={() => q.refetch()} emptyTitle="No organisations yet" />

      <Dialog open={editing !== null} onOpenChange={(o) => !o && !save.isPending && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>{editing === "new" ? "Add organisation" : "Edit organisation"}</DialogTitle>
              <DialogDescription>Use the organisation&apos;s exact name as it appears on their premises or invoices.</DialogDescription>
            </DialogHeader>
            <FieldGroup className="my-5 grid gap-4 sm:grid-cols-2">
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="c-name">Name</FieldLabel>
                <Input id="c-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field>
                <FieldLabel htmlFor="c-area">Area / landmark</FieldLabel>
                <Input id="c-area" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
              </Field>
              <Field>
                <FieldLabel htmlFor="c-city">City</FieldLabel>
                <Input id="c-city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </Field>
              <Field>
                <FieldLabel htmlFor="c-sector">Sector</FieldLabel>
                <Input id="c-sector" required placeholder="Hospitality, Industrial…" value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} />
              </Field>
              <Field>
                <FieldLabel htmlFor="c-order">Sort order</FieldLabel>
                <Input id="c-order" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="c-highlight">Highlight (optional, verified facts only)</FieldLabel>
                <Input id="c-highlight" placeholder="e.g. 160 bouncers deployed for PRISMA Fest 2026" value={form.highlight ?? ""} onChange={(e) => setForm({ ...form, highlight: e.target.value })} />
              </Field>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <Checkbox checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v === true })} /> Show on website
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

      <ConfirmDialog open={Boolean(toDelete)} onOpenChange={(o) => !o && setToDelete(null)} title="Remove organisation?" description={<>“{toDelete?.name}” will no longer be listed on the website.</>} confirmLabel="Remove" destructive pending={remove.isPending} onConfirm={() => toDelete && remove.mutate(toDelete.id)} />
    </>
  );
}
