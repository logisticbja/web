import type { RegionConfig } from "@/lib/data/regions";
import { SHIPMENT_PHOTOS } from "@/lib/data/shipmentPhotos";
import { isObj, list, mergeSeo, obj, safeImage, sectionKeys, str, type SiteSeo } from "./core";

export const TUJUAN_SECTIONS = ["hero", "main", "gallery", "schedule", "notice", "testimonials", "faq", "cta"] as const;
export type TujuanSection = (typeof TUJUAN_SECTIONS)[number];
export const TUJUAN_FIXED: TujuanSection[] = ["hero", "main"];

export interface TujuanStat {
  value: string;
  label: string;
}

export interface TujuanTestimonial {
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
}

export interface TujuanGalleryItem {
  image: string;
  alt: string;
  caption: string;
  citySlug: string;
}

export interface TujuanFaq {
  q: string;
  a: string;
}

export interface TujuanContent {
  version: number;
  order: TujuanSection[];
  hidden: TujuanSection[];
  seo: SiteSeo;
  hero: { title: string; description: string; image: string; imageAlt: string; stats: TujuanStat[]; waLabel: string; waText: string };
  main: { calculatorTitle: string; citiesTitle: string };
  gallery: { title: string; description: string; items: TujuanGalleryItem[] };
  schedule: { title: string; linkLabel: string; note: string };
  notice: { label: string; text: string };
  testimonials: { title: string; items: TujuanTestimonial[] };
  faq: { title: string; items: TujuanFaq[] };
  cta: { title: string; description: string; waLabel: string };
}

export interface LegacyCargoHero {
  image?: string;
  alt?: string;
  tagline?: string;
  description?: string;
  stats?: { value?: string; label?: string }[];
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  seoOgImage?: string;
}

export function tujuanBase(config: RegionConfig): TujuanContent {
  return {
    version: 1,
    order: [...TUJUAN_SECTIONS],
    hidden: [],
    seo: {
      title: config.seoTitle ?? `Cargo ke ${config.label} — Harga Terjangkau & Terpercaya`,
      description: config.seoDescription ?? `Jasa ekspedisi cargo ke ${config.label}. ${config.description} Cek harga langsung, konfirmasi via WhatsApp.`,
      ogImage: "",
    },
    hero: {
      title: config.tagline,
      description: config.description,
      image: "",
      imageAlt: `Cargo ke ${config.label}`,
      stats: config.stats.map((s) => ({ value: s.value, label: s.label })),
      waLabel: "Chat WhatsApp Sekarang",
      waText: config.waText,
    },
    main: {
      calculatorTitle: `Cek Harga Cargo ke ${config.label}`,
      citiesTitle: `Kota yang Dilayani di ${config.label}`,
    },
    gallery: {
      title: `Dokumentasi Pengiriman ke ${config.label}`,
      description: "Foto asli dari pengiriman yang kami tangani, mulai dari pickup dan muat barang sampai barang diterima di kota tujuan.",
      items: (SHIPMENT_PHOTOS[config.slug] ?? []).map((p) => ({ ...p })),
    },
    schedule: {
      title: `Jadwal Kapal ke ${config.label}`,
      linkLabel: "Lihat semua →",
      note: "* Jadwal kapal dapat berubah karena kondisi operasional, cuaca, pelabuhan, atau perjalanan. Konfirmasi jadwal terdekat ke CS BJA Logistic sebelum pengiriman.",
    },
    notice: {
      label: "Catatan pengiriman:",
      text: "Tarif, layanan Reguler atau Express, dan estimasi berbeda untuk setiap kota tujuan. Estimasi waktu dihitung sejak kapal berangkat dari pelabuhan asal. Pastikan konfirmasi jadwal kapal terdekat ke CS BJA Logistic sebelum melakukan pengiriman.",
    },
    testimonials: {
      title: "Kata Pelanggan Kami",
      items: config.testimonials.map((t) => ({ name: t.name, role: t.role, city: t.city, rating: t.rating, text: t.text })),
    },
    faq: {
      title: "Pertanyaan Umum",
      items: config.faqs.map((f) => ({ q: f.q, a: f.a })),
    },
    cta: {
      title: `Siap Kirim ke ${config.label}?`,
      description: "Chat langsung dengan tim BJA Logistic untuk cek tarif terbaru, memastikan layanan yang tersedia, dan konfirmasi jadwal kapal terdekat.",
      waLabel: "Chat via WhatsApp Sekarang",
    },
  };
}

