export interface CityPageService {
  title: string;
  description: string;
}

export interface CityPageTestimonial {
  name: string;
  message: string;
  rating: number;
}

export interface CityPageFaq {
  question: string;
  answer: string;
}

export interface CityPagePopupInfo {
  enabled: boolean;
  minKg: number;
  restrictedItems: string[];
}

export interface CityPageData {
  city: string;
  slug: string;
  region?: string;

  priceRegular: string | null;
  regularEtaMin: number | null;
  regularEtaMax: number | null;

  priceExpress: string | null;
  expressEtaMin: number | null;
  expressEtaMax: number | null;

  minWeightKg: number;

  services: CityPageService[];
  testimonials: CityPageTestimonial[];
  metaTitle: string;
  metaDescription: string;
  seoCustom?: boolean;

  imageBanner?: string;
  faqs?: CityPageFaq[];
  focusKeyword?: string;
  ogImage?: string;
  belowBannerContent?: string;
  servedCities?: string[];
  popupInfo?: CityPagePopupInfo;
}

const CITY_FETCH_ATTEMPTS = 3;

function isBuildPhase() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

async function fetchCityPageOnce(slug: string) {
  const url = new URL(process.env.CITY_PAGES_API_URL!);
  url.searchParams.set("slug", slug);

  const res = await fetch(url.toString(), {
    headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
    next: { revalidate: 3600, tags: ["cms-content"] },
  });

  if (res.status >= 500) throw new Error(`City page API ${res.status} for ${slug}`);
  if (!res.ok) return null;

  const json = await res.json();
  if (json.status !== "success") return null;

  return json.data as CityPageData;
}

export async function getCityPage(slug: string): Promise<CityPageData | null> {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= CITY_FETCH_ATTEMPTS; attempt++) {
    try {
      return await fetchCityPageOnce(slug);
    } catch (error) {
      lastError = error;
      if (attempt < CITY_FETCH_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
    }
  }

  if (isBuildPhase()) return null;
  throw lastError;
}

export async function getAllCityPages(): Promise<CityPageData[]> {
  try {
    const url = new URL(process.env.CITY_PAGES_API_URL!);

    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 3600, tags: ["cms-content"] },
    });

    const json = await res.json();
    if (json.status !== "success") return [];

    return (json.data as CityPageData[]) ?? [];
  } catch {
    return [];
  }
}
