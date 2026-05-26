"use client";
import { useState } from "react";
import { Calculator, MessageCircle, ChevronDown, Package, Zap, Clock, AlertCircle } from "lucide-react";
import { originCities, formatPrice } from "@/lib/data/pricing";
import { ongkirGroups, findOngkirCity } from "@/lib/data/ongkir";
import { type PricingRow, findPrice } from "@/lib/sheets";
import { buildOngkirMessage, buildGeneralMessage } from "@/lib/whatsapp";

type ServiceType = "Express" | "Regular";

interface Props {
  rows: PricingRow[];
}

export function CekOngkirForm({ rows }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState<ServiceType>("Regular");
  const [result, setResult] = useState<{ row: PricingRow; total: number } | "not_found" | null>(null);

  const handleCalculate = () => {
    if (!from || !to || !weight) return;
    const fromLabel = originCities.find((c) => c.value === from)?.label ?? from;
    const toInfo = findOngkirCity(to);
    const toLabel = toInfo?.city.label ?? to;
    const row = findPrice(rows, fromLabel, toLabel, service);
    if (!row) {
      setResult("not_found");
    } else {
      setResult({ row, total: row.pricePerKg * Number(weight) });
    }
  };

  const fromLabel = originCities.find((c) => c.value === from)?.label ?? "";
  const toLabel = to ? (findOngkirCity(to)?.city.label ?? "") : "";

  const serviceOptions: { value: ServiceType; label: string; desc: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { value: "Regular", label: "Regular", desc: "Hemat, jadwal rutin", icon: Clock },
    { value: "Express", label: "Express", desc: "Lebih cepat & prioritas", icon: Zap },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

        {/* Origin */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Kota Asal</label>
          <div className="relative">
            <select
              value={from}
              onChange={(e) => { setFrom(e.target.value); setResult(null); }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CC1F2A] focus:outline-none appearance-none bg-white font-medium text-gray-700"
            >
              <option value="">Pilih kota asal...</option>
              {originCities.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Kota Tujuan</label>
          <div className="relative">
            <select
              value={to}
              onChange={(e) => { setTo(e.target.value); setResult(null); }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CC1F2A] focus:outline-none appearance-none bg-white font-medium text-gray-700"
            >
              <option value="">Pilih kota tujuan...</option>
              {ongkirGroups.map((group) => (
                <optgroup key={group.groupLabel} label={group.groupLabel}>
                  {group.cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label} ({group.groupLabel})
                    </option>
                  ))}
                </optgroup>
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
              onChange={(e) => { setWeight(e.target.value); setResult(null); }}
              placeholder="Contoh: 500"
              min="1"
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#CC1F2A] focus:outline-none font-medium text-gray-700"
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tipe Layanan</label>
          <div className="grid grid-cols-2 gap-3">
            {serviceOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setService(opt.value); setResult(null); }}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all ${
                  service === opt.value
                    ? "border-[#CC1F2A] bg-[#CC1F2A] text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <opt.icon size={18} />
                <span>{opt.label}</span>
                <span className={`font-normal text-[10px] ${service === opt.value ? "text-white/80" : "text-gray-400"}`}>{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!from || !to || !weight}
        className="w-full bg-[#CC1F2A] hover:bg-[#1A1A1A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
      >
        <Calculator size={20} />
        Hitung Ongkir
      </button>

      {/* Result */}
      {result === "not_found" && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <AlertCircle size={32} className="text-amber-500 mx-auto mb-3" />
          <h3 className="font-black text-[#111111] mb-1">Harga Belum Tersedia di Kalkulator</h3>
          <p className="text-gray-500 text-sm mb-4">
            Rute <strong>{fromLabel} → {toLabel}</strong> ({service}) belum ada di sistem.
            Hubungi tim kami untuk harga langsung.
          </p>
          <a
            href={buildGeneralMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Tanya Harga via WhatsApp
          </a>
        </div>
      )}

      {result && result !== "not_found" && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="col-span-2 bg-[#CC1F2A] rounded-xl p-4 text-white">
              <p className="text-white/70 text-xs mb-1">Total Estimasi Harga</p>
              <p className="text-2xl font-black">{formatPrice(result.total)}</p>
              <p className="text-white/70 text-xs mt-1">
                {formatPrice(result.row.pricePerKg)}/kg × {weight} kg · {result.row.service}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Estimasi Tiba</p>
              <p className="text-xl font-black text-[#CC1F2A]">{result.row.estimation}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Min. Berat</p>
              <p className="text-xl font-black text-[#111111]">{result.row.minWeightKg} kg</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
            Rute: <strong className="text-[#111111]">{fromLabel}</strong> →{" "}
            <strong className="text-[#111111]">{toLabel}</strong>
            <span className="ml-2 inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-0.5 text-xs font-bold text-[#CC1F2A]">
              {result.row.service}
            </span>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            <strong>Catatan:</strong> Harga di atas adalah estimasi berdasarkan berat. Harga final tergantung berat aktual, dimensi (volume), dan ketersediaan jadwal. Konfirmasi via WhatsApp untuk harga pasti.
          </div>

          <a
            href={buildOngkirMessage(
              fromLabel,
              toLabel,
              Number(weight),
              result.row.service,
              formatPrice(result.total)
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black text-lg py-4 rounded-xl transition-all hover:shadow-lg w-full"
          >
            <MessageCircle size={22} />
            Pesan via WhatsApp — Konfirmasi Harga Final
          </a>
        </div>
      )}
    </div>
  );
}