export function applyLegacyCargo(base: TujuanContent, raw: LegacyCargoHero | null): TujuanContent {
  if (!raw || typeof raw !== "object") return base;
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const legacy = {
    image: s(raw.image),
    alt: s(raw.alt),
    tagline: s(raw.tagline),
    description: s(raw.description),
    seoMetaTitle: s(raw.seoMetaTitle),
    seoMetaDescription: s(raw.seoMetaDescription),
    seoOgImage: s(raw.seoOgImage),
  };
  const stats = Array.isArray(raw.stats)
    ? raw.stats
        .filter(isObj)
        .map((s) => ({ value: typeof s.value === "string" ? s.value : "", label: typeof s.label === "string" ? s.label : "" }))
        .filter((s) => s.value.trim() !== "" || s.label.trim() !== "")
    : [];
  return {
    ...base,
    seo: {
      title: legacy.seoMetaTitle || base.seo.title,
      description: legacy.seoMetaDescription || base.seo.description,
      ogImage: legacy.seoOgImage ? safeImage(legacy.seoOgImage, base.seo.ogImage) : base.seo.ogImage,
    },
    hero: {
      ...base.hero,
      title: legacy.tagline || base.hero.title,
      description: legacy.description || base.hero.description,
      image: legacy.image ? safeImage(legacy.image, base.hero.image) : base.hero.image,
      imageAlt: legacy.alt || base.hero.imageAlt,
      stats: stats.length > 0 ? stats : base.hero.stats,
    },
  };
}

function rating(v: unknown, fallback: number): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(5, Math.max(1, Math.round(n)));
}

function safeCitySlug(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  const t = v.trim().toLowerCase();
  return /^[a-z0-9-]{0,60}$/.test(t) ? t : fallback;
}

function withGalleryAfterMain(rawOrder: unknown, order: TujuanSection[]): TujuanSection[] {
  if (Array.isArray(rawOrder) && rawOrder.includes("gallery")) return order;
  const rest: TujuanSection[] = order.filter((k) => k !== "gallery");
  const i = rest.indexOf("main");
  rest.splice(i === -1 ? rest.length : i + 1, 0, "gallery");
  return rest;
}

export function mergeTujuan(base: TujuanContent, raw: unknown): TujuanContent {
  if (!isObj(raw)) return base;
  const hero = obj(raw, "hero");
  const main = obj(raw, "main");
  const gallery = obj(raw, "gallery");
  const schedule = obj(raw, "schedule");
  const notice = obj(raw, "notice");
  const testimonials = obj(raw, "testimonials");
  const faq = obj(raw, "faq");
  const cta = obj(raw, "cta");
  return {
    version: 1,
    order: withGalleryAfterMain(raw.order, sectionKeys(raw.order, TUJUAN_SECTIONS, base.order, true)),
    hidden: sectionKeys(raw.hidden, TUJUAN_SECTIONS, base.hidden, false).filter((k) => !TUJUAN_FIXED.includes(k)),
    seo: mergeSeo(raw, base.seo, safeImage),
    hero: {
      title: str(hero.title, base.hero.title),
      description: str(hero.description, base.hero.description),
      image: safeImage(hero.image, base.hero.image),
      imageAlt: str(hero.imageAlt, base.hero.imageAlt),
      stats: list(hero.stats, base.hero.stats, (x, b) => ({ value: str(x.value, b.value), label: str(x.label, b.label) }), { value: "", label: "" }),
      waLabel: str(hero.waLabel, base.hero.waLabel),
      waText: str(hero.waText, base.hero.waText),
    },
    main: {
      calculatorTitle: str(main.calculatorTitle, base.main.calculatorTitle),
      citiesTitle: str(main.citiesTitle, base.main.citiesTitle),
    },
    gallery: {
      title: str(gallery.title, base.gallery.title),
      description: str(gallery.description, base.gallery.description),
      items: list(gallery.items, base.gallery.items, (x, b) => ({
        image: safeImage(x.image, b.image),
        alt: str(x.alt, b.alt),
        caption: str(x.caption, b.caption),
        citySlug: safeCitySlug(x.citySlug, b.citySlug),
      }), { image: "", alt: "", caption: "", citySlug: "" }).filter((it) => it.image !== ""),
    },
    schedule: {
      title: str(schedule.title, base.schedule.title),
      linkLabel: str(schedule.linkLabel, base.schedule.linkLabel),
      note: str(schedule.note, base.schedule.note),
    },
    notice: { label: str(notice.label, base.notice.label), text: str(notice.text, base.notice.text) },
    testimonials: {
      title: str(testimonials.title, base.testimonials.title),
      items: list(testimonials.items, base.testimonials.items, (x, b) => ({
        name: str(x.name, b.name),
        role: str(x.role, b.role),
        city: str(x.city, b.city),
        rating: rating(x.rating, b.rating),
        text: str(x.text, b.text),
      }), { name: "", role: "", city: "", rating: 5, text: "" }),
    },
    faq: {
      title: str(faq.title, base.faq.title),
      items: list(faq.items, base.faq.items, (x, b) => ({ q: str(x.q, b.q), a: str(x.a, b.a) }), { q: "", a: "" }),
    },
    cta: {
      title: str(cta.title, base.cta.title),
      description: str(cta.description, base.cta.description),
      waLabel: str(cta.waLabel, base.cta.waLabel),
    },
  };
}
