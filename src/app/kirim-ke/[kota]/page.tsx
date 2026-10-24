import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { destinationCities, destinationAliases, resolveDestinationValue } from "@/lib/data/pricing";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getCityPage } from "@/lib/cityPages";
import { buildAutomaticCitySeo, buildCityView, fromSlug, getEffectiveCityPricing, toSlug } from "@/lib/cityPage";
import { CityPageView } from "@/components/tools/CityPageView";

export const revalidate = 86400;

export function generateStaticParams() {
  const canonicalParams = destinationCities.map((city) => ({
    kota: toSlug(city.value),
  }));

  const legacyParams = Object.keys(destinationAliases).map((alias) => ({
    kota: toSlug(alias),
  }));

  return [...canonicalParams, ...legacyParams];
}

type Props = { params: Promise<{ kota: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota } = await params;
  const rawDestinationValue = fromSlug(kota);
  const resolvedDestinationValue = resolveDestinationValue(rawDestinationValue);
  const canonicalSlug = toSlug(resolvedDestinationValue);

  const city = destinationCities.find(
    (c) => c.value === resolvedDestinationValue
  );

  const apiData = await getCityPage(canonicalSlug);
  if (!city && !apiData) return {};

  const cityLabel = apiData?.city ?? city!.label;
  const region = apiData?.region ?? city?.region ?? "";
  const pricing = getEffectiveCityPricing(resolvedDestinationValue, apiData);
  const automaticSeo = buildAutomaticCitySeo(cityLabel, region, pricing);

  const useCustomSeo = !!apiData?.seoCustom;
  const title =
    useCustomSeo && apiData?.metaTitle?.trim()
      ? apiData.metaTitle.trim()
      : automaticSeo.title;

  const description =
    useCustomSeo && apiData?.metaDescription?.trim()
      ? apiData.metaDescription.trim()
      : automaticSeo.description;

  const canonical = `https://bjalogistic.id/kirim-ke/${canonicalSlug}`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      apiData?.focusKeyword?.trim(),
      `cargo ke ${cityLabel.toLowerCase()}`,
      `ekspedisi ${cityLabel.toLowerCase()}`,
      `kirim barang ke ${cityLabel.toLowerCase()}`,
      `ongkir ke ${cityLabel.toLowerCase()}`,
      ...(region
        ? [`ekspedisi ${region.toLowerCase()} ${cityLabel.toLowerCase()}`]
        : []),
    ].filter(Boolean) as string[],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: apiData?.ogImage || apiData?.imageBanner || "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [apiData?.ogImage || apiData?.imageBanner || "/og-image.png"],
    },
  };
}

export default async function KirimKePage({ params }: Props) {
  const { kota } = await params;
  const rawDestinationValue = fromSlug(kota);
  const resolvedDestinationValue = resolveDestinationValue(rawDestinationValue);

  if (rawDestinationValue !== resolvedDestinationValue) {
    permanentRedirect(`/kirim-ke/${toSlug(resolvedDestinationValue)}`);
  }

  const city = destinationCities.find(
    (c) => c.value === resolvedDestinationValue
  );
  const apiData = await getCityPage(toSlug(resolvedDestinationValue));
  if (!city && !apiData) notFound();

  const view = buildCityView(resolvedDestinationValue, apiData);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Beranda", url: "https://bjalogistic.id" },
                { name: "Cargo", url: "https://bjalogistic.id/cargo" },
        {
          name: view.cityLabel,
          url: `https://bjalogistic.id/kirim-ke/${toSlug(resolvedDestinationValue)}`,
        },
      ]} />
      <CityPageView view={view} data={apiData} />
    </>
  );
}
