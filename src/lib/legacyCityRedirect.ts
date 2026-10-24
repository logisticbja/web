import { destinationCities, resolveDestinationValue } from "@/lib/data/pricing";
import { jakartaCityMap } from "@/lib/data/jakartaCities";

const LEGACY_CITY_PATTERN =
  /^\/(?:cek-ongkir-cargo\/)?(?:ekspedisi-|cargo-|jasa-ekspedisi-)?(?:jakarta|surabaya)-([a-z0-9-]+)\/?$/i;

const destinationValues = new Set(destinationCities.map((c) => c.value));

const legacyTypos: Record<string, string> = {
  asmat: "asmat_agats",
  agats: "asmat_agats",
  deiya: "deiyai",
  memberamo_raya: "mamberamo_raya",
  membarmo_raya: "mamberamo_raya",
  supriori: "supiori",
  lany_jaya: "lanny_jaya",
  nagakeo: "nagekeo",
  andonara: "adonara",
  palopop: "palopo",
  parepare: "pare_pare",
  tapoyo: "topoyo",
  kafamenanu: "kefamenanu",
  kalimana: "kaimana",
  sinjai: "sinjay",
  timika: "mimika",
  biak: "biak_numfor",
  fak_fak: "fakfak",
  labuhan_bajo: "labuan_bajo",
  kotamobagu: "kota_mubago",
};

const regionHub: Record<string, string> = {
  sabu_raijua: "/cargo/ntt",
  sabu_seba: "/cargo/ntt",
  pulau_sabu: "/cargo/ntt",
  seba: "/cargo/ntt",
  sumba: "/cargo/ntt",
  halmahera: "/cargo/maluku",
  maba: "/cargo/maluku",
  aimas: "/kirim-ke/sorong",
  konawe: "/kirim-ke/konawe-selatan",
  morowali_utara: "/kirim-ke/morowali",
};

const lowerCityMap = new Map(
  Object.entries(jakartaCityMap).map(([key, entry]) => [key.toLowerCase(), entry])
);

export function resolveLegacyCityPath(pathname: string): string | null {
  const match = pathname.match(LEGACY_CITY_PATTERN);
  if (!match) return null;

  const slug = match[1].toLowerCase().replace(/-+$/, "");
  const raw = slug.replace(/-/g, "_");
  const value = resolveDestinationValue(legacyTypos[raw] ?? raw);

  if (destinationValues.has(value)) {
    return `/kirim-ke/${value.replace(/_/g, "-")}`;
  }

  if (regionHub[raw]) return regionHub[raw];

  const entry = lowerCityMap.get(`jakarta-${slug}`);
  if (entry) {
    if (entry.region === "jawa") return "/layanan/cargo-darat";
    if (entry.cargoRegion) return `/cargo/${entry.cargoRegion}`;
  }

  return null;
}
