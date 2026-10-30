import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview/"],
    },
    sitemap: ["https://bjalogistic.id/sitemap.xml", "https://bjalogistic.id/sitemap-lama.xml"],
  };
}
