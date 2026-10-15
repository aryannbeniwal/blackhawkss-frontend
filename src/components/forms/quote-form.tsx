"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serviceCategoryOptions } from "@/content/services";
import { primaryContact } from "@/content/site";
import type { ServiceCategory } from "@/content/types";
import { track } from "@/lib/analytics";
import { publicApi } from "@/lib/api/endpoints/public";
import { ApiError } from "@/lib/api/http";
import { telLink, whatsappLink } from "@/lib/whatsapp";

const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
const categories = serviceCategoryOptions.map((o) => o.value) as [ServiceCategory, ...ServiceCategory[]];

const schema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(80),
    phone: z.string().trim().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
    email: z.union([z.literal(""), z.email("Enter a valid email address")]).optional(),
    organisation: z.string().trim().max(120).optional(),
    siteName: z.string().trim().max(120).optional(),
    serviceCategory: z.enum(categories, { message: "Choose a service" }),
    location: z.string().trim().min(2, "Where is the site or event?").max(160),
    preferredDate: z.string().min(1, "Choose a preferred start date"),
    personnelCount: z.coerce.number<number>().int("Whole numbers only").min(1, "At least 1").max(2000, "Please call us for very large deployments"),
    durationShift: z.string().trim().min(2, "e.g. 12-hour day shift, 3 days, or monthly").max(160),
    requirements: z.string().trim().min(10, "Tell us a little more about the requirement").max(2000),
    eventVenue: z.string().trim().max(160).optional(),
    expectedCrowd: z.union([z.literal(""), z.coerce.number<number>().int().min(1).max(500000)]).optional(),
    eventStart: z.string().optional(),
    eventEnd: z.string().optional(),
    consent: z.literal(true, { message: "Please agree so we can contact you" }),
    website: z.string().max(0).optional(),
  })
  .refine((v) => v.serviceCategory !== "BOUNCERS_EVENT_SECURITY" || (v.eventVenue && v.eventVenue.length > 1), {
    message: "Please tell us the venue",
    path: ["eventVenue"],
  });

type FormValues = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

