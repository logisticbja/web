import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { CoverageSection } from "@/components/home/CoverageSection";
import { Gallery } from "@/components/home/Gallery";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "BJA Logistic — Ekspedisi Spesialis Papua & Indonesia Timur",
  description:
    "BJA Logistic, spesialis ekspedisi Papua & Indonesia Timur (Maluku, NTT, Sulawesi). Mulai Rp 7.000/kg, door to door Jabodetabek, 10+ tahun pengalaman.",
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
      <CoverageSection />
      <Gallery />
      <ClientLogos />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
