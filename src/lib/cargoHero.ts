// src/lib/cargoHero.ts
//
// Ambil gambar hero halaman /cargo/{region} dari CRM (bja_settings key
// 'cargo_hero_images'), lewat endpoint public-cargo-hero.php.
//
// PENTING: sesuaikan CRM_BASE_URL dan header API key dengan yang sudah
// dipakai di lib/servicePages.ts atau lib/blog.ts kamu — supaya konsisten
// (base URL & nama env var kemungkinan sudah didefinisikan di sana).
// Kalau kamu paste isi salah satu file itu, aku sesuaikan persis.

export interface CargoHeroImage {
  image: string;
  alt?: string;
}

const CRM_BASE_URL = process.env.CRM_API_URL ?? "https://invoice.bjalogistic.id";
const CRM_API_KEY = process.env.CRM_PUBLIC_API_KEY ?? "";

export async function getCargoHeroImage(region: string): Promise<CargoHeroImage | null> {
  try {
    const res = await fetch(
      `${CRM_BASE_URL}/public-cargo-hero.php?region=${encodeURIComponent(region)}`,
      {
        headers: { "X-API-Key": CRM_API_KEY },
        next: { revalidate: 300 }, // cache 5 menit, sama pola dgn halaman blog/service pages
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}