export function QuoteForm({ defaultService, compact = false }: { defaultService?: ServiceCategory; compact?: boolean }) {
  const [success, setSuccess] = useState<{ referenceCode: string } | null>(null);
  const startedAt = useRef<number>(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const form = useForm<FormValues, unknown, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      organisation: "",
      siteName: "",
      serviceCategory: defaultService ?? ("" as unknown as ServiceCategory),
      location: "",
      preferredDate: "",
      personnelCount: 1,
      durationShift: "",
      requirements: "",
      eventVenue: "",
      expectedCrowd: "",
      eventStart: "",
      eventEnd: "",
      consent: undefined as unknown as true,
      website: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (defaultService) form.setValue("serviceCategory", defaultService);
  }, [defaultService, form]);

  const category = form.watch("serviceCategory");
  const isEvent = category === "BOUNCERS_EVENT_SECURITY";
  const submitting = form.formState.isSubmitting;

  async function onSubmit(values: FormOutput) {
    // Basic spam heuristic: humans take more than 3 seconds.
    if (Date.now() - startedAt.current < 3000) {
      toast.error("Please take a moment to review the form before submitting.");
      return;
    }
    try {
      const res = await publicApi.submitEnquiry({
        ...values,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        email: values.email || undefined,
        organisation: values.organisation || undefined,
        siteName: values.siteName || undefined,
        eventVenue: values.eventVenue || undefined,
        expectedCrowd: typeof values.expectedCrowd === "number" ? values.expectedCrowd : undefined,
        eventStart: values.eventStart || undefined,
        eventEnd: values.eventEnd || undefined,
        consent: true,
        source: "website",
      });
      track("quote_submit", { service: values.serviceCategory, personnel: values.personnelCount });
      setSuccess({ referenceCode: res.referenceCode });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.fields) {
          for (const [name, message] of Object.entries(err.fields)) {
            form.setError(name as keyof FormValues, { message });
          }
        }
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Please try again or call us.");
      }
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-brand-gold/40 bg-card p-8 text-center sm:p-10" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto size-12 text-brand-gold" />
        <h2 className="display-md mt-5">Enquiry received</h2>
        <p className="mt-3 text-muted-foreground">
          Your reference is{" "}
          <span className="font-mono text-lg font-semibold text-brand-gold">{success.referenceCode}</span>. We will review the requirement and call you
          from <span className="whitespace-nowrap font-semibold text-foreground">{primaryContact.display}</span>.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Need to add something? Reply on WhatsApp quoting the reference.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-[#25D366] text-black hover:brightness-110">
            <a href={whatsappLink(`Hello Black Hawk Security Solution, this is regarding my enquiry ${success.referenceCode}.`)} target="_blank" rel="noopener noreferrer">
              Continue on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} noValidate className="space-y-8" aria-busy={submitting}>
      {/* Honeypot: hidden from humans, filled by bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <Controller control={form.control} name="website" render={({ field }) => <input id="website" type="text" tabIndex={-1} autoComplete="off" {...field} />} />
      </div>

      <FieldSet>
        <FieldLegend>Your details</FieldLegend>
        <FieldGroup className={compact ? "" : "sm:grid sm:grid-cols-2 sm:gap-x-5"}>
          <Controller
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="fullName">Full name *</FieldLabel>
                <Input id="fullName" autoComplete="name" placeholder="Your name" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Mobile number *</FieldLabel>
                <Input id="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email (optional)</FieldLabel>
                <Input id="email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="organisation"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="organisation">Organisation (optional)</FieldLabel>
                <Input id="organisation" autoComplete="organization" placeholder="Company, society, institution" {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Requirement</FieldLegend>
        <FieldGroup className={compact ? "" : "sm:grid sm:grid-cols-2 sm:gap-x-5"}>
          <Controller
            control={form.control}
            name="serviceCategory"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="serviceCategory">Service *</FieldLabel>
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger id="serviceCategory" aria-invalid={fieldState.invalid} className="w-full">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategoryOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="location"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="location">Location *</FieldLabel>
                <Input id="location" placeholder="City / area of the site or event" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="preferredDate"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="preferredDate">Required / preferred date *</FieldLabel>
                <Input id="preferredDate" type="date" min={new Date().toISOString().slice(0, 10)} aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="personnelCount"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="personnelCount">Number of personnel *</FieldLabel>
                <Input id="personnelCount" type="number" inputMode="numeric" min={1} max={2000} aria-invalid={fieldState.invalid} {...field} value={String(field.value ?? "")} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="durationShift"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                <FieldLabel htmlFor="durationShift">Duration / shift requirement *</FieldLabel>
                <Input id="durationShift" placeholder="e.g. 12-hour day & night shifts, monthly contract — or one evening, 6 pm to 1 am" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          {isEvent && (
            <>
              <Controller
                control={form.control}
                name="eventVenue"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="eventVenue">Venue *</FieldLabel>
                    <Input id="eventVenue" placeholder="Venue name" aria-invalid={fieldState.invalid} {...field} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="expectedCrowd"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="expectedCrowd">Expected attendance</FieldLabel>
                    <Input id="expectedCrowd" type="number" inputMode="numeric" min={1} placeholder="Approximate" {...field} value={String(field.value ?? "")} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="eventStart"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="eventStart">Event start</FieldLabel>
                    <Input id="eventStart" type="datetime-local" {...field} />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="eventEnd"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="eventEnd">Event end</FieldLabel>
                    <Input id="eventEnd" type="datetime-local" {...field} />
                  </Field>
                )}
              />
            </>
          )}
          <Controller
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="siteName">Event / site name (optional)</FieldLabel>
                <Input id="siteName" placeholder="e.g. Plant 2, Sector 29 — or Annual Day 2026" {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="requirements"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                <FieldLabel htmlFor="requirements">Additional requirements *</FieldLabel>
                <Textarea id="requirements" rows={5} placeholder="Gates/entry points, timings, uniforms, supervision, any specific concerns…" aria-invalid={fieldState.invalid} {...field} />
                <FieldDescription>The more detail you share, the more accurate our deployment plan and quotation.</FieldDescription>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <Controller
        control={form.control}
        name="consent"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} orientation="horizontal">
            <Checkbox id="consent" checked={field.value === true} onCheckedChange={(v) => field.onChange(v === true ? true : undefined)} aria-invalid={fieldState.invalid} />
            <div>
              <FieldLabel htmlFor="consent" className="font-normal">
                I agree to be contacted by Black Hawk Security Solution about this enquiry and have read the{" "}
                <Link href="/privacy" className="text-brand-gold underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </FieldLabel>
              <FieldError errors={[fieldState.error]} />
            </div>
          </Field>
        )}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} className="h-12 bg-brand-red px-8 text-base font-semibold uppercase tracking-wider text-white hover:bg-brand-red-deep">
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" /> Sending…
            </>
          ) : (
            "Submit enquiry"
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          Prefer to talk?{" "}
          <a href={telLink(primaryContact)} className="inline-flex items-center gap-1 font-semibold text-brand-gold">
            <Phone className="size-3.5" /> {primaryContact.display}
          </a>
        </p>
      </div>
    </form>
  );
}
