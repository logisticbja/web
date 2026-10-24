import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KotaTemplatePreview } from "@/components/preview/CityPreview";
import { destinationCities, resolveDestinationValue } from "@/lib/data/pricing";
import { getCityPage } from "@/lib/cityPages";
import { fromSlug, toSlug } from "@/lib/cityPage";
import { loadKotaTemplate } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Template Kota — BJA Logistic" },
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return ["jayapura", "ambon", "kupang", "makassar"].map((kota) => ({ kota }));
}

export default async function KotaTemplatePreviewPage({ params }: { params: Promise<{ kota: string }> }) {
  const { kota } = await params;
  const destination = resolveDestinationValue(fromSlug(kota));
  if (!destinationCities.some((c) => c.value === destination)) notFound();
  const [{ live, defaults }, data] = await Promise.all([loadKotaTemplate(), getCityPage(toSlug(destination))]);
  return <KotaTemplatePreview live={live} defaults={defaults} destination={destination} data={data} />;
}
