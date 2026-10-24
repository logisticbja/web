import type { Metadata } from "next";
import { CityPreview } from "@/components/preview/CityPreview";

export const metadata: Metadata = {
  title: { absolute: "Preview Halaman Kota — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default function CityPreviewPage() {
  return <CityPreview />;
}
