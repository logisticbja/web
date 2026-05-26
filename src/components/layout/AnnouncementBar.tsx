"use client";
import { useState } from "react";
import Link from "next/link";
import { X, Ship, Building2 } from "lucide-react";
import { buildCorporateMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#1A1A1A] py-2.5 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-x-4 gap-y-1.5 flex-wrap text-sm pr-6">

        {/* Schedule */}
        <span className="flex items-center gap-1.5 text-white/65">
          <Ship size={13} className="text-[#F5C518] shrink-0" />
          <span>
            Jadwal kapal Papua & Maluku{" "}
            <strong className="text-white">Rabu & Sabtu</strong>.
          </span>
          <Link
            href="/jadwal-kapal"
            className="text-[#F5C518] hover:text-white font-semibold underline underline-offset-2 transition-colors"
          >
            Lihat jadwal →
          </Link>
        </span>

        <span className="hidden sm:block w-px h-3.5 bg-white/20" />

        {/* Corporate CTA — highlighted */}
        <WALink
          href={buildCorporateMessage()}
          conversion="waCorporate"
          className="flex items-center gap-1.5 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black text-xs px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <Building2 size={12} />
          Corporate & Volume Besar? Harga Kontrak Khusus →
        </WALink>

      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/80 transition-colors p-1"
        aria-label="Tutup pengumuman"
      >
        <X size={14} />
      </button>
    </div>
  );
}
