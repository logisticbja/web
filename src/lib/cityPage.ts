import { MessageCircle, Package, Ship, MapPin, Zap } from "lucide-react";
import { destinationCities, calculatePrice, cityLautPricing } from "@/lib/data/pricing";
import { getCitiesByRegion } from "@/lib/data/regions";
import type { OngkirRegion } from "@/lib/data/ongkir";
import type { CityPageData } from "@/lib/cityPages";

export const ONGKIR_REGIONS = new Set(["papua", "maluku", "ntt", "sulawesi"]);

export function toSlug(value: string) {
  return value.replace(/_/g, "-");
}
export function fromSlug(slug: string) {
  return slug.replace(/-/g, "_");
}

export type EffectiveCityPricing = {
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

export function getEffectiveCityPricing(
  destinationValue: string,
  apiData: CityPageData | null
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

export function formatEta(min: number | null, max: number | null) {
  if (min === null || max === null) return null;
  return min === max ? `${min} hari` : `${min}–${max} hari`;
}

export function buildAutomaticCitySeo(
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
    ? `Ekspedisi Cargo ke ${city} — Mulai Rp${startPrice.toLocaleString("id-ID")}/kg | BJA Logistic`
    : `Ekspedisi Cargo ke ${city} | BJA Logistic`;

  if (title.length > 60) {
    title = `Ekspedisi Cargo ke ${city} | BJA Logistic`;
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


export const serviceInfo = [
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

export const corporateClients = [
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

export const orderSteps = [
  { icon: MessageCircle, title: "Chat via WhatsApp", desc: "Konsultasi & cek ongkir gratis, respon cepat tim kami." },
  { icon: Package, title: "Konfirmasi & Jemput Barang", desc: "Tim jemput langsung dari lokasi Anda di Jabodetabek & Surabaya." },
  { icon: Ship, title: "Proses & Pengiriman", desc: "Barang ditimbang, dikemas, dan dikirim sesuai jadwal kapal." },
  { icon: MapPin, title: "Tracking & Sampai Tujuan", desc: "Pantau status real-time hingga barang sampai." },
];

export const genericTestimonials = [
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


export function buildCityView(resolvedDestinationValue: string, apiData: CityPageData | null) {
  const city = destinationCities.find((c) => c.value === resolvedDestinationValue);
  const cityLabel = apiData?.city ?? city?.label ?? "";
  const region = apiData?.region ?? city?.region ?? "";
  const relatedCities = region
    ? destinationCities.filter((c) => c.region === region && c.value !== city?.value).slice(0, 5)
    : [];
  const ongkirRegion = region && ONGKIR_REGIONS.has(region.toLowerCase())
    ? (region.toLowerCase() as OngkirRegion)
    : null;
  const cityGroups = ongkirRegion ? getCitiesByRegion(ongkirRegion) : [];
  const validCityValues = new Set(destinationCities.map((c) => c.value));
  const lautPrice = calculatePrice(resolvedDestinationValue, "laut", 1);
  const cp = getEffectiveCityPricing(resolvedDestinationValue, apiData);
  const primaryPrice = cp.regulerPrice ?? cp.expressPrice ?? lautPrice.priceMin;
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

  const faqs = apiData?.faqs && apiData.faqs.length > 0
    ? apiData.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : hardcodedFaqs;

  return { city, cityLabel, region, relatedCities, cityGroups, validCityValues, lautPrice, cp, primaryPrice, faqs };
}

export type CityView = ReturnType<typeof buildCityView>;
