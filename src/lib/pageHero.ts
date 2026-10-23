export interface PageHeroStat {
  value: string;
  label: string;
}

export interface PageHeroContent {
  image?: string;
  alt?: string;
  tagline?: string;
  description?: string;
  stats?: PageHeroStat[];
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  seoFocusKeyword?: string;
  seoOgImage?: string;
  content?: unknown;
}

const CRM_BASE_URL = process.env.CRM_API_URL ?? "https://invoice.bjalogistic.id";
const CRM_API_KEY = process.env.CRM_PUBLIC_API_KEY ?? "";

export async function getPageHero(page: string): Promise<PageHeroContent | null> {
  try {
    const res = await fetch(
      `${CRM_BASE_URL}/public-page-hero.php?page=${encodeURIComponent(page)}`,
      {
        headers: { "X-API-Key": CRM_API_KEY },
        next: { revalidate: 3600, tags: ["cms-content"] }, signal: AbortSignal.timeout(3000),
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}
