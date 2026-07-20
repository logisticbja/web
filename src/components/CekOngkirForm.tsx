"use client";
import { useState, useRef, useEffect } from "react";
import { Calculator, MessageCircle, ChevronDown, Package, Zap, Clock, AlertCircle, Search, MapPin } from "lucide-react";
import { originCities, formatPrice } from "@/lib/data/pricing";
import { ongkirGroups, findOngkirCity } from "@/lib/data/ongkir";
import { type PricingRow, findPrice } from "@/lib/sheets";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";

type ServiceType = "Express" | "Regular";

interface DefaultValues {
  from?: string;
  to?: string;
  toLabel?: string;
  weight?: string;
  service?: ServiceType;
}

interface Props {
  rows: PricingRow[];
  defaultValues?: DefaultValues;
  autoCalculate?: boolean;
}

const allCities = ongkirGroups.flatMap((g) =>
  g.cities.map((c) => ({ ...c, group: g.groupLabel }))
);

function computeInitialResult(
  dv: DefaultValues | undefined,
  rows: PricingRow[]
): { row: PricingRow; total: number } | "not_found" | null {
  if (!dv?.from || !dv?.to || !dv?.weight) return null;
  const weightNum = Number(dv.weight);
  if (!weightNum || weightNum < 100) return null;
  const fromLabel = originCities.find((c) => c.value === dv.from)?.label ?? dv.from ?? "";
  const toInfo = findOngkirCity(dv.to!);
  const toLabel = toInfo?.city.label ?? dv.to ?? "";
  const row = findPrice(rows, fromLabel, toLabel, dv.service ?? "Regular");
  if (!row) return "not_found";
  return { row, total: row.pricePerKg * weightNum };
}

