import { destinationCities, destinationValueToSlug } from "@/lib/data/pricing";
import { regionConfigs } from "@/lib/data/regions";

export type RouteLink = { href: string; label: string };

const REGION_PATTERNS: { slug: string; label: string; re: RegExp }[] = [
  { slug: "papua", label: "Papua", re: /\bpapua\b/i },
  { slug: "maluku", label: "Maluku", re: /\bmaluku\b/i },
  { slug: "ntt", label: "NTT", re: /\b(ntt|nusa tenggara timur)\b/i },
  { slug: "sulawesi", label: "Sulawesi", re: /\bsulawesi\b/i },
];

const EAST_INDONESIA = /\bindonesia timur\b/i;

const MAX_CITY_LINKS = 6;

const TITLE_ONLY_CITIES = new Set(["Seram", "Malaka", "Bone", "Siwa", "Weda", "Borong"]);

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const cityMatchers = destinationCities
  .filter((city) => city.region !== "Jawa" && city.label.length >= 4)
  .map((city) => ({
    href: `/kirim-ke/${destinationValueToSlug(city.value)}`,
    label: city.label,
    titleOnly: TITLE_ONLY_CITIES.has(city.label),
    re: new RegExp(`\\b${escapeRegExp(city.label)}\\b`),
  }));

const validRegionSlugs = new Set(regionConfigs.map((region) => region.slug as string));

export function buildBlogRouteLinks(title: string, content: string): RouteLink[] {
  const text = `${title} ${stripHtml(content)}`;
  const links: RouteLink[] = [];
  const seen = new Set<string>();

  const add = (link: RouteLink) => {
    if (seen.has(link.href)) return;
    seen.add(link.href);
    links.push(link);
  };

  const regionHits = REGION_PATTERNS.filter((region) => region.re.test(text));
  const regions = regionHits.length > 0 || !EAST_INDONESIA.test(text) ? regionHits : REGION_PATTERNS;

  for (const region of regions) {
    if (validRegionSlugs.has(region.slug)) {
      add({ href: `/cargo/${region.slug}`, label: `Cargo ke ${region.label}` });
    }
  }

  const titleCities = cityMatchers.filter((city) => city.re.test(title));
  const bodyCities = cityMatchers.filter((city) => !city.titleOnly && !city.re.test(title) && city.re.test(text));

  for (const city of [...titleCities, ...bodyCities].slice(0, MAX_CITY_LINKS)) {
    add({ href: city.href, label: `Ekspedisi ke ${city.label}` });
  }

  return links;
}
