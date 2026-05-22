"use client";
import { MessageCircle, Phone } from "lucide-react";
import { buildGeneralMessage, WA_PHONE_RAW } from "@/lib/whatsapp";

export function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden border-t border-gray-200 bg-white shadow-2xl">
      <a
        href={`tel:+${WA_PHONE_RAW}`}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[#CC1F2A] hover:bg-gray-50 transition-colors"
      >
        <Phone size={20} />
        <span className="text-xs font-semibold">Telepon</span>
      </a>
      <a
        href={buildGeneralMessage()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 bg-[#25D366] text-white hover:bg-[#20bc59] transition-colors"
      >
        <MessageCircle size={20} />
        <span className="text-xs font-bold">WhatsApp</span>
      </a>
    </div>
  );
}
