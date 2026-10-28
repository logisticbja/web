"use client";
import { MessageCircle, Phone } from "lucide-react";
import { buildGeneralMessage, WA_PHONE_RAW } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";

export function MobileCtaBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 md:hidden border-t border-gray-200 bg-white px-3 pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={`tel:+${WA_PHONE_RAW}`}
        aria-label="Telepon BJA Logistic"
        className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 active:bg-gray-50"
      >
        <Phone size={18} />
        Telepon
      </a>
      <WALink
        href={buildGeneralMessage()}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#15803D] py-3 text-base font-black text-white active:bg-[#166534]"
      >
        <MessageCircle size={20} />
        Chat WhatsApp
      </WALink>
    </div>
  );
}
