import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TujuanPreview } from "@/components/preview/ToolPreview";
import { getSchedules } from "@/lib/schedule";
import { getRegionConfig, regionConfigs } from "@/lib/data/regions";
import { loadTujuan } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Tujuan — BJA Logistic" },
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return regionConfigs.map((r) => ({ region: r.slug }));
}

export default async function TujuanPreviewPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const config = getRegionConfig(region);
  if (!config) notFound();
  const [{ live, defaults }, schedules] = await Promise.all([loadTujuan(config), getSchedules({ region: config.scheduleRegion })]);
  return <TujuanPreview region={config.slug} live={live} defaults={defaults} schedules={schedules} />;
}
