import { Suspense } from "react";
import Image from "next/image";
import { Package, Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { TrackingClient } from "@/components/TrackingClient";
import { getPageHero } from "@/lib/pageHero";

const BASE_URL = "https://bjalogistic.id";
const DEFAULT_TITLE = "Tracking Resi";
const DEFAULT_DESCRIPTION = "Cek status pengiriman Anda dengan nomor resi BJA Logistic.";

// generateMetadata (bukan `export const metadata` statis) — supaya bisa ambil
// override SEO dari CRM (menu Hero Halaman > Tracking > bagian SEO).
// Catatan bug yang diperbaiki Agustus 2026: title SEBELUMNYA sudah menulis
// manual "| BJA Logistic" di akhir, padahal root layout.tsx juga otomatis
// nambahin itu lewat title template — jadinya dobel di tab browser.
// `noindex` sengaja dipertahankan — halaman cek resi memang gak perlu
// masuk index Google (konten personal per-resi, gak ada nilai SEO).
export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageHero("tracking");
  const title = hero?.seoMetaTitle || DEFAULT_TITLE;
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

function TrackingFallback() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
      <Loader2 size={28} className="animate-spin text-[#CC1F2A]" />
    </div>
  );
}

export default async function TrackingPage() {
  // Konten hero (gambar/judul/deskripsi/badge) opsional dari CRM — menu "Hero
  // Halaman" > Tracking. Kosongkan di CRM untuk tetap pakai teks default.
  const hero = await getPageHero("tracking");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header — ukuran & gaya disamakan dengan hero /layanan/{slug} & /cargo/{region}. */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[220px] aspect-[1470/437] flex items-center">
        {hero?.image && (
          <>
            <div className="absolute inset-0">
              <Image src={hero.image} alt={hero.alt || "Tracking Pengiriman"} fill priority sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          </>
        )}
        <div className="relative max-w-3xl mx-auto text-center px-4 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F5C518] flex items-center justify-center mx-auto mb-5">
            <Package size={30} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
            {hero?.tagline || "Tracking Pengiriman"}
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            {hero?.description || "Cek status pengiriman Anda dengan nomor resi"}
          </p>
          {hero?.stats && hero.stats.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
              {hero.stats.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {s.value ? `${s.value} ${s.label}` : s.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <Suspense fallback={<TrackingFallback />}>
        <TrackingClient />
      </Suspense>
    </div>
  );
}
