import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getSchedules } from "@/lib/schedule";
import { getRegionConfig, regionConfigs } from "@/lib/data/regions";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { TujuanView } from "@/components/tools/TujuanView";
import { loadTujuan } from "@/lib/sitePages/fetch";
import { stripBrand, withBrand } from "@/lib/seoTitle";

const BASE_URL = "https://bjalogistic.id";

interface Props {
  params: Promise<{ region: string }>;
}

export function generateStaticParams() {
  return regionConfigs.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const config = getRegionConfig(region);
  if (!config) return {};

  const { live } = await loadTujuan(config);
  const title = stripBrand(live.seo.title) || `Cargo ke ${config.label} — Harga Terjangkau & Terpercaya`;
  const description = live.seo.description;
  const canonical = `${BASE_URL}/cargo/${config.slug}`;
  const ogImage = live.seo.ogImage || live.hero.image || "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: withBrand(title),
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function CargoRegionPage({ params }: Props) {
  const { region } = await params;
  const config = getRegionConfig(region);
  if (!config) notFound();

  const [{ live }, regionSchedules] = await Promise.all([loadTujuan(config), getSchedules({ region: config.scheduleRegion })]);
  const canonical = `${BASE_URL}/cargo/${config.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: BASE_URL },
          { name: "Cargo", url: `${BASE_URL}/cargo` },
          { name: config.label, url: canonical },
        ]}
      />
      <TujuanView config={config} content={live} schedules={regionSchedules} />
    </>
  );
}
