import { Suspense } from "react";
import { Loader2, Package } from "lucide-react";
import { TrackingClient } from "@/components/TrackingClient";
import type { TrackingContent } from "@/lib/sitePages/tracking";
import { Sec, ToolHero } from "./ToolHero";

function TrackingFallback() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
      <Loader2 size={28} className="animate-spin text-[#CC1F2A]" />
    </div>
  );
}

export function TrackingView({ content, edit, extra }: { content: TrackingContent; edit?: boolean; extra?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sec edit={edit} id="hero">
        <ToolHero icon={Package} hero={content.hero} maxWidth="max-w-3xl" edit={edit} />
      </Sec>

      <Suspense fallback={<TrackingFallback />}>
        <TrackingClient content={content} edit={edit} />
      </Suspense>
      {extra}
    </div>
  );
}
