import type { Metadata } from "next";
import { JadwalKapalPreview } from "@/components/preview/ToolPreview";
import { getSchedules } from "@/lib/schedule";
import { loadJadwalKapal } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Jadwal Kapal — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function JadwalKapalPreviewPage() {
  const [schedules, { live, defaults }] = await Promise.all([getSchedules(), loadJadwalKapal()]);
  return <JadwalKapalPreview live={live} defaults={defaults} schedules={schedules} />;
}
