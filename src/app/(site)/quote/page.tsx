import { Suspense } from "react";
import { Clock, ShieldCheck, Users } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { SectionHeading } from "@/components/site/section-heading";
import { pageSeo } from "@/content/seo";
import { serviceCategoryOptions } from "@/content/services";
import type { ServiceCategory } from "@/content/types";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...pageSeo.quote, path: "/quote" });

const valid = new Set(serviceCategoryOptions.map((o) => o.value));

export default function QuotePage({ searchParams }: PageProps<"/quote">) {
  return (
    <div className="relative">
      <div className="bg-red-glow absolute inset-x-0 top-0 h-96" aria-hidden />
      <div className="container-x relative grid gap-12 pb-24 pt-28 sm:pt-36 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <SectionHeading as="h1" size="lg" eyebrow="Request a quote" title="Tell us what you need covered" lead="Share the site, event or staffing requirement. We will discuss it with you and come back with a deployment plan and quotation." />
          <ul className="mt-10 space-y-5 text-sm">
            {[
              { icon: Clock, t: "What happens next", d: "We review the requirement and call you to confirm scope, timings and site specifics." },
              { icon: Users, t: "Staffing options", d: "Guards, bouncers, PSOs, supervisors, manpower and support staff can be combined in one deployment." },
              { icon: ShieldCheck, t: "Your details are private", d: "Enquiries go only to the owners of Black Hawk Security Solution. See our privacy policy." },
            ].map((i) => (
              <li key={i.t} className="flex gap-3">
                <i.icon className="mt-0.5 size-5 shrink-0 text-brand-gold" />
                <div>
                  <p className="font-semibold">{i.t}</p>
                  <p className="text-muted-foreground">{i.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 lg:col-span-8">
          <Suspense fallback={null}>
            <QuoteWithParams searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function QuoteWithParams({ searchParams }: { searchParams: PageProps<"/quote">["searchParams"] }) {
  const { service } = await searchParams;
  const s = Array.isArray(service) ? service[0] : service;
  const defaultService = s && valid.has(s as ServiceCategory) ? (s as ServiceCategory) : undefined;
  return <QuoteForm defaultService={defaultService} />;
}
