import { AIR_FREIGHT_MIN_KG, airFreightRates } from "@/lib/data/airFreight";
import { LAND_FREIGHT_MIN_KG, landFreightRates } from "@/lib/data/landFreight";

export type RateType = "darat" | "udara";
export type RateRow = { city: string; price: number; eta: string };
export type RateRegion = { region: string; rates: RateRow[] };
export type RateTable = { minKg: number; regions: RateRegion[] };

const CRM_BASE_URL = process.env.CRM_API_URL ?? "https://invoice.bjalogistic.id";
const CRM_API_KEY = process.env.CRM_PUBLIC_API_KEY ?? "";

const FALLBACK: Record<RateType, RateTable> = {
  darat: {
    minKg: LAND_FREIGHT_MIN_KG,
    regions: landFreightRates.map((r) => ({
      region: r.region,
      rates: r.rates.map((rate) => ({ city: rate.city, price: rate.price, eta: `${rate.etaMin}–${rate.etaMax} hari` })),
    })),
  },
  udara: {
    minKg: AIR_FREIGHT_MIN_KG,
    regions: airFreightRates.map((r) => ({
      region: r.region,
      rates: r.rates.map((rate) => ({ city: rate.city, price: rate.price, eta: `${rate.days} hari kerja` })),
    })),
  },
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseTable(raw: unknown): RateTable | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as { minKg?: unknown; regions?: unknown };
  if (!Array.isArray(data.regions)) return null;
  const regions: RateRegion[] = [];
  for (const item of data.regions.slice(0, 60)) {
    if (!item || typeof item !== "object") continue;
    const region = text((item as { region?: unknown }).region, 80);
    const rates = (item as { rates?: unknown }).rates;
    if (!region || !Array.isArray(rates)) continue;
    const rows: RateRow[] = [];
    for (const r of rates.slice(0, 400)) {
      if (!r || typeof r !== "object") continue;
      const city = text((r as { city?: unknown }).city, 80);
      const price = Number((r as { price?: unknown }).price);
      const eta = text((r as { eta?: unknown }).eta, 40);
      if (!city || !Number.isFinite(price) || price <= 0) continue;
      rows.push({ city, price: Math.round(price), eta });
    }
    if (rows.length) regions.push({ region, rates: rows });
  }
  if (!regions.length) return null;
  const minKg = Number(data.minKg);
  return { minKg: Number.isFinite(minKg) && minKg > 0 ? Math.round(minKg) : 0, regions };
}

export async function getRateTable(type: RateType): Promise<RateTable> {
  const fallback = FALLBACK[type];
  try {
    const res = await fetch(`${CRM_BASE_URL}/public-rates.php?type=${type}`, {
      headers: { "X-API-Key": CRM_API_KEY },
      next: { revalidate: 3600, tags: ["cms-content"] },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return fallback;
    const json = await res.json();
    const table = parseTable(json?.data);
    if (!table) return fallback;
    return { minKg: table.minKg || fallback.minKg, regions: table.regions };
  } catch {
    return fallback;
  }
}

export function rateStats(table: RateTable, skipRegions: string[] = []) {
  const rows = table.regions.filter((r) => !skipRegions.includes(r.region)).flatMap((r) => r.rates);
  const prices = rows.map((r) => r.price);
  const days = rows.flatMap((r) => (r.eta.match(/\d+/g) ?? []).map(Number));
  return {
    minPrice: prices.length ? Math.min(...prices) : 0,
    minDays: days.length ? Math.min(...days) : 0,
    maxDays: days.length ? Math.max(...days) : 0,
    count: rows.length,
  };
}
