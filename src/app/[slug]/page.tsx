import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, MapPin, ArrowRight, CheckCircle, Calculator } from "lucide-react";
import { jakartaCityMap, getRegionLabel } from "@/lib/data/jakartaCities";
import { cityArticles } from "@/lib/data/cityArticles";
import { CekOngkirForm } from "@/components/CekOngkirForm";
import { fetchPricing } from "@/lib/sheets";
import { buildDestinationMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

const BASE_URL = "https://bjalogistic.id";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(jakartaCityMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = jakartaCityMap[slug];
  if (!entry) return {};

  const city = entry.displayName;
  const isTimur = entry.region !== "jawa";
  const canonical = `${BASE_URL}/${slug}`;

  const title = isTimur
    ? `Ekspedisi Jakarta ${city} — Cargo Terpercaya & Terjangkau | BJA Logistic`
    : `Cargo Jakarta ${city} | BJA Logistic`;
  const description = isTimur
    ? `Jasa ekspedisi cargo dari Jakarta ke ${city}, ${getRegionLabel(entry.region)}. Layanan cargo laut, darat & udara. Door to door dari Jabodetabek & Surabaya. Cek harga sekarang.`
    : `Cek ongkir dan layanan ekspedisi Jakarta ${city}. BJA Logistic spesialis cargo ke Indonesia Timur — Papua, Maluku, NTT, dan Sulawesi.`;

  return {
    title,
    description,
    keywords: [
      `ekspedisi jakarta ${city.toLowerCase()}`,
      `cargo jakarta ${city.toLowerCase()}`,
      `ongkir jakarta ${city.toLowerCase()}`,
      `kirim barang jakarta ${city.toLowerCase()}`,
    ],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  };
}

const cargoRegionLabels: Record<string, string> = {
  papua: "Papua & Papua Barat",
  maluku: "Maluku & Maluku Utara",
  ntt: "Nusa Tenggara Timur",
  sulawesi: "Sulawesi",
};

export default async function JakartaCityPage({ params }: Props) {
  const { slug } = await params;
  const entry = jakartaCityMap[slug];
  if (!entry) notFound();

  const rows = await fetchPricing();
  const city = entry.displayName;
  const isTimur = entry.region !== "jawa";
  const canonical = `${BASE_URL}/${slug}`;

  const defaultValues = entry.ongkirValue
    ? { from: "jabodetabek", to: entry.ongkirValue, toLabel: entry.ongkirLabel, weight: "100", service: "Regular" as const }
    : undefined;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Beranda", url: BASE_URL },
        { name: `Jakarta ${city}`, url: canonical },
      ]} />

      {/* Hero */}
      <div className={`py-8 px-4 ${isTimur ? "bg-[#CC1F2A]" : "bg-[#1A1A1A]"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-[#F5C518]" />
            <span className="text-white/60 text-sm">
              {isTimur ? getRegionLabel(entry.region) : "Jawa"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
            Ekspedisi Cargo Jakarta → {city}
          </h1>
          <p className="text-white/70 text-sm mb-5 max-w-xl">
            {isTimur
              ? `Layanan pengiriman cargo dari Jakarta ke ${city} via laut, darat & udara. Door to door, terpercaya 10+ tahun.`
              : `Jasa ekspedisi dan cargo dari Jakarta ke ${city} dan sekitarnya.`}
          </p>
          <div className="flex flex-wrap gap-3">
            {isTimur && entry.ongkirValue && (
              <WALink
                href={buildDestinationMessage(city)}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-5 py-3 rounded-xl transition-all text-sm"
              >
                <MessageCircle size={16} />
                Tanya Harga ke {city}
              </WALink>
            )}
            {isTimur && entry.cargoRegion && (
              <Link
                href={`/cargo/${entry.cargoRegion}`}
                className="flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-5 py-3 rounded-xl transition-all text-sm"
              >
                Info Lengkap {cargoRegionLabels[entry.cargoRegion] ?? entry.cargoRegion}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* Cek Ongkir Form */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={18} className="text-[#CC1F2A]" />
            <h2 className="text-lg font-black text-[#111]">
              {entry.ongkirValue ? `Cek Harga Cargo Jakarta → ${city}` : "Kalkulator Ongkir Cargo"}
            </h2>
          </div>
          <CekOngkirForm
            rows={rows}
            defaultValues={defaultValues}
            autoCalculate={!!entry.ongkirValue}
          />
        </section>

        {/* Indonesia Timur: tambahan info region */}
        {isTimur && entry.cargoRegion && (
          <section className="bg-[#F8FAFC] rounded-2xl p-7">
            <h2 className="text-xl font-black text-[#111] mb-4">
              Mengapa Pilih BJA untuk Pengiriman ke {city}?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "10+ Tahun Pengalaman", desc: `Melayani rute Jakarta → ${city} dan seluruh ${getRegionLabel(entry.region)} sejak lebih dari satu dekade.` },
                { title: "Jaringan Agen Lokal", desc: `Mitra dan agen lokal di ${getRegionLabel(entry.region)} memastikan barang sampai ke tujuan akhir.` },
                { title: "Tracking Pengiriman", desc: "Pantau status kiriman kapan saja via WhatsApp atau halaman tracking kami." },
                { title: "Multi-moda Transport", desc: "Cargo laut (paling hemat), darat, maupun udara (paling cepat) tersedia sesuai kebutuhan." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <CheckCircle size={17} className="text-[#CC1F2A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#111] text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Jawa: redirect ke cek ongkir */}
        {!isTimur && (
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-7 text-center">
            <p className="font-black text-[#111] mb-2">BJA Logistic — Spesialis Indonesia Timur</p>
            <p className="text-gray-600 text-sm mb-4">
              Kami spesialis cargo ke Papua, Maluku, NTT, dan Sulawesi. Untuk rute Jakarta →{" "}
              {city}, gunakan kalkulator di atas atau hubungi kami langsung.
            </p>
            <WALink
              href={buildDestinationMessage(city)}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <MessageCircle size={15} />
              Tanya Harga via WhatsApp
            </WALink>
          </section>
        )}

        {/* Artikel konten per kota */}
        {cityArticles[slug] && (
          <section className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {cityArticles[slug]}
          </section>
        )}

        {/* CTA */}
        {isTimur && (
          <div className="bg-[#CC1F2A] rounded-2xl p-7 text-center">
            <h2 className="text-lg font-black text-white mb-2">Siap Kirim ke {city}?</h2>
            <p className="text-white/70 text-sm mb-5">
              Chat tim BJA Logistic — konfirmasi harga, jadwal, dan booking dalam satu percakapan.
            </p>
            <WALink
              href={buildDestinationMessage(city)}
              className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-7 py-3.5 rounded-xl transition-all text-sm"
            >
              <MessageCircle size={16} />
              Chat Sekarang — Kirim ke {city}
            </WALink>
          </div>
        )}
      </div>
    </>
  );
}
