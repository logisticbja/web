import { Suspense } from "react";
import { Loader2, Package } from "lucide-react";
import { TrackingClient } from "@/components/TrackingClient";
import type { PageHeroContent } from "@/lib/pageHero";
import { trackingContent } from "@/lib/toolPages";
import { heroBadges, ToolHero } from "./ToolHero";

function TrackingFallback() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
      <Loader2 size={28} className="animate-spin text-[#CC1F2A]" />
    </div>
  );
}

export function TrackingView({ hero, edit }: { hero: PageHeroContent | null; edit?: boolean }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ToolHero
        icon={Package}
        hero={hero}
        defaultTagline="Tracking Pengiriman"
        defaultDescription="Cek status pengiriman Anda dengan nomor resi"
        defaultAlt="Tracking Pengiriman"
        badges={heroBadges(hero, " ")}
        maxWidth="max-w-3xl"
        edit={edit}
      />

      <Suspense fallback={<TrackingFallback />}>
        <TrackingClient content={trackingContent(hero)} edit={edit} />
      </Suspense>
    </div>
  );
}
