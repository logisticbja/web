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

  // Info kapal cuma relevan (dan ditampilkan) selagi barang masih dalam tahap
  // hub/pelayaran -- step 3 "Barang Diproses di Hub Transit" s/d step 6
  // "Perjalanan ke Hub Tujuan". Di luar rentang itu info kapal tidak relevan.
  const showShipInfo = d.currentStep >= 3 && d.currentStep <= 6;

  return NextResponse.json({
    noResi: d.noResi,
    asal: d.origin,
    tujuan: d.destination,
    layanan: d.service ?? "",
    estimasiTiba: d.etaDate ? formatTime(d.etaDate) : undefined,
    namaKapal: showShipInfo ? (d.shipName ?? undefined) : undefined,
    tanggalBerangkat: showShipInfo ? (d.departureDateDisplay ?? undefined) : undefined,
    estimasiPerjalanan: showShipInfo ? (d.travelEstimateDays ?? undefined) : undefined,
    events: d.timeline.map((t) => ({
      status: t.status,
      waktu: formatTime(t.time),
      catatan: t.note || undefined,
    })),
  });
}
