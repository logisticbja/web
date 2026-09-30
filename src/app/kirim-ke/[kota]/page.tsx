import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Clock, Ship, Zap, CheckCircle, ArrowRight, MapPin, Package, Star, Quote, Scale, Ban, AlertCircle } from "lucide-react";
import { destinationCities, destinationAliases, resolveDestinationValue, calculatePrice, cityLautPricing, formatPrice } from "@/lib/data/pricing";
import { buildDestinationMessage, buildOngkirMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getCityPage } from "@/lib/cityPages";
import { getCitiesByRegion } from "@/lib/data/regions";
import type { OngkirRegion } from "@/lib/data/ongkir";

const ONGKIR_REGIONS = new Set(["papua", "maluku", "ntt", "sulawesi"]);

export const revalidate = 86400;

function toSlug(value: string) {
  return value.replace(/_/g, "-");
}
function fromSlug(slug: string) {
  return slug.replace(/-/g, "_");
}

type EffectiveCityPricing = {
  regulerPrice: number | null;
  regulerEtaMin: number | null;
  regulerEtaMax: number | null;
  expressPrice: number | null;
  expressEtaMin: number | null;
  expressEtaMax: number | null;
  minWeightKg: number;
};

function parsePriceStr(v?: string | null): number | null {
  if (!v) return null;
  const n = parseInt(v.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function getEffectiveCityPricing(
  destinationValue: string,
  apiData: Awaited<ReturnType<typeof getCityPage>>
): EffectiveCityPricing {
  const master = cityLautPricing[destinationValue];

  if (apiData) {
    const regulerPrice = parsePriceStr(apiData.priceRegular);
    const expressPrice = parsePriceStr(apiData.priceExpress);

    const regulerComplete =
      regulerPrice !== null &&
      apiData.regularEtaMin !== null &&
      apiData.regularEtaMax !== null;

    const expressComplete =
      expressPrice !== null &&
      apiData.expressEtaMin !== null &&
      apiData.expressEtaMax !== null;

    const cmsHasUsablePricing = regulerComplete || expressComplete;

    if (cmsHasUsablePricing) {
      return {
        regulerPrice: regulerComplete ? regulerPrice : null,
        regulerEtaMin: regulerComplete ? apiData.regularEtaMin : null,
        regulerEtaMax: regulerComplete ? apiData.regularEtaMax : null,
        expressPrice: expressComplete ? expressPrice : null,
        expressEtaMin: expressComplete ? apiData.expressEtaMin : null,
        expressEtaMax: expressComplete ? apiData.expressEtaMax : null,
        minWeightKg: apiData.minWeightKg || 100,
      };
    }
  }

  if (master) {
    return {
      ...master,
      minWeightKg: 100,
    };
  }

  const fallback = calculatePrice(destinationValue, "laut", 1);
  return {
    regulerPrice: fallback.priceMin,
    regulerEtaMin: fallback.etaMin,
    regulerEtaMax: fallback.etaMax,
    expressPrice: fallback.priceMax,
    expressEtaMin: fallback.etaMin,
    expressEtaMax: fallback.etaMax,
    minWeightKg: 100,
  };
}

function formatEta(min: number | null, max: number | null) {
  if (min === null || max === null) return null;
  return min === max ? `${min} hari` : `${min}–${max} hari`;
}

function buildAutomaticCitySeo(
  city: string,
  region: string,
  pricing: EffectiveCityPricing
) {
  const available = [
    pricing.regulerPrice !== null
      ? {
          label: "Reguler",
          price: pricing.regulerPrice,
          eta: formatEta(pricing.regulerEtaMin, pricing.regulerEtaMax),
        }
      : null,
    pricing.expressPrice !== null
      ? {
          label: "Express",
          price: pricing.expressPrice,
          eta: formatEta(pricing.expressEtaMin, pricing.expressEtaMax),
        }
      : null,
  ].filter(Boolean) as { label: string; price: number; eta: string | null }[];

  const startPrice = available.length
    ? Math.min(...available.map((item) => item.price))
    : null;

  let title = startPrice
    ? `Cargo ke ${city} — Rp${startPrice.toLocaleString("id-ID")}/kg | BJA Logistic`
    : `Cargo ke ${city} | BJA Logistic`;

  if (title.length > 60) {
    title = `Cargo ke ${city} | BJA Logistic`;
  }

  const serviceText = available
    .map(
      (item) =>
        `${item.label} Rp${item.price.toLocaleString("id-ID")}/kg${
          item.eta ? `, ${item.eta}` : ""
        }`
    )
    .join(". ");

  let description = `Jasa ekspedisi cargo ke ${city}${
    region ? `, ${region}` : ""
  }. ${serviceText ? `${serviceText}. ` : ""}Minimum ${
    pricing.minWeightKg
  } kg. Cek jadwal kapal BJA Logistic.`;

  if (description.length > 155) {
    description = `Cargo ke ${city}${region ? `, ${region}` : ""}. ${
      startPrice
        ? `Mulai Rp${startPrice.toLocaleString("id-ID")}/kg. `
        : ""
    }Minimum ${pricing.minWeightKg} kg. Cek layanan, estimasi, dan jadwal kapal BJA Logistic.`;
  }

  if (description.length > 155) {
    description = `${description.slice(0, 152).trimEnd()}...`;
  }

  return { title, description };
}

export function generateStaticParams() {
  const canonicalParams = destinationCities.map((city) => ({
    kota: toSlug(city.value),
  }));

  const legacyParams = Object.keys(destinationAliases).map((alias) => ({
    kota: toSlug(alias),
  }));

  return [...canonicalParams, ...legacyParams];
}

type Props = { params: Promise<{ kota: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota } = await params;
  const rawDestinationValue = fromSlug(kota);
  const resolvedDestinationValue = resolveDestinationValue(rawDestinationValue);
  const canonicalSlug = toSlug(resolvedDestinationValue);

  const city = destinationCities.find(
    (c) => c.value === resolvedDestinationValue
  );

  const apiData = await getCityPage(canonicalSlug);
  if (!city && !apiData) return {};

  const cityLabel = apiData?.city ?? city!.label;
  const region = apiData?.region ?? city?.region ?? "";
  const pricing = getEffectiveCityPricing(resolvedDestinationValue, apiData);
  const automaticSeo = buildAutomaticCitySeo(cityLabel, region, pricing);

  const useCustomSeo = !!apiData?.seoCustom;
  const title =
    useCustomSeo && apiData?.metaTitle?.trim()
      ? apiData.metaTitle.trim()
      : automaticSeo.title;

  const description =
    useCustomSeo && apiData?.metaDescription?.trim()
      ? apiData.metaDescription.trim()
      : automaticSeo.description;

  const canonical = `https://bjalogistic.id/kirim-ke/${canonicalSlug}`;

  return {
    title,
    description,
    keywords: [
      apiData?.focusKeyword?.trim(),
      `cargo ke ${cityLabel.toLowerCase()}`,
      `ekspedisi ${cityLabel.toLowerCase()}`,
      `kirim barang ke ${cityLabel.toLowerCase()}`,
      `ongkir ke ${cityLabel.toLowerCase()}`,
      ...(region
        ? [`ekspedisi ${region.toLowerCase()} ${cityLabel.toLowerCase()}`]
        : []),
    ].filter(Boolean) as string[],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: apiData?.ogImage || apiData?.imageBanner || "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [apiData?.ogImage || apiData?.imageBanner || "/og-image.png"],
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
    highlights: [
      "Menggunakan kapal cargo",
      "Lebih ekonomis untuk pengiriman non-urgent",
      "Cocok untuk barang besar, berat, dan pengiriman rutin",
      "Tracking pengiriman tersedia",
    ],
  },
  {
    type: "express" as const,
    label: "Cargo Express",
    icon: Zap,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    highlights: [
      "Menggunakan kapal PELNI",
      "Lebih cepat sampai dibanding layanan Reguler",
      "Cocok untuk barang besar, berat, dan kebutuhan urgent",
      "Tracking pengiriman tersedia",
    ],
  },
];

const corporateClients = [
  { src: "/client/indomaret.webp", alt: "Indomaret" },
  { src: "/client/bni.webp", alt: "BNI" },
  { src: "/client/united-tractor.webp", alt: "United Tractors" },
  { src: "/client/pln.webp", alt: "PLN" },
  { src: "/client/cap.webp", alt: "Chandra Asri" },
  { src: "/client/synnex.webp", alt: "Synnex Metrodata" },
  { src: "/client/madesa.webp", alt: "Madesa" },
  { src: "/client/sonton.webp", alt: "Sonton" },
  { src: "/client/sigs.webp", alt: "SIGS" },
  { src: "/client/aksara.webp", alt: "Aksara Grafika" },
];

const orderSteps = [
  { icon: MessageCircle, title: "Chat via WhatsApp", desc: "Konsultasi & cek ongkir gratis, respon cepat tim kami." },
  { icon: Package, title: "Konfirmasi & Jemput Barang", desc: "Tim jemput langsung dari lokasi Anda di Jabodetabek & Surabaya." },
  { icon: Ship, title: "Proses & Pengiriman", desc: "Barang ditimbang, dikemas, dan dikirim sesuai jadwal kapal." },
  { icon: MapPin, title: "Tracking & Sampai Tujuan", desc: "Pantau status real-time hingga barang sampai." },
];

const testimonials = [
  {
    initial: "B",
    name: "Budi Santoso",
    role: "Owner Toko Material, Jayapura",
    quote: "Sudah 3 tahun pakai BJA untuk kirim material bangunan dari Surabaya ke Jayapura. Harganya paling murah dibanding yang lain, dan barang selalu dateng tepat waktu. Pelayanan CS juga responsif banget!",
  },
  {
    initial: "D",
    name: "Dewi Rahayu",
    role: "Distributor FMCG, Sorong",
    quote: "Kirim 2-3 ton barang tiap bulan via cargo laut BJA. Trackingnya real-time, jadi saya bisa kasih info akurat ke customer saya di Sorong. Highly recommended untuk bisnis yang butuh logistik ke Papua!",
  },
  {
    initial: "H",
    name: "Hendra Wijaya",
    role: "Pengusaha, Jakarta",
    quote: "Awalnya ragu kirim mesin industri ke Timika, tapi BJA meyakinkan dengan solusi packing kayu dan asuransi. Alhamdulillah semua aman sampai tujuan. Proses koordinasinya juga mudah via WhatsApp.",
  },
];

export default async function KirimKePage({ params }: Props) {
  const { kota } = await params;
  const rawDestinationValue = fromSlug(kota);
  const resolvedDestinationValue = resolveDestinationValue(rawDestinationValue);

  if (rawDestinationValue !== resolvedDestinationValue) {
    permanentRedirect(`/kirim-ke/${toSlug(resolvedDestinationValue)}`);
  }

  const city = destinationCities.find(
    (c) => c.value === resolvedDestinationValue
  );
  const apiData = await getCityPage(toSlug(resolvedDestinationValue));
  if (!city && !apiData) notFound();

  // Kota bisa berasal dari data hardcoded (destinationCities), dari API/database
  // saja, atau keduanya. cityLabel/region jadi sumber tunggal yang aman dipakai
  // di seluruh halaman, walau `city` undefined untuk kota yang cuma ada di DB.
  const cityLabel = apiData?.city ?? city!.label;
  const region = apiData?.region ?? city?.region ?? "";

  const relatedCities = region
    ? destinationCities.filter((c) => c.region === region && c.value !== city?.value).slice(0, 5)
    : [];

  const ongkirRegion = region && ONGKIR_REGIONS.has(region.toLowerCase())
    ? (region.toLowerCase() as OngkirRegion)
    : null;
  const cityGroups = ongkirRegion ? getCitiesByRegion(ongkirRegion) : [];

  const lautPrice = calculatePrice(resolvedDestinationValue, "laut", 1);
  const cp = getEffectiveCityPricing(resolvedDestinationValue, apiData);

  const primaryPrice =
    cp.regulerPrice ?? cp.expressPrice ?? lautPrice.priceMin;

  const priceFaqParts = [
    cp.regulerPrice !== null
      ? `Reguler Rp ${cp.regulerPrice.toLocaleString("id-ID")}/kg`
      : "Reguler tidak tersedia",
    cp.expressPrice !== null
      ? `Express Rp ${cp.expressPrice.toLocaleString("id-ID")}/kg`
      : "Express tidak tersedia",
  ];

  const etaFaqParts = [
    cp.regulerEtaMin !== null && cp.regulerEtaMax !== null
      ? `Reguler ${cp.regulerEtaMin}–${cp.regulerEtaMax} hari`
      : "Reguler tidak tersedia",
    cp.expressEtaMin !== null && cp.expressEtaMax !== null
      ? `Express ${cp.expressEtaMin}–${cp.expressEtaMax} hari`
      : "Express tidak tersedia",
  ];

  const hardcodedFaqs = [
    {
      q: `Berapa ongkir ke ${cityLabel}?`,
      a: `Ongkir ke ${cityLabel}: ${priceFaqParts.join(", ")} (min. ${cp.minWeightKg} kg). Harga final tergantung berat aktual dan dimensi barang.`,
    },
    {
      q: `Berapa lama pengiriman ke ${cityLabel}?`,
      a: `Estimasi waktu pengiriman ke ${cityLabel}: ${etaFaqParts.join(", ")}. Estimasi dihitung sejak kapal berangkat dari pelabuhan asal dan dapat berubah tergantung jadwal kapal, cuaca, operasional pelabuhan, serta kondisi perjalanan.`,
    },
    {
      q: `Apakah tersedia layanan door to door ke ${cityLabel}?`,
      a: `Ya, kami menyediakan layanan jemput barang langsung dari lokasi Anda di Jabodetabek dan Surabaya. Untuk pengantaran ke ${cityLabel}, tersedia untuk area tertentu — hubungi CS kami untuk konfirmasi.`,
    },
    {
      q: `Apa saja barang yang bisa dikirim ke ${cityLabel}?`,
      a: `Hampir semua jenis barang: sembako, elektronik, material bangunan, perabotan, mesin industri, alat pertanian, pakaian, dan barang dagangan umum. Untuk barang khusus (B3, senjata, dll), hubungi kami terlebih dahulu.`,
    },
    {
      q: `Apakah ada asuransi pengiriman ke ${cityLabel}?`,
      a: `Ya, asuransi pengiriman tersedia untuk semua layanan. Biaya asuransi dihitung dari nilai barang yang diasuransikan. Sangat direkomendasikan untuk barang elektronik, mesin, dan barang bernilai tinggi.`,
    },
  ];

  // FAQ dari API menggantikan yang hardcoded kalau isinya ada.
  const faqs = apiData?.faqs && apiData.faqs.length > 0
    ? apiData.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : hardcodedFaqs;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Beranda", url: "https://bjalogistic.id" },
        { name: "Kirim ke", url: "https://bjalogistic.id/kirim-ke" },
        {
          name: cityLabel,
          url: `https://bjalogistic.id/kirim-ke/${toSlug(resolvedDestinationValue)}`,
        },
      ]} />

      {/* Hero */}
      <div className={`relative py-8 px-4 overflow-hidden ${apiData?.imageBanner ? "" : "bg-[#CC1F2A]"}`}>
        {apiData?.imageBanner && (
          <>
            <Image
              src={apiData.imageBanner}
              alt={`Banner ${cityLabel}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#CC1F2A]/80" />
          </>
        )}
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/60 text-sm">Tujuan</span>
            <span className="text-white/40 text-sm">›</span>
            {region && (
              <>
                <span className="text-[#F5C518] text-sm font-semibold">{region}</span>
                <span className="text-white/40 text-sm">›</span>
              </>
            )}
            <span className="text-white text-sm font-bold">{cityLabel}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#1A1A1A]" />
                </div>
                {region && <span className="text-white/70 text-sm font-semibold">{region}</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                Ekspedisi Cargo<br />ke {cityLabel}
              </h1>
              <p className="text-white/70 text-sm mb-5">
                Pengiriman cargo ke {cityLabel} mulai dari{" "}
                <strong className="text-[#F5C518]">
                  {`Rp ${primaryPrice.toLocaleString("id-ID")}/kg`}
                </strong>{" "}
                via cargo laut, minimal {cp.minWeightKg} kg. Door to door dari Jabodetabek & Surabaya.
              </p>
              <div className="flex flex-wrap gap-3">
                <WALink
                  href={buildDestinationMessage(cityLabel)}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-6 py-3.5 rounded-xl transition-all hover:shadow-lg text-base"
                >
                  <MessageCircle size={18} />
                  Tanya Harga ke {cityLabel}
                </WALink>
                <Link
                  href="/cek-ongkir"
                  className="flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-bold px-6 py-3.5 rounded-xl transition-all text-base"
                >
                  Hitung Ongkir <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Estimasi Ongkir */}
            <div className="shrink-0 lg:pl-10">
              <p className="text-[#F5C518] text-xs sm:text-sm font-bold uppercase tracking-wide mb-5 text-center lg:text-left">
                Estimasi Ongkir ke {cityLabel}
              </p>
              <div className="flex flex-col gap-6">
                {[
                  {
                    label: "Reguler",
                    price: cp.regulerPrice,
                    available: cp.regulerPrice !== null,
                  },
                  {
                    label: "Express",
                    price: cp.expressPrice,
                    available: cp.expressPrice !== null,
                  },
                ].map((s) => (
                  <div key={s.label} className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#CC1F2A] z-10" />
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F5C518] z-20" />
                    <div className="bg-white rounded-full pl-16 pr-10 py-4 flex items-center gap-3 shadow-lg min-w-[320px]">
                      <span className="font-black text-[#111111] text-lg sm:text-xl whitespace-nowrap">
                        {s.label} →
                      </span>
                      {s.available && s.price !== null ? (
                        <span className="text-[#CC1F2A] font-black text-lg sm:text-xl whitespace-nowrap">
                          Rp {s.price.toLocaleString("id-ID")}/kg
                        </span>
                      ) : (
                        <span className="text-gray-500 font-bold text-sm sm:text-base">
                          Layanan tidak tersedia untuk tujuan ini
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info kebijakan pengiriman */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/10 text-white/80 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <Scale size={14} className="text-[#F5C518] shrink-0" />
              Minimal pengiriman {cp.minWeightKg} kg
            </span>
            <span className="flex items-center gap-1.5">
              <Ban size={14} className="text-[#F5C518] shrink-0" />
              Tidak menerima pengiriman hewan & frozen food
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">

        {/* Pricing cards */}
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-2">Pilih Layanan ke {cityLabel}</h2>
          <p className="text-gray-500 mb-8">Estimasi harga berdasarkan tarif per kg. Harga final menyesuaikan berat & volume aktual.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {serviceInfo.map((svc) => {
              const isExpress = svc.type === "express";
              const price = isExpress ? cp.expressPrice : cp.regulerPrice;
              const etaMin = isExpress ? cp.expressEtaMin : cp.regulerEtaMin;
              const etaMax = isExpress ? cp.expressEtaMax : cp.regulerEtaMax;

              const isAvailable =
                price !== null && etaMin !== null && etaMax !== null;

              if (!isAvailable) {
                return (
                  <div
                    key={svc.type}
                    className={`rounded-2xl border-2 p-6 ${svc.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <svc.icon size={22} className={svc.iconColor} />
                      <h3 className="font-black text-[#111111]">{svc.label}</h3>
                    </div>

                    <div className="rounded-xl border border-dashed border-gray-300 bg-white/70 p-5">
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          size={18}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="font-bold text-gray-700 mb-1">
                            Layanan tidak tersedia
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {svc.label} saat ini tidak tersedia untuk tujuan {cityLabel}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              const waMsg = buildOngkirMessage(
                "Jabodetabek",
                cityLabel,
                cp.minWeightKg,
                svc.label,
                formatPrice(price * 100)
              );

              return (
                <div key={svc.type} className={`rounded-2xl border-2 p-6 ${svc.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <svc.icon size={22} className={svc.iconColor} />
                    <h3 className="font-black text-[#111111]">{svc.label}</h3>
                  </div>
                  <div className="mb-5">
                    <p className="text-3xl font-black text-[#111111] leading-none">
                      {formatPrice(price)}
                      <span className="text-base font-bold text-gray-500">/kg</span>
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/80 border border-gray-200 px-4 py-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Scale size={15} className="text-[#CC1F2A] shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Minimum
                          </span>
                        </div>
                        <p className="text-base font-black text-[#111111]">
                          {cp.minWeightKg} kg
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/80 border border-gray-200 px-4 py-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={15} className="text-[#CC1F2A] shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Estimasi
                          </span>
                        </div>
                        <p className="text-base font-black text-[#111111]">
                          {etaMin}–{etaMax} hari*
                        </p>
                      </div>
                    </div>
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
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={18}
                className="text-amber-700 shrink-0 mt-0.5"
              />
              <div>
                <p className="font-black text-amber-950 text-sm mb-1">
                  Catatan estimasi pengiriman
                </p>
                <p className="text-sm text-amber-900 leading-relaxed">
                  Estimasi waktu dihitung sejak kapal berangkat dari pelabuhan asal,
                  bukan sejak barang dipesan atau di-pickup. Jadwal kapal dapat berubah
                  karena kondisi operasional, cuaca, pelabuhan, atau perjalanan.
                  Pastikan konfirmasi jadwal kapal terdekat ke CS BJA Logistic sebelum
                  melakukan pengiriman.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services (from API) */}
        {apiData && apiData.services.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Layanan Pengiriman ke {cityLabel}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {apiData.services.map((svc) => (
                <div key={svc.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-black text-[#111111] mb-2">{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why BJA for this city */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8">
          <h2 className="text-2xl font-black text-[#111111] mb-6">
            Mengapa Pilih BJA untuk Pengiriman ke {cityLabel}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: "10+ Tahun Pengalaman",
                desc: region
                  ? `Kami telah melayani pengiriman ke ${cityLabel} dan seluruh ${region} selama lebih dari 10 tahun.`
                  : `Kami telah melayani pengiriman ke ${cityLabel} selama lebih dari 10 tahun.`,
              },
              { title: "Jaringan Agen Lokal", desc: `Agen dan mitra lokal di ${cityLabel} memastikan pengiriman selesai hingga ke alamat tujuan.` },
              { title: "Tracking Real-Time", desc: "Pantau status pengiriman Anda kapan saja via WhatsApp atau halaman tracking kami." },
              { title: "Harga Kompetitif", desc: `Tarif pengiriman ke ${cityLabel} mulai ${formatPrice(lautPrice.priceMin)}/kg — salah satu yang paling kompetitif.` },
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

        {/* Trusted by */}
        <div>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Dipercaya oleh perusahaan-perusahaan terkemuka</p>
            <h2 className="text-2xl font-black text-[#111111]">Klien Corporate Kami</h2>
          </div>
          <div className="bg-[#F8FAFC] rounded-3xl p-8">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {corporateClients.map((client) => (
                <div key={client.alt} className="bg-white border border-gray-200 rounded-xl h-20 relative p-3">
                  <Image src={client.src} alt={client.alt} fill className="object-contain" sizes="120px" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-4">+ ratusan klien UKM & perorangan lainnya</p>
        </div>

        {/* Order process */}
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6 text-center">
            Cara Kirim Barang ke {cityLabel}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {orderSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon size={22} className="text-[#CC1F2A]" />
                </div>
                <p className="text-xs text-gray-400 font-bold mb-1">Langkah {i + 1}</p>
                <p className="font-black text-[#111111] mb-1">{step.title}</p>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials — dari API kalau tersedia, fallback ke testimoni umum */}
        <div>
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-[#CC1F2A] mb-2">TESTIMONI</p>
            <h2 className="text-2xl font-black text-[#111111] mb-2">
              {apiData && apiData.testimonials.length > 0
                ? `Apa Kata Pelanggan Kami di ${cityLabel}`
                : "Apa Kata Pelanggan Kami"}
            </h2>
            <p className="text-gray-500">Ribuan pelanggan sudah merasakan manfaat layanan kami</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(apiData && apiData.testimonials.length > 0
              ? apiData.testimonials.map((t) => ({
                  name: t.name,
                  initial: t.name.charAt(0).toUpperCase(),
                  role: "",
                  quote: t.message,
                  rating: t.rating,
                }))
              : testimonials.map((t) => ({ ...t, rating: 5 }))
            ).map((t) => (
              <div key={t.name} className="bg-[#F8FAFC] rounded-2xl p-6 relative overflow-hidden">
                <Quote size={36} className="absolute top-5 right-5 text-[#CC1F2A]/10" />
                <div className="flex gap-0.5 mb-3 relative">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#F5C518] fill-[#F5C518]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 relative">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 relative">
                  <div className="w-9 h-9 rounded-full bg-[#CC1F2A]/10 flex items-center justify-center font-black text-[#CC1F2A] text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-[#111111] text-sm">{t.name}</p>
                    {t.role && <p className="text-gray-500 text-xs">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kota yang Dilayani */}
        {cityGroups.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Kota yang Dilayani di {region}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {cityGroups.map((group, gi) => (
                <div key={group.groupLabel} className={gi > 0 ? "border-t border-gray-100" : ""}>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider px-5 pt-4 pb-2 flex items-center gap-1.5">
                    <MapPin size={11} />
                    {group.groupLabel}
                  </p>
                  <div className="px-5 pb-4 flex flex-wrap gap-2">
                    {group.cities.map((c) => (
                      <span
                        key={c.value}
                        className="bg-[#F8FAFC] border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related cities */}
        {relatedCities.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Kota Lain di {region}
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
            FAQ Pengiriman ke {cityLabel}
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
          <h2 className="text-2xl font-black text-white mb-3">Siap Kirim Cargo ke {cityLabel}?</h2>
          <p className="text-white/70 mb-6">Chat WhatsApp sekarang — tim kami konfirmasi harga & jadwal dalam hitungan menit.</p>
          <WALink
            href={buildDestinationMessage(cityLabel)}
            className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-8 py-4 rounded-xl transition-all hover:shadow-lg text-base"
          >
            <MessageCircle size={18} />
            Chat Sekarang — Kirim ke {cityLabel}
          </WALink>
        </div>
      </div>
    </>
  );
}
