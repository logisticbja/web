import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { PricingTable } from "@/components/home/PricingTable";
import { CoverageSection } from "@/components/home/CoverageSection";
import { Gallery } from "@/components/home/Gallery";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "BJA Logistic — Ekspedisi Cargo Papua & Indonesia Timur Terpercaya",
  description:
    "BJA Logistic spesialis ekspedisi cargo ke Papua, Maluku, NTT & Sulawesi. Cargo laut mulai Rp 6.000/kg, cargo udara 2–4 hari. Door to door Jabodetabek. 10+ tahun pengalaman. Hubungi 0815-1333-5157.",
  alternates: {
    canonical: "https://bjalogistic.id",
  },
};

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <WhyUs />
      <PricingTable />
      <CoverageSection />
      <Gallery />
      <ClientLogos />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
