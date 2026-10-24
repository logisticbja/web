import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { LayananView } from "@/components/tools/LayananView";
import { loadLayanan } from "@/lib/sitePages/fetch";
import { LAYANAN_DEFAULTS, LAYANAN_OG_DESCRIPTION } from "@/lib/sitePages/layanan";
import { stripBrand } from "@/lib/seoTitle";

const BASE_URL = "https://bjalogistic.id";

export async function generateMetadata(): Promise<Metadata> {
  const { live } = await loadLayanan();
  const title = stripBrand(live.seo.title) || LAYANAN_DEFAULTS.seo.title;
  const description = live.seo.description;
  const ogDescription = description === LAYANAN_DEFAULTS.seo.description ? LAYANAN_OG_DESCRIPTION : description;
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/layanan/kirim-barang-kargo` },
    openGraph: {
      title,
      description: ogDescription,
      url: `${BASE_URL}/layanan/kirim-barang-kargo`,
      images: [{ url: live.seo.ogImage || "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function KirimBarangKargoPage() {
  const { live } = await loadLayanan();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: BASE_URL },
          { name: "Layanan", url: `${BASE_URL}/layanan/kirim-barang-kargo` },
          { name: "Kirim Barang Kargo", url: `${BASE_URL}/layanan/kirim-barang-kargo` },
        ]}
      />
      <LayananView content={live} />
    </>
  );
}
