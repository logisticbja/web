import { Building2, MessageCircle, ArrowRight } from "lucide-react";
import { buildCorporateMessage } from "@/lib/whatsapp";

export function CorporateBanner() {
  return (
    <div className="bg-[#1A1A1A] py-5 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: message */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center shrink-0">
              <Building2 size={20} className="text-[#1A1A1A]" />
            </div>
            <div>
              <p className="font-black text-white text-sm sm:text-base">
                Pengiriman Volume Besar / Kebutuhan Corporate?
              </p>
              <p className="text-white/55 text-xs sm:text-sm">
                Min. 500 kg/bulan — dapatkan harga kontrak, NET 60, & dedicated AM
              </p>
            </div>
          </div>

          {/* Right: stats + CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:block text-center">
              <p className="text-[#F5C518] font-black text-lg leading-tight">Hemat 20%</p>
              <p className="text-white/40 text-xs">vs tarif eceran</p>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/15" />
            <div className="hidden md:block text-center">
              <p className="text-[#F5C518] font-black text-lg leading-tight">NET 60</p>
              <p className="text-white/40 text-xs">tenor pembayaran</p>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/15" />
            <a
              href={buildCorporateMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              <MessageCircle size={15} />
              Tanya Harga Corporate
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
