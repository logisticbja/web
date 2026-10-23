import { getPageHero } from "@/lib/pageHero";
import { buildHomepage, type LegacyPageHero } from "./normalize";
import type { HomepageContent } from "./types";

const CRM_BASE_URL = process.env.CRM_API_URL ?? "https://invoice.bjalogistic.id";
const CRM_API_KEY = process.env.CRM_PUBLIC_API_KEY ?? "";

async function getPublishedHomepage(): Promise<unknown> {
  try {
    const res = await fetch(`${CRM_BASE_URL}/public-homepage.php`, {
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

async function getSources(): Promise<{ legacyHero: LegacyPageHero | null; published: unknown }> {
  const [legacyHero, published] = await Promise.all([getPageHero("home"), getPublishedHomepage()]);
  return { legacyHero, published };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const { legacyHero, published } = await getSources();
  return buildHomepage(legacyHero, published);
}

export async function getHomepagePreviewData(): Promise<{ live: HomepageContent; defaults: HomepageContent }> {
  const { legacyHero, published } = await getSources();
  return { live: buildHomepage(legacyHero, published), defaults: buildHomepage(legacyHero, null) };
}
