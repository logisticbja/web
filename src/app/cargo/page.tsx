import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, MapPin, ArrowRight, Ship, Zap, Truck, MessageCircle, Calculator, CalendarDays, CheckCircle, Ban } from "lucide-react";
import { regionConfigs, getCitiesByRegion } from "@/lib/data/regions";
import { cityLautPricing, resolveDestinationValue } from "@/lib/data/pricing";
import { BreadcrumbJsonLd, ArticleFaqJsonLd } from "@/components/JsonLd";
import { WALink } from "@/components/ui/WALink";
import { buildGeneralMessage } from "@/lib/whatsapp";
import type { OngkirRegion } from "@/lib/data/ongkir";

const BASE_URL = "https://bjalogistic.id";
const TITLE = "Cargo Indonesia Timur: Papua, Maluku, NTT, Sulawesi";
const DESCRIPTION =
  "Ekspedisi cargo dari Jakarta & Surabaya ke Papua, Maluku, NTT, dan Sulawesi. Mulai Rp7.000/kg, min. 100 kg, via kapal PELNI, kapal cargo & Roro.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/cargo` },
  openGraph: {
    title: `${TITLE} | BJA Logistic`,
    description: DESCRIPTION,
    url: `${BASE_URL}/cargo`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const POPULAR: Record<OngkirRegion, { value: string; label: string }[]> = {
  papua: [
    { value: "jayapura", label: "Jayapura" },
    { value: "sorong", label: "Sorong" },
    { value: "manokwari", label: "Manokwari" },
    { value: "merauke", label: "Merauke" },
    { value: "mimika", label: "Timika (Mimika)" },
    { value: "wamena", label: "Wamena" },
  ],
  maluku: [
    { value: "ambon", label: "Ambon" },
    { value: "ternate", label: "Ternate" },
    { value: "tual", label: "Tual" },
    { value: "dobo", label: "Dobo" },
    { value: "saumlaki", label: "Saumlaki" },
  ],
  ntt: [
    { value: "kupang", label: "Kupang" },
    { value: "labuan-bajo", label: "Labuan Bajo" },
    { value: "maumere", label: "Maumere" },
    { value: "ende", label: "Ende" },
    { value: "atambua", label: "Atambua" },
  ],
  sulawesi: [
    { value: "makassar", label: "Makassar" },
    { value: "manado", label: "Manado" },
    { value: "kendari", label: "Kendari" },
    { value: "palu", label: "Palu" },
    { value: "gorontalo", label: "Gorontalo" },
  ],
};

function rupiah(n: number) {
  return `Rp${n.toLocaleString("id-ID")}`;
}

function regionSummary(region: OngkirRegion) {
  const cities = getCitiesByRegion(region).flatMap((g) => g.cities);
  const prices: number[] = [];
  const etas: number[] = [];
  for (const c of cities) {
    const p = cityLautPricing[resolveDestinationValue(c.value.replace(/-/g, "_"))];
    if (!p) continue;
    if (p.regulerPrice !== null) prices.push(p.regulerPrice);
    if (p.expressPrice !== null) prices.push(p.expressPrice);
    [p.regulerEtaMin, p.regulerEtaMax, p.expressEtaMin, p.expressEtaMax].forEach((e) => {
      if (e !== null) etas.push(e);
    });
  }
  return {
    cityCount: cities.length,
    minPrice: prices.length ? Math.min(...prices) : null,
    etaMin: etas.length ? Math.min(...etas) : null,
    etaMax: etas.length ? Math.max(...etas) : null,
  };
}

const SERVICES_BY_REGION: Record<OngkirRegion, string> = {
  papua: "Reguler & Express",
  maluku: "Reguler & Express",
  ntt: "Roro",
  sulawesi: "Reguler & Express",
};

const SHIPS = [
  {
    icon: Ship,
    name: "Reguler — Kapal Cargo",
    text: "Tarif paling hemat untuk barang besar dan pengiriman rutin yang tidak dikejar waktu, misalnya stok toko, material proyek, atau barang pindahan.",
  },
  {
    icon: Zap,
    name: "Express — Kapal PELNI",
    text: "Lebih cepat karena memakai kapal PELNI, bersama kapal penumpang. Jadwal berangkatnya juga jarang mundur, kecuali ada kendala pada kapalnya sendiri.",
  },
  {
    icon: Truck,
    name: "Roro — Tujuan NTT",
    text: "Pengiriman ke Kupang, Flores, Sumba, dan Timor memakai kapal Roro. Cocok untuk barang besar dan berat dengan tarif yang tetap hemat.",
  },
];

const STEPS = [
  "Chat tim kami lewat WhatsApp: sebutkan jenis barang, perkiraan berat atau ukuran, dan kota tujuan.",
  "Tim kami mengirim penawaran harga dan jadwal kapal terdekat ke kota tujuan.",
  "Barang dijemput dari lokasi Anda di Jabodetabek atau Surabaya, atau Anda antar sendiri ke gudang kami.",
  "Barang ditimbang, diukur, dan dikemas bila perlu, lalu dimuat ke kapal sebelum closing date.",
  "Pantau status pengiriman lewat halaman cek resi sampai barang tiba di alamat penerima.",
];

const FAQS = [
  {
    question: "Wilayah mana saja yang dilayani BJA Logistic di Indonesia Timur?",
    answer:
      "BJA Logistic melayani pengiriman cargo laut ke Papua, Maluku, NTT, dan Sulawesi. Barang dikirim dari Jakarta & sekitarnya (Jabodetabek) atau Surabaya ke lebih dari 100 kota dan kabupaten tujuan.",
  },
  {
    question: "Berapa ongkir cargo ke Indonesia Timur?",
    answer:
      "Ongkir dihitung per kg dan berbeda untuk setiap kota tujuan, mulai Rp7.000/kg dengan minimal pengiriman 100 kg. Tarif tiap kota bisa dicek di halaman wilayah atau lewat kalkulator cek ongkir.",
  },
  {
    question: "Apa bedanya layanan Reguler, Express, dan Roro?",
    answer:
      "Reguler memakai kapal cargo dengan tarif paling hemat. Express memakai kapal PELNI bersama kapal penumpang sehingga lebih cepat, dan jadwal berangkatnya jarang mundur. Roro kami pakai untuk tujuan NTT. Tidak semua kota memiliki semua layanan.",
  },
  {
    question: "Bagaimana cara menghitung berat untuk barang besar tapi ringan?",
    answer:
      "Ongkir dihitung dari berat yang lebih besar antara berat timbangan dan berat volume. Berat volume dihitung dari panjang × lebar × tinggi (cm) dibagi 4.000.",
  },
  {
    question: "Apakah barang diantar sampai alamat penerima?",
    answer:
      "Ya, untuk wilayah kota tujuan pengiriman sudah termasuk pengantaran sampai alamat (door to door). Untuk alamat di luar wilayah kota, biaya penerusan dihitung terpisah.",
  },
  {
    question: "Barang apa yang tidak bisa dikirim?",
    answer:
      "Kami tidak menerima pengiriman hewan hidup maupun mati dan frozen food. Untuk barang khusus lainnya, konsultasikan dulu dengan tim kami lewat WhatsApp.",
  },
];

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl sm:text-2xl font-black text-[#111111] mb-4">{children}</h2>;
}

export default function CargoHubPage() {
  const summaries = regionConfigs.map((r) => ({ config: r, ...regionSummary(r.ongkirRegion) }));
  const totalCities = summaries.reduce((n, s) => n + s.cityCount, 0);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: BASE_URL },
          { name: "Cargo", url: `${BASE_URL}/cargo` },
        ]}
      />
      <ArticleFaqJsonLd items={FAQS} />

      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] w-full">
          <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-12 w-full min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <ChevronRight size={13} />
              <span className="text-white font-semibold">Cargo</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 max-w-xl">
              Cargo ke Seluruh Indonesia Timur
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
              Ekspedisi cargo laut dari Jakarta &amp; sekitarnya (Jabodetabek) dan Surabaya ke Papua, Maluku, NTT, dan
              Sulawesi. Minimal pengiriman 100 kg, cocok untuk stok toko, material proyek, mesin, dan barang pindahan.
              Pilih wilayah tujuan untuk lihat harga, estimasi waktu transit, dan jadwal kapal terbaru.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {regionConfigs.map((r) => (
              <Link
                key={r.slug}
                href={`/cargo/${r.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#CC1F2A]/30 transition-all p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-[#CC1F2A]" />
                  <h2 className="text-lg font-black text-[#111111]">{r.label}</h2>
                </div>

                <p className="text-sm text-gray-500 mb-4 flex-1">{r.description}</p>

                <div className="flex gap-2 flex-wrap mb-4">
                  {r.stats.map((s) => (
                    <span
                      key={s.label}
                      className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full"
                    >
                      <strong className="text-[#CC1F2A]">{s.value}</strong> {s.label}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#CC1F2A] group-hover:gap-2.5 transition-all">
                  Lihat harga &amp; jadwal
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <Title>Ekspedisi Spesialis Indonesia Timur</Title>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                BJA Logistic fokus pada pengiriman barang dalam jumlah besar ke Indonesia Timur lewat jalur laut. Kami
                melayani {totalCities} kota dan kabupaten tujuan di Papua, Maluku, NTT, dan Sulawesi, dengan titik
                pengiriman dari Jabodetabek dan Surabaya.
              </p>
              <p>
                Harga dihitung per kg, minimal 100 kg, dan berbeda untuk setiap kota tujuan. Untuk wilayah kota tujuan,
                pengiriman sudah termasuk pengantaran sampai alamat penerima.
              </p>
            </div>
          </section>

          <section>
            <Title>Tarif Cargo Laut per Wilayah</Title>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="bg-[#CC1F2A] text-white">
                    <th className="text-left px-5 py-3 font-bold">Wilayah</th>
                    <th className="text-left px-5 py-3 font-bold">Tarif mulai</th>
                    <th className="text-left px-5 py-3 font-bold">Estimasi</th>
                    <th className="text-left px-5 py-3 font-bold">Layanan</th>
                    <th className="text-left px-5 py-3 font-bold">Kota tujuan</th>
                  </tr>
                </thead>
                <tbody>
                  {summaries.map((s, i) => (
                    <tr key={s.config.slug} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-5 py-3">
                        <Link href={`/cargo/${s.config.slug}`} className="font-bold text-[#CC1F2A] hover:underline">
                          Cargo ke {s.config.label}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{s.minPrice !== null ? `${rupiah(s.minPrice)}/kg` : "Hubungi CS"}</td>
                      <td className="px-5 py-3 text-gray-600">
                        {s.etaMin !== null && s.etaMax !== null ? `${s.etaMin}–${s.etaMax} hari` : "-"}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{SERVICES_BY_REGION[s.config.ongkirRegion]}</td>
                      <td className="px-5 py-3 text-gray-600">{s.cityCount} kota</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              Tarif dari Jabodetabek. Estimasi dihitung sejak kapal berangkat dari pelabuhan asal. Harga final dikonfirmasi
              tim kami sesuai berat dan ukuran barang. Tarif lengkap per kota ada di halaman tiap wilayah dan di{" "}
              <Link href="/cek-ongkir" className="text-[#CC1F2A] font-semibold hover:underline">cek ongkir</Link>.
            </p>
          </section>

          <section>
            <Title>Kota Tujuan Populer</Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {regionConfigs.map((r) => (
                <div key={r.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-black text-[#111111] mb-3">{r.label}</h3>
                  <ul className="space-y-1.5 text-sm">
                    {POPULAR[r.ongkirRegion].map((c) => (
                      <li key={c.value}>
                        <Link href={`/kirim-ke/${c.value}`} className="text-gray-600 hover:text-[#CC1F2A] hover:underline">
                          Ekspedisi ke {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/cargo/${r.slug}`}
                    className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#CC1F2A] hover:underline"
                  >
                    Semua kota di {r.label} <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Title>Pilihan Kapal: PELNI, Kapal Cargo, dan Roro</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SHIPS.map((s) => (
                <div key={s.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <s.icon size={20} className="text-[#CC1F2A]" />
                    <h3 className="font-black text-[#111111]">{s.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Ketersediaan layanan berbeda untuk setiap kota tujuan. Cek jadwal keberangkatan terdekat di{" "}
              <Link href="/jadwal-kapal" className="text-[#CC1F2A] font-semibold hover:underline">jadwal kapal</Link>.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <Title>Cara Kirim Cargo ke Indonesia Timur</Title>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 leading-relaxed">
                {STEPS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <Title>Cara Menghitung Ongkir</Title>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                {[
                  "Ongkir dihitung per kg, minimal pengiriman 100 kg.",
                  "Untuk barang besar tapi ringan, dipakai berat volume: P × L × T (cm) ÷ 4.000, jika lebih besar dari berat timbangan.",
                  "Sudah termasuk pengantaran sampai alamat untuk wilayah kota tujuan. Alamat di luar wilayah kota dikenakan biaya penerusan.",
                  "Tarif belum termasuk packing dan asuransi.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <Ban size={15} className="text-[#CC1F2A] shrink-0 mt-0.5" />
                  Tidak menerima pengiriman hewan hidup/mati dan frozen food.
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <Title>Pertanyaan Seputar Cargo ke Indonesia Timur</Title>
            <div className="divide-y divide-gray-100">
              {FAQS.map((f) => (
                <details key={f.question} className="group py-4">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-[#111111]">
                    <h3 className="text-sm sm:text-base">{f.question}</h3>
                    <ChevronRight size={16} className="shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="text-xl sm:text-2xl font-black mb-2">Mau kirim barang ke Indonesia Timur?</h2>
            <p className="text-white/80 text-sm mb-5 max-w-2xl">
              Kirim detail barang dan kota tujuan, tim kami bantu hitungkan ongkir dan carikan jadwal kapal terdekat.
            </p>
            <div className="flex flex-wrap gap-3">
              <WALink
                href={buildGeneralMessage()}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#CC1F2A] font-black px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <MessageCircle size={16} />
                Chat WhatsApp
              </WALink>
              <Link
                href="/cek-ongkir"
                className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <Calculator size={16} />
                Cek Ongkir
              </Link>
              <Link
                href="/jadwal-kapal"
                className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <CalendarDays size={16} />
                Jadwal Kapal
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
