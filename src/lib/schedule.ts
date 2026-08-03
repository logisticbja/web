export interface ShipSchedule {
  route: string;
  from: string;
  to: string;
  region: string;
  ship: string;
  serviceType: string;        // "Express" | "Reguler" | ""
  closingDate: string | null; // "YYYY-MM-DD"
  etdDate: string | null;     // "YYYY-MM-DD"
  etaDate: string | null;     // "YYYY-MM-DD"
}

export async function getSchedules(params?: {
  region?: string;
  destination?: string;
  q?: string;
}): Promise<ShipSchedule[]> {
  try {
    const url = new URL(process.env.SHIP_SCHEDULE_API_URL!);
    if (params?.region)      url.searchParams.set("region", params.region);
    if (params?.destination) url.searchParams.set("destination", params.destination);
    if (params?.q)           url.searchParams.set("q", params.q);

    const res = await fetch(url.toString(), {
      headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
      next: { revalidate: 300 },
    });

    const json = await res.json();
    if (json.status !== "success") return [];
    return json.data ?? [];
  } catch {
    return [];
  }
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
