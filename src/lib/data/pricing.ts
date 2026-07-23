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
  { value: "jayapura", label: "Jayapura", region: "Papua" },
  { value: "sorong", label: "Sorong", region: "Papua" },
  { value: "manokwari", label: "Manokwari", region: "Papua" },
  { value: "merauke", label: "Merauke", region: "Papua" },
  { value: "timika", label: "Timika", region: "Papua" },
  { value: "wamena", label: "Wamena", region: "Papua" },
  { value: "nabire", label: "Nabire", region: "Papua" },
  { value: "biak", label: "Biak", region: "Papua" },
  { value: "fakfak", label: "Fakfak", region: "Papua" },
  { value: "raja_ampat", label: "Raja Ampat", region: "Papua" },
  { value: "ambon", label: "Ambon", region: "Maluku" },
  { value: "ternate", label: "Ternate", region: "Maluku" },
  { value: "tidore", label: "Tidore", region: "Maluku" },
  { value: "tual", label: "Tual", region: "Maluku" },
  { value: "kupang", label: "Kupang", region: "NTT" },
  { value: "ende", label: "Ende", region: "NTT" },
  { value: "maumere", label: "Maumere", region: "NTT" },
  { value: "labuan_bajo", label: "Labuan Bajo", region: "NTT" },
  { value: "kendari", label: "Kendari", region: "Sulawesi" },
  { value: "baubau", label: "Baubau", region: "Sulawesi" },
  { value: "kendari", label: "Kendari", region: "Sulawesi" },
  { value: "baubau", label: "Baubau", region: "Sulawesi" },
  { value: "makassar", label: "Makassar", region: "Sulawesi" },
  { value: "manado", label: "Manado", region: "Sulawesi" },
  { value: "palu", label: "Palu", region: "Sulawesi" },
];

export interface PricingResult {
  serviceName: string;
  priceMin: number;
  priceMax: number;
  etaMin: number;
  etaMax: number;
  unit: string;
}

