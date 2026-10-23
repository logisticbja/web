import { applyLegacy, isObj, mergeHero, mergeSeo, obj, safeImage, sectionKeys, str, type LegacyHero, type SitePageBase } from "./core";

export const JADWAL_KAPAL_SECTIONS = ["hero", "schedule", "notice", "cta"] as const;
export type JadwalKapalSection = (typeof JADWAL_KAPAL_SECTIONS)[number];

export interface JadwalKapalContent extends SitePageBase<JadwalKapalSection> {
  schedule: { filterLabel: string; emptyText: string };
  notice: { label: string; text: string };
  cta: { waLabel: string };
}

export const JADWAL_KAPAL_DEFAULTS: JadwalKapalContent = {
  version: 1,
  order: [...JADWAL_KAPAL_SECTIONS],
  hidden: [],
  seo: {
    title: "Jadwal Kapal PELNI ke Papua & Indonesia Timur",
    description: "Jadwal keberangkatan kapal PELNI dan Roro dari Surabaya ke Papua, Maluku, NTT, dan Sulawesi. Cek estimasi waktu tiba dan frekuensi keberangkatan.",
    ogImage: "",
  },
  hero: {
    title: "Jadwal Kapal",
    description: "Jadwal keberangkatan kapal ke Papua & Indonesia Timur",
    image: "",
    imageAlt: "Jadwal Kapal",
    badges: [],
  },
  schedule: {
    filterLabel: "Filter:",
    emptyText: "Belum ada jadwal kapal untuk wilayah ini. Konfirmasi jadwal terkini via WhatsApp.",
  },
  notice: {
    label: "Perhatian:",
    text: "Jadwal di atas bersifat estimasi dan dapat berubah sewaktu-waktu tergantung cuaca, kondisi laut, dan kebijakan operator. Konfirmasi jadwal terkini via WhatsApp.",
  },
  cta: { waLabel: "Konfirmasi Jadwal via WhatsApp" },
};

export function mergeJadwalKapal(base: JadwalKapalContent, raw: unknown): JadwalKapalContent {
  if (!isObj(raw)) return base;
  const schedule = obj(raw, "schedule");
  const notice = obj(raw, "notice");
  const cta = obj(raw, "cta");
  return {
    version: 1,
    order: sectionKeys(raw.order, JADWAL_KAPAL_SECTIONS, base.order, true),
    hidden: sectionKeys(raw.hidden, JADWAL_KAPAL_SECTIONS, base.hidden, false).filter((k) => k !== "hero" && k !== "schedule"),
    seo: mergeSeo(raw, base.seo, safeImage),
    hero: mergeHero(raw, base.hero, safeImage),
    schedule: { filterLabel: str(schedule.filterLabel, base.schedule.filterLabel), emptyText: str(schedule.emptyText, base.schedule.emptyText) },
    notice: { label: str(notice.label, base.notice.label), text: str(notice.text, base.notice.text) },
    cta: { waLabel: str(cta.waLabel, base.cta.waLabel) },
  };
}

export function jadwalKapalDefaults(legacy: LegacyHero | null): JadwalKapalContent {
  return applyLegacy(JADWAL_KAPAL_DEFAULTS, legacy, " ", safeImage);
}
