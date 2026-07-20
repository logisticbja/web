import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, MapPin, Star, ChevronDown, ChevronUp } from "lucide-react";
import { WALink } from "@/components/ui/WALink";
import { Metadata } from "next";
import { CekOngkirForm } from "@/components/CekOngkirForm";
import { fetchPricing } from "@/lib/sheets";
import { schedules } from "@/lib/data/schedule";
import { getRegionConfig, getCitiesByRegion, regionConfigs } from "@/lib/data/regions";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const BASE_URL = "https://bjalogistic.id";

interface Props {
  params: Promise<{ region: string }>;
}

export function generateStaticParams() {
  return regionConfigs.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const config = getRegionConfig(region);
  if (!config) return {};

  const title = `Cargo ke ${config.label} — Harga Terjangkau & Terpercaya`;
  const description = `Jasa ekspedisi cargo ke ${config.label}. ${config.description} Cek harga langsung, konfirmasi via WhatsApp.`;
  const canonical = `${BASE_URL}/cargo/${config.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | BJA Logistic`,
      description,
      url: canonical,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-[#F5C518] fill-[#F5C518]" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
      <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-bold text-sm text-[#111] list-none select-none hover:bg-gray-50 transition-colors">
        {q}
        <ChevronDown size={15} className="text-gray-400 shrink-0 group-open:hidden" />
        <ChevronUp size={15} className="text-gray-400 shrink-0 hidden group-open:block" />
      </summary>
      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
        {a}
      </div>
    </details>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 rounded-full bg-[#CC1F2A]" />
      <h2 className="text-base font-black text-[#111]">{children}</h2>
    </div>
  );
}

export default async function CargoRegionPage({ params }: Props) {
  const { region } = await params;
  const config = getRegionConfig(region);
  if (!config) notFound();

  const rows = await fetchPricing();

  const regionSchedules = schedules.filter((s) => s.region === config.scheduleRegion);
  const cityGroups = getCitiesByRegion(config.ongkirRegion);
  const canonical = `${BASE_URL}/cargo/${config.slug}`;
  const waUrl = `https://api.whatsapp.com/send/?phone=6281513335157&text=${encodeURIComponent(config.waText)}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: BASE_URL },
          { name: "Cargo", url: `${BASE_URL}/cargo` },
          { name: config.label, url: canonical },
        ]}
      />

      <div className="min-h-screen bg-[#F8FAFC]">

        {/* Compact hero — thin banner */}
        <div className="bg-gradient-to-r from-[#CC1F2A] to-[#8B1219] px-4 py-4">
          <div className="max-w-6xl mx-auto flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">
                BJA Logistic · Ekspedisi Indonesia Timur
              </p>
              <h1 className="text-sm sm:text-base font-black text-white leading-tight truncate">
                {config.tagline}
              </h1>
            </div>
            <div className="flex gap-2 shrink-0">
              {config.stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/15 border border-white/20 rounded-lg px-3 py-1.5 text-center hidden sm:block"
                >
                  <p className="text-white font-black text-xs leading-none">{s.value}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">

          {/* Above the fold — 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-10 lg:items-stretch">

            {/* Left: Cek Ongkir */}
            <div>
              <SectionTitle>Cek Harga Cargo ke {config.label}</SectionTitle>
              <CekOngkirForm
                rows={rows}
                autoCalculate
                defaultValues={{
                  from: "jabodetabek",
                  to: config.defaultCityValue,
                  toLabel: config.defaultCityLabel,
                  weight: "100",
                  service: "Regular",
                }}
              />
            </div>

            {/* Right: Kota yang Dilayani */}
            <div className="flex flex-col">
              <SectionTitle>Kota yang Dilayani di {config.label}</SectionTitle>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
                <div className="overflow-y-auto flex-1">
                  {cityGroups.map((group, gi) => (
                    <div key={group.groupLabel} className={gi > 0 ? "border-t border-gray-100" : ""}>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-4 pt-3 pb-2 sticky top-0 bg-white flex items-center gap-1.5">
                        <MapPin size={10} />
                        {group.groupLabel}
                      </p>
                      <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                        {group.cities.map((city) => (
                          <span
                            key={city.value}
                            className="bg-[#F8FAFC] border border-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            {city.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Jadwal Kapal */}
          {regionSchedules.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle>Jadwal Kapal ke {config.label}</SectionTitle>
                <Link href="/jadwal-kapal" className="text-xs font-bold text-[#CC1F2A] hover:underline -mt-4">
                  Lihat semua →
                </Link>
              </div>

              <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#CC1F2A] text-white">
                      <th className="text-left px-5 py-3 font-bold">Rute</th>
                      <th className="text-left px-5 py-3 font-bold">Kapal</th>
                      <th className="text-left px-5 py-3 font-bold">Jadwal</th>
                      <th className="text-left px-5 py-3 font-bold">ETA</th>
                      <th className="text-left px-5 py-3 font-bold">Frekuensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionSchedules.map((s, i) => (
                      <tr key={s.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-5 py-3 font-bold text-[#111]">{s.route}</td>
                        <td className="px-5 py-3 text-gray-600">{s.ship}</td>
                        <td className="px-5 py-3 text-gray-600">{s.departure}</td>
                        <td className="px-5 py-3 font-bold text-[#CC1F2A]">{s.eta}</td>
                        <td className="px-5 py-3 text-gray-500 text-xs">{s.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-3">
                {regionSchedules.map((s) => (
                  <div key={s.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-1.5">
                      <p className="font-black text-[#111] text-sm">{s.route}</p>
                      <span className="font-bold text-[#CC1F2A] text-sm">{s.eta}</span>
                    </div>
                    <p className="text-xs text-gray-500">{s.ship} · {s.departure} · {s.frequency}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-2 pl-1">
                * Jadwal bersifat estimasi dan dapat berubah. Konfirmasi via WhatsApp.
              </p>
            </section>
          )}

          {/* Testimoni */}
          <section className="mb-10">
            <SectionTitle>Kata Pelanggan Kami</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {config.testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col">
                  <StarRating rating={t.rating} />
                  <p className="text-sm text-gray-600 leading-relaxed mt-3 flex-1">"{t.text}"</p>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="font-black text-[#111] text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <SectionTitle>Pertanyaan Umum</SectionTitle>
            <div className="space-y-2">
              {config.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] rounded-2xl p-7 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-black mb-2">Siap Kirim ke {config.label}?</h3>
              <p className="text-white/70 text-sm mb-5 max-w-sm mx-auto">
                Chat langsung dengan tim BJA Logistic — cek harga, konfirmasi jadwal, dan booking dalam satu percakapan.
              </p>
              <WALink
                href={waUrl}
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bc59] text-white font-black py-3.5 px-8 rounded-xl transition-colors text-sm shadow-lg"
              >
                <MessageCircle size={18} />
                Chat via WhatsApp Sekarang
              </WALink>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
