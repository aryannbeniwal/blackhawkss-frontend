import { Hero } from "@/components/home/hero";
import { LeadershipPreview } from "@/components/home/leadership-preview";
import { ProjectHighlight } from "@/components/home/project-highlight";
import { EngagementSteps, IndustriesSection, ServicesSection, WhySection, ClientsPreview } from "@/components/home/sections";
import { CtaBand } from "@/components/site/cta-band";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...pageSeo.home, path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhySection />
      <LeadershipPreview />
      <IndustriesSection />
      <ClientsPreview />
      <ProjectHighlight />
      <EngagementSteps />
      <CtaBand />
    </>
  );
}
