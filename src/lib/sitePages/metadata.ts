import type { Metadata } from "next";
import { stripBrand } from "@/lib/seoTitle";
import type { SitePageBase } from "./core";

const BASE_URL = "https://bjalogistic.id";

export function siteMetadata(content: SitePageBase<string>, path: string, fallbackTitle: string, extra?: Partial<Metadata>): Metadata {
  const title = stripBrand(content.seo.title) || fallbackTitle;
  const description = content.seo.description;
  const canonical = `${BASE_URL}${path}`;
  const ogImage = content.seo.ogImage || content.hero.image || "/og-image.png";
  return {
    title,
    description,
    alternates: { canonical },
    ...extra,
    openGraph: { title, description, url: canonical, images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
