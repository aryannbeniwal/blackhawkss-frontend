import { LegalDocumentView } from "@/components/site/legal-document";
import { privacyPolicy } from "@/content/legal";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...pageSeo.privacy, path: "/privacy" });

export default function PrivacyPage() {
  return <LegalDocumentView doc={privacyPolicy} path="/privacy" />;
}
