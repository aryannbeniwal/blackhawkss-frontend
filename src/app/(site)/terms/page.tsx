import { LegalDocumentView } from "@/components/site/legal-document";
import { termsAndConditions } from "@/content/legal";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...pageSeo.terms, path: "/terms" });

export default function TermsPage() {
  return <LegalDocumentView doc={termsAndConditions} path="/terms" />;
}
