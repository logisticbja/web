import {
  applyLegacy,
  isObj,
  list,
  mergeCards,
  mergeHero,
  mergeSeo,
  obj,
  safeImage,
  safeSlug,
  sectionKeys,
  str,
  type InfoCard,
  type LegacyHero,
  type SitePageBase,
} from "./core";

export const CEK_ONGKIR_SECTIONS = ["hero", "calculator", "routes", "infoCards"] as const;
export type CekOngkirSection = (typeof CEK_ONGKIR_SECTIONS)[number];

export interface PopularRoute {
  label: string;
  slug: string;
  cities: string;
  badge: string;
}

export interface CekOngkirContent extends SitePageBase<CekOngkirSection> {
  routes: { label: string; items: PopularRoute[] };
  infoCards: { items: InfoCard[] };
}

export const CEK_ONGKIR_DEFAULTS: CekOngkirContent = {
  version: 1,
  order: [...CEK_ONGKIR_SECTIONS],
  hidden: [],
  seo: {
    title: "Cek Ongkir — Kalkulator Biaya Pengiriman",
    description: "Hitung estimasi ongkos kirim cargo ke Papua, Maluku, NTT, dan Sulawesi. Layanan Express dan Regular. Langsung konfirmasi via WhatsApp.",
    ogImage: "",
  },
  hero: {
    title: "Kalkulator Ongkir",
    description: "Hitung estimasi biaya pengiriman ke Papua & Indonesia Timur dalam detik",
    image: "",
    imageAlt: "Cek Ongkir",
    badges: ["Regular: min. 100 kg", "Express: min. 100 kg"],
  },
  routes: {
    label: "Rute Populer",
    items: [
      { label: "Papua", slug: "papua", cities: "Sorong, Jayapura, Manokwari", badge: "Cek per kota" },
      { label: "Maluku", slug: "maluku", cities: "Ambon, Ternate, Tual", badge: "Cek per kota" },
      { label: "NTT", slug: "ntt", cities: "Kupang, Flores, Ende", badge: "Cek per kota" },
      { label: "Sulawesi", slug: "sulawesi", cities: "Makassar, Kendari, Palu", badge: "Cek per kota" },
    ],
  },
  infoCards: {
    items: [
      { icon: "Ship", title: "Cargo Laut — Regular", desc: "Lebih ekonomis untuk barang besar, berat, dan pengiriman rutin. Minimum 100 kg." },
      { icon: "Truck", title: "Cargo Darat", desc: "Tersedia untuk rute tertentu via angkutan darat. Minimum 100 kg." },
      { icon: "Zap", title: "Express", desc: "Lebih cepat sampai untuk kebutuhan pengiriman yang lebih urgent. Minimum 100 kg." },
    ],
  },
};

const blankRoute: PopularRoute = { label: "", slug: "papua", cities: "", badge: "" };

export function mergeCekOngkir(base: CekOngkirContent, raw: unknown): CekOngkirContent {
  if (!isObj(raw)) return base;
  const routes = obj(raw, "routes");
  const cards = obj(raw, "infoCards");
  return {
    version: 1,
    order: sectionKeys(raw.order, CEK_ONGKIR_SECTIONS, base.order, true),
    hidden: sectionKeys(raw.hidden, CEK_ONGKIR_SECTIONS, base.hidden, false).filter((k) => k !== "hero" && k !== "calculator"),
    seo: mergeSeo(raw, base.seo, safeImage),
    hero: mergeHero(raw, base.hero, safeImage),
    routes: {
      label: str(routes.label, base.routes.label),
      items: list(routes.items, base.routes.items, (x, b) => ({
        label: str(x.label, b.label),
        slug: safeSlug(x.slug, b.slug),
        cities: str(x.cities, b.cities),
        badge: str(x.badge, b.badge),
      }), blankRoute),
    },
    infoCards: { items: mergeCards(cards.items, base.infoCards.items) },
  };
}

export function cekOngkirDefaults(legacy: LegacyHero | null): CekOngkirContent {
  return applyLegacy(CEK_ONGKIR_DEFAULTS, legacy, ": ", safeImage);
}
