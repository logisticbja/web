"use client";
import { useMemo, useState } from "react";
import { CityPageView } from "@/components/tools/CityPageView";
import { buildCityView, fromSlug } from "@/lib/cityPage";
import { normalizeCityPreview } from "@/lib/cityPreview";
import { resolveDestinationValue } from "@/lib/data/pricing";
import type { CityPageData } from "@/lib/cityPages";
import { mergeKotaTemplate, type KotaTemplate } from "@/lib/sitePages/kotaTemplate";
import { PreviewStyles, usePreviewBridge } from "./usePreviewBridge";

export function CityPreview({ tpl }: { tpl: KotaTemplate }) {
  const [data, setData] = useState<CityPageData | null>(null);
  usePreviewBridge({ page: "kota" }, (raw) => setData(normalizeCityPreview(raw)));

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        Isi nama kota dan slug untuk melihat preview…
      </div>
    );
  }

  const view = buildCityView(resolveDestinationValue(fromSlug(data.slug)), data, tpl);
  return (
    <>
      <PreviewStyles />
      <CityPageView view={view} data={data} edit="city" />
    </>
  );
}

export function KotaTemplatePreview({
  live,
  defaults,
  destination,
  data,
}: {
  live: KotaTemplate;
  defaults: KotaTemplate;
  destination: string;
  data: CityPageData | null;
}) {
  const [tpl, setTpl] = useState<KotaTemplate>(live);
  usePreviewBridge({ page: "kota-template", live, defaults }, (raw) => setTpl(mergeKotaTemplate(defaults, raw)));
  const view = useMemo(() => buildCityView(destination, data, tpl), [destination, data, tpl]);
  return (
    <>
      <PreviewStyles />
      <CityPageView view={view} data={data} edit="template" />
    </>
  );
}
