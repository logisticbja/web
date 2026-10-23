import { safeHref, safeImage } from "@/lib/homepage/normalize";
import type { ServicePageData } from "@/lib/servicePages";

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : "");

export function normalizeServicePreview(raw: unknown): ServicePageData | null {
  if (!isObj(raw)) return null;
  const features = Array.isArray(raw.features) ? raw.features.map((f) => str(f, 500)).slice(0, 40) : [];
  const details = Array.isArray(raw.details)
    ? raw.details.slice(0, 40).map((d) => (isObj(d) ? { title: str(d.title, 300), desc: str(d.desc, 3000) } : { title: "", desc: "" }))
    : [];
  const relatedServices = Array.isArray(raw.relatedServices)
    ? raw.relatedServices
        .slice(0, 20)
        .map((r) => (isObj(r) ? { name: str(r.name, 200), href: safeHref(r.href, "#") } : { name: "", href: "#" }))
    : [];
  return {
    title: str(raw.title, 300),
    slug: str(raw.slug, 200),
    icon: str(raw.icon, 40) || "Ship",
    subtitle: str(raw.subtitle, 300),
    imageBanner: safeImage(raw.imageBanner, ""),
    description: str(raw.description, 20000),
    priceFrom: str(raw.priceFrom, 200),
    priceNote: str(raw.priceNote, 300),
    eta: str(raw.eta, 200),
    waLabel: str(raw.waLabel, 300),
    features,
    details,
    relatedServices,
    metaTitle: str(raw.metaTitle, 200),
    metaDescription: str(raw.metaDescription, 400),
  };
}
