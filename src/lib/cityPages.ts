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
}

// GET /public-city-pages.php?slug=<slug>
// CMS adalah sumber utama data halaman kota. Revalidate dibuat singkat supaya
// perubahan tarif/ETA/SEO di CMS cepat ikut tampil tanpa deploy GitHub.
export async function getCityPage(slug: string): Promise<CityPageData | null> {
  try {
    const url = new URL(process.env.CITY_PAGES_API_URL!);
    url.searchParams.set("slug", slug);

    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 60, tags: ["cms-content"] },
    });

    const json = await res.json();
    if (json.status !== "success") return null;

    return json.data as CityPageData;
  } catch {
    return null;
  }
}

// GET /public-city-pages.php (tanpa slug) — daftar semua kota published.
export async function getAllCityPages(): Promise<CityPageData[]> {
  try {
    const url = new URL(process.env.CITY_PAGES_API_URL!);

    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 60, tags: ["cms-content"] },
    });

    const json = await res.json();
    if (json.status !== "success") return [];

    return (json.data as CityPageData[]) ?? [];
  } catch {
    return [];
  }
}