export function CekOngkirForm({ rows, defaultValues, autoCalculate }: Props) {
  const [from, setFrom] = useState(defaultValues?.from ?? "");
  const [to, setTo] = useState(defaultValues?.to ?? "");
  const [toSearch, setToSearch] = useState(defaultValues?.toLabel ?? "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [weight, setWeight] = useState(defaultValues?.weight ?? "");
  const [service, setService] = useState<ServiceType>(defaultValues?.service ?? "Regular");
  const [result, setResult] = useState<{ row: PricingRow; total: number } | "not_found" | null>(
    () => (autoCalculate ? computeInitialResult(defaultValues, rows) : null)
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCity = to ? allCities.find((c) => c.value === to) : null;

  const filteredCities = toSearch.trim()
    ? allCities.filter((c) =>
        c.label.toLowerCase().includes(toSearch.toLowerCase()) ||
        c.group.toLowerCase().includes(toSearch.toLowerCase())
      )
    : allCities;

  const groupedFiltered = ongkirGroups
    .map((g) => ({
      ...g,
      cities: filteredCities.filter((c) => c.group === g.groupLabel),
    }))
    .filter((g) => g.cities.length > 0);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCity = (value: string, label: string) => {
    setTo(value);
    setToSearch(label);
    setShowDropdown(false);
    setResult(null);
  };

  const MIN_WEIGHT = 100;
  const weightNum = Number(weight);
  const weightTooLow = weight !== "" && weightNum > 0 && weightNum < MIN_WEIGHT;

  const handleCalculate = () => {
    if (!from || !to || !weight || weightTooLow) return;
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

        {/* Destination — Searchable */}
        <div ref={dropdownRef}>
          <label className="block text-sm font-bold text-gray-700 mb-2">Kota Tujuan</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              value={toSearch}
              onChange={(e) => {
                setToSearch(e.target.value);
                setTo("");
                setResult(null);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Cari kota tujuan..."
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#CC1F2A] focus:outline-none font-medium text-gray-700 bg-white"
            />
            {selectedCity && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#CC1F2A] bg-red-50 px-2 py-0.5 rounded-full">
                {selectedCity.group}
              </span>
            )}

            {showDropdown && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                {groupedFiltered.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">Kota tidak ditemukan</p>
                ) : (
                  groupedFiltered.map((group) => (
                    <div key={group.groupLabel}>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1 sticky top-0 bg-white">
                        {group.groupLabel}
                      </p>
                      {group.cities.map((city) => (
                        <button
                          key={city.value}
                          onMouseDown={() => handleSelectCity(city.value, city.label)}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-red-50 hover:text-[#CC1F2A] transition-colors ${
                            to === city.value ? "bg-red-50 text-[#CC1F2A]" : "text-gray-700"
                          }`}
                        >
                          <MapPin size={13} className="shrink-0 text-gray-300" />
                          {city.label}
                        </button>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
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
              placeholder="Min. 100 kg"
              min="100"
              className={`w-full pl-9 pr-4 py-3 rounded-xl border focus:outline-none font-medium text-gray-700 transition-colors ${
                weightTooLow
                  ? "border-red-400 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-[#CC1F2A]"
              }`}
            />
          </div>
          {weightTooLow && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <AlertCircle size={13} />
              Minimum pengiriman 100 kg.
            </p>
          )}
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

      <div className="grid grid-cols-[1fr_auto] gap-3">
        <button
          onClick={handleCalculate}
          disabled={!from || !to || !weight || weightTooLow}
          className="bg-[#CC1F2A] hover:bg-[#1A1A1A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Hitung Ongkir
        </button>
        <WALink
          href={(() => {
            const f = fromLabel || "Jabodetabek";
            const t = toLabel || "-";
            const w = weight ? `${weight} kg` : "-";
            const msg = `Halo BJA Logistic, saya mau tanya ongkir cargo:\n- Dari: ${f}\n- Ke: ${t}\n- Berat: ${w}\n\nBisa bantu info harga dan jadwal pengirimannya?`;
            return `https://api.whatsapp.com/send/?phone=6281513335157&text=${encodeURIComponent(msg)}`;
          })()}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black py-4 px-5 rounded-xl transition-colors text-sm whitespace-nowrap"
        >
          <MessageCircle size={20} />
          Minta Penawaran
        </WALink>
      </div>

      {/* Result */}
      {result === "not_found" && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <AlertCircle size={32} className="text-amber-500 mx-auto mb-3" />
          <h3 className="font-black text-[#111111] mb-1">Harga Belum Tersedia di Kalkulator</h3>
          <p className="text-gray-500 text-sm mb-4">
            Rute <strong>{fromLabel} → {toLabel}</strong> ({service}) belum ada di sistem.
            Hubungi tim kami untuk harga langsung.
          </p>
          <WALink
            href={buildGeneralMessage()}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Tanya Harga via WhatsApp
          </WALink>
        </div>
      )}

      {result && result !== "not_found" && (
        <div className="mt-6 space-y-4">
          {/* Harga per kg — diperbesar */}
          <div className="bg-gray-50 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Harga per Kg</p>
              <p className="text-3xl font-black text-[#CC1F2A]">{formatPrice(result.row.pricePerKg)}<span className="text-lg font-bold text-gray-400">/kg</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Layanan</p>
              <span className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm font-black text-[#CC1F2A]">
                {result.row.service}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="col-span-2 sm:col-span-1 bg-[#CC1F2A] rounded-xl p-4 text-white">
              <p className="text-white/70 text-xs mb-1">Total Estimasi</p>
              <p className="text-2xl font-black">{formatPrice(result.total)}</p>
              <p className="text-white/60 text-xs mt-1">{formatPrice(result.row.pricePerKg)}/kg × {weight} kg</p>
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
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            <strong>Catatan:</strong> Harga di atas adalah estimasi berdasarkan berat. Harga final tergantung berat aktual, dimensi (volume), dan ketersediaan jadwal. Konfirmasi via WhatsApp untuk harga pasti.
          </div>
        </div>
      )}
    </div>
  );
}
