import { iconName, isObj, list, mergeSeo, obj, safeImage, safeSlug, sectionKeys, str, type SiteIconName, type SiteSeo } from "./core";

export const LAYANAN_SECTIONS = ["hero", "services"] as const;
export type LayananSection = (typeof LAYANAN_SECTIONS)[number];

export interface LayananCard {
  slug: string;
  icon: SiteIconName;
  name: string;
  tagline: string;
  price: string;
  eta: string;
}

export interface LayananContent {
  version: number;
  order: LayananSection[];
  hidden: never[];
  seo: SiteSeo;
  hero: { breadcrumb: string; title: string; description: string; image: string; imageAlt: string };
  services: { linkLabel: string; items: LayananCard[] };
}

export const LAYANAN_OG_DESCRIPTION = "Bandingkan cargo laut, darat, dan udara untuk kirim barang kargo ke Indonesia Timur.";

export const LAYANAN_DEFAULTS: LayananContent = {
  version: 1,
  order: ["hero", "services"],
  hidden: [],
  seo: {
    title: "Kirim Barang Kargo ke Papua & Indonesia Timur",
    description: "Pilih layanan kirim barang kargo ke Papua, Maluku, NTT & Sulawesi: cargo laut, darat, atau udara. Bandingkan harga dan estimasi waktu, pesan via WhatsApp.",
    ogImage: "",
  },
  hero: {
    breadcrumb: "Kirim Barang Kargo",
    title: "Kirim Barang Kargo ke Papua & Indonesia Timur",
    description: "Pilih metode pengiriman sesuai kebutuhan dan budget kamu — laut, darat, atau udara. Minimum pengiriman 100 kg untuk cargo laut & darat.",
    image: "https://assets.bjalogistic.id/blog/2026/09/4c30d03f37182e90dc2b.jpg",
    imageAlt: "Kirim Barang Kargo ke Papua & Indonesia Timur",
  },
  services: {
    linkLabel: "Lihat detail",
    items: [
      { slug: "cargo-laut", icon: "Ship", name: "Cargo Laut", tagline: "Paling hemat untuk barang berat & besar", price: "Mulai Rp 6.000/kg", eta: "14–20 hari" },
      { slug: "cargo-darat", icon: "Truck", name: "Cargo Darat", tagline: "Seimbang antara kecepatan dan harga", price: "Mulai Rp 7.000/kg", eta: "7–14 hari" },
      { slug: "cargo-udara", icon: "Plane", name: "Cargo Udara", tagline: "Tercepat untuk kebutuhan urgent", price: "Mulai Rp 20.000/kg", eta: "2–4 hari" },
    ],
  },
};

export function mergeLayanan(base: LayananContent, raw: unknown): LayananContent {
  if (!isObj(raw)) return base;
  const hero = obj(raw, "hero");
  const services = obj(raw, "services");
  return {
    version: 1,
    order: sectionKeys(raw.order, LAYANAN_SECTIONS, base.order, true),
    hidden: [],
    seo: mergeSeo(raw, base.seo, safeImage),
    hero: {
      breadcrumb: str(hero.breadcrumb, base.hero.breadcrumb),
      title: str(hero.title, base.hero.title),
      description: str(hero.description, base.hero.description),
      image: safeImage(hero.image, base.hero.image),
      imageAlt: str(hero.imageAlt, base.hero.imageAlt),
    },
    services: {
      linkLabel: str(services.linkLabel, base.services.linkLabel),
      items: list(services.items, base.services.items, (x, b) => ({
        slug: safeSlug(x.slug, b.slug),
        icon: iconName(x.icon, b.icon),
        name: str(x.name, b.name),
        tagline: str(x.tagline, b.tagline),
        price: str(x.price, b.price),
        eta: str(x.eta, b.eta),
      }), { slug: "", icon: "Package", name: "", tagline: "", price: "", eta: "" }),
    },
  };
}
