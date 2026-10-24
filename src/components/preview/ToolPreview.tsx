"use client";
import { useState } from "react";
import { CekOngkirView } from "@/components/tools/CekOngkirView";
import { TrackingView } from "@/components/tools/TrackingView";
import { ScheduleClient } from "@/app/jadwal-kapal/ScheduleClient";
import { mergeCekOngkir, type CekOngkirContent } from "@/lib/sitePages/cekOngkir";
import { mergeJadwalKapal, type JadwalKapalContent } from "@/lib/sitePages/jadwalKapal";
import { mergeTracking, type TrackingContent } from "@/lib/sitePages/tracking";
import type { ShipSchedule } from "@/lib/schedule";
import { TujuanView } from "@/components/tools/TujuanView";
import { mergeTujuan, type TujuanContent } from "@/lib/sitePages/tujuan";
import { getRegionConfig, type RegionSlug } from "@/lib/data/regions";
import { BlogIndexView } from "@/components/tools/BlogIndexView";
import { mergeBlogIndex, type BlogIndexContent } from "@/lib/sitePages/blogIndex";
import type { PostMeta } from "@/lib/blog";
import { LayananView } from "@/components/tools/LayananView";
import { mergeLayanan, type LayananContent } from "@/lib/sitePages/layanan";
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

export function TujuanPreview({ region, live, defaults, schedules }: { region: RegionSlug; live: TujuanContent; defaults: TujuanContent; schedules: ShipSchedule[] }) {
  const content = useSitePreview(`tujuan-${region}`, live, defaults, mergeTujuan);
  const config = getRegionConfig(region);
  if (!config) return null;
  return (
    <>
      <PreviewStyles />
      <TujuanView config={config} content={content} schedules={schedules} edit />
    </>
  );
}

export function BlogIndexPreview({ live, defaults, posts }: { live: BlogIndexContent; defaults: BlogIndexContent; posts: PostMeta[] }) {
  const content = useSitePreview("blog", live, defaults, mergeBlogIndex);
  return (
    <>
      <PreviewStyles />
      <BlogIndexView content={content} posts={posts} edit />
    </>
  );
}

export function LayananPreview({ live, defaults }: { live: LayananContent; defaults: LayananContent }) {
  const content = useSitePreview("layanan", live, defaults, mergeLayanan);
  return (
    <>
      <PreviewStyles />
      <LayananView content={content} edit />
    </>
  );
}
