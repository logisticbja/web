import { isObj, mergeSeo, obj, safeImage, str, type SiteSeo } from "./core";

export interface BlogIndexContent {
  version: number;
  order: ("hero" | "posts")[];
  hidden: never[];
  seo: SiteSeo;
  hero: { breadcrumb: string; title: string; description: string };
  posts: { emptyText: string };
}

export const BLOG_OG = {
  title: "Blog BJA Logistic — Tips & Panduan Pengiriman Cargo",
  description: "Tips pengiriman cargo, panduan packing, info jadwal kapal, dan panduan ekspedisi ke Papua & Indonesia Timur.",
  twitterDescription: "Tips pengiriman cargo, panduan packing, dan panduan ekspedisi ke Papua & Indonesia Timur.",
};

export const BLOG_INDEX_DEFAULTS: BlogIndexContent = {
  version: 1,
  order: ["hero", "posts"],
  hidden: [],
  seo: {
    title: "Blog — Tips & Panduan Pengiriman Cargo",
    description: "Tips pengiriman cargo, panduan packing, info jadwal kapal, dan panduan ekspedisi ke Papua & Indonesia Timur dari tim BJA Logistic.",
    ogImage: "",
  },
  hero: {
    breadcrumb: "Blog",
    title: "Blog BJA Logistic",
    description: "Tips pengiriman cargo, panduan packing, info jadwal kapal, dan panduan ekspedisi ke Papua & Indonesia Timur.",
  },
  posts: { emptyText: "Belum ada artikel." },
};

export function mergeBlogIndex(base: BlogIndexContent, raw: unknown): BlogIndexContent {
  if (!isObj(raw)) return base;
  const hero = obj(raw, "hero");
  const posts = obj(raw, "posts");
  return {
    version: 1,
    order: ["hero", "posts"],
    hidden: [],
    seo: mergeSeo(raw, base.seo, safeImage),
    hero: {
      breadcrumb: str(hero.breadcrumb, base.hero.breadcrumb),
      title: str(hero.title, base.hero.title),
      description: str(hero.description, base.hero.description),
    },
    posts: { emptyText: str(posts.emptyText, base.posts.emptyText) },
  };
}
