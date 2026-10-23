import { HOMEPAGE_DEFAULTS } from "./defaults";
import {
  SECTION_KEYS,
  type ClientLogo,
  type CoverageCity,
  type CoverageRegion,
  type FaqItem,
  type GalleryPhoto,
  type HomepageContent,
  type ReasonItem,
  type SectionKey,
  type ServiceCard,
  type StatItem,
  type TestimonialItem,
} from "./types";

export const HOMEPAGE_ICON_NAMES = [
  "Ship",
  "Truck",
  "Plane",
  "Bike",
  "Car",
  "Package",
  "Building2",
  "MapPin",
  "Layers",
  "DollarSign",
  "Home",
  "Globe",
  "ShieldCheck",
  "Clock",
  "Star",
  "Users",
  "Award",
  "Anchor",
  "Box",
  "Phone",
  "CheckCircle",
  "Warehouse",
] as const;

const IMAGE_PREFIXES = [
  "https://assets.bjalogistic.id/",
  "https://invoice.bjalogistic.id/uploads/",
  "https://bjalogistic.id/wp-content/",
  "https://wgvzgvpqqoluavrwnufi.supabase.co/storage/",
];

const MAX_TEXT = 2000;
const MAX_ITEMS = 60;

type Obj = Record<string, unknown>;

