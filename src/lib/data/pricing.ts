export type ServiceType = "laut" | "darat" | "udara";

export interface Route {
  from: string;
  to: string;
  pricePerKg: number;
  minWeight: number;
}

export interface CityOption {
  value: string;
  label: string;
  region: string;
}

export const originCities: CityOption[] = [
  { value: "jabodetabek", label: "Jabodetabek", region: "Jawa" },
  { value: "surabaya", label: "Surabaya", region: "Jawa" },
];

export const destinationCities: CityOption[] = [
  { value: "ambon", label: "Ambon", region: "Maluku" },
  { value: "dobo", label: "Dobo", region: "Maluku" },
  { value: "masohi", label: "Masohi", region: "Maluku" },
  { value: "namlea", label: "Namlea", region: "Maluku" },
  { value: "saumlaki", label: "Saumlaki", region: "Maluku" },
  { value: "seram", label: "Seram", region: "Maluku" },
  { value: "tanimbar", label: "Tanimbar", region: "Maluku" },
  { value: "tiakur", label: "Tiakur", region: "Maluku" },
  { value: "tual", label: "Tual", region: "Maluku" },
  { value: "ternate", label: "Ternate", region: "Maluku" },
  { value: "jailolo", label: "Jailolo", region: "Maluku" },
  { value: "tobelo", label: "Tobelo", region: "Maluku" },
  { value: "tidore", label: "Tidore", region: "Maluku" },
  { value: "weda", label: "Weda", region: "Maluku" },
  { value: "bacan", label: "Bacan", region: "Maluku" },
  { value: "mimika", label: "Mimika", region: "Papua" },
  { value: "nabire", label: "Nabire", region: "Papua" },
  { value: "deiyai", label: "Deiyai", region: "Papua" },
  { value: "dogiyai", label: "Dogiyai", region: "Papua" },
  { value: "paniai", label: "Paniai", region: "Papua" },
  { value: "puncak_jaya", label: "Puncak Jaya", region: "Papua" },
  { value: "biak_numfor", label: "Biak Numfor", region: "Papua" },
  { value: "jayapura", label: "Jayapura", region: "Papua" },
  { value: "keerom", label: "Keerom", region: "Papua" },
  { value: "yapen", label: "Yapen", region: "Papua" },
  { value: "mamberamo_raya", label: "Mamberamo Raya", region: "Papua" },
  { value: "sarmi", label: "Sarmi", region: "Papua" },
  { value: "supiori", label: "Supiori", region: "Papua" },
  { value: "waropen", label: "Waropen", region: "Papua" },
  { value: "jayawijaya", label: "Jayawijaya", region: "Papua" },
  { value: "merauke", label: "Merauke", region: "Papua" },
  { value: "boven_digoel", label: "Boven Digoel", region: "Papua" },
  { value: "mappi", label: "Mappi", region: "Papua" },
  { value: "asmat_agats", label: "Asmat/Agats", region: "Papua" },
  { value: "yahukimo", label: "Yahukimo", region: "Papua" },
  { value: "tolikara", label: "Tolikara", region: "Papua" },
  { value: "lanny_jaya", label: "Lanny Jaya", region: "Papua" },
  { value: "wamena", label: "Wamena", region: "Papua" },
  { value: "sentani", label: "Sentani", region: "Papua" },
  { value: "serui", label: "Serui", region: "Papua" },
  { value: "fakfak", label: "Fakfak", region: "Papua" },
  { value: "kaimana", label: "Kaimana", region: "Papua" },
  { value: "manokwari", label: "Manokwari", region: "Papua" },
  { value: "bintuni", label: "Bintuni", region: "Papua" },
  { value: "sorong", label: "Sorong", region: "Papua" },
  { value: "raja_ampat", label: "Raja Ampat", region: "Papua" },
  { value: "sumba_barat_daya", label: "Sumba Barat Daya", region: "NTT" },
  { value: "sumba_barat", label: "Sumba Barat", region: "NTT" },
  { value: "sumba_tengah", label: "Sumba Tengah", region: "NTT" },
  { value: "sumba_timur", label: "Sumba Timur", region: "NTT" },
  { value: "labuan_bajo", label: "Labuan Bajo", region: "NTT" },
  { value: "lembor", label: "Lembor", region: "NTT" },
  { value: "ruteng", label: "Ruteng", region: "NTT" },
  { value: "borong", label: "Borong", region: "NTT" },
  { value: "bajawa", label: "Bajawa", region: "NTT" },
  { value: "nagekeo", label: "Nagekeo", region: "NTT" },
  { value: "ende", label: "Ende", region: "NTT" },
  { value: "maumere", label: "Maumere", region: "NTT" },
  { value: "larantuka", label: "Larantuka", region: "NTT" },
  { value: "adonara", label: "Adonara", region: "NTT" },
  { value: "lembata", label: "Lembata", region: "NTT" },
  { value: "kupang", label: "Kupang", region: "NTT" },
  { value: "soe", label: "Soe", region: "NTT" },
  { value: "kefamenanu", label: "Kefamenanu", region: "NTT" },
  { value: "atambua", label: "Atambua", region: "NTT" },
  { value: "malaka", label: "Malaka", region: "NTT" },
  { value: "betun", label: "Betun", region: "NTT" },
  { value: "rote_ndao", label: "Rote Ndao", region: "NTT" },
  { value: "makassar", label: "Makassar", region: "Sulawesi" },
  { value: "bantaeng", label: "Bantaeng", region: "Sulawesi" },
  { value: "barru", label: "Barru", region: "Sulawesi" },
  { value: "bone", label: "Bone", region: "Sulawesi" },
  { value: "bulukumba", label: "Bulukumba", region: "Sulawesi" },
  { value: "enrekang", label: "Enrekang", region: "Sulawesi" },
  { value: "gowa", label: "Gowa", region: "Sulawesi" },
  { value: "jeneponto", label: "Jeneponto", region: "Sulawesi" },
  { value: "luwu_belopa", label: "Luwu Belopa", region: "Sulawesi" },
  { value: "luwu_timur", label: "Luwu Timur", region: "Sulawesi" },
  { value: "luwu_utara", label: "Luwu Utara", region: "Sulawesi" },
  { value: "maros", label: "Maros", region: "Sulawesi" },
  { value: "palopo", label: "Palopo", region: "Sulawesi" },
  { value: "pangkep", label: "Pangkep", region: "Sulawesi" },
  { value: "pare_pare", label: "Pare-pare", region: "Sulawesi" },
  { value: "pinrang", label: "Pinrang", region: "Sulawesi" },
  { value: "rappang", label: "Rappang", region: "Sulawesi" },
  { value: "rantepao", label: "Rantepao", region: "Sulawesi" },
  { value: "selayar", label: "Selayar", region: "Sulawesi" },
  { value: "sidrap", label: "Sidrap", region: "Sulawesi" },
  { value: "sinjay", label: "Sinjay", region: "Sulawesi" },
  { value: "siwa", label: "Siwa", region: "Sulawesi" },
  { value: "soppeng", label: "Soppeng", region: "Sulawesi" },
  { value: "sorowako", label: "Sorowako", region: "Sulawesi" },
  { value: "takalar", label: "Takalar", region: "Sulawesi" },
  { value: "tana_toraja", label: "Tana Toraja", region: "Sulawesi" },
  { value: "wajo", label: "Wajo", region: "Sulawesi" },
  { value: "majene", label: "Majene", region: "Sulawesi" },
  { value: "mamuju", label: "Mamuju", region: "Sulawesi" },
  { value: "mamasa", label: "Mamasa", region: "Sulawesi" },
  { value: "pasang_kayu", label: "Pasang Kayu", region: "Sulawesi" },
  { value: "topoyo", label: "Topoyo", region: "Sulawesi" },
  { value: "ampana", label: "Ampana", region: "Sulawesi" },
  { value: "banggai_laut", label: "Banggai Laut", region: "Sulawesi" },
  { value: "banggai_kepulauan", label: "Banggai Kepulauan", region: "Sulawesi" },
  { value: "batul_tolli", label: "Batul Tolli", region: "Sulawesi" },
  { value: "buol", label: "Buol", region: "Sulawesi" },
  { value: "donggala", label: "Donggala", region: "Sulawesi" },
  { value: "luwuk_banggai", label: "Luwuk Banggai", region: "Sulawesi" },
  { value: "morowali", label: "Morowali", region: "Sulawesi" },
  { value: "palu", label: "Palu", region: "Sulawesi" },
  { value: "parigi_mountong", label: "Parigi Mountong", region: "Sulawesi" },
  { value: "poso", label: "Poso", region: "Sulawesi" },
  { value: "toli_toli", label: "Toli-toli", region: "Sulawesi" },
  { value: "tojo_una_una", label: "Tojo Una-una", region: "Sulawesi" },
  { value: "konawe_selatan", label: "Konawe Selatan", region: "Sulawesi" },
  { value: "bau_bau", label: "Bau-bau", region: "Sulawesi" },
  { value: "kendari", label: "Kendari", region: "Sulawesi" },
  { value: "kolaka", label: "Kolaka", region: "Sulawesi" },
  { value: "gorontalo", label: "Gorontalo", region: "Sulawesi" },
  { value: "bitung", label: "Bitung", region: "Sulawesi" },
  { value: "kota_mubago", label: "Kota Mubago", region: "Sulawesi" },
  { value: "manado", label: "Manado", region: "Sulawesi" },
  { value: "tomohon", label: "Tomohon", region: "Sulawesi" },
  { value: "tondano", label: "Tondano", region: "Sulawesi" },
  { value: "tahuna", label: "Tahuna", region: "Sulawesi" },
  { value: "bolaang_mongondow", label: "Bolaang Mongondow", region: "Sulawesi" },
];


