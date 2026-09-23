import { NextRequest, NextResponse } from "next/server";

interface ExternalTimeline {
  step: number;
  status: string;
  note: string;
  time: string;
}

interface ExternalData {
  noResi: string;
  origin: string;
  destination: string;
  service: string | null;
  shipName: string | null;
  departureDate: string | null;
  departureDateDisplay: string | null;
  travelEstimateDays: number | null;
  etaDate: string | null;
  etaDateDisplay: string | null;
  currentStep: number;
  currentStatus: string;
  completed: boolean;
  timeline: ExternalTimeline[];
}

function formatTime(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

export async function GET(request: NextRequest) {
  const resi = request.nextUrl.searchParams.get("resi")?.trim();

  if (!resi) {
    return NextResponse.json({ error: "Nomor resi wajib diisi" }, { status: 400 });
  }

  let res: Response;
  try {
    res = await fetch(
      `${process.env.TRACKING_API_URL}?resi=${encodeURIComponent(resi)}`,
      {
        headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" },
        next: { revalidate: 60 },
      }
    );
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 502 });
  }

  if (!res.ok) {
    return NextResponse.json({ error: "server_error" }, { status: 502 });
  }

  const json = await res.json();

  if (json.status !== "success" || !json.data) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const d: ExternalData = json.data;

  // Info kapal HANYA menempel di event step 4 "Menunggu Jadwal Keberangkatan
  // Kapal", tidak peduli kapal sudah diinput sejak tahap mana pun. Kalau ada
  // beberapa event step 4, pakai yang paling terakhir.
  const WAITING_SHIP_STEP = 4;
  let shipEventIndex = -1;
  d.timeline.forEach((t, i) => {
    if (t.step === WAITING_SHIP_STEP) shipEventIndex = i;
  });

  const kapal = d.shipName
    ? {
        nama: d.shipName,
        tanggalBerangkat: d.departureDateDisplay ?? undefined,
        estimasiPerjalanan: d.travelEstimateDays ?? undefined,
      }
    : undefined;

  return NextResponse.json({
    noResi: d.noResi,
    asal: d.origin,
    tujuan: d.destination,
    layanan: d.service ?? "",
    estimasiTiba: d.etaDate ? formatTime(d.etaDate) : undefined,
    events: d.timeline.map((t, i) => ({
      status: t.status,
      waktu: formatTime(t.time),
      catatan: t.note || undefined,
      kapal: i === shipEventIndex ? kapal : undefined,
    })),
  });
}
