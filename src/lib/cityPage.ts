import { Ship, Zap } from "lucide-react";
import { destinationCities, calculatePrice, cityLautPricing } from "@/lib/data/pricing";
import { getCitiesByRegion } from "@/lib/data/regions";
import type { OngkirRegion } from "@/lib/data/ongkir";
import type { CityPageData } from "@/lib/cityPages";
import { KOTA_TEMPLATE_DEFAULTS, fillTemplate, type KotaTemplate, type KotaVars } from "@/lib/sitePages/kotaTemplate";

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
  { type: "reguler" as const, icon: Ship, color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600" },
  { type: "express" as const, icon: Zap, color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600" },
];

export function buildCityView(resolvedDestinationValue: string, apiData: CityPageData | null, tpl: KotaTemplate = KOTA_TEMPLATE_DEFAULTS) {
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
  const vars: KotaVars = {
    kota: cityLabel,
    wilayah: region,
    harga: `Rp ${primaryPrice.toLocaleString("id-ID")}`,
    minkg: String(cp.minWeightKg),
    ongkir: priceFaqParts.join(", "),
    estimasi: etaFaqParts.join(", "),
  };
  const t = (text: string, extra?: KotaVars) => fillTemplate(text, extra ? { ...vars, ...extra } : vars);
  const templateFaqs = tpl.faq.items.map((f) => ({ q: t(f.q), a: t(f.a) })).filter((f) => f.q.trim() !== "");

  const faqs = apiData?.faqs && apiData.faqs.length > 0
    ? apiData.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : templateFaqs;

  return { city, cityLabel, region, relatedCities, cityGroups, validCityValues, lautPrice, cp, primaryPrice, faqs, tpl, vars, t };
}

export type CityView = ReturnType<typeof buildCityView>;
