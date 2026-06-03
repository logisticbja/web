import { Suspense } from "react";
import { Package, Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { TrackingClient } from "@/components/TrackingClient";

export const metadata: Metadata = {
  title: "Tracking Resi | BJA Logistic",
  description: "Cek status pengiriman Anda dengan nomor resi BJA Logistic.",
};

function TrackingFallback() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
      <Loader2 size={28} className="animate-spin text-[#CC1F2A]" />
    </div>
  );
}

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#CC1F2A] py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center mx-auto mb-3">
            <Package size={20} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mb-1.5">
            Tracking Pengiriman
          </h1>
          <p className="text-white/70 text-sm">
            Cek status pengiriman Anda dengan nomor resi
          </p>
        </div>
      </div>

      <Suspense fallback={<TrackingFallback />}>
        <TrackingClient />
      </Suspense>
    </div>
  );
}
