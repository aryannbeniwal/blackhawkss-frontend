import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";
import type { Crumb } from "@/components/site/breadcrumbs";

type Props = {
  name: string;
  description: string;
  path: string;
  image?: string;
  /** Breadcrumb trail including Home; omit on the home page */
  breadcrumbs?: Crumb[];
  /** Extra schema.org nodes for this page (Service, FAQPage, Person…) */
  nodes?: Record<string, unknown>[];
};

/** One @graph per page: WebPage (+ breadcrumb) plus any page-specific nodes. Organization/WebSite live in the site layout. */
export function PageSeo({ name, description, path, image, breadcrumbs, nodes = [] }: Props) {
  const crumb = breadcrumbs && breadcrumbs.length > 1 ? breadcrumbNode(breadcrumbs) : null;
  return <JsonLd data={graph(webPageNode({ name, description, path, image, breadcrumbId: crumb ? (crumb["@id"] as string) : undefined }), crumb, ...nodes)} />;
}
