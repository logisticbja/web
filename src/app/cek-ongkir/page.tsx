import { Metadata } from "next";
import { Calculator, Ship, Truck, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
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
      <div className="bg-[#CC1F2A] py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center mx-auto mb-3">
            <Calculator size={20} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mb-1.5">
            Kalkulator Ongkir
          </h1>
          <p className="text-white/70 text-sm">
            Hitung estimasi biaya pengiriman ke Papua & Indonesia Timur dalam detik
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Regular: min. 100 kg
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Express: min. 100 kg
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <CekOngkirForm rows={rows} />

        {/* Rute Populer */}
        <div className="mt-8 mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Rute Populer</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Papua", slug: "papua", transit: "4–9 hari", cities: "Sorong, Jayapura, Manokwari" },
              { label: "Maluku", slug: "maluku", transit: "3–6 hari", cities: "Ambon, Ternate, Tual" },
              { label: "NTT", slug: "ntt", transit: "3–5 hari", cities: "Kupang, Flores, Ende" },
              { label: "Sulawesi", slug: "sulawesi", transit: "2–5 hari", cities: "Makassar, Kendari, Palu" },
            ].map((r) => (
              <Link
                key={r.slug}
                href={`/cargo/${r.slug}`}
                className="group bg-white rounded-xl border border-gray-100 hover:border-[#CC1F2A]/40 hover:shadow-md p-4 transition-all flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#111] text-sm">{r.label}</span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#CC1F2A] transition-colors" />
                </div>
                <p className="text-[11px] text-gray-400 leading-snug">{r.cities}</p>
                <span className="text-[10px] font-bold text-[#CC1F2A] bg-red-50 px-2 py-0.5 rounded-full self-start mt-auto">
                  {r.transit}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Ship, title: "Cargo Laut — Regular", desc: "Paling hemat untuk muatan besar. Minimum 100 kg per pengiriman." },
            { icon: Truck, title: "Cargo Darat", desc: "Tersedia untuk rute tertentu via angkutan darat. Minimum 100 kg." },
            { icon: Zap, title: "Express", desc: "Layanan prioritas, lebih cepat sampai. Minimum 10 kg per pengiriman." },
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
