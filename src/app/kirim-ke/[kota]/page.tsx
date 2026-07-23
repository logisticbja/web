import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Clock, Ship, Zap, CheckCircle, ArrowRight, MapPin } from "lucide-react";
import { destinationCities, calculatePrice, cityLautPricing, formatPrice } from "@/lib/data/pricing";
import { buildDestinationMessage, buildOngkirMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

function toSlug(value: string) {
  return value.replace(/_/g, "-");
}
function fromSlug(slug: string) {
  return slug.replace(/-/g, "_");
}

export function generateStaticParams() {
  return destinationCities.map((city) => ({ kota: toSlug(city.value) }));
}

type Props = { params: Promise<{ kota: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota } = await params;
  const city = destinationCities.find((c) => c.value === fromSlug(kota));
  if (!city) return {};

  const laut = calculatePrice(city.value, "laut", 1);
  const priceStr = `Rp ${laut.priceMin.toLocaleString("id-ID")}–${laut.priceMax.toLocaleString("id-ID")}/kg`;

  const canonical = `https://bjalogistic.id/kirim-ke/${kota}`;
  const title = `Cargo ke ${city.label} — ${priceStr} | BJA Logistic`;
  const description = `Jasa ekspedisi cargo ke ${city.label}, ${city.region}. Cargo laut ${priceStr}, estimasi ${laut.etaMin}–${laut.etaMax} hari. Door to door Jabodetabek & Surabaya. Hubungi BJA Logistic.`;

  return {
    title,
    description,
    keywords: [
      `cargo ke ${city.label.toLowerCase()}`,
      `ekspedisi ${city.label.toLowerCase()}`,
      `kirim barang ke ${city.label.toLowerCase()}`,
      `ongkir ke ${city.label.toLowerCase()}`,
      `ekspedisi ${city.region.toLowerCase()} ${city.label.toLowerCase()}`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

const serviceInfo = [
  {
    type: "reguler" as const,
    label: "Cargo Reguler",
    icon: Ship,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    highlights: ["Kapal Roro & PELNI", "Harga paling ekonomis", "Cocok barang berat & besar", "Tracking real-time"],
  },
  {
    type: "express" as const,
    label: "Cargo Express",
    icon: Zap,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    highlights: ["Lebih cepat sampai", "Prioritas muat kapal", "Cocok barang urgent", "Tracking real-time"],
  },
];

export default async function KirimKePage({ params }: Props) {
  const { kota } = await params;
  const city = destinationCities.find((c) => c.value === fromSlug(kota));
  if (!city) notFound();

  const relatedCities = destinationCities
    .filter((c) => c.region === city.region && c.value !== city.value)
    .slice(0, 5);

  const faqs = [
    {
      q: `Berapa ongkir ke ${city.label}?`,
      a: `Ongkir ke ${city.label} mulai dari Rp ${(cp.regulerPrice ?? cp.expressPrice).toLocaleString("id-ID")}/kg untuk layanan Reguler, dan Rp ${cp.expressPrice.toLocaleString("id-ID")}/kg untuk layanan Express (min. 100 kg). Harga final tergantung berat aktual dan dimensi barang.`,
    },
    {
      q: `Berapa lama pengiriman ke ${city.label}?`,
      a: `Estimasi waktu pengiriman ke ${city.label}: Reguler ${cp.regulerEtaMin ?? cp.expressEtaMin}–${cp.regulerEtaMax ?? cp.expressEtaMax} hari, Express ${cp.expressEtaMin}–${cp.expressEtaMax} hari, dihitung sejak kapal berangkat dari pelabuhan asal. Waktu dapat bervariasi tergantung jadwal kapal dan kondisi cuaca.`,
    {
      q: `Apakah tersedia layanan door to door ke ${city.label}?`,
      a: `Ya, kami menyediakan layanan jemput barang langsung dari lokasi Anda di Jabodetabek dan Surabaya. Untuk pengantaran ke ${city.label}, tersedia untuk area tertentu — hubungi CS kami untuk konfirmasi.`,
    },
    {
      q: `Apa saja barang yang bisa dikirim ke ${city.label}?`,
      a: `Hampir semua jenis barang: sembako, elektronik, material bangunan, perabotan, mesin industri, alat pertanian, pakaian, dan barang dagangan umum. Untuk barang khusus (B3, senjata, dll), hubungi kami terlebih dahulu.`,
    },
    {
      q: `Apakah ada asuransi pengiriman ke ${city.label}?`,
      a: `Ya, asuransi pengiriman tersedia untuk semua layanan. Biaya asuransi dihitung dari nilai barang yang diasuransikan. Sangat direkomendasikan untuk barang elektronik, mesin, dan barang bernilai tinggi.`,
    },
  ];

  const lautPrice = calculatePrice(city.value, "laut", 1);
  const cp = cityLautPricing[city.value];

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Beranda", url: "https://bjalogistic.id" },
        { name: "Kirim ke", url: "https://bjalogistic.id" },
        { name: city.label, url: `https://bjalogistic.id/kirim-ke/${kota}` },
      ]} />

      {/* Hero */}
      <div className="bg-[#CC1F2A] py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/60 text-sm">Tujuan</span>
            <span className="text-white/40 text-sm">›</span>
            <span className="text-[#F5C518] text-sm font-semibold">{city.region}</span>
            <span className="text-white/40 text-sm">›</span>
            <span className="text-white text-sm font-bold">{city.label}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#1A1A1A]" />
                </div>
                <span className="text-white/70 text-sm font-semibold">{city.region}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                Ekspedisi Cargo<br />ke {city.label}
              </h1>
              <p className="text-white/70 text-sm mb-5">
                Pengiriman cargo ke {city.label} mulai dari{" "}
                <strong className="text-[#F5C518]">
                  {formatPrice(lautPrice.priceMin)}/kg
                </strong>{" "}
                via cargo laut. Door to door dari Jabodetabek & Surabaya.
              </p>
              <div className="flex flex-wrap gap-3">
                <WALink
                  href={buildDestinationMessage(city.label)}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-6 py-3.5 rounded-xl transition-all hover:shadow-lg text-base"
                >
                  <MessageCircle size={18} />
                  Tanya Harga ke {city.label}
                </WALink>
                <Link
                  href="/cek-ongkir"
                  className="flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-bold px-6 py-3.5 rounded-xl transition-all text-base"
                >
                  Hitung Ongkir <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Price snippet */}
            <div className="sm:shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:w-52">
              <p className="text-white/60 text-xs mb-3 uppercase tracking-wide font-semibold">Estimasi harga</p>
              {[
                { label: "Reguler", price: cp.regulerPrice ?? cp.expressPrice, icon: "🚢" },
                { label: "Express", price: cp.expressPrice, icon: "⚡" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                  <span className="text-white/70 text-sm">{s.icon} {s.label}</span>
                  <span className="text-white font-bold text-sm">
                    Rp {s.price.toLocaleString("id-ID")}/kg
                  </span>
                  </div>
                ))}
              <p className="text-white/40 text-xs mt-3">*Estimasi. Konfirmasi via WA.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">

        {/* Pricing cards */}
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-2">Pilih Layanan ke {city.label}</h2>
          <p className="text-gray-500 mb-8">Estimasi harga berdasarkan tarif per kg. Harga final menyesuaikan berat & volume aktual.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
           {serviceInfo.map((svc) => {
             const isExpress = svc.type === "express";
             const price = isExpress
             ? { min: cp.expressPrice, etaMin: cp.expressEtaMin, etaMax: cp.expressEtaMax }
             : { min: cp.regulerPrice ?? cp.expressPrice, etaMin: cp.regulerEtaMin ?? cp.expressEtaMin, etaMax: cp.regulerEtaMax ?? cp.expressEtaMax };
             const waMsg = buildOngkirMessage("Jabodetabek", city.label, 100, svc.label, formatPrice(price.min * 100));
              return (
                <div key={svc.type} className={`rounded-2xl border-2 p-6 ${svc.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <svc.icon size={22} className={svc.iconColor} />
                    <h3 className="font-black text-[#111111]">{svc.label}</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-2xl font-black text-[#111111]">
                      {formatPrice(price.min)}
                      <span className="text-base font-normal text-gray-500">/kg</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mb-4 text-sm text-gray-600">
                    <Clock size={13} />
                    <span>Estimasi {price.etaMin}–{price.etaMax} hari</span>
                  </div>
                  <ul className="space-y-1.5 mb-5">
                    {svc.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-green-500 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <WALink
                    href={waMsg}
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bc59] text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle size={14} />
                    Pesan {svc.label}
                  </WALink>
                </div>
              );
            })}
          </div>
          })}
          </div>
          <p className="text-gray-400 text-xs mt-4">*Estimasi waktu dihitung sejak kapal berangkat dari pelabuhan asal, bukan sejak barang dipesan/di-pickup.</p>
        </div>
        </div>

        {/* Why BJA for this city */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8">
          <h2 className="text-2xl font-black text-[#111111] mb-6">
            Mengapa Pilih BJA untuk Pengiriman ke {city.label}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "10+ Tahun Pengalaman", desc: `Kami telah melayani pengiriman ke ${city.label} dan seluruh ${city.region} selama lebih dari 10 tahun.` },
              { title: "Jaringan Agen Lokal", desc: `Agen dan mitra lokal di ${city.label} memastikan pengiriman selesai hingga ke alamat tujuan.` },
              { title: "Tracking Real-Time", desc: "Pantau status pengiriman Anda kapan saja via WhatsApp atau halaman tracking kami." },
              { title: "Harga Kompetitif", desc: `Tarif pengiriman ke ${city.label} mulai ${formatPrice(lautPrice.priceMin)}/kg — salah satu yang paling kompetitif.` },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle size={18} className="text-[#CC1F2A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-[#111111] mb-0.5">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related cities */}
        {relatedCities.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Kota Lain di {city.region}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedCities.map((c) => (
                <Link
                  key={c.value}
                  href={`/kirim-ke/${toSlug(c.value)}`}
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#CC1F2A] hover:text-[#CC1F2A] rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all"
                >
                  <MapPin size={13} />
                  Kirim ke {c.label}
                  <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6">
            FAQ Pengiriman ke {city.label}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-[#111111] list-none hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#CC1F2A] rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Siap Kirim Cargo ke {city.label}?</h2>
          <p className="text-white/70 mb-6">Chat WhatsApp sekarang — tim kami konfirmasi harga & jadwal dalam hitungan menit.</p>
          <WALink
            href={buildDestinationMessage(city.label)}
            className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-8 py-4 rounded-xl transition-all hover:shadow-lg text-base"
          >
            <MessageCircle size={18} />
            Chat Sekarang — Kirim ke {city.label}
          </WALink>
        </div>
      </div>
    </>
  );
}
