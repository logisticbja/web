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
  const url = new URL(process.env.SHIP_SCHEDULE_API_URL!);
  if (params?.region) url.searchParams.set("region", params.region);
  if (params?.q) url.searchParams.set("q", params.q);

  const building = process.env.NEXT_PHASE === "phase-production-build";
  const attempts = building ? 5 : 3;
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url.toString(), {
        headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
        next: { revalidate: 300 },
      });
      if (!res.ok) throw new Error(`Schedule API ${res.status}`);
      const json = await res.json();
      if (json.status !== "success" || !Array.isArray(json.data)) throw new Error("Schedule API invalid payload");
      return publicSchedules(json.data);
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((r) => setTimeout(r, attempt * (building ? 1000 : 500)));
    }
  }
  if (building) return [];
  throw lastError;
}

export function jakartaToday(): string {
  return new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}

export function publicSchedules(list: ShipSchedule[], today = jakartaToday()): ShipSchedule[] {
  const upcoming = list
    .filter((s) => !s.etdDate || s.etdDate >= today)
    .sort((a, b) => (a.etdDate ?? "9999").localeCompare(b.etdDate ?? "9999"));
  if (upcoming.length > 0) return upcoming;
  return [...list].sort((a, b) => (b.etdDate ?? "").localeCompare(a.etdDate ?? "")).slice(0, 15);
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
