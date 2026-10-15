"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { track } from "@/lib/analytics";
import { publicApi } from "@/lib/api/endpoints/public";
import { ApiError } from "@/lib/api/http";
import { formatLeadMessage, leadMode } from "@/lib/lead-mode";
import { whatsappLink } from "@/lib/whatsapp";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.union([z.literal(""), z.email("Enter a valid email")]).optional(),
  message: z.string().trim().min(5, "Please write a short message").max(2000),
  website: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const startedAt = useRef<number>(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { fullName: "", phone: "", email: "", message: "", website: "" }, mode: "onTouched" });

  async function onSubmit(values: Values) {
    if (Date.now() - startedAt.current < 3000) {
      toast.error("Please take a moment to review the form before submitting.");
      return;
    }
    if (leadMode === "whatsapp") {
      const message = formatLeadMessage("Message from the website", [["Name", values.fullName], ["Mobile", values.phone], ["Email", values.email], ["Message", values.message]]);
      track("contact_submit", { mode: "whatsapp" });
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      setDone(true);
      return;
    }
    try {
      await publicApi.submitContact({ ...values, phone: values.phone.replace(/\D/g, "").slice(-10), email: values.email || undefined });
      track("contact_submit");
      setDone(true);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Something went wrong. Please call us instead.");
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-brand-gold/40 bg-card p-6 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-brand-gold" />
        <p className="mt-3 font-semibold">{leadMode === "whatsapp" ? "WhatsApp opened with your message. Press Send there and we will get back to you." : "Message received. We will get back to you shortly."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} noValidate className="space-y-5">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <Controller control={form.control} name="website" render={({ field }) => <input type="text" tabIndex={-1} autoComplete="off" aria-label="Leave empty" {...field} />} />
      </div>
      <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-x-4">
        <Controller control={form.control} name="fullName" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="c-name">Name *</FieldLabel>
            <Input id="c-name" autoComplete="name" aria-invalid={fieldState.invalid} {...field} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="phone" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="c-phone">Mobile *</FieldLabel>
            <Input id="c-phone" type="tel" inputMode="numeric" autoComplete="tel" aria-invalid={fieldState.invalid} {...field} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="email" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
            <FieldLabel htmlFor="c-email">Email (optional)</FieldLabel>
            <Input id="c-email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} {...field} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller control={form.control} name="message" render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
            <FieldLabel htmlFor="c-message">Message *</FieldLabel>
            <Textarea id="c-message" rows={4} aria-invalid={fieldState.invalid} {...field} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
      </FieldGroup>
      <Button type="submit" disabled={form.formState.isSubmitting} className="bg-brand-red font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
        {form.formState.isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : "Send message"}
      </Button>
    </form>
  );
}