// Alias untuk menjaga kompatibilitas URL/data lama.
// Key memakai format value internal (underscore), bukan slug URL.
export const destinationAliases: Record<string, string> = {
  timika: "mimika",
  biak: "biak_numfor",
  baubau: "bau_bau",
  dabo: "dobo",
  fak_fak: "fakfak",
  labuhan_bajo: "labuan_bajo",
  sinjai: "sinjay",
  batui_toili: "batul_tolli",
  parigi_moutong: "parigi_mountong",
  kotamobagu: "kota_mubago",
  keroom: "keerom",
};

export function resolveDestinationValue(value: string): string {
  return destinationAliases[value] ?? value;
}

export function destinationValueToSlug(value: string): string {
  return resolveDestinationValue(value).replace(/_/g, "-");
}

export interface PricingResult {
  serviceName: string;
  priceMin: number;
  priceMax: number;
  etaMin: number;
  etaMax: number;
  unit: string;
}

const basePrices: Record<
  string,
  Record<ServiceType, { min: number; max: number }>
> = {
  papua: {
    laut: { min: 6000, max: 8000 },
    darat: { min: 7000, max: 9000 },
    udara: { min: 25000, max: 35000 },
  },
  maluku: {
    laut: { min: 6500, max: 8500 },
    darat: { min: 7500, max: 9500 },
    udara: { min: 20000, max: 30000 },
  },
  ntt: {
    laut: { min: 6000, max: 8000 },
    darat: { min: 6500, max: 8500 },
    udara: { min: 18000, max: 28000 },
  },
  sulawesi: {
    laut: { min: 5000, max: 7000 },
    darat: { min: 5500, max: 7500 },
    udara: { min: 15000, max: 22000 },
  },
  jawa: {
    laut: { min: 3000, max: 5000 },
    darat: { min: 2000, max: 3500 },
    udara: { min: 8000, max: 15000 },
  },
};

