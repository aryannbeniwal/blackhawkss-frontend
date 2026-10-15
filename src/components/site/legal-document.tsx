import type { LegalDocument } from "@/content/legal";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

export function LegalDocumentView({ doc, path }: { doc: LegalDocument; path: string }) {
  return (
    <div className="theme-sand">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: doc.title, path }])} />
      <div className="container-x max-w-3xl pb-24 pt-28 sm:pt-36">
        <p className="eyebrow text-brand-red">Legal</p>
        <h1 className="display-lg mt-4">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {doc.updated}</p>
        <div className="mt-10 space-y-8">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-semibold uppercase tracking-wide">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-foreground/85">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
