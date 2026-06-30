import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calculator } from "lucide-react";
import { jakartaCityMap, getRegionLabel } from "@/lib/data/jakartaCities";
import { CekOngkirForm } from "@/components/CekOngkirForm";
import { fetchPricing } from "@/lib/sheets";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

const BASE_URL = "https://bjalogistic.id";

type Props = { params: Promise<{ slug: string }> };

/**
 * Converts ekspedisi-jakarta-[city] slug → corresponding jakarta-[city] key in jakartaCityMap.
 * e.g. "ekspedisi-jakarta-ambon" → "jakarta-Ambon"
 */
function resolveEntry(slug: string) {
  // Strip "ekspedisi-" prefix to get "jakarta-[city]" slug
  const jakartaSlug = slug.replace(/^ekspedisi-/, "");

  // Try direct lookup (exact match)
  if (jakartaCityMap[jakartaSlug]) return { key: jakartaSlug, entry: jakartaCityMap[jakartaSlug] };

  // Try case-insensitive match — e.g. "jakarta-ambon" → "jakarta-Ambon"
  const lower = jakartaSlug.toLowerCase();
  const key = Object.keys(jakartaCityMap).find((k) => k.toLowerCase() === lower);
  if (key) return { key, entry: jakartaCityMap[key] };

  return null;
}

// Build all valid slugs from jakartaCityMap prefixed with "ekspedisi-"
export function generateStaticParams() {
  return Object.keys(jakartaCityMap).map((jakartaKey) => ({
    slug: `ekspedisi-${jakartaKey}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = resolveEntry(slug);
  if (!found) return {};

  const { entry } = found;
  const city = entry.displayName;
  const canonical = `${BASE_URL}/cek-ongkir-cargo/${slug}`;
  const isTimur = entry.region !== "jawa";

  const title = isTimur
    ? `Cek Ongkir Ekspedisi Jakarta ${city} — Harga Cargo | BJA Logistic`
    : `Cek Ongkir Jakarta ${city} | BJA Logistic`;
  const description = isTimur
    ? `Kalkulator ongkir ekspedisi Jakarta ke ${city}, ${getRegionLabel(entry.region)}. Hitung biaya cargo laut, darat & udara langsung di sini.`
    : `Cek ongkir dan estimasi biaya pengiriman dari Jakarta ke ${city}.`;

  return {
    title,
    description,
    keywords: [
      `cek ongkir jakarta ${city.toLowerCase()}`,
      `ekspedisi jakarta ${city.toLowerCase()}`,
      `ongkir cargo jakarta ${city.toLowerCase()}`,
    ],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  };
}

export default async function EkspedisiCekOngkirPage({ params }: Props) {
  const { slug } = await params;
  const found = resolveEntry(slug);
  if (!found) notFound();

  const { entry } = found;
  const rows = await fetchPricing();
  const city = entry.displayName;
  const isTimur = entry.region !== "jawa";
  const canonical = `${BASE_URL}/cek-ongkir-cargo/${slug}`;

  const defaultValues = entry.ongkirValue
    ? { from: "jabodetabek", to: entry.ongkirValue, toLabel: entry.ongkirLabel, weight: "100", service: "Regular" as const }
    : undefined;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Beranda", url: BASE_URL },
        { name: "Cek Ongkir", url: `${BASE_URL}/cek-ongkir` },
        { name: `Ekspedisi Jakarta ${city}`, url: canonical },
      ]} />

      {/* Header */}
      <div className="bg-[#CC1F2A] py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center mx-auto mb-3">
            <Calculator size={20} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mb-1.5">
            Cek Ongkir Ekspedisi Jakarta → {city}
          </h1>
          <p className="text-white/70 text-sm">
            {isTimur
              ? `Hitung estimasi biaya pengiriman cargo dari Jakarta ke ${city}, ${getRegionLabel(entry.region)}`
              : `Estimasi ongkir pengiriman dari Jakarta ke ${city}`}
          </p>
          {isTimur && (
            <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Regular: min. 100 kg
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Express: min. 10 kg
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <CekOngkirForm
          rows={rows}
          defaultValues={defaultValues}
          autoCalculate={!!entry.ongkirValue}
        />
      </div>
    </>
  );
}
