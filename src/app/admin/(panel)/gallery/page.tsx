"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { enumLabel } from "@/components/admin/format";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState, ErrorState } from "@/components/admin/states";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { adminApi } from "@/lib/api/endpoints/admin";
import { keys } from "@/lib/api/keys";
import type { GalleryItem } from "@/lib/api/types";

const CATEGORIES: GalleryItem["category"][] = ["EVENTS", "SITES", "TEAM"];

export default function GalleryPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: keys.gallery.all, queryFn: adminApi.gallery.list });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GalleryItem["category"]>("EVENTS");
  const fileRef = useRef<HTMLInputElement>(null);
  const [toDelete, setToDelete] = useState<GalleryItem | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: keys.gallery.all });

  const upload = useMutation({
    mutationFn: (form: FormData) => adminApi.gallery.upload(form),
    onSuccess: () => {
      invalidate();
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Photo uploaded");
    },
  });
  const patch = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Parameters<typeof adminApi.gallery.patch>[1] }) => adminApi.gallery.patch(id, body),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: number) => adminApi.gallery.remove(id),
    onSuccess: () => {
      invalidate();
      setToDelete(null);
      toast.success("Photo removed");
    },
  });

  function onUpload(e: FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Choose an image first");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      toast.error("Image must be under 12 MB");
      return;
    }
    const form = new FormData();
    form.append("file", file);
    form.append("title", title.trim() || file.name.replace(/\.[^.]+$/, ""));
    form.append("category", category);
    upload.mutate(form);
  }

  return (
    <>
      <PageHeader title="Gallery" description="Photos shown on the public gallery page. Only upload authorised photographs." />

      <form onSubmit={onUpload} className="rounded-xl border border-border bg-card p-5">
        <FieldGroup className="grid gap-4 sm:grid-cols-[1fr_1fr_12rem_auto] sm:items-end">
          <Field>
            <FieldLabel htmlFor="file">Image (JPEG/PNG)</FieldLabel>
            <Input id="file" ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. PRISMA Fest 2026 — entry control" />
          </Field>
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select value={category} onValueChange={(v) => setCategory(v as GalleryItem["category"])}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {enumLabel(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Button type="submit" disabled={upload.isPending} className="bg-brand-gold text-brand-black hover:bg-brand-gold-soft">
            {upload.isPending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Upload
          </Button>
        </FieldGroup>
      </form>

      {q.error ? (
        <ErrorState error={q.error} onRetry={() => q.refetch()} />
      ) : q.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
          ))}
        </div>
      ) : q.data.length === 0 ? (
        <EmptyState title="No photos yet" description="Upload the first authorised photo above." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {q.data.map((item) => (
            <li key={item.id} className="overflow-hidden rounded-xl border border-border bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element -- backend-served upload, dynamic host */}
              <img src={item.thumbUrl} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="space-y-3 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                  <StatusBadge status={item.category} size="sm" />
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <label className="flex items-center gap-2 text-xs">
                    <Checkbox checked={Boolean(item.published)} onCheckedChange={(v) => patch.mutate({ id: item.id, body: { published: v === true } })} />
                    Published
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    Order
                    <Input type="number" className="h-7 w-16 px-1.5 text-xs" defaultValue={item.sortOrder} onBlur={(e) => {
                      const v = Number(e.target.value);
                      if (Number.isFinite(v) && v !== item.sortOrder) patch.mutate({ id: item.id, body: { sortOrder: v } });
                    }} />
                  </label>
                  <Button variant="ghost" size="icon-sm" aria-label="Delete photo" onClick={() => setToDelete(item)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Delete this photo?"
        description={<>“{toDelete?.title}” will be removed from the website. This cannot be undone.</>}
        confirmLabel="Delete"
        destructive
        pending={remove.isPending}
        onConfirm={() => toDelete && remove.mutate(toDelete.id)}
      />
    </>
  );
}
