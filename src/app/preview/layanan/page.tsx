import type { Metadata } from "next";
import { ServicePreview } from "@/components/preview/ServicePreview";

export const metadata: Metadata = {
  title: { absolute: "Preview Layanan — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default function ServicePreviewPage() {
  return <ServicePreview />;
}
