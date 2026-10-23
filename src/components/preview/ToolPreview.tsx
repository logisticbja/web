"use client";
import { useState } from "react";
import { CekOngkirView } from "@/components/tools/CekOngkirView";
import { TrackingView } from "@/components/tools/TrackingView";
import { ScheduleClient } from "@/app/jadwal-kapal/ScheduleClient";
import type { PageHeroContent } from "@/lib/pageHero";
import type { ShipSchedule } from "@/lib/schedule";
import { normalizeHeroPreview } from "@/lib/toolPages";
import { PreviewStyles, usePreviewBridge } from "./usePreviewBridge";

export type ToolPage = "cek-ongkir" | "jadwal-kapal" | "tracking";

export function ToolPreview({ page, schedules = [] }: { page: ToolPage; schedules?: ShipSchedule[] }) {
  const [hero, setHero] = useState<PageHeroContent | null>(null);
  usePreviewBridge({ page }, (raw) => setHero(normalizeHeroPreview(raw)));

  if (!hero) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        Menunggu data dari CRM…
      </div>
    );
  }

  return (
    <>
      <PreviewStyles />
      {page === "cek-ongkir" && <CekOngkirView hero={hero} edit />}
      {page === "jadwal-kapal" && <ScheduleClient schedules={schedules} hero={hero} edit />}
      {page === "tracking" && <TrackingView hero={hero} edit />}
    </>
  );
}
