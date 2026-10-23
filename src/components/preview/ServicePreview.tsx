"use client";
import { useState } from "react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { getServiceIcon } from "@/lib/serviceIcons";
import { buildServiceMessage } from "@/lib/whatsapp";
import { normalizeServicePreview } from "@/lib/servicePreview";
import type { ServicePageData } from "@/lib/servicePages";
import { PreviewStyles, usePreviewBridge } from "./usePreviewBridge";

export function ServicePreview() {
  const [data, setData] = useState<ServicePageData | null>(null);
  usePreviewBridge({ page: "layanan" }, (raw) => setData(normalizeServicePreview(raw)));

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        Menunggu data dari CRM…
      </div>
    );
  }

  const Icon = getServiceIcon(data.icon);
  return (
    <>
      <PreviewStyles />
      <ServicePageLayout
        icon={Icon}
        title={data.title || "Judul Layanan"}
        subtitle={data.subtitle}
        imageBanner={data.imageBanner || undefined}
        description={data.description}
        priceFrom={data.priceFrom}
        priceNote={data.priceNote}
        eta={data.eta}
        waHref={buildServiceMessage(data.title || "Layanan")}
        waLabel={data.waLabel}
        features={data.features}
        details={data.details}
        relatedServices={data.relatedServices}
        edit
      />
    </>
  );
}
