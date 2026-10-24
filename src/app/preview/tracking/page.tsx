import type { Metadata } from "next";
import { TrackingPreview } from "@/components/preview/ToolPreview";
import { loadTracking } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Tracking — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function TrackingPreviewPage() {
  const { live, defaults } = await loadTracking();
  return <TrackingPreview live={live} defaults={defaults} />;
}
