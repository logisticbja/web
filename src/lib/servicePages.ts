export interface ServicePageDetail {
  title: string;
  desc: string;
}
export interface ServicePageRelated {
  name: string;
  href: string;
}
export interface ServicePageData {
  title: string;
  slug: string;
  icon: string;
  subtitle: string;
  // Gambar banner halaman layanan (opsional — kalau kosong/tidak ada,
  // hero tetap tampil dengan background warna merah polos seperti sebelumnya).
  // Ditambahkan Agustus 2026, sejalan dengan field `imageBanner` yang sudah
  // ada di ServicePageLayout & CRM (menu Halaman Layanan).
  imageBanner?: string;
  description: string;
  priceFrom: string;
  priceNote: string;
  eta: string;
  waLabel: string;
  features: string[];
  details: ServicePageDetail[];
  relatedServices: ServicePageRelated[];
  metaTitle: string;
  metaDescription: string;
}
// GET /public-service-pages.php?slug=<slug> — returns null on 404, API-key
// error, or any network/parse failure, so callers can fall back to
// hardcoded content. Sama pola persis dengan lib/cityPages.ts.
export async function getServicePage(slug: string): Promise<ServicePageData | null> {
  try {
    const url = new URL(process.env.SERVICE_PAGES_API_URL!);
    url.searchParams.set("slug", slug);
    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 300 },
    });
    const json = await res.json();
    if (json.status !== "success") return null;
    return json.data as ServicePageData;
  } catch {
    return null;
  }
}
// GET /public-service-pages.php (tanpa slug) — daftar semua layanan published.
// Dipakai buat generateStaticParams, biar layanan baru dari CRM otomatis
// kebentuk halamannya sendiri tanpa perlu deploy kode baru.
export async function getAllServicePages(): Promise<ServicePageData[]> {
  try {
    const url = new URL(process.env.SERVICE_PAGES_API_URL!);
    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 300 },
    });
    const json = await res.json();
    if (json.status !== "success") return [];
    return (json.data as ServicePageData[]) ?? [];
  } catch {
    return [];
  }
}
