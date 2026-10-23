import type { Metadata } from "next";
import { ToolPreview } from "@/components/preview/ToolPreview";
import { getSchedules } from "@/lib/schedule";

export const metadata: Metadata = {
  title: { absolute: "Preview Jadwal Kapal — BJA Logistic" },
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

export default async function JadwalKapalPreviewPage() {
  const schedules = await getSchedules();
  return <ToolPreview page="jadwal-kapal" schedules={schedules} />;
}
