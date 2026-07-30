export interface CityPageService {
  title: string;
  description: string;
}

export interface CityPageTestimonial {
  name: string;
  message: string;
  rating: number;
}

export interface CityPageData {
  city: string;
  slug: string;
  priceRegular: string;
  priceExpress: string;
  services: CityPageService[];
  testimonials: CityPageTestimonial[];
  metaTitle: string;
  metaDescription: string;
}

// GET /public-city-pages.php?slug=<slug> — returns null on 404, API-key error,
// or any network/parse failure, so callers can fall back to hardcoded content.
export async function getCityPage(slug: string): Promise<CityPageData | null> {
  try {
    const url = new URL(process.env.CITY_PAGES_API_URL!);
    url.searchParams.set("slug", slug);

    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 300 },
    });

    const json = await res.json();
    if (json.status !== "success") return null;
    return json.data as CityPageData;
  } catch {
    return null;
  }
}
