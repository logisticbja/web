import { getPageHero } from "@/lib/pageHero";
import type { LegacyHero } from "./core";
import { cekOngkirDefaults, mergeCekOngkir, type CekOngkirContent } from "./cekOngkir";
import { jadwalKapalDefaults, mergeJadwalKapal, type JadwalKapalContent } from "./jadwalKapal";
import { mergeTracking, trackingDefaults, type TrackingContent } from "./tracking";

const CRM_BASE_URL = process.env.CRM_API_URL ?? "https://invoice.bjalogistic.id";
const CRM_API_KEY = process.env.CRM_PUBLIC_API_KEY ?? "";

async function getPublished(page: string): Promise<unknown> {
  try {
    const res = await fetch(`${CRM_BASE_URL}/public-site-page.php?page=${encodeURIComponent(page)}`, {
      headers: { "X-API-Key": CRM_API_KEY },
      next: { revalidate: 3600, tags: ["cms-content"] },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

async function load<T>(page: string, defaults: (l: LegacyHero | null) => T, merge: (b: T, raw: unknown) => T) {
  const [legacy, published] = await Promise.all([getPageHero(page), getPublished(page)]);
  const base = defaults(legacy as LegacyHero | null);
  return { live: merge(base, published), defaults: base };
}

export const loadCekOngkir = (): Promise<{ live: CekOngkirContent; defaults: CekOngkirContent }> =>
  load("cek-ongkir", cekOngkirDefaults, mergeCekOngkir);

export const loadJadwalKapal = (): Promise<{ live: JadwalKapalContent; defaults: JadwalKapalContent }> =>
  load("jadwal-kapal", jadwalKapalDefaults, mergeJadwalKapal);

export const loadTracking = (): Promise<{ live: TrackingContent; defaults: TrackingContent }> =>
  load("tracking", trackingDefaults, mergeTracking);
