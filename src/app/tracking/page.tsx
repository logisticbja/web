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
      <div className="bg-[#CC1F2A] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#F5C518] flex items-center justify-center mx-auto mb-4">
            <Package size={28} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Tracking Pengiriman
          </h1>
          <p className="text-white/70 text-lg">
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
