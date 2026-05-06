import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { PricingTable } from "@/components/home/PricingTable";
import { CoverageSection } from "@/components/home/CoverageSection";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <WhyUs />
      <PricingTable />
      <CoverageSection />
      <ClientLogos />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
