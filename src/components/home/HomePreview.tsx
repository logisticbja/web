"use client";
import { useState } from "react";
import { HomeSections } from "./HomeSections";
import { mergeHomepage } from "@/lib/homepage/normalize";
import type { HomepageContent } from "@/lib/homepage/types";
import { PreviewStyles, usePreviewBridge } from "@/components/preview/usePreviewBridge";

export function HomePreview({ live, defaults }: { live: HomepageContent; defaults: HomepageContent }) {
  const [content, setContent] = useState<HomepageContent>(live);
  usePreviewBridge({ live, defaults }, (raw) => setContent(mergeHomepage(defaults, raw)));
  return (
    <>
      <PreviewStyles />
      <HomeSections content={content} edit />
    </>
  );
}
