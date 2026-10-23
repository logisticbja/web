import type { Metadata } from "next";
import { TrackingView } from "@/components/tools/TrackingView";
import { getPageHero } from "@/lib/pageHero";
import { stripBrand } from "@/lib/seoTitle";

const BASE_URL = "https://bjalogistic.id";
const DEFAULT_TITLE = "Tracking Resi";
const DEFAULT_DESCRIPTION = "Cek status pengiriman Anda dengan nomor resi BJA Logistic.";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageHero("tracking");
  const title = stripBrand(hero?.seoMetaTitle) || DEFAULT_TITLE;
  const description = hero?.seoMetaDescription || DEFAULT_DESCRIPTION;
  const canonical = `${BASE_URL}/tracking`;
  const ogImage = hero?.seoOgImage || hero?.image || "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: canonical, images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function TrackingPage() {
  const hero = await getPageHero("tracking");
  return <TrackingView hero={hero} />;
}
