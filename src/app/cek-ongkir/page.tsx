import { Metadata } from "next";
import { CekOngkirView } from "@/components/tools/CekOngkirView";
import { getPageHero } from "@/lib/pageHero";
import { stripBrand } from "@/lib/seoTitle";

const BASE_URL = "https://bjalogistic.id";
const DEFAULT_TITLE = "Cek Ongkir — Kalkulator Biaya Pengiriman";
const DEFAULT_DESCRIPTION = "Hitung estimasi ongkos kirim cargo ke Papua, Maluku, NTT, dan Sulawesi. Layanan Express dan Regular. Langsung konfirmasi via WhatsApp.";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageHero("cek-ongkir");
  const title = stripBrand(hero?.seoMetaTitle) || DEFAULT_TITLE;
  const description = hero?.seoMetaDescription || DEFAULT_DESCRIPTION;
  const canonical = `${BASE_URL}/cek-ongkir`;
  const ogImage = hero?.seoOgImage || hero?.image || "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function CekOngkirPage() {
  const hero = await getPageHero("cek-ongkir");
  return <CekOngkirView hero={hero} />;
}
