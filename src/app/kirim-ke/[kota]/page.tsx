import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Clock, Ship, Zap, CheckCircle, ArrowRight, MapPin, Package, Star, Quote, Scale, Ban, AlertCircle } from "lucide-react";
import { destinationCities, calculatePrice, cityLautPricing, formatPrice } from "@/lib/data/pricing";
import { buildDestinationMessage, buildOngkirMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getCityPage } from "@/lib/cityPages";
import { getCitiesByRegion } from "@/lib/data/regions";
import type { OngkirRegion } from "@/lib/data/ongkir";

const ONGKIR_REGIONS = new Set(["papua", "maluku", "ntt", "sulawesi"]);

export const revalidate = 86400;

function toSlug(value: string) {
  return value.replace(/_/g, "-");
}
function fromSlug(slug: string) {
  return slug.replace(/-/g, "_");
}

export function generateStaticParams() {
  return destinationCities.map((city) => ({ kota: toSlug(city.value) }));
}

type Props = { params: Promise<{ kota: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota } = await params;
  const city = destinationCities.find((c) => c.value === fromSlug(kota));
  const apiData = await getCityPage(kota);
  if (!city && !apiData) return {};

  const cityLabel = apiData?.city ?? city!.label;
  const region = city?.region ?? "";

  const laut = calculatePrice(city?.value ?? kota, "laut", 1);
  const priceStr =
    laut.priceMin === laut.priceMax
      ? `Rp ${laut.priceMin.toLocaleString("id-ID")}/kg`
      : `Rp ${laut.priceMin.toLocaleString("id-ID")}–${laut.priceMax.toLocaleString("id-ID")}/kg`;

  const etaStr =
    laut.etaMin === laut.etaMax
      ? `${laut.etaMin} hari`
      : `${laut.etaMin}–${laut.etaMax} hari`;

  const canonical = `https://bjalogistic.id/kirim-ke/${kota}`;
  const title = `Cargo ke ${cityLabel} — ${priceStr} | BJA Logistic`;
  const description = `Jasa ekspedisi cargo ke ${cityLabel}${region ? `, ${region}` : ""}. Cargo laut ${priceStr}, estimasi ${etaStr}. Door to door Jabodetabek & Surabaya. Hubungi BJA Logistic.`;

  return {
    title,
    description,
    keywords: [
      `cargo ke ${cityLabel.toLowerCase()}`,
      `ekspedisi ${cityLabel.toLowerCase()}`,
      `kirim barang ke ${cityLabel.toLowerCase()}`,
      `ongkir ke ${cityLabel.toLowerCase()}`,
      ...(region ? [`ekspedisi ${region.toLowerCase()} ${cityLabel.toLowerCase()}`] : []),
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

const serviceInfo = [
  {
    type: "reguler" as const,
    label: "Cargo Reguler",
    icon: Ship,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    highlights: ["Kapal Roro & PELNI", "Harga paling ekonomis", "Cocok barang berat & besar", "Tracking real-time"],
  },
  {
    type: "express" as const,
    label: "Cargo Express",
    icon: Zap,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    highlights: ["Lebih cepat sampai", "Prioritas muat kapal", "Cocok barang urgent", "Tracking real-time"],
