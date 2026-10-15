"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { careersPage, type CareerRoleValue } from "@/content/careers";
import { track } from "@/lib/analytics";
import { publicApi } from "@/lib/api/endpoints/public";
import { ApiError } from "@/lib/api/http";

const roles = careersPage.roles.map((r) => r.value) as [CareerRoleValue, ...CareerRoleValue[]];

const schema = z.object({
  fullName: z.string().trim().min(2, "Apna poora naam likhein / enter your full name").max(80),
  phone: z.string().trim().regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, "10-digit mobile number"),
  city: z.string().trim().min(2, "District / city").max(80),
  roleApplied: z.enum(roles, { message: "Choose a role" }),
  experienceYears: z.coerce.number<number>().int().min(0).max(50),
  age: z.union([z.literal(""), z.coerce.number<number>().int().min(18, "18+ only").max(70)]).optional(),
  exServiceman: z.boolean(),
  serviceUnit: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000).optional(),
  website: z.string().max(0).optional(),
});
type In = z.input<typeof schema>;
type Out = z.output<typeof schema>;

export function ApplicationForm() {
  const [done, setDone] = useState(false);
  const startedAt = useRef<number>(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const form = useForm<In, unknown, Out>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", city: "", roleApplied: "" as unknown as CareerRoleValue, experienceYears: 0, age: "", exServiceman: false, serviceUnit: "", message: "", website: "" },
    mode: "onTouched",
  });
  const ex = form.watch("exServiceman");

  async function onSubmit(v: Out) {
    if (Date.now() - startedAt.current < 3000) {
      toast.error("Please take a moment to review the form before submitting.");
      return;
    }
    try {
      await publicApi.submitApplication({
        fullName: v.fullName,
        phone: v.phone.replace(/\D/g, "").slice(-10),
        city: v.city,
        roleApplied: v.roleApplied,
        experienceYears: v.experienceYears,
        exServiceman: v.exServiceman,
        serviceUnit: v.serviceUnit || undefined,
        age: typeof v.age === "number" ? v.age : undefined,
        message: v.message || undefined,
      });
      track("application_submit", { role: v.roleApplied });
      setDone(true);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Something went wrong. Please WhatsApp us instead.");
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-brand-gold/40 bg-background/50 p-6 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-brand-gold" />
        <p className="mt-3 font-semibold">Application received · आवेदन मिल गया</p>
        <p className="mt-1 text-sm text-muted-foreground">We will call you when a suitable assignment comes up.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} noValidate className="space-y-6">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <Controller control={form.control} name="website" render={({ field }) => <input type="text" tabIndex={-1} autoComplete="off" aria-label="Leave empty" {...field} />} />
      </div>
      <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-x-4">
        <Controller control={form.control} name="fullName" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="a-name">Full name · नाम *</FieldLabel>
            <Input id="a-name" autoComplete="name" aria-invalid={fieldState.invalid} {...field} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="phone" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="a-phone">Mobile · मोबाइल *</FieldLabel>
            <Input id="a-phone" type="tel" inputMode="numeric" autoComplete="tel" aria-invalid={fieldState.invalid} {...field} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="city" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="a-city">District / city · ज़िला *</FieldLabel>
            <Input id="a-city" placeholder="e.g. Panipat" aria-invalid={fieldState.invalid} {...field} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="roleApplied" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="a-role">Role · पद *</FieldLabel>
            <Select value={field.value || ""} onValueChange={field.onChange}>
              <SelectTrigger id="a-role" aria-invalid={fieldState.invalid} className="w-full">
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                {careersPage.roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="experienceYears" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="a-exp">Experience (years) · अनुभव</FieldLabel>
            <Input id="a-exp" type="number" inputMode="numeric" min={0} max={50} {...field} value={String(field.value ?? "")} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="age" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="a-age">Age · उम्र</FieldLabel>
            <Input id="a-age" type="number" inputMode="numeric" min={18} max={70} {...field} value={String(field.value ?? "")} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="exServiceman" render={({ field }) => (
          <Field orientation="horizontal" className="sm:col-span-2">
            <Checkbox id="a-ex" checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />
            <FieldLabel htmlFor="a-ex" className="font-normal">I am an ex-serviceman · मैं पूर्व सैनिक हूँ</FieldLabel>
          </Field>
        )} />
        {ex && (
          <Controller control={form.control} name="serviceUnit" render={({ field }) => (
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="a-unit">Regiment / unit & years of service</FieldLabel>
              <Input id="a-unit" placeholder="e.g. Jat Regiment, 2004–2021" {...field} />
            </Field>
          )} />
        )}
        <Controller control={form.control} name="message" render={({ field }) => (
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="a-msg">Anything else · और कुछ</FieldLabel>
            <Textarea id="a-msg" rows={3} placeholder="Availability, preferred shifts, previous sites…" {...field} />
          </Field>
        )} />
      </FieldGroup>
      <p className="text-xs text-muted-foreground">
        By applying you agree we may contact you about work opportunities. See our <a href="/privacy" className="text-brand-gold underline underline-offset-2">privacy policy</a>.
      </p>
      <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="h-12 bg-brand-red px-8 text-base font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
        {form.formState.isSubmitting ? <><Loader2 className="size-5 animate-spin" /> Sending…</> : "Submit application"}
      </Button>
    </form>
  );
}
