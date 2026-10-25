import { destinationCities, resolveDestinationValue } from "@/lib/data/pricing";

export interface ScheduleCityLink {
  label: string;
  href: string;
}

const labelByValue = new Map(destinationCities.map((c) => [c.value, c.label]));

const routeAliases: Record<string, string> = {
  agats: "asmat_agats",
  asmat: "asmat_agats",
  labuhan_bajo: "labuan_bajo",
  baubau: "bau_bau",
  kotamobagu: "kota_mubago",
};

export function scheduleCityLinks(route: string): ScheduleCityLink[] {
  const stops = route
    .split(/→|->|\s-\s|–|—/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(1);

  const seen = new Set<string>();
  const links: ScheduleCityLink[] = [];

  for (const stop of stops) {
    const raw = stop.toLowerCase().replace(/[^a-z\s-]/g, "").trim().replace(/[\s-]+/g, "_");
    const value = resolveDestinationValue(routeAliases[raw] ?? raw);
    const label = labelByValue.get(value);
    if (!label || seen.has(value)) continue;
    seen.add(value);
    links.push({ label, href: `/kirim-ke/${value.replace(/_/g, "-")}` });
  }

  return links;
}
