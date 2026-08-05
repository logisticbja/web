import { Ban } from "lucide-react";

export function RestrictionNotice() {
  return (
    <div className="bg-[#FEF2F2] border-b-2 border-[#CC1F2A]/30 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <Ban size={18} className="text-[#CC1F2A] shrink-0" />
        <p className="text-xs sm:text-sm leading-snug">
          <span className="font-black text-[#CC1F2A]">TIDAK MENERIMA PENGIRIMAN</span>{" "}
          <span className="text-[#7A1319] font-bold">HEWAN & FROZEN FOOD</span>
        </p>
      </div>
    </div>
  );
}
