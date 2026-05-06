"use client";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { buildGeneralMessage, WA_PHONE } from "@/lib/whatsapp";

export function FloatingWA() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {expanded && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-100">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">BJA Logistic</p>
              <p className="text-xs text-green-500">Online sekarang</p>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 mb-3 text-sm text-gray-700">
            Halo! Ada yang bisa kami bantu? Chat kami langsung untuk cek ongkir & pesan pengiriman ke Papua & Indonesia Timur.
          </div>
          <a
            href={buildGeneralMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Mulai Chat — {WA_PHONE}
          </a>
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20bc59] flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 wa-pulse"
        aria-label="Chat WhatsApp"
      >
        {expanded ? (
          <X size={26} className="text-white" />
        ) : (
          <MessageCircle size={28} className="text-white" />
        )}
      </button>
    </div>
  );
}
