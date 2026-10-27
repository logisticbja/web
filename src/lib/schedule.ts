export interface ShipSchedule {
  route: string;
  from: string;
  region: string;
  ship: string;
  serviceType: string;        // "Express" | "Reguler" | ""
  closingDate: string | null; // "YYYY-MM-DD"
  etdDate: string | null;     // "YYYY-MM-DD"
  etaDate: string | null;     // "YYYY-MM-DD" — dihitung otomatis di CRM dari ETD + lead time
}

export async function getSchedules(params?: {
  region?: string;
  q?: string;
}): Promise<ShipSchedule[]> {
  try {
    const url = new URL(process.env.SHIP_SCHEDULE_API_URL!);
    if (params?.region) url.searchParams.set("region", params.region);
    if (params?.q)      url.searchParams.set("q", params.q);

    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 300 },
    });

    const json = await res.json();
    if (json.status !== "success") return [];
    return publicSchedules(json.data ?? []);
  } catch {
    return [];
  }
}

export const ROUTE_SHIP_LABEL = "Kapal Roro / Cargo";

export function jakartaToday(): string {
  return new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}

export function publicShipName(ship: string, serviceType: string): string {
  if (!ship) return "";
  return serviceType === "Express" ? ship : ROUTE_SHIP_LABEL;
}

export function publicSchedules(list: ShipSchedule[], today = jakartaToday()): ShipSchedule[] {
  return list
    .filter((s) => !s.etdDate || s.etdDate >= today)
    .map((s) => ({ ...s, ship: publicShipName(s.ship, s.serviceType) }))
    .sort((a, b) => (a.etdDate ?? "9999").localeCompare(b.etdDate ?? "9999"));
}

const MONTHS_LONG_ID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export function formatMonthYear(dateStr: string): string {
  const [y, m] = dateStr.split("-").map(Number);
  return `${MONTHS_LONG_ID[m - 1]} ${y}`;
}

export function formatLongDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${MONTHS_LONG_ID[m - 1]} ${y}`;
}

// Format tanggal "YYYY-MM-DD" (atau null) jadi "10 Agu 2026" ala Indonesia.
// Dipakai di ScheduleClient.tsx & halaman cargo per-wilayah supaya formatnya konsisten.
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export function formatScheduleDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return "-";
  return `${d} ${MONTHS_ID[m - 1]} ${y}`;
}

// Label tampilan buat Jenis layanan — "Express" ditampilkan sebagai "Express (PELNI)"
// di seluruh halaman publik biar konsisten sama CRM.
export function formatServiceType(serviceType: string): string {
  if (serviceType === "Express") return "Express (PELNI)";
  return serviceType || "-";
}
