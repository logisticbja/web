import { NextRequest, NextResponse } from "next/server";
import { fetchTrackingByResi } from "@/lib/sheets"; // returns TrackingData (multiple events) or null

export async function GET(request: NextRequest) {
  const resi = request.nextUrl.searchParams.get("resi")?.trim();

  if (!resi) {
    return NextResponse.json({ error: "Nomor resi wajib diisi" }, { status: 400 });
  }

  const data = await fetchTrackingByResi(resi);

  if (!data) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
