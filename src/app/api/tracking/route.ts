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
  etaDate: string | null;
  currentStep: number;
  currentStatus: string;
  completed: boolean;
  timeline: ExternalTimeline[];
}

function formatTime(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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

  return NextResponse.json({
    noResi:       d.noResi,
    asal:         d.origin,
    tujuan:       d.destination,
    layanan:      "",
    estimasiTiba: d.etaDate ? formatTime(d.etaDate) : undefined,
    events:       d.timeline.map((t) => ({
      status:   t.status,
      waktu:    formatTime(t.time),
      catatan:  t.note || undefined,
    })),
  });
}
