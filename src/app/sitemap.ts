import { MetadataRoute } from "next";
import { destinationCities } from "@/lib/data/pricing";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://bjalogistic.id";

function toSlug(value: string) {
  return value.replace(/_/g, "-");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/cek-ongkir`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/layanan/cargo-laut`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/layanan/cargo-darat`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/layanan/cargo-udara`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/layanan/kirim-motor`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/layanan/kirim-mobil`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/corporate`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/jadwal-kapal`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tracking`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/kontak`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogPosts = await getAllPosts();
  const now = Date.now();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const postDate = post.date ? new Date(post.date) : lastModified;
    const ageMs = now - postDate.getTime();
    const ageMonths = ageMs / (1000 * 60 * 60 * 24 * 30);
    // Recent posts (<3 months) get higher priority
    const priority = ageMonths < 1 ? 0.9 : ageMonths < 3 ? 0.8 : 0.7;
    const changeFrequency: "weekly" | "monthly" = ageMonths < 3 ? "weekly" : "monthly";
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency,
      priority,
    };
  });

  const destinationRoutes: MetadataRoute.Sitemap = destinationCities.map((city) => ({
    url: `${BASE_URL}/kirim-ke/${toSlug(city.value)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...destinationRoutes];
}
