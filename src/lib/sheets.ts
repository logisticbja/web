// ─── Tracking ────────────────────────────────────────────────────────────────
// Sheet tab: "Tracking"
// Columns: no_resi | asal | tujuan | layanan | status | waktu | estimasi_tiba | catatan
//
// One row per status event. Multiple rows can share the same no_resi.
// asal/tujuan/layanan/estimasi_tiba only need to be filled on the first row.
// waktu format: "DD/MM/YYYY HH:mm"  e.g. "15/01/2024 14:30"

export interface TrackingEvent {
  status: string;
  waktu: string;
  catatan: string;
}

export interface TrackingData {
  noResi: string;
  asal: string;
  tujuan: string;
  layanan: string;
  estimasiTiba: string;
  events: TrackingEvent[];
}

export async function fetchTrackingByResi(resi: string): Promise<TrackingData | null> {
  const id = process.env.GOOGLE_SHEETS_ID;
  const key = process.env.GOOGLE_SHEETS_API_KEY;

  if (!id || !key || id === "your_sheet_id_here") return null;

  const range = encodeURIComponent("Tracking!A2:H");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${key}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const json = await res.json();
    const rows: string[][] = json.values ?? [];

    const matching = rows.filter(
      (r) => r[0]?.trim().toUpperCase() === resi.toUpperCase()
    );
    if (!matching.length) return null;

    const first = matching[0];
    return {
      noResi: first[0]?.trim() ?? "",
      asal: first[1]?.trim() ?? "",
      tujuan: first[2]?.trim() ?? "",
      layanan: first[3]?.trim() ?? "",
      estimasiTiba: first[6]?.trim() ?? "",
      events: matching.map((r) => ({
        status: r[4]?.trim() ?? "",
        waktu: r[5]?.trim() ?? "",
        catatan: r[7]?.trim() ?? "",
      })),
    };
  } catch {
    return null;
  }
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

export interface PricingRow {
  origin: string;
  destinationProvince: string;
  destinationCity: string;
  service: "Express" | "Regular";
  pricePerKg: number;
  minWeightKg: number;
  estimation: string;
}

export async function fetchPricing(): Promise<PricingRow[]> {
  const id = process.env.GOOGLE_SHEETS_ID;
  const key = process.env.GOOGLE_SHEETS_API_KEY;

  if (!id || !key || id === "your_sheet_id_here" || key === "your_api_key_here") {
    console.warn("[sheets] GOOGLE_SHEETS_ID / GOOGLE_SHEETS_API_KEY belum diisi di .env.local");
    return [];
  }

  const range = encodeURIComponent("Pricing!A2:G");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${key}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error("[sheets] Fetch gagal:", res.status, await res.text());
      return [];
    }

    const json = await res.json();
    const rows: string[][] = json.values ?? [];

    return rows
      .filter((r) => r.length >= 7 && r[0] && r[2] && r[3])
      .map((r) => ({
        origin: r[0].trim(),
        destinationProvince: r[1].trim(),
        destinationCity: r[2].trim(),
        service: r[3].trim() === "Express" ? "Express" : "Regular",
        pricePerKg: Number(r[4].replace(/\D/g, "")) || 0,
        minWeightKg: Number(r[5].replace(/\D/g, "")) || 1,
        estimation: r[6].trim(),
      }));
  } catch (err) {
    console.error("[sheets] Error:", err);
    return [];
  }
}

const ORIGIN_ALIASES: Record<string, string> = {
  sidoarjo: "surabaya",
};

export function findPrice(
  rows: PricingRow[],
  origin: string,
  destinationCity: string,
  service: "Express" | "Regular"
): PricingRow | undefined {
  const normalizedOrigin = ORIGIN_ALIASES[origin.toLowerCase()] ?? origin.toLowerCase();
  return rows.find(
    (r) =>
      r.origin.toLowerCase() === normalizedOrigin &&
      r.destinationCity.toLowerCase() === destinationCity.toLowerCase() &&
      r.service === service
  );
}
