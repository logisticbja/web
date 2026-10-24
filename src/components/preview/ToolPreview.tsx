"use client";
import { useState } from "react";
import { CekOngkirView } from "@/components/tools/CekOngkirView";
import { TrackingView } from "@/components/tools/TrackingView";
import { ScheduleClient } from "@/app/jadwal-kapal/ScheduleClient";
import { mergeCekOngkir, type CekOngkirContent } from "@/lib/sitePages/cekOngkir";
import { mergeJadwalKapal, type JadwalKapalContent } from "@/lib/sitePages/jadwalKapal";
import { mergeTracking, type TrackingContent } from "@/lib/sitePages/tracking";
import type { ShipSchedule } from "@/lib/schedule";
import { PreviewStyles, usePreviewBridge } from "./usePreviewBridge";

function useSitePreview<T>(page: string, live: T, defaults: T, merge: (b: T, raw: unknown) => T): T {
  const [content, setContent] = useState<T>(live);
  usePreviewBridge({ page, live, defaults }, (raw) => setContent(merge(defaults, raw)));
  return content;
}

export function CekOngkirPreview({ live, defaults }: { live: CekOngkirContent; defaults: CekOngkirContent }) {
  const content = useSitePreview("cek-ongkir", live, defaults, mergeCekOngkir);
  return (
    <>
      <PreviewStyles />
      <CekOngkirView content={content} edit />
    </>
  );
}

export function JadwalKapalPreview({ live, defaults, schedules }: { live: JadwalKapalContent; defaults: JadwalKapalContent; schedules: ShipSchedule[] }) {
  const content = useSitePreview("jadwal-kapal", live, defaults, mergeJadwalKapal);
  return (
    <>
      <PreviewStyles />
      <ScheduleClient schedules={schedules} content={content} edit />
    </>
  );
}

export function TrackingPreview({ live, defaults }: { live: TrackingContent; defaults: TrackingContent }) {
  const content = useSitePreview("tracking", live, defaults, mergeTracking);
  return (
    <>
      <PreviewStyles />
      <TrackingView content={content} edit />
    </>
  );
}
