export { safeHref, safeImage, safeSlug } from "@/lib/homepage/normalize";

export const SITE_ICON_NAMES = [
  "Ship",
  "Truck",
  "Zap",
  "Plane",
  "Package",
  "Clock",
  "MessageCircle",
  "MapPin",
  "ShieldCheck",
  "CheckCircle",
  "Calculator",
  "Calendar",
  "Phone",
  "Star",
  "Warehouse",
  "Anchor",
  "Globe",
  "Users",
  "Award",
  "Box",
] as const;

export type SiteIconName = (typeof SITE_ICON_NAMES)[number];

export interface SiteSeo {
  title: string;
  description: string;
  ogImage: string;
}

export interface SiteHero {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  badges: string[];
}

export interface SitePageBase<K extends string> {
  version: number;
  order: K[];
  hidden: K[];
  seo: SiteSeo;
  hero: SiteHero;
}

export interface InfoCard {
  icon: SiteIconName;
  title: string;
  desc: string;
}

export interface LegacyHero {
  image?: string;
  alt?: string;
  tagline?: string;
  description?: string;
  stats?: { value?: string; label?: string }[];
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  seoOgImage?: string;
}

const MAX_TEXT = 4000;
const MAX_ITEMS = 60;

export type Obj = Record<string, unknown>;

export function isObj(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function obj(raw: Obj, k: string): Obj {
  return isObj(raw[k]) ? (raw[k] as Obj) : {};
}

export function str(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  return v.slice(0, MAX_TEXT);
}

export function list<T>(v: unknown, base: T[], item: (raw: Obj, b: T) => T, blank: T): T[] {
  if (!Array.isArray(v)) return base;
  return v.slice(0, MAX_ITEMS).map((raw, i) => item(isObj(raw) ? raw : {}, base[i] ?? blank));
}

export function strList(v: unknown, base: string[]): string[] {
  if (!Array.isArray(v)) return base;
  return v
    .slice(0, MAX_ITEMS)
    .filter((s): s is string => typeof s === "string")
    .map((s) => s.slice(0, MAX_TEXT))
    .filter((s) => s.trim() !== "");
}

export function iconName(v: unknown, fallback: SiteIconName): SiteIconName {
  return typeof v === "string" && (SITE_ICON_NAMES as readonly string[]).includes(v) ? (v as SiteIconName) : fallback;
}

export function sectionKeys<K extends string>(v: unknown, all: readonly K[], fallback: K[], fillMissing: boolean): K[] {
  if (!Array.isArray(v)) return fallback;
  const out: K[] = [];
  for (const k of v) {
    if ((all as readonly unknown[]).includes(k) && !out.includes(k as K)) out.push(k as K);
  }
  if (fillMissing) for (const k of all) if (!out.includes(k)) out.push(k);
  return out;
}

export function mergeSeo(raw: Obj, base: SiteSeo, safeImageFn: (v: unknown, f: string) => string): SiteSeo {
  const s = obj(raw, "seo");
  return {
    title: str(s.title, base.title),
    description: str(s.description, base.description),
    ogImage: safeImageFn(s.ogImage, base.ogImage),
  };
}

export function mergeHero(raw: Obj, base: SiteHero, safeImageFn: (v: unknown, f: string) => string): SiteHero {
  const h = obj(raw, "hero");
  return {
    title: str(h.title, base.title),
    description: str(h.description, base.description),
    image: safeImageFn(h.image, base.image),
    imageAlt: str(h.imageAlt, base.imageAlt),
    badges: strList(h.badges, base.badges),
  };
}

export function mergeCards(v: unknown, base: InfoCard[]): InfoCard[] {
  return list(v, base, (x, b) => ({ icon: iconName(x.icon, b.icon), title: str(x.title, b.title), desc: str(x.desc, b.desc) }), {
    icon: "CheckCircle",
    title: "",
    desc: "",
  });
}

export function legacyBadges(hero: LegacyHero, sep: string): string[] {
  if (!Array.isArray(hero.stats)) return [];
  return hero.stats
    .map((s) => (s?.value ? `${s.value}${sep}${s.label ?? ""}` : s?.label ?? ""))
    .filter((s) => s.trim() !== "");
}

export function applyLegacy<T extends SitePageBase<string>>(
  base: T,
  hero: LegacyHero | null,
  sep: string,
  safeImageFn: (v: unknown, f: string) => string,
): T {
  if (!hero || !isObj(hero)) return base;
  const badges = legacyBadges(hero, sep);
  return {
    ...base,
    seo: {
      title: hero.seoMetaTitle || base.seo.title,
      description: hero.seoMetaDescription || base.seo.description,
      ogImage: hero.seoOgImage ? safeImageFn(hero.seoOgImage, base.seo.ogImage) : base.seo.ogImage,
    },
    hero: {
      ...base.hero,
      title: hero.tagline || base.hero.title,
      description: hero.description || base.hero.description,
      image: hero.image ? safeImageFn(hero.image, base.hero.image) : base.hero.image,
      imageAlt: hero.alt || base.hero.imageAlt,
      badges: badges.length > 0 ? badges : base.hero.badges,
    },
  };
}
