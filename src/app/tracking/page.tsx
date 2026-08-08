import { Suspense } from "react";
import Image from "next/image";
import { Package, Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { TrackingClient } from "@/components/TrackingClient";
import { getPageHero } from "@/lib/pageHero";

export const metadata: Metadata = {
  title: "Tracking Resi | BJA Logistic",
  description: "Cek status pengiriman Anda dengan nomor resi BJA Logistic.",
};

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
      {/* Header */}
      <div className={`relative overflow-hidden py-8 px-4 ${hero?.image ? "" : "bg-[#CC1F2A]"}`}>
        {hero?.image && (
          <>
            <div className="absolute inset-0">
              <Image src={hero.image} alt={hero.alt || "Tracking Pengiriman"} fill priority sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-[#CC1F2A]/80" />
          </>
        )}
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center mx-auto mb-3">
            <Package size={20} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mb-1.5">
            {hero?.tagline || "Tracking Pengiriman"}
          </h1>
          <p className="text-white/70 text-sm">
            {hero?.description || "Cek status pengiriman Anda dengan nomor resi"}
          </p>
          {hero?.stats && hero.stats.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
              {hero.stats.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">
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
