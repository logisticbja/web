import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ChevronRight, ArrowRight, Ship, Truck, Plane } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const BASE_URL = "https://bjalogistic.id";

const cargoServices = [
  {
    slug: "cargo-laut",
    icon: Ship,
    name: "Cargo Laut",
    tagline: "Paling hemat untuk barang berat & besar",
    price: "Mulai Rp 6.000/kg",
    eta: "14–20 hari",
  },
  {
    slug: "cargo-darat",
    icon: Truck,
    name: "Cargo Darat",
    tagline: "Seimbang antara kecepatan dan harga",
    price: "Mulai Rp 7.000/kg",
    eta: "7–14 hari",
  },
  {
    slug: "cargo-udara",
    icon: Plane,
    name: "Cargo Udara",
    tagline: "Tercepat untuk kebutuhan urgent",
    price: "Mulai Rp 20.000/kg",
    eta: "2–4 hari",
  },
];

export const metadata: Metadata = {
  title: "Kirim Barang Kargo ke Papua & Indonesia Timur | BJA Logistic",
  description:
    "Pilih layanan kirim barang kargo ke Papua, Maluku, NTT & Sulawesi: cargo laut, darat, atau udara. Bandingkan harga dan estimasi waktu, pesan via WhatsApp.",
  alternates: { canonical: `${BASE_URL}/layanan/kirim-barang-kargo` },
  openGraph: {
    title: "Kirim Barang Kargo ke Papua & Indonesia Timur",
    description:
      "Bandingkan cargo laut, darat, dan udara untuk kirim barang kargo ke Indonesia Timur.",
    url: `${BASE_URL}/layanan/kirim-barang-kargo`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function KirimBarangKargoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: BASE_URL },
          { name: "Layanan", url: `${BASE_URL}/layanan/kirim-barang-kargo` },
          { name: "Kirim Barang Kargo", url: `${BASE_URL}/layanan/kirim-barang-kargo` },
        ]}
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[428px] flex items-end w-full overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://assets.bjalogistic.id/blog/2026/09/4c30d03f37182e90dc2b.jpg"
              alt="Kirim Barang Kargo ke Papua & Indonesia Timur"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-12 w-full min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <ChevronRight size={13} />
              <span className="text-white font-semibold">Kirim Barang Kargo</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 max-w-xl">
              Kirim Barang Kargo ke Papua & Indonesia Timur
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-lg leading-relaxed">
              Pilih metode pengiriman sesuai kebutuhan dan budget kamu — laut, darat, atau udara.
              Minimum pengiriman 100 kg untuk cargo laut & darat.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {cargoServices.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/layanan/${s.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#CC1F2A]/30 transition-all p-6 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#CC1F2A]" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900 mb-1">{s.name}</h2>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{s.tagline}</p>

                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-4">
                    <span>{s.price}</span>
                    <span>{s.eta}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#CC1F2A] group-hover:gap-2.5 transition-all">
                    Lihat detail
                    <ArrowRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
