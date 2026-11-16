import { destinationCities, resolveDestinationValue } from "@/lib/data/pricing";

export interface ScheduleCityLink {
  label: string;
  href: string;
}

export interface ScheduleStop {
  name: string;
  href?: string;
}

const labelByValue = new Map(destinationCities.map((c) => [c.value, c.label]));

const routeAliases: Record<string, string> = {
  agats: "asmat_agats",
  asmat: "asmat_agats",
  labuhan_bajo: "labuan_bajo",
  baubau: "bau_bau",
  kotamobagu: "kota_mubago",
  fak_fak: "fakfak",
};

function stopValue(stop: string): string {
  const raw = stop.toLowerCase().replace(/[^a-z\s-]/g, "").trim().replace(/[\s-]+/g, "_");
  return resolveDestinationValue(routeAliases[raw] ?? raw);
}

function splitRoute(route: string): { origin: string | null; stops: string[] } {
  const hasArrow = /→|->/.test(route);
  const parts = route
    .split(/→|->|\s-\s|\s-|-\s|–|—/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (hasArrow) return { origin: parts[0] ?? null, stops: parts.slice(1) };
  return { origin: null, stops: parts };
}

export function scheduleRoute(route: string, from?: string): { origin: string; stops: ScheduleStop[] } {
  const { origin, stops } = splitRoute(route);
  const seen = new Set<string>();
  const out: ScheduleStop[] = [];
  for (const name of stops) {
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const value = stopValue(name);
    const label = labelByValue.get(value);
    out.push({ name, href: label ? `/kirim-ke/${value.replace(/_/g, "-")}` : undefined });
  }
  return { origin: origin || from || "", stops: out };
}

export function scheduleCityLinks(route: string): ScheduleCityLink[] {
  const { stops } = splitRoute(route);
  const seen = new Set<string>();
  const links: ScheduleCityLink[] = [];

  for (const stop of stops) {
    const value = stopValue(stop);
    const label = labelByValue.get(value);
    if (!label || seen.has(value)) continue;
    seen.add(value);
    links.push({ label, href: `/kirim-ke/${value.replace(/_/g, "-")}` });
  }

  return links;
}
