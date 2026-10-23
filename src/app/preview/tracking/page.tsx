import type { Metadata } from "next";
import { ToolPreview } from "@/components/preview/ToolPreview";

export const metadata: Metadata = {
  title: { absolute: "Preview Tracking — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default function TrackingPreviewPage() {
  return <ToolPreview page="tracking" />;
}