const etaDays: Record<ServiceType, { min: number; max: number }> = {
  laut: { min: 14, max: 20 },
  darat: { min: 7, max: 14 },
  udara: { min: 2, max: 4 },
};

const serviceNames: Record<ServiceType, string> = {
  laut: "Cargo Laut",
  darat: "Cargo Darat",
  udara: "Cargo Udara",
};

const canonicalRegionMap: Record<string, string> = Object.fromEntries(
  destinationCities.map((city) => [city.value, city.region.toLowerCase()])
);

const regionMap: Record<string, string> = {
  ...canonicalRegionMap,
  ...Object.fromEntries(
    Object.entries(destinationAliases).map(([alias, canonical]) => [
      alias,
      canonicalRegionMap[canonical] ?? "papua",
    ])
  ),
};

export interface CityLautPricing {
  expressPrice: number | null;
  expressEtaMin: number | null;
  expressEtaMax: number | null;
  regulerPrice: number | null;
  regulerEtaMin: number | null;
  regulerEtaMax: number | null;
}

// Master pricing berdasarkan HPP BJA 2026.
// Nilai null berarti layanan tersebut tidak tersedia untuk tujuan tersebut.
// Koreksi pengguna:
// - Biak Numfor: Express 7–8 hari, Reguler 15–20 hari.
// - Kupang: Reguler Rp9.000/kg, 8–11 hari; Express tidak tersedia.
// Catatan: Adonara di sumber HPP tertulis estimasi "20–15 hari" sehingga ETA
// belum dimasukkan sampai dikonfirmasi.
export const cityLautPricing: Record<string, CityLautPricing> = {
  ambon: { expressPrice: 14000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: 7000, regulerEtaMin: 10, regulerEtaMax: 15 },
  dobo: { expressPrice: 24500, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 11000, regulerEtaMin: 15, regulerEtaMax: 20 },
  masohi: { expressPrice: 28000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  namlea: { expressPrice: 25000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 14000, regulerEtaMin: 20, regulerEtaMax: 25 },
  saumlaki: { expressPrice: null, expressEtaMin: null, expressEtaMax: null, regulerPrice: 22500, regulerEtaMin: 20, regulerEtaMax: 25 },
  seram: { expressPrice: 28000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 21000, regulerEtaMin: 20, regulerEtaMax: 25 },
  tanimbar: { expressPrice: 27000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 21000, regulerEtaMin: 20, regulerEtaMax: 25 },
  tiakur: { expressPrice: 28000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 20500, regulerEtaMin: 20, regulerEtaMax: 25 },
  tual: { expressPrice: 21000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 11000, regulerEtaMin: 20, regulerEtaMax: 25 },
  ternate: { expressPrice: 14000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 8000, regulerEtaMin: 20, regulerEtaMax: 25 },
  jailolo: { expressPrice: 28000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 19500, regulerEtaMin: 20, regulerEtaMax: 25 },
  tobelo: { expressPrice: 27000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 20500, regulerEtaMin: 20, regulerEtaMax: 25 },
  tidore: { expressPrice: 28000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 19500, regulerEtaMin: 20, regulerEtaMax: 25 },
  weda: { expressPrice: 29500, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 23000, regulerEtaMin: 20, regulerEtaMax: 25 },
  bacan: { expressPrice: 27000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 19500, regulerEtaMin: 20, regulerEtaMax: 25 },
  mimika: { expressPrice: 29000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 9000, regulerEtaMin: 20, regulerEtaMax: 25 },
  nabire: { expressPrice: 16000, expressEtaMin: 8, expressEtaMax: 9, regulerPrice: 10000, regulerEtaMin: 15, regulerEtaMax: 20 },
  deiyai: { expressPrice: 50000, expressEtaMin: 10, expressEtaMax: 10, regulerPrice: 40000, regulerEtaMin: 20, regulerEtaMax: 25 },
  dogiyai: { expressPrice: 45000, expressEtaMin: 10, expressEtaMax: 10, regulerPrice: 35000, regulerEtaMin: 20, regulerEtaMax: 25 },
  paniai: { expressPrice: 45000, expressEtaMin: 10, expressEtaMax: 12, regulerPrice: 35000, regulerEtaMin: 20, regulerEtaMax: 25 },
  puncak_jaya: { expressPrice: 45000, expressEtaMin: 10, expressEtaMax: 12, regulerPrice: 35000, regulerEtaMin: 20, regulerEtaMax: 25 },
  biak_numfor: { expressPrice: 16000, expressEtaMin: 7, expressEtaMax: 8, regulerPrice: 9000, regulerEtaMin: 15, regulerEtaMax: 20 },
  jayapura: { expressPrice: 14000, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: 7000, regulerEtaMin: 15, regulerEtaMax: 20 },
  keerom: { expressPrice: 21000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 18000, regulerEtaMin: 15, regulerEtaMax: 20 },
  yapen: { expressPrice: 20000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: 10000, regulerEtaMin: 15, regulerEtaMax: 20 },
  mamberamo_raya: { expressPrice: 45000, expressEtaMin: 9, expressEtaMax: 10, regulerPrice: 40000, regulerEtaMin: 20, regulerEtaMax: 25 },
  sarmi: { expressPrice: 25000, expressEtaMin: 9, expressEtaMax: 10, regulerPrice: 15000, regulerEtaMin: 15, regulerEtaMax: 20 },
  supiori: { expressPrice: 28000, expressEtaMin: 9, expressEtaMax: 10, regulerPrice: 19000, regulerEtaMin: 15, regulerEtaMax: 20 },
  waropen: { expressPrice: 27000, expressEtaMin: 10, expressEtaMax: 12, regulerPrice: 12000, regulerEtaMin: 15, regulerEtaMax: 20 },
  jayawijaya: { expressPrice: 65000, expressEtaMin: 10, expressEtaMax: 12, regulerPrice: 40000, regulerEtaMin: 20, regulerEtaMax: 25 },
  merauke: { expressPrice: 25000, expressEtaMin: 15, expressEtaMax: 17, regulerPrice: 9000, regulerEtaMin: 20, regulerEtaMax: 25 },
  boven_digoel: { expressPrice: 30000, expressEtaMin: 17, expressEtaMax: 20, regulerPrice: 20000, regulerEtaMin: 20, regulerEtaMax: 25 },
  mappi: { expressPrice: 31500, expressEtaMin: 15, expressEtaMax: 17, regulerPrice: 30000, regulerEtaMin: 20, regulerEtaMax: 25 },
  asmat_agats: { expressPrice: 33000, expressEtaMin: 16, expressEtaMax: 18, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  yahukimo: { expressPrice: 65000, expressEtaMin: 10, expressEtaMax: 12, regulerPrice: 45000, regulerEtaMin: 20, regulerEtaMax: 25 },
  tolikara: { expressPrice: 45000, expressEtaMin: 10, expressEtaMax: 12, regulerPrice: 35000, regulerEtaMin: 20, regulerEtaMax: 25 },
  lanny_jaya: { expressPrice: 45000, expressEtaMin: 10, expressEtaMax: 12, regulerPrice: 35000, regulerEtaMin: 20, regulerEtaMax: 25 },
  wamena: { expressPrice: 30000, expressEtaMin: 9, expressEtaMax: 10, regulerPrice: 25000, regulerEtaMin: 20, regulerEtaMax: 25 },
  sentani: { expressPrice: 16000, expressEtaMin: 8, expressEtaMax: 9, regulerPrice: 9000, regulerEtaMin: 15, regulerEtaMax: 20 },
  serui: { expressPrice: 18000, expressEtaMin: 8, expressEtaMax: 9, regulerPrice: 9000, regulerEtaMin: 15, regulerEtaMax: 20 },
  fakfak: { expressPrice: 29000, expressEtaMin: 8, expressEtaMax: 9, regulerPrice: 12000, regulerEtaMin: 15, regulerEtaMax: 20 },
  kaimana: { expressPrice: 28000, expressEtaMin: 8, expressEtaMax: 9, regulerPrice: 15000, regulerEtaMin: 15, regulerEtaMax: 20 },
  manokwari: { expressPrice: 14000, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: 8000, regulerEtaMin: 15, regulerEtaMax: 20 },
  bintuni: { expressPrice: 18000, expressEtaMin: 15, expressEtaMax: 15, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  sorong: { expressPrice: 14000, expressEtaMin: 6, expressEtaMax: 8, regulerPrice: 7000, regulerEtaMin: 15, regulerEtaMax: 20 },
  raja_ampat: { expressPrice: 36000, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: 25000, regulerEtaMin: 20, regulerEtaMax: 25 },
  sumba_barat_daya: { expressPrice: null, expressEtaMin: null, expressEtaMax: null, regulerPrice: 12500, regulerEtaMin: 15, regulerEtaMax: 15 },
  sumba_barat: { expressPrice: null, expressEtaMin: null, expressEtaMax: null, regulerPrice: 11500, regulerEtaMin: 15, regulerEtaMax: 15 },
  sumba_tengah: { expressPrice: null, expressEtaMin: null, expressEtaMax: null, regulerPrice: 12000, regulerEtaMin: 15, regulerEtaMax: 15 },
  sumba_timur: { expressPrice: null, expressEtaMin: null, expressEtaMax: null, regulerPrice: 8500, regulerEtaMin: 15, regulerEtaMax: 15 },
  labuan_bajo: { expressPrice: 8000, expressEtaMin: 3, expressEtaMax: 4, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  lembor: { expressPrice: 7500, expressEtaMin: 3, expressEtaMax: 4, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  ruteng: { expressPrice: 8000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  borong: { expressPrice: 9000, expressEtaMin: 5, expressEtaMax: 6, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  bajawa: { expressPrice: 9500, expressEtaMin: 12, expressEtaMax: 15, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  nagekeo: { expressPrice: 11000, expressEtaMin: 12, expressEtaMax: 15, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  ende: { expressPrice: 11000, expressEtaMin: 8, expressEtaMax: 12, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  maumere: { expressPrice: 9500, expressEtaMin: 8, expressEtaMax: 12, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  larantuka: { expressPrice: 11000, expressEtaMin: 8, expressEtaMax: 12, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  adonara: { expressPrice: 17000, expressEtaMin: null, expressEtaMax: null, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  lembata: { expressPrice: 13500, expressEtaMin: 8, expressEtaMax: 11, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  kupang: { expressPrice: null, expressEtaMin: null, expressEtaMax: null, regulerPrice: 9000, regulerEtaMin: 8, regulerEtaMax: 11 },
  soe: { expressPrice: 11000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  kefamenanu: { expressPrice: 14000, expressEtaMin: 10, expressEtaMax: 13, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  atambua: { expressPrice: 13000, expressEtaMin: 12, expressEtaMax: 15, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  malaka: { expressPrice: 13000, expressEtaMin: 16, expressEtaMax: 16, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  betun: { expressPrice: 14500, expressEtaMin: 17, expressEtaMax: 17, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  rote_ndao: { expressPrice: 16500, expressEtaMin: 18, expressEtaMax: 18, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  makassar: { expressPrice: 7000, expressEtaMin: 3, expressEtaMax: 4, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  bantaeng: { expressPrice: 7000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  barru: { expressPrice: 7000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  bone: { expressPrice: 7000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  bulukumba: { expressPrice: 7500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  enrekang: { expressPrice: 8000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  gowa: { expressPrice: 7000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  jeneponto: { expressPrice: 7000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  luwu_belopa: { expressPrice: 7500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  luwu_timur: { expressPrice: 7500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  luwu_utara: { expressPrice: 9000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  maros: { expressPrice: 9000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  palopo: { expressPrice: 9000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  pangkep: { expressPrice: 8500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  pare_pare: { expressPrice: 8000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  pinrang: { expressPrice: 8500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  rappang: { expressPrice: 8500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  rantepao: { expressPrice: 9000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  selayar: { expressPrice: 10000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  sidrap: { expressPrice: 8500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  sinjay: { expressPrice: 8500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  siwa: { expressPrice: 7000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  soppeng: { expressPrice: 9000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  sorowako: { expressPrice: 11000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  takalar: { expressPrice: 8500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  tana_toraja: { expressPrice: 8000, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  wajo: { expressPrice: 8500, expressEtaMin: 4, expressEtaMax: 5, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  majene: { expressPrice: 8500, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  mamuju: { expressPrice: 8500, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  mamasa: { expressPrice: 8500, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  pasang_kayu: { expressPrice: 7000, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  topoyo: { expressPrice: 8500, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  ampana: { expressPrice: 10000, expressEtaMin: 7, expressEtaMax: 8, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  banggai_laut: { expressPrice: 15000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  banggai_kepulauan: { expressPrice: 14000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  batul_tolli: { expressPrice: 11000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  buol: { expressPrice: 9000, expressEtaMin: 8, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  donggala: { expressPrice: 9000, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  luwuk_banggai: { expressPrice: 10000, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  morowali: { expressPrice: 10000, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  palu: { expressPrice: 9000, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  parigi_mountong: { expressPrice: 9500, expressEtaMin: 6, expressEtaMax: 7, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  poso: { expressPrice: 9500, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  toli_toli: { expressPrice: 10000, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  tojo_una_una: { expressPrice: 11000, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  konawe_selatan: { expressPrice: 11000, expressEtaMin: 7, expressEtaMax: 9, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  bau_bau: { expressPrice: 10500, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  kendari: { expressPrice: 8000, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  kolaka: { expressPrice: 11500, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  gorontalo: { expressPrice: 8000, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  bitung: { expressPrice: 9000, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  kota_mubago: { expressPrice: 11000, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  manado: { expressPrice: 8000, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  tomohon: { expressPrice: 11500, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  tondano: { expressPrice: 7500, expressEtaMin: 7, expressEtaMax: 10, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  tahuna: { expressPrice: 16500, expressEtaMin: 14, expressEtaMax: 16, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
  bolaang_mongondow: { expressPrice: 12000, expressEtaMin: 11, expressEtaMax: 12, regulerPrice: null, regulerEtaMin: null, regulerEtaMax: null },
};

export function calculatePrice(
  destination: string,
  service: ServiceType,
  weight: number
): PricingResult {
  const resolvedDestination = resolveDestinationValue(destination);

  if (service === "laut" && cityLautPricing[resolvedDestination]) {
    const cityPricing = cityLautPricing[resolvedDestination];

    const availablePrices = [
      cityPricing.regulerPrice,
      cityPricing.expressPrice,
    ].filter((price): price is number => price !== null);

    const availableEtaMin = [
      cityPricing.regulerEtaMin,
      cityPricing.expressEtaMin,
    ].filter((eta): eta is number => eta !== null);

    const availableEtaMax = [
      cityPricing.regulerEtaMax,
      cityPricing.expressEtaMax,
    ].filter((eta): eta is number => eta !== null);

    if (
      availablePrices.length > 0 &&
      availableEtaMin.length > 0 &&
      availableEtaMax.length > 0
    ) {
      return {
        serviceName: serviceNames[service],
        priceMin: Math.min(...availablePrices) * weight,
        priceMax: Math.max(...availablePrices) * weight,
        etaMin: Math.min(...availableEtaMin),
        etaMax: Math.max(...availableEtaMax),
        unit: "kg",
      };
    }
  }

  const region = regionMap[resolvedDestination] || "papua";
  const prices = basePrices[region][service];
  const eta = etaDays[service];

  return {
    serviceName: serviceNames[service],
    priceMin: prices.min * weight,
    priceMax: prices.max * weight,
    etaMin: eta.min,
    etaMax: eta.max,
    unit: "kg",
  };
}

export function calculatePriceByRegion(
  region: string,
  service: ServiceType,
  weight: number
): PricingResult {
  const normalizedRegion = region.toLowerCase();
  const prices =
    (basePrices[normalizedRegion] ?? basePrices["papua"])[service];
  const eta = etaDays[service];

  return {
    serviceName: serviceNames[service],
    priceMin: prices.min * weight,
    priceMax: prices.max * weight,
    etaMin: eta.min,
    etaMax: eta.max,
    unit: "kg",
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
