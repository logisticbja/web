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
  { value: "sidoarjo", label: "Sidoarjo", region: "Jawa" },
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
};

export function calculatePrice(destination: string, service: ServiceType, weight: number): PricingResult {
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
