import { MetadataRoute } from "next";
import {
  destinationCities,
  destinationValueToSlug,
  resolveDestinationValue,
} from "@/lib/data/pricing";
import { getAllPosts } from "@/lib/blog";
import { getAllCityPages } from "@/lib/cityPages";
import { regionConfigs } from "@/lib/data/regions";
import { getAllServicePages } from "@/lib/servicePages";

const BASE_URL = "https://bjalogistic.id";

function normalizeCitySlug(slug: string) {
  const value = slug.replace(/-/g, "_");
  return resolveDestinationValue(value).replace(/_/g, "-");
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
      url: `${BASE_URL}/cargo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kirim-ke`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cek-ongkir`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/layanan/kirim-barang-kargo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
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

    const priority = ageMonths < 1 ? 0.9 : ageMonths < 3 ? 0.8 : 0.7;
    const changeFrequency: "weekly" | "monthly" =
      ageMonths < 3 ? "weekly" : "monthly";

    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency,
      priority,
    };
  });

  // Gabungkan destinationCities + CMS, lalu dedupe berdasarkan canonical slug.
  // Alias lama seperti /timika, /biak, atau /baubau tidak dimasukkan sebagai
  // URL terpisah di sitemap agar Google fokus ke URL canonical.
  const apiCityPages = await getAllCityPages();

  const destinationMap = new Map<
    string,
    {
      url: string;
      lastModified: Date;
      changeFrequency: "monthly";
      priority: number;
    }
  >();

  for (const city of destinationCities) {
    const slug = destinationValueToSlug(city.value);

    destinationMap.set(slug, {
      url: `${BASE_URL}/kirim-ke/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const city of apiCityPages) {
    const slug = normalizeCitySlug(city.slug);

    if (!destinationMap.has(slug)) {
      destinationMap.set(slug, {
        url: `${BASE_URL}/kirim-ke/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  const destinationRoutes: MetadataRoute.Sitemap = Array.from(
    destinationMap.values()
  );

  const cargoRoutes: MetadataRoute.Sitemap = regionConfigs.map((region) => ({
    url: `${BASE_URL}/cargo/${region.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const legacyServiceSlugs = [
    "cargo-laut",
    "cargo-darat",
    "cargo-udara",
    "kirim-motor",
    "kirim-mobil",
  ];

  const apiServicePages = await getAllServicePages();
  const apiServiceSlugs = new Set(apiServicePages.map((service) => service.slug));

  const legacyServiceRoutes: MetadataRoute.Sitemap = legacyServiceSlugs
    .filter((slug) => !apiServiceSlugs.has(slug))
    .map((slug) => ({
      url: `${BASE_URL}/layanan/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const serviceRoutes: MetadataRoute.Sitemap = [
    ...legacyServiceRoutes,
    ...apiServicePages.map((service) => ({
      url: `${BASE_URL}/layanan/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];

  return [
    ...staticRoutes,
    ...cargoRoutes,
    ...blogRoutes,
    ...destinationRoutes,
    ...serviceRoutes,
  ];
}
