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
