"use client";
import { useState } from "react";
import { CityPageView } from "@/components/tools/CityPageView";
import { buildCityView, fromSlug } from "@/lib/cityPage";
import { normalizeCityPreview } from "@/lib/cityPreview";
import { resolveDestinationValue } from "@/lib/data/pricing";
import type { CityPageData } from "@/lib/cityPages";
import { PreviewStyles, usePreviewBridge } from "./usePreviewBridge";

export function CityPreview() {
  const [data, setData] = useState<CityPageData | null>(null);
  usePreviewBridge({ page: "kota" }, (raw) => setData(normalizeCityPreview(raw)));

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        Isi nama kota dan slug untuk melihat preview…
      </div>
    );
  }

  const view = buildCityView(resolveDestinationValue(fromSlug(data.slug)), data);
  return (
    <>
      <PreviewStyles />
      <CityPageView view={view} data={data} edit />
    </>
  );
}
