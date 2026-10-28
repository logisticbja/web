import { applyLegacy, isObj, mergeCards, mergeHero, mergeSeo, obj, safeImage, sectionKeys, str, type InfoCard, type LegacyHero, type SitePageBase } from "./core";

export const TRACKING_SECTIONS = ["hero", "search", "infoCards"] as const;
export type TrackingSection = (typeof TRACKING_SECTIONS)[number];

export interface TrackingContent extends SitePageBase<TrackingSection> {
  search: { label: string; placeholder: string; buttonLabel: string };
  infoCards: { items: InfoCard[] };
}

export const TRACKING_DEFAULTS: TrackingContent = {
  version: 1,
  order: [...TRACKING_SECTIONS],
  hidden: [],
  seo: {
    title: "Cek Resi BJA Logistic – Lacak Pengiriman Cargo",
    description: "Cek resi BJA Logistic: masukkan nomor STT untuk melihat status dan riwayat perjalanan cargo Anda ke Papua, Maluku, NTT, dan Sulawesi.",
    ogImage: "",
  },
  hero: {
    title: "Cek Resi BJA Logistic",
    description: "Masukkan nomor resi (STT) untuk melihat status dan posisi kiriman Anda",
    image: "",
    imageAlt: "Cek Resi BJA Logistic",
    badges: [],
  },
  search: {
    label: "Nomor Resi",
    placeholder: "Contoh: STT-20261028-AB12",
    buttonLabel: "Cek",
  },
  infoCards: {
    items: [
      { icon: "MessageCircle", title: "WhatsApp", desc: "Chat langsung dengan CS kami untuk info status real-time" },
      { icon: "Package", title: "Nomor Resi", desc: "Diberikan setelah barang diterima di gudang kami" },
      { icon: "Clock", title: "Update Status", desc: "Kami update status setiap ada perubahan posisi paket" },
    ],
  },
};

export function mergeTracking(base: TrackingContent, raw: unknown): TrackingContent {
  if (!isObj(raw)) return base;
  const search = obj(raw, "search");
  const cards = obj(raw, "infoCards");
  return {
    version: 1,
    order: sectionKeys(raw.order, TRACKING_SECTIONS, base.order, true),
    hidden: sectionKeys(raw.hidden, TRACKING_SECTIONS, base.hidden, false).filter((k) => k !== "hero" && k !== "search"),
    seo: mergeSeo(raw, base.seo, safeImage),
    hero: mergeHero(raw, base.hero, safeImage),
    search: {
      label: str(search.label, base.search.label),
      placeholder: str(search.placeholder, base.search.placeholder),
      buttonLabel: str(search.buttonLabel, base.search.buttonLabel),
    },
    infoCards: { items: mergeCards(cards.items, base.infoCards.items) },
  };
}

export function trackingDefaults(legacy: LegacyHero | null): TrackingContent {
  return applyLegacy(TRACKING_DEFAULTS, legacy, " ", safeImage);
}
