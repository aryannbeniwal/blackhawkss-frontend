import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { galleryPhotos } from "@/content/gallery";
import { pageSeo } from "@/content/seo";
import { backendGet } from "@/lib/api/server/backend";
import type { GalleryItem } from "@/lib/api/types";
import { buildMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/site/page-seo";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const metadata = buildMetadata({ ...pageSeo.gallery, path: "/gallery" });

export default function GalleryPage() {
  return (
    <div className="container-x pb-24 pt-28 sm:pt-36">
      <PageSeo name={pageSeo.gallery.title} description={pageSeo.gallery.description} path="/gallery" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]} />
      <Reveal>
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]} className="mb-5" />
        <SectionHeading as="h1" size="xl" eyebrow="Our work" title="Deployments, sites and the team" lead="Photographs from genuine assignments — PRISMA Fest 2026 at SRM University, industrial and residential gate posts. We only publish images we have permission to share." />
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
  const uploaded = (await backendGet<GalleryItem[]>("/api/v1/public/gallery")) ?? [];
  const bundled: GalleryItem[] = galleryPhotos.map((p, i) => ({
    id: -(i + 1),
    title: p.title,
    category: p.category,
    url: p.src,
    thumbUrl: p.src,
    width: p.width,
    height: p.height,
    sortOrder: 1000 + i,
  }));
  return <GalleryGrid items={[...uploaded, ...bundled]} />;
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
