// src/lib/cargoHero.ts
//
// Ambil konten hero halaman /cargo/{region} dari CRM (bja_settings key
// 'cargo_hero_images'), lewat endpoint public-cargo-hero.php.
//
// Update Agustus 2026: sebelumnya cuma gambar+alt. Sekarang CRM (menu
// Hero Cargo) juga bisa isi judul besar (tagline), deskripsi, dan badge
// info (stats) — field ini OPSIONAL, kalau kosong di CRM maka halaman
// tetap pakai teks default dari lib/data/regions.ts (lihat cargo/[region]/page.tsx,
// yang pakai `heroImage?.tagline || config.tagline` dst).

export interface CargoHeroStat {
  value: string;
  label: string;
}

export interface CargoHeroImage {
  image: string;
  alt?: string;
  tagline?: string;
  description?: string;
  stats?: CargoHeroStat[];
  // ── SEO on-page (Agustus 2026) — diedit dari CRM menu "Hero Cargo" ──
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  seoFocusKeyword?: string;
  seoOgImage?: string;
}

const CRM_BASE_URL = process.env.CRM_API_URL ?? "https://invoice.bjalogistic.id";
const CRM_API_KEY = process.env.CRM_PUBLIC_API_KEY ?? "";

export async function getCargoHeroImage(region: string): Promise<CargoHeroImage | null> {
  try {
    const res = await fetch(
      `${CRM_BASE_URL}/public-cargo-hero.php?region=${encodeURIComponent(region)}`,
      {
        headers: { "X-API-Key": CRM_API_KEY },
        next: { revalidate: 300 }, signal: AbortSignal.timeout(3000), // cache 5 menit, sama pola dgn halaman blog/service pages
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}
