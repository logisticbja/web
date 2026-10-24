import type { CityPageData } from "@/lib/cityPages";
import { safeImage } from "@/lib/homepage/normalize";

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const s = (v: unknown, max = 4000) => (typeof v === "string" ? v.slice(0, max) : "");
const n = (v: unknown): number | null => {
  const x = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  return Number.isFinite(x) ? Math.round(x) : null;
};
const arr = (v: unknown) => (Array.isArray(v) ? v.slice(0, 60) : []);

export function normalizeCityPreview(raw: unknown): CityPageData | null {
  if (!isObj(raw)) return null;
  const slug = s(raw.slug, 120).toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!slug) return null;
  const popup = isObj(raw.popupInfo) ? raw.popupInfo : {};
  return {
    city: s(raw.city, 120),
    slug,
    region: s(raw.region, 120),
    priceRegular: s(raw.priceRegular, 40) || null,
    regularEtaMin: n(raw.regularEtaMin),
    regularEtaMax: n(raw.regularEtaMax),
    priceExpress: s(raw.priceExpress, 40) || null,
    expressEtaMin: n(raw.expressEtaMin),
    expressEtaMax: n(raw.expressEtaMax),
    minWeightKg: n(raw.minWeightKg) || 100,
    services: arr(raw.services).filter(isObj).map((x) => ({ title: s(x.title, 300), description: s(x.description) })).filter((x) => x.title || x.description),
    testimonials: arr(raw.testimonials).filter(isObj).map((x) => ({ name: s(x.name, 120), message: s(x.message), rating: Math.min(5, Math.max(1, n(x.rating) || 5)) })).filter((x) => x.name || x.message),
    faqs: arr(raw.faqs).filter(isObj).map((x) => ({ question: s(x.question, 500), answer: s(x.answer) })).filter((x) => x.question || x.answer),
    metaTitle: s(raw.metaTitle, 200),
    metaDescription: s(raw.metaDescription, 400),
    imageBanner: safeImage(raw.imageBanner, ""),
    belowBannerContent: s(raw.belowBannerContent, 20000),
    servedCities: arr(raw.servedCities).map((x) => s(x, 120)).filter(Boolean),
    popupInfo: {
      enabled: popup.enabled === true,
      minKg: n(popup.minKg) || 100,
      restrictedItems: arr(popup.restrictedItems).map((x) => s(x, 200)).filter(Boolean),
    },
  };
}
