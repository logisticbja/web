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
  priceRegular: string;
  priceExpress: string;
  services: CityPageService[];
  testimonials: CityPageTestimonial[];
  metaTitle: string;
  metaDescription: string;
  imageBanner?: string;
  faqs?: CityPageFaq[];
}

// GET /public-city-pages.php (tanpa slug) — daftar semua kota published.
// Dipakai buat sitemap.ts, biar kota baru dari CMS/import otomatis kedaftar
// tanpa perlu deploy kode baru. Pola sama persis seperti getAllServicePages().
export async function getAllCityPages(): Promise<CityPageData[]> {
  try {
    const url = new URL(process.env.CITY_PAGES_API_URL!);
    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 300 },
    });
    const json = await res.json();
    if (json.status !== "success") return [];
    return (json.data as CityPageData[]) ?? [];
  } catch {
    return [];
  }
}
