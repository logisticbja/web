import { Metadata } from "next";
import { Calculator, Ship, Truck, Zap } from "lucide-react";
import { fetchPricing } from "@/lib/sheets";
import { CekOngkirForm } from "@/components/CekOngkirForm";

export const metadata: Metadata = {
  title: "Cek Ongkir — Kalkulator Biaya Pengiriman",
  description: "Hitung estimasi ongkos kirim cargo ke Papua, Maluku, NTT, dan Sulawesi. Layanan Express dan Regular. Langsung konfirmasi via WhatsApp.",
  alternates: { canonical: "https://bjalogistic.id/cek-ongkir" },
};

export default async function CekOngkirPage() {
  const rows = await fetchPricing();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#CC1F2A] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#F5C518] flex items-center justify-center mx-auto mb-4">
            <Calculator size={28} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Kalkulator Ongkir
          </h1>
          <p className="text-white/70 text-lg">
            Hitung estimasi biaya pengiriman ke Papua & Indonesia Timur dalam detik
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <CekOngkirForm rows={rows} />

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Ship, title: "Cargo Laut", desc: "Paling hemat, cocok untuk barang berat & besar (Regular)" },
            { icon: Truck, title: "Cargo Darat", desc: "Tersedia untuk rute tertentu via angkutan darat" },
            { icon: Zap, title: "Express", desc: "Layanan prioritas — lebih cepat sampai, harga premium" },
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
