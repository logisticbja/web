import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWA } from "@/components/ui/FloatingWA";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";

export const metadata: Metadata = {
  title: {
    template: "%s | BJA Logistic",
    default: "BJA Logistic — Ekspedisi Cargo Papua & Indonesia Timur",
  },
  description:
    "Jasa ekspedisi cargo terpercaya ke Papua, Maluku, NTT, dan Sulawesi. Cargo laut, darat, udara. Mulai Rp 6.000/kg. Door to door Jabodetabek. Hubungi WhatsApp: 0815 1333 5157.",
  keywords: [
    "ekspedisi papua", "cargo papua", "kirim barang ke papua", "ongkir papua",
    "cargo laut papua", "ekspedisi indonesia timur", "cargo maluku", "cargo ntt",
    "jasa pengiriman papua", "bjj logistic", "bja logistic",
  ],
  openGraph: {
    title: "BJA Logistic — Ekspedisi Cargo Papua & Indonesia Timur",
    description: "Jasa ekspedisi terpercaya ke Papua, Maluku, NTT, Sulawesi. Mulai Rp 6.000/kg.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingWA />
        <MobileCtaBar />
      </body>
    </html>
  );
}
