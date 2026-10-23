import { safeImage, safeSlug } from "@/lib/homepage/normalize";
import type { PageHeroContent, PageHeroStat } from "@/lib/pageHero";

export const TOOL_ICON_NAMES = [
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
] as const;

export type ToolIconName = (typeof TOOL_ICON_NAMES)[number];

export interface ToolInfoCard {
  icon: ToolIconName;
  title: string;
  desc: string;
}

export interface PopularRoute {
  label: string;
  slug: string;
  cities: string;
  badge: string;
}

export interface CekOngkirContent {
  routesLabel: string;
  routes: PopularRoute[];
  infoCards: ToolInfoCard[];
}

export interface JadwalKapalContent {
  noticeLabel: string;
  noticeText: string;
  waLabel: string;
  emptyText: string;
}

export interface TrackingContent {
  inputPlaceholder: string;
  infoCards: ToolInfoCard[];
}

export const CEK_ONGKIR_DEFAULTS: CekOngkirContent = {
  routesLabel: "Rute Populer",
  routes: [
    { label: "Papua", slug: "papua", cities: "Sorong, Jayapura, Manokwari", badge: "Cek per kota" },
    { label: "Maluku", slug: "maluku", cities: "Ambon, Ternate, Tual", badge: "Cek per kota" },
    { label: "NTT", slug: "ntt", cities: "Kupang, Flores, Ende", badge: "Cek per kota" },
    { label: "Sulawesi", slug: "sulawesi", cities: "Makassar, Kendari, Palu", badge: "Cek per kota" },
  ],
  infoCards: [
    { icon: "Ship", title: "Cargo Laut — Regular", desc: "Lebih ekonomis untuk barang besar, berat, dan pengiriman rutin. Minimum 100 kg." },
    { icon: "Truck", title: "Cargo Darat", desc: "Tersedia untuk rute tertentu via angkutan darat. Minimum 100 kg." },
    { icon: "Zap", title: "Express", desc: "Lebih cepat sampai untuk kebutuhan pengiriman yang lebih urgent. Minimum 100 kg." },
  ],
};

export const JADWAL_KAPAL_DEFAULTS: JadwalKapalContent = {
  noticeLabel: "Perhatian:",
  noticeText: "Jadwal di atas bersifat estimasi dan dapat berubah sewaktu-waktu tergantung cuaca, kondisi laut, dan kebijakan operator. Konfirmasi jadwal terkini via WhatsApp.",
  waLabel: "Konfirmasi Jadwal via WhatsApp",
  emptyText: "Belum ada jadwal kapal untuk wilayah ini. Konfirmasi jadwal terkini via WhatsApp.",
};

export const TRACKING_DEFAULTS: TrackingContent = {
  inputPlaceholder: "Masukkan nomor resi — contoh: BJA-2024-001",
  infoCards: [
    { icon: "MessageCircle", title: "WhatsApp", desc: "Chat langsung dengan CS kami untuk info status real-time" },
    { icon: "Package", title: "Nomor Resi", desc: "Diberikan setelah barang diterima di gudang kami" },
    { icon: "Clock", title: "Update Status", desc: "Kami update status setiap ada perubahan posisi paket" },
  ],
};

const MAX_TEXT = 600;
const MAX_ITEMS = 12;

type Obj = Record<string, unknown>;

function isObj(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function text(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  const s = v.slice(0, MAX_TEXT);
  return s.trim() === "" ? fallback : s;
}

function rawText(v: unknown): string {
  return typeof v === "string" ? v.slice(0, MAX_TEXT) : "";
}

function iconName(v: unknown, fallback: ToolIconName): ToolIconName {
  return typeof v === "string" && (TOOL_ICON_NAMES as readonly string[]).includes(v) ? (v as ToolIconName) : fallback;
}

function cards(v: unknown, base: ToolInfoCard[]): ToolInfoCard[] {
  if (!Array.isArray(v)) return base;
  return v
    .slice(0, MAX_ITEMS)
    .filter(isObj)
    .map((c) => ({ icon: iconName(c.icon, "CheckCircle"), title: rawText(c.title), desc: rawText(c.desc) }))
    .filter((c) => c.title.trim() !== "" || c.desc.trim() !== "");
}

function routes(v: unknown, base: PopularRoute[]): PopularRoute[] {
  if (!Array.isArray(v)) return base;
  return v
    .slice(0, MAX_ITEMS)
    .filter(isObj)
    .map((r) => ({ label: rawText(r.label), slug: safeSlug(r.slug, ""), cities: rawText(r.cities), badge: rawText(r.badge) }))
    .filter((r) => r.label.trim() !== "" && r.slug !== "");
}

function contentOf(hero: unknown): Obj {
  return isObj(hero) && isObj(hero.content) ? hero.content : {};
}

export function cekOngkirContent(hero: unknown): CekOngkirContent {
  const c = contentOf(hero);
  const d = CEK_ONGKIR_DEFAULTS;
  return {
    routesLabel: text(c.routesLabel, d.routesLabel),
    routes: routes(c.routes, d.routes),
    infoCards: cards(c.infoCards, d.infoCards),
  };
}

export function jadwalKapalContent(hero: unknown): JadwalKapalContent {
  const c = contentOf(hero);
  const d = JADWAL_KAPAL_DEFAULTS;
  return {
    noticeLabel: text(c.noticeLabel, d.noticeLabel),
    noticeText: text(c.noticeText, d.noticeText),
    waLabel: text(c.waLabel, d.waLabel),
    emptyText: text(c.emptyText, d.emptyText),
  };
}

export function trackingContent(hero: unknown): TrackingContent {
  const c = contentOf(hero);
  const d = TRACKING_DEFAULTS;
  return {
    inputPlaceholder: text(c.inputPlaceholder, d.inputPlaceholder),
    infoCards: cards(c.infoCards, d.infoCards),
  };
}

export function normalizeHeroPreview(raw: unknown): PageHeroContent {
  if (!isObj(raw)) return {};
  const stats: PageHeroStat[] = Array.isArray(raw.stats)
    ? raw.stats
        .slice(0, MAX_ITEMS)
        .filter(isObj)
        .map((s) => ({ value: rawText(s.value), label: rawText(s.label) }))
        .filter((s) => s.value.trim() !== "" || s.label.trim() !== "")
    : [];
  return {
    image: safeImage(raw.image, "") || undefined,
    alt: rawText(raw.alt) || undefined,
    tagline: rawText(raw.tagline) || undefined,
    description: rawText(raw.description) || undefined,
    stats,
    content: isObj(raw.content) ? raw.content : undefined,
  };
}
