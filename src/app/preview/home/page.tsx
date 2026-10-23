import type { Metadata } from "next";
import { HomePreview } from "@/components/home/HomePreview";
import { getHomepagePreviewData } from "@/lib/homepage/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Homepage — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function HomePreviewPage() {
  const { live, defaults } = await getHomepagePreviewData();
  return <HomePreview live={live} defaults={defaults} />;
}