function isObj(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function str(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  return v.slice(0, MAX_TEXT);
}

function num(v: unknown, fallback: number, min: number, max: number): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

export function safeHref(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  const s = v.trim();
  if (s.startsWith("/") && !s.startsWith("//") && !/\s/.test(s)) return s;
  if (s.startsWith("https://bjalogistic.id/") && !/\s/.test(s)) return s;
  return fallback;
}

export function safeSlug(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  const s = v.trim().toLowerCase();
  if (s === "") return "";
  return /^[a-z0-9-]+$/.test(s) ? s : fallback;
}

export function safeImage(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  const s = v.trim();
  if (s.startsWith("/") && !s.startsWith("//") && !/\s/.test(s)) return s;
  if (IMAGE_PREFIXES.some((p) => s.startsWith(p)) && !/\s/.test(s)) return s;
  return fallback;
}

function icon(v: unknown, fallback: string): string {
  return typeof v === "string" && (HOMEPAGE_ICON_NAMES as readonly string[]).includes(v) ? v : fallback;
}

function list<T>(v: unknown, base: T[], item: (raw: unknown, b: T) => T, blank: T): T[] {
  if (!Array.isArray(v)) return base;
  return v.slice(0, MAX_ITEMS).map((raw, i) => item(raw, base[i] ?? blank));
}

function strList(v: unknown, base: string[]): string[] {
  if (!Array.isArray(v)) return base;
  return v
    .slice(0, MAX_ITEMS)
    .filter((s): s is string => typeof s === "string")
    .map((s) => s.slice(0, MAX_TEXT))
    .filter((s) => s.trim() !== "");
}

function sectionKeys(v: unknown, fallback: SectionKey[], fillMissing: boolean): SectionKey[] {
  if (!Array.isArray(v)) return fallback;
  const out: SectionKey[] = [];
  for (const k of v) {
    if ((SECTION_KEYS as readonly unknown[]).includes(k) && !out.includes(k as SectionKey)) {
      out.push(k as SectionKey);
    }
  }
  if (fillMissing) {
    for (const k of SECTION_KEYS) if (!out.includes(k)) out.push(k);
  }
  return out;
}

const blankStat: StatItem = { value: "", label: "", sub: "" };
const blankService: ServiceCard = {
  id: "",
  name: "",
  description: "",
  icon: "Package",
  href: "/layanan",
  waService: "",
  highlights: [],
  variant: "default",
};
const blankReason: ReasonItem = { icon: "CheckCircle", title: "", desc: "" };
const blankCity: CoverageCity = { name: "", slug: "" };
const blankRegion: CoverageRegion = { name: "", color: "merah", cargoSlug: "", cities: [] };
const blankPhoto: GalleryPhoto = { src: "", alt: "", caption: "", wide: false };
const blankLogo: ClientLogo = { name: "", src: "", width: 160, height: 60 };
const blankTestimonial: TestimonialItem = { name: "", role: "", rating: 5, text: "" };
const blankFaq: FaqItem = { q: "", a: "" };

export function mergeHomepage(base: HomepageContent, raw: unknown): HomepageContent {
  if (!isObj(raw)) return base;
  const o = (k: string): Obj => (isObj(raw[k]) ? (raw[k] as Obj) : {});

  const seo = o("seo");
  const hero = o("hero");
  const stats = o("stats");
  const services = o("services");
  const whyUs = o("whyUs");
  const coverage = o("coverage");
  const gallery = o("gallery");
  const clients = o("clients");
  const testimonials = o("testimonials");
  const faq = o("faq");
  const finalCta = o("finalCta");

  return {
    version: 1,
    order: sectionKeys(raw.order, base.order, true),
    hidden: sectionKeys(raw.hidden, base.hidden, false),
    seo: {
      title: str(seo.title, base.seo.title),
      description: str(seo.description, base.seo.description),
    },
    hero: {
      badge: str(hero.badge, base.hero.badge),
      title: str(hero.title, base.hero.title),
      titleAccent: str(hero.titleAccent, base.hero.titleAccent),
      description: str(hero.description, base.hero.description),
      image: safeImage(hero.image, base.hero.image),
      imageAlt: str(hero.imageAlt, base.hero.imageAlt),
      ctaLabel: str(hero.ctaLabel, base.hero.ctaLabel),
      trustBadges: strList(hero.trustBadges, base.hero.trustBadges),
    },
    stats: {
      items: list(stats.items, base.stats.items, (r, b) => {
        const x = isObj(r) ? r : {};
        return { value: str(x.value, b.value), label: str(x.label, b.label), sub: str(x.sub, b.sub) };
      }, blankStat),
    },
    services: {
      eyebrow: str(services.eyebrow, base.services.eyebrow),
      title: str(services.title, base.services.title),
      titleAccent: str(services.titleAccent, base.services.titleAccent),
      subtitle: str(services.subtitle, base.services.subtitle),
      items: list(services.items, base.services.items, (r, b) => {
        const x = isObj(r) ? r : {};
        return {
          id: str(x.id, b.id),
          name: str(x.name, b.name),
          description: str(x.description, b.description),
          icon: icon(x.icon, b.icon),
          href: safeHref(x.href, b.href),
          waService: str(x.waService, b.waService),
          highlights: strList(x.highlights, b.highlights),
          variant: x.variant === "corporate" ? "corporate" : x.variant === "default" ? "default" : b.variant,
        };
      }, blankService),
    },
    whyUs: {
      eyebrow: str(whyUs.eyebrow, base.whyUs.eyebrow),
      title: str(whyUs.title, base.whyUs.title),
      subtitle: str(whyUs.subtitle, base.whyUs.subtitle),
      items: list(whyUs.items, base.whyUs.items, (r, b) => {
        const x = isObj(r) ? r : {};
        return { icon: icon(x.icon, b.icon), title: str(x.title, b.title), desc: str(x.desc, b.desc) };
      }, blankReason),
    },
    coverage: {
      eyebrow: str(coverage.eyebrow, base.coverage.eyebrow),
      title: str(coverage.title, base.coverage.title),
      subtitle: str(coverage.subtitle, base.coverage.subtitle),
      regions: list(coverage.regions, base.coverage.regions, (r, b) => {
        const x = isObj(r) ? r : {};
        return {
          name: str(x.name, b.name),
          color: x.color === "merahTua" ? "merahTua" : x.color === "merah" ? "merah" : b.color,
          cargoSlug: safeSlug(x.cargoSlug, b.cargoSlug),
          cities: list(x.cities, b.cities, (rc, bc) => {
            const c = isObj(rc) ? rc : {};
            return { name: str(c.name, bc.name), slug: safeSlug(c.slug, bc.slug) };
          }, blankCity),
        };
      }, blankRegion),
    },
    gallery: {
      eyebrow: str(gallery.eyebrow, base.gallery.eyebrow),
      title: str(gallery.title, base.gallery.title),
      subtitle: str(gallery.subtitle, base.gallery.subtitle),
      photos: list(gallery.photos, base.gallery.photos, (r, b) => {
        const x = isObj(r) ? r : {};
        return {
          src: safeImage(x.src, b.src),
          alt: str(x.alt, b.alt),
          caption: str(x.caption, b.caption),
          wide: bool(x.wide, b.wide),
        };
      }, blankPhoto).filter((p) => p.src !== ""),
    },
    clients: {
      eyebrow: str(clients.eyebrow, base.clients.eyebrow),
      title: str(clients.title, base.clients.title),
      footnote: str(clients.footnote, base.clients.footnote),
      logos: list(clients.logos, base.clients.logos, (r, b) => {
        const x = isObj(r) ? r : {};
        return {
          name: str(x.name, b.name),
          src: safeImage(x.src, b.src),
          width: num(x.width, b.width, 10, 600),
          height: num(x.height, b.height, 10, 600),
        };
      }, blankLogo).filter((l) => l.src !== ""),
    },
    testimonials: {
      eyebrow: str(testimonials.eyebrow, base.testimonials.eyebrow),
      title: str(testimonials.title, base.testimonials.title),
      subtitle: str(testimonials.subtitle, base.testimonials.subtitle),
      items: list(testimonials.items, base.testimonials.items, (r, b) => {
        const x = isObj(r) ? r : {};
        return {
          name: str(x.name, b.name),
          role: str(x.role, b.role),
          rating: num(x.rating, b.rating, 1, 5),
          text: str(x.text, b.text),
        };
      }, blankTestimonial),
    },
    faq: {
      eyebrow: str(faq.eyebrow, base.faq.eyebrow),
      title: str(faq.title, base.faq.title),
      items: list(faq.items, base.faq.items, (r, b) => {
        const x = isObj(r) ? r : {};
        return { q: str(x.q, b.q), a: str(x.a, b.a) };
      }, blankFaq),
    },
    finalCta: {
      badge: str(finalCta.badge, base.finalCta.badge),
      title: str(finalCta.title, base.finalCta.title),
      titleAccent: str(finalCta.titleAccent, base.finalCta.titleAccent),
      description: str(finalCta.description, base.finalCta.description),
      waLabel: str(finalCta.waLabel, base.finalCta.waLabel),
      hours: str(finalCta.hours, base.finalCta.hours),
    },
  };
}

export interface LegacyPageHero {
  image?: string;
  alt?: string;
  tagline?: string;
  description?: string;
  stats?: { value?: string; label?: string }[];
}

export function applyLegacyHero(base: HomepageContent, hero: LegacyPageHero | null): HomepageContent {
  if (!hero) return base;
  const badges =
    Array.isArray(hero.stats) && hero.stats.length > 0
      ? hero.stats
          .map((s) => (s?.value ? `${s.value} ${s.label ?? ""}` : s?.label ?? ""))
          .filter((s) => s.trim() !== "")
      : base.hero.trustBadges;
  return {
    ...base,
    hero: {
      ...base.hero,
      image: hero.image ? safeImage(hero.image, base.hero.image) : base.hero.image,
      imageAlt: hero.alt || base.hero.imageAlt,
      title: hero.tagline || base.hero.title,
      titleAccent: hero.tagline ? "" : base.hero.titleAccent,
      description: hero.description || base.hero.description,
      trustBadges: badges.length > 0 ? badges : base.hero.trustBadges,
    },
  };
}

export function buildHomepage(legacyHero: LegacyPageHero | null, published: unknown): HomepageContent {
  return mergeHomepage(applyLegacyHero(HOMEPAGE_DEFAULTS, legacyHero), published);
}
