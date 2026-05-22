"use client";
import { useState } from "react";
import { Search, Package, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { buildTrackingMessage } from "@/lib/whatsapp";

export default function TrackingPage() {
  const [resi, setResi] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTrack = () => {
    if (resi.trim()) setSubmitted(true);
  };

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

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Resi</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={resi}
                onChange={(e) => { setResi(e.target.value); setSubmitted(false); }}
                placeholder="Masukkan nomor resi..."
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#CC1F2A] focus:outline-none font-medium text-gray-700"
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={!resi.trim()}
              className="bg-[#CC1F2A] hover:bg-[#1A1A1A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Cek
            </button>
          </div>
        </div>

        {submitted && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-black text-[#111111]">Resi #{resi}</p>
                <p className="text-sm text-gray-500">Informasi pengiriman</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-sm text-blue-800">
              <strong>Sistem tracking sedang dalam pengembangan.</strong> Untuk status pengiriman real-time, silakan hubungi kami via WhatsApp dengan menyebutkan nomor resi Anda. Tim kami akan merespons dalam hitungan menit.
            </div>

            {/* Simulated steps */}
            <div className="space-y-4 mb-6">
              {[
                { label: "Paket diterima di gudang", done: true, time: "Konfirmasi via WA" },
                { label: "Sedang dalam proses pengiriman", done: true, time: "Estimasi sesuai layanan" },
                { label: "Dalam perjalanan", done: false, time: "Tracking via WA" },
                { label: "Tiba di tujuan", done: false, time: "Estimasi sesuai layanan" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    step.done ? "bg-green-500" : "bg-gray-200"
                  }`}>
                    {step.done ? (
                      <CheckCircle size={14} className="text-white" />
                    ) : (
                      <Clock size={12} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${step.done ? "text-[#111111]" : "text-gray-400"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={buildTrackingMessage(resi)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black py-4 rounded-xl transition-all hover:shadow-lg w-full"
            >
              <MessageCircle size={20} />
              Cek Status via WhatsApp — Respon Cepat
            </a>
          </div>
        )}

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: MessageCircle,
              title: "WhatsApp",
              desc: "Chat langsung dengan CS kami untuk info status real-time",
            },
            {
              icon: Package,
              title: "Nomor Resi",
              desc: "Nomor resi diberikan setelah barang diterima di gudang kami",
            },
            {
              icon: Clock,
              title: "Update Berkala",
              desc: "Kami kirim notifikasi status pengiriman secara berkala via WA",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100 flex gap-3">
              <item.icon size={20} className="text-[#CC1F2A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#111111] text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
