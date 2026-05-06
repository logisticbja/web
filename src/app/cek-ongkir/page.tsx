"use client";
import { useState } from "react";
import { Calculator, MessageCircle, ChevronDown, Package, Truck, Ship, Plane } from "lucide-react";
import { originCities, destinationCities, calculatePrice, formatPrice, ServiceType } from "@/lib/data/pricing";
import { buildOngkirMessage } from "@/lib/whatsapp";

export default function CekOngkirPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState<ServiceType>("laut");
  const [result, setResult] = useState<ReturnType<typeof calculatePrice> | null>(null);

  const serviceOptions: { value: ServiceType; label: string; icon: React.FC<{ size?: number }> }[] = [
    { value: "laut", label: "Cargo Laut", icon: Ship },
    { value: "darat", label: "Cargo Darat", icon: Truck },
    { value: "udara", label: "Cargo Udara", icon: Plane },
  ];

  const handleCalculate = () => {
    if (!from || !to || !weight) return;
    const r = calculatePrice(to, service, Number(weight));
    setResult(r);
  };

  const fromLabel = originCities.find((c) => c.value === from)?.label || "";
  const toLabel = destinationCities.find((c) => c.value === to)?.label || "";
  const priceRangeText = result
    ? `${formatPrice(result.priceMin)} – ${formatPrice(result.priceMax)}`
    : "";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#1B3A6B] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#F97316] flex items-center justify-center mx-auto mb-4">
            <Calculator size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Kalkulator Ongkir
          </h1>
          <p className="text-blue-200 text-lg">
            Hitung estimasi biaya pengiriman ke Papua & Indonesia Timur dalam detik
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {/* From */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kota Asal</label>
              <div className="relative">
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3A6B] focus:outline-none appearance-none bg-white font-medium text-gray-700"
                >
                  <option value="">Pilih kota asal...</option>
                  {originCities.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kota Tujuan</label>
              <div className="relative">
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3A6B] focus:outline-none appearance-none bg-white font-medium text-gray-700"
                >
                  <option value="">Pilih kota tujuan...</option>
                  {destinationCities.map((c) => (
                    <option key={c.value} value={c.value}>{c.label} ({c.region})</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Berat (kg)</label>
              <div className="relative">
                <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Contoh: 500"
                  min="1"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B3A6B] focus:outline-none font-medium text-gray-700"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Minimum 100 kg untuk cargo laut/darat, 10 kg untuk udara</p>
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tipe Layanan</label>
              <div className="grid grid-cols-3 gap-2">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setService(opt.value)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                      service === opt.value
                        ? "border-[#1B3A6B] bg-[#1B3A6B] text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <opt.icon size={18} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={!from || !to || !weight}
            className="w-full bg-[#1B3A6B] hover:bg-[#0f2347] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-lg"
          >
            Hitung Ongkir
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-black text-[#0F172A] mb-6 pb-4 border-b border-gray-100">
              Estimasi Biaya Pengiriman
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="col-span-2 bg-[#1B3A6B] rounded-xl p-4 text-white">
                <p className="text-blue-300 text-xs mb-1">Estimasi Harga Total</p>
                <p className="text-2xl font-black">{priceRangeText}</p>
                <p className="text-blue-300 text-xs mt-1">untuk {weight} kg via {result.serviceName}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">Estimasi Tiba</p>
                <p className="text-xl font-black text-[#F97316]">{result.etaMin}–{result.etaMax}</p>
                <p className="text-gray-500 text-xs">hari kerja</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">Rute</p>
                <p className="text-sm font-black text-[#0F172A]">{fromLabel}</p>
                <p className="text-xs text-gray-400">→ {toLabel}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
              <strong>Catatan:</strong> Harga di atas adalah estimasi. Harga final tergantung berat aktual, dimensi (volume), dan ketersediaan jadwal. Konfirmasi via WhatsApp untuk harga pasti.
            </div>

            <a
              href={buildOngkirMessage(fromLabel, toLabel, Number(weight), result.serviceName, priceRangeText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black text-lg py-4 rounded-xl transition-all hover:shadow-lg w-full"
            >
              <MessageCircle size={22} />
              Pesan via WhatsApp — Konfirmasi Harga Final
            </a>
          </div>
        )}

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Ship, title: "Cargo Laut", desc: "Paling hemat, cocok untuk barang berat & besar" },
            { icon: Truck, title: "Cargo Darat", desc: "Seimbang antara harga dan kecepatan" },
            { icon: Plane, title: "Cargo Udara", desc: "Paling cepat untuk kebutuhan urgent" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100 flex gap-3">
              <item.icon size={20} className="text-[#1B3A6B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#0F172A] text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
