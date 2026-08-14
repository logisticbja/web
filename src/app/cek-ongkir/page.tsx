import { Metadata } from "next";
import Image from "next/image";
import { Calculator, Ship, Truck, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchPricing } from "@/lib/sheets";
import { CekOngkirForm } from "@/components/CekOngkirForm";
import { getPageHero } from "@/lib/pageHero";

const BASE_URL = "https://bjalogistic.id";
const DEFAULT_TITLE = "Cek Ongkir — Kalkulator Biaya Pengiriman";
const DEFAULT_DESCRIPTION = "Hitung estimasi ongkos kirim cargo ke Papua, Maluku, NTT, dan Sulawesi. Layanan Express dan Regular. Langsung konfirmasi via WhatsApp.";

// generateMetadata (bukan `export const metadata` statis) — supaya bisa ambil
// override SEO dari CRM (menu Hero Halaman > Cek Ongkir > bagian SEO).
// Bug yang diperbaiki Agustus 2026: sebelumnya gak ada openGraph/twitter di
// sini, jadi kartu preview link (WhatsApp/FB) nampilin punya Homepage,
// bukan punya halaman Cek Ongkir sendiri.
export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageHero("cek-ongkir");
  const title = hero?.seoMetaTitle || DEFAULT_TITLE;
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
  const rows = await fetchPricing();
  // Konten hero (gambar/judul/deskripsi/badge) opsional dari CRM — menu "Hero
  // Halaman" > Cek Ongkir. Kosongkan di CRM untuk tetap pakai teks default.
  const hero = await getPageHero("cek-ongkir");
  const badges = hero?.stats && hero.stats.length > 0
    ? hero.stats.map((s) => (s.value ? `${s.value}: ${s.label}` : s.label))
    : ["Regular: min. 100 kg", "Express: min. 100 kg"];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header — ukuran & gaya disamakan dengan hero /layanan/{slug} & /cargo/{region}. */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[220px] aspect-[1470/437] flex items-center">
        {hero?.image && (
          <>
            <div className="absolute inset-0">
              <Image src={hero.image} alt={hero.alt || "Cek Ongkir"} fill priority sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          </>
        )}
        <div className="relative max-w-3xl mx-auto text-center px-4 w-full min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F5C518] flex items-center justify-center mx-auto mb-5">
            <Calculator size={30} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
            {hero?.tagline || "Kalkulator Ongkir"}
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            {hero?.description || "Hitung estimasi biaya pengiriman ke Papua & Indonesia Timur dalam detik"}
          </p>
          <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
            {badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <CekOngkirForm rows={rows} />

        {/* Rute Populer */}
        <div className="mt-8 mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Rute Populer</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Papua", slug: "papua", transit: "4–9 hari", cities: "Sorong, Jayapura, Manokwari" },
              { label: "Maluku", slug: "maluku", transit: "3–6 hari", cities: "Ambon, Ternate, Tual" },
              { label: "NTT", slug: "ntt", transit: "3–5 hari", cities: "Kupang, Flores, Ende" },
              { label: "Sulawesi", slug: "sulawesi", transit: "2–5 hari", cities: "Makassar, Kendari, Palu" },
            ].map((r) => (
              <Link
                key={r.slug}
                href={`/cargo/${r.slug}`}
                className="group bg-white rounded-xl border border-gray-100 hover:border-[#CC1F2A]/40 hover:shadow-md p-4 transition-all flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#111] text-sm">{r.label}</span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#CC1F2A] transition-colors" />
                </div>
                <p className="text-[11px] text-gray-400 leading-snug">{r.cities}</p>
                <span className="text-[10px] font-bold text-[#CC1F2A] bg-red-50 px-2 py-0.5 rounded-full self-start mt-auto">
                  {r.transit}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Ship, title: "Cargo Laut — Regular", desc: "Paling hemat untuk muatan besar. Minimum 100 kg per pengiriman." },
            { icon: Truck, title: "Cargo Darat", desc: "Tersedia untuk rute tertentu via angkutan darat. Minimum 100 kg." },
            { icon: Zap, title: "Express", desc: "Layanan prioritas, lebih cepat sampai. Minimum 10 kg per pengiriman." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100 flex gap-3">
              <item.icon size={20} className="text-[#CC1F2A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#111111] text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
