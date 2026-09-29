import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Package,
  Ship,
  Scale,
} from "lucide-react";
import {
  destinationCities,
  destinationValueToSlug,
} from "@/lib/data/pricing";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Ekspedisi Cargo ke Indonesia Timur | BJA Logistic",
  description:
    "Kirim cargo dari Jabodetabek dan Surabaya ke Papua, Maluku, NTT, dan Sulawesi bersama BJA Logistic. Minimum pengiriman 100 kg. Pilih kota tujuan untuk melihat tarif, layanan, dan estimasi pengiriman.",
  alternates: {
    canonical: "https://bjalogistic.id/kirim-ke",
  },
  openGraph: {
    title: "Ekspedisi Cargo ke Indonesia Timur | BJA Logistic",
    description:
      "Pilih kota tujuan pengiriman cargo ke Papua, Maluku, NTT, dan Sulawesi bersama BJA Logistic.",
    url: "https://bjalogistic.id/kirim-ke",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekspedisi Cargo ke Indonesia Timur | BJA Logistic",
    description:
      "Pilih kota tujuan pengiriman cargo ke Papua, Maluku, NTT, dan Sulawesi bersama BJA Logistic.",
    images: ["/og-image.png"],
  },
};

const REGION_ORDER = ["Papua", "Maluku", "NTT", "Sulawesi"];

export default function KirimKePage() {
  const groupedCities = REGION_ORDER.map((region) => ({
    region,
    cities: destinationCities
      .filter(
        (city) =>
          city.region?.toLowerCase() === region.toLowerCase()
      )
      .sort((a, b) => a.label.localeCompare(b.label, "id")),
  })).filter((group) => group.cities.length > 0);

  const totalDestinations = groupedCities.reduce(
    (total, group) => total + group.cities.length,
    0
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "https://bjalogistic.id" },
          {
            name: "Kirim ke",
            url: "https://bjalogistic.id/kirim-ke",
          },
        ]}
      />

      {/* HERO */}
      <section className="bg-[#CC1F2A] px-4 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-5">
              <Link
                href="/"
                className="hover:text-white transition-colors"
              >
                Beranda
              </Link>

              <span>›</span>

              <span className="text-white font-semibold">
                Tujuan Pengiriman
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-5">
              <MapPin size={15} className="text-[#F5C518]" />
              <span className="text-white text-sm font-semibold">
                Papua • Maluku • NTT • Sulawesi
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">
              Ekspedisi Cargo ke
              <br />
              Indonesia Timur
            </h1>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Kirim barang dari Jabodetabek dan Surabaya ke berbagai kota
              di Indonesia Timur bersama BJA Logistic. Pilih kota tujuan
              untuk melihat tarif, layanan yang tersedia, dan estimasi
              pengiriman.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/cek-ongkir"
                className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-6 py-3.5 rounded-xl transition-all"
              >
                Cek Ongkir
                <ArrowRight size={17} />
              </Link>

              <a
                href="#daftar-tujuan"
                className="inline-flex items-center gap-2 border-2 border-white/25 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
              >
                Lihat Kota Tujuan
                <MapPin size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMASI UTAMA */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center shrink-0">
                <Scale size={20} className="text-[#CC1F2A]" />
              </div>

              <div>
                <p className="font-black text-[#111111]">
                  Minimum 100 kg
                </p>
                <p className="text-sm text-gray-500">
                  Untuk setiap pengiriman cargo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center shrink-0">
                <Ship size={20} className="text-[#CC1F2A]" />
              </div>

              <div>
                <p className="font-black text-[#111111]">
                  Reguler & Express
                </p>
                <p className="text-sm text-gray-500">
                  Ketersediaan mengikuti kota tujuan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center shrink-0">
                <Package size={20} className="text-[#CC1F2A]" />
              </div>

              <div>
                <p className="font-black text-[#111111]">
                  {totalDestinations} Tujuan
                </p>
                <p className="text-sm text-gray-500">
                  Dalam master rute BJA Logistic
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR KOTA */}
      <main
        id="daftar-tujuan"
        className="max-w-5xl mx-auto px-4 py-14 sm:py-16"
      >
        <div className="mb-10">
          <p className="font-bold text-[#CC1F2A] text-sm uppercase tracking-wide mb-2">
            Tujuan Pengiriman
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mb-3">
            Pilih Kota Tujuan Anda
          </h2>

          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Pilih wilayah dan kota tujuan untuk melihat tarif per kg,
            layanan Reguler atau Express yang tersedia, serta estimasi
            pengiriman berdasarkan rute tersebut.
          </p>
        </div>

        <div className="space-y-12">
          {groupedCities.map((group) => (
            <section
              key={group.region}
              aria-labelledby={`region-${group.region.toLowerCase()}`}
            >
              <div className="flex items-end justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#CC1F2A] flex items-center justify-center">
                    <MapPin size={17} className="text-white" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                      Wilayah
                    </p>

                    <h2
                      id={`region-${group.region.toLowerCase()}`}
                      className="text-xl font-black text-[#111111]"
                    >
                      {group.region}
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full shrink-0">
                  {group.cities.length} tujuan
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.cities.map((city) => (
                  <Link
                    key={city.value}
                    href={`/kirim-ke/${destinationValueToSlug(
                      city.value
                    )}`}
                    className="group flex items-center justify-between gap-3 bg-white border border-gray-200 hover:border-[#CC1F2A] rounded-xl px-4 py-4 transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <MapPin
                        size={16}
                        className="text-[#CC1F2A] shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="font-bold text-[#111111] group-hover:text-[#CC1F2A] transition-colors">
                          Ekspedisi ke {city.label}
                        </p>

                        <p className="text-xs text-gray-400 mt-0.5">
                          {group.region}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      size={15}
                      className="text-gray-300 group-hover:text-[#CC1F2A] group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Catatan:</strong> Ketersediaan layanan dan estimasi
            berbeda untuk setiap kota tujuan. Estimasi dihitung sejak kapal
            berangkat dari pelabuhan asal. Pastikan konfirmasi jadwal kapal
            terdekat ke CS BJA Logistic sebelum melakukan pengiriman.
          </p>
        </div>
      </main>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto bg-[#F8FAFC] border border-gray-100 rounded-3xl px-6 py-10 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mb-3">
            Ingin Cek Tarif Kota Tujuan?
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto mb-6">
            Gunakan kalkulator ongkir untuk memilih kota, layanan, dan berat
            pengiriman. Tarif dan estimasi akan mengikuti master rute BJA
            Logistic.
          </p>

          <Link
            href="/cek-ongkir"
            className="inline-flex items-center gap-2 bg-[#CC1F2A] hover:bg-[#B11924] text-white font-black px-7 py-3.5 rounded-xl transition-all"
          >
            Cek Ongkir Sekarang
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