const basePrices: Record<string, Record<ServiceType, { min: number; max: number }>> = {
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

const regionMap: Record<string, string> = {
  jayapura: "papua", sorong: "papua", manokwari: "papua", merauke: "papua",
  timika: "papua", wamena: "papua", nabire: "papua", biak: "papua",
  fakfak: "papua", raja_ampat: "papua",
  ambon: "maluku", ternate: "maluku", tidore: "maluku", tual: "maluku",
  kupang: "ntt", ende: "ntt", maumere: "ntt", labuan_bajo: "ntt",
  kendari: "sulawesi", baubau: "sulawesi",
  makassar: "sulawesi", manado: "sulawesi", palu: "sulawesi",
};
interface CityLautPricing {
  expressPrice: number;
  expressEtaMin: number;
  expressEtaMax: number;
  regulerPrice: number | null;
  regulerEtaMin: number | null;
  regulerEtaMax: number | null;
}

// Data resmi dari BJA Pricelist 2026 (cargo laut, tier Express & Reguler).
// Kota yang regulerPrice-nya null berarti di pricelist cuma tersedia Express.
const cityLautPricing: Record<string, CityLautPricing> = {
  ambon:       { expressPrice: 14000, expressEtaMin: 4,  expressEtaMax: 5,  regulerPrice: 7000,  regulerEtaMin: 10, regulerEtaMax: 15 },
  ternate:     { expressPrice: 14000, expressEtaMin: 8,  expressEtaMax: 10, regulerPrice: 8000,  regulerEtaMin: 20, regulerEtaMax: 25 },
  tidore:      { expressPrice: 28000, expressEtaMin: 8,  expressEtaMax: 10, regulerPrice: 19500, regulerEtaMin: 20, regulerEtaMax: 25 },
  tual:        { expressPrice: 21000, expressEtaMin: 8,  expressEtaMax: 10, regulerPrice: 11000, regulerEtaMin: 20, regulerEtaMax: 25 },

  jayapura:    { expressPrice: 14000, expressEtaMin: 7,  expressEtaMax: 9,  regulerPrice: 7000,  regulerEtaMin: 15, regulerEtaMax: 20 },
  sorong:      { expressPrice: 14000, expressEtaMin: 6,  expressEtaMax: 8,  regulerPrice: 7000,  regulerEtaMin: 15, regulerEtaMax: 20 },
  manokwari:   { expressPrice: 14000, expressEtaMin: 7,  expressEtaMax: 9,  regulerPrice: 8000,  regulerEtaMin: 15, regulerEtaMax: 20 },
  merauke:     { expressPrice: 25000, expressEtaMin: 15, expressEtaMax: 17, regulerPrice: 9000,  regulerEtaMin: 20, regulerEtaMax: 25 },
  timika:      { expressPrice: 29000, expressEtaMin: 8,  expressEtaMax: 10, regulerPrice: 9000,  regulerEtaMin: 20, regulerEtaMax: 25 },
  wamena:      { expressPrice: 30000, expressEtaMin: 9,  expressEtaMax: 10, regulerPrice: 25000, regulerEtaMin: 20, regulerEtaMax: 25 },
  nabire:      { expressPrice: 16000, expressEtaMin: 8,  expressEtaMax: 9,  regulerPrice: 10000, regulerEtaMin: 15, regulerEtaMax: 20 },
  biak:        { expressPrice: 16000, expressEtaMin: 8,  expressEtaMax: 9,  regulerPrice: 9000,  regulerEtaMin: 15, regulerEtaMax: 20 },
  fakfak:      { expressPrice: 29000, expressEtaMin: 8,  expressEtaMax: 9,  regulerPrice: 12000, regulerEtaMin: 15, regulerEtaMax: 20 },
  raja_ampat:  { expressPrice: 36000, expressEtaMin: 7,  expressEtaMax: 10, regulerPrice: 25000, regulerEtaMin: 20, regulerEtaMax: 25 },

  kupang:      { expressPrice: 9000,  expressEtaMin: 5,  expressEtaMax: 6,  regulerPrice: 7000,  regulerEtaMin: 10, regulerEtaMax: 14 },
  ende:        { expressPrice: 11000, expressEtaMin: 8,  expressEtaMax: 12, regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },
  maumere:     { expressPrice: 9500,  expressEtaMin: 8,  expressEtaMax: 12, regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },
  labuan_bajo: { expressPrice: 8000,  expressEtaMin: 3,  expressEtaMax: 4,  regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },

  kendari:     { expressPrice: 8000,  expressEtaMin: 7,  expressEtaMax: 10, regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },
  baubau:      { expressPrice: 10500, expressEtaMin: 7,  expressEtaMax: 10, regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },
  makassar:    { expressPrice: 7000,  expressEtaMin: 3,  expressEtaMax: 4,  regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },
  manado:      { expressPrice: 8000,  expressEtaMin: 7,  expressEtaMax: 10, regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },
  palu:        { expressPrice: 9000,  expressEtaMin: 6,  expressEtaMax: 7,  regulerPrice: null,  regulerEtaMin: null, regulerEtaMax: null },
};
export function calculatePrice(destination: string, service: ServiceType, weight: number): PricingResult {
  if (service === "laut" && cityLautPricing[destination]) {
    const c = cityLautPricing[destination];
    const hasReguler = c.regulerPrice !== null;
    return {
      serviceName: serviceNames[service],
      priceMin: (hasReguler ? c.regulerPrice! : c.expressPrice) * weight,
      priceMax: c.expressPrice * weight,
      etaMin: c.expressEtaMin,
      etaMax: hasReguler ? c.regulerEtaMax! : c.expressEtaMax,
      unit: "kg",
    };
  }

  const region = regionMap[destination] || "papua";
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

export function calculatePriceByRegion(region: string, service: ServiceType, weight: number): PricingResult {
  const prices = (basePrices[region] ?? basePrices["papua"])[service];
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
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
}
