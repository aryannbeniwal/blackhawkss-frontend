import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { pageSeo } from "@/content/seo";
import { backendGet } from "@/lib/api/server/backend";
import type { GalleryItem } from "@/lib/api/types";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...pageSeo.gallery, path: "/gallery" });

export default function GalleryPage() {
  return (
    <div className="container-x pb-24 pt-28 sm:pt-36">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      <Reveal>
        <SectionHeading as="h1" size="xl" eyebrow="Our work" title="Deployments, sites and the team" lead="Authorised photographs from genuine assignments. We only publish images we have permission to share." />
      </Reveal>
      <div className="mt-12">
        <Suspense fallback={<GallerySkeleton />}>
          <GalleryData />
        </Suspense>
      </div>
    </div>
  );
}

async function GalleryData() {
  "use cache";
  cacheLife("minutes");
  const items = (await backendGet<GalleryItem[]>("/api/v1/public/gallery")) ?? [];
  return <GalleryGrid items={items} />;
}

function GallerySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
      ))}
    </div>
  );
}
