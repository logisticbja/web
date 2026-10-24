import type { Metadata } from "next";
import { CityPreview } from "@/components/preview/CityPreview";
import { loadKotaTemplate } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Halaman Kota — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function CityPreviewPage() {
  const { live } = await loadKotaTemplate();
  return <CityPreview tpl={live} />;
}
