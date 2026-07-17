export interface ShipSchedule {
  route: string;
  from: string;
  to: string;
  ship: string;
  operator: string;
  departure: string;
  eta: string;
  frequency: string;
  region: string;
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
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    if (json.status !== "success") return [];
    return json.data ?? [];
  } catch {
    return [];
  }
}
