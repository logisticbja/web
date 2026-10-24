import type { Metadata } from "next";
import { LayananPreview } from "@/components/preview/ToolPreview";
import { loadLayanan } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Layanan — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function LayananPreviewPage() {
  const { live, defaults } = await loadLayanan();
  return <LayananPreview live={live} defaults={defaults} />;
}
