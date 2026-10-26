"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Calculator,
  ChevronDown,
  Clock,
  Minus,
  Plus,
  MapPin,
  MessageCircle,
  Package,
  Search,
  Zap,
} from "lucide-react";
import {
  cityLautPricing,
  formatPrice,
  originCities,
  resolveDestinationValue,
} from "@/lib/data/pricing";
import { findOngkirCity, ongkirGroups } from "@/lib/data/ongkir";
import type { PricingRow } from "@/lib/sheets";
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
  // Backward compatibility: beberapa halaman lama masih mengirim rows dari Google Sheets.
  // Kalkulator baru tidak lagi memakai rows untuk pricing; sumber harga tetap pricing.ts.
  rows?: PricingRow[];
  defaultValues?: DefaultValues;
  autoCalculate?: boolean;
}

interface CalculatorResult {
  service: ServiceType;
  pricePerKg: number;
  total: number;
  estimation: string;
  minWeightKg: number;
}

const MIN_WEIGHT = 100;
const VOLUME_DIVISOR = 4000;

function roundChargeable(value: number) {
  const whole = Math.floor(value + 1e-9);
  const fraction = Math.round((value - whole) * 100) / 100;
  return fraction >= 0.6 ? whole + 1 : whole;
}

function formatKg(value: number) {
  return value.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

const allCities = ongkirGroups.flatMap((group) =>
  group.cities.map((city) => ({
    ...city,
    group: group.groupLabel,
  }))
);

function toPricingKey(value: string) {
  return resolveDestinationValue(value.replace(/-/g, "_"));
}

function getServiceData(destinationValue: string, service: ServiceType) {
  const pricingKey = toPricingKey(destinationValue);
  const pricing = cityLautPricing[pricingKey];

  if (!pricing) return null;

  if (service === "Express") {
    if (
      pricing.expressPrice === null ||
      pricing.expressEtaMin === null ||
      pricing.expressEtaMax === null
    ) {
      return null;
    }

    return {
      pricePerKg: pricing.expressPrice,
      etaMin: pricing.expressEtaMin,
      etaMax: pricing.expressEtaMax,
    };
  }

  if (
    pricing.regulerPrice === null ||
    pricing.regulerEtaMin === null ||
    pricing.regulerEtaMax === null
  ) {
    return null;
  }

  return {
    pricePerKg: pricing.regulerPrice,
    etaMin: pricing.regulerEtaMin,
    etaMax: pricing.regulerEtaMax,
  };
}

function formatEta(min: number, max: number) {
  return min === max ? `${min} hari` : `${min}–${max} hari`;
}

function computeResult(
  from: string,
  to: string,
  weight: string,
  service: ServiceType
): CalculatorResult | "not_found" | null {
  if (!from || !to || !weight) return null;

  const weightNum = Number(weight);
  if (!weightNum || weightNum < MIN_WEIGHT) return null;

  const serviceData = getServiceData(to, service);
  if (!serviceData) return "not_found";

  return {
    service,
    pricePerKg: serviceData.pricePerKg,
    total: serviceData.pricePerKg * weightNum,
    estimation: formatEta(serviceData.etaMin, serviceData.etaMax),
    minWeightKg: MIN_WEIGHT,
  };
}

export function CekOngkirForm({ defaultValues, autoCalculate }: Props) {
  const [from, setFrom] = useState(defaultValues?.from ?? "");
  const [to, setTo] = useState(defaultValues?.to ?? "");
  const [toSearch, setToSearch] = useState(defaultValues?.toLabel ?? "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [weight, setWeight] = useState(defaultValues?.weight ?? "");
  const [showDimension, setShowDimension] = useState(false);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [service, setService] = useState<ServiceType>(
    defaultValues?.service ?? "Regular"
  );
  const [result, setResult] = useState<
    CalculatorResult | "not_found" | null
  >(() =>
    autoCalculate
      ? computeResult(
          defaultValues?.from ?? "",
          defaultValues?.to ?? "",
          defaultValues?.weight ?? "",
          defaultValues?.service ?? "Regular"
        )
      : null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCity = to
    ? allCities.find((city) => city.value === to)
    : null;

  const selectedPricing = useMemo(() => {
    if (!to) return null;
    return cityLautPricing[toPricingKey(to)] ?? null;
  }, [to]);

  const regularAvailable =
    selectedPricing !== null &&
    selectedPricing.regulerPrice !== null &&
    selectedPricing.regulerEtaMin !== null &&
    selectedPricing.regulerEtaMax !== null;

  const expressAvailable =
    selectedPricing !== null &&
    selectedPricing.expressPrice !== null &&
    selectedPricing.expressEtaMin !== null &&
    selectedPricing.expressEtaMax !== null;

  const filteredCities = toSearch.trim()
    ? allCities.filter(
        (city) =>
          city.label.toLowerCase().includes(toSearch.toLowerCase()) ||
          city.group.toLowerCase().includes(toSearch.toLowerCase())
      )
    : allCities;

  const groupedFiltered = ongkirGroups
    .map((group) => ({
      ...group,
      cities: filteredCities.filter(
        (city) => city.group === group.groupLabel
      ),
    }))
    .filter((group) => group.cities.length > 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!to || !selectedPricing) return;

    if (service === "Regular" && !regularAvailable && expressAvailable) {
      setService("Express");
      setResult(null);
    }

    if (service === "Express" && !expressAvailable && regularAvailable) {
      setService("Regular");
      setResult(null);
    }
  }, [
    to,
    service,
    selectedPricing,
    regularAvailable,
    expressAvailable,
  ]);

  const handleSelectCity = (value: string, label: string) => {
    setTo(value);
    setToSearch(label);
    setShowDropdown(false);
    setResult(null);
  };

  const weightNum = Number(weight);
  const lengthNum = Number(length);
  const widthNum = Number(width);
  const heightNum = Number(height);
  const hasDimension =
    showDimension && lengthNum > 0 && widthNum > 0 && heightNum > 0;
  const volumeKg = hasDimension
    ? (lengthNum * widthNum * heightNum) / VOLUME_DIVISOR
    : 0;
  const usesVolume = hasDimension && volumeKg > weightNum;
  const chargeableKg =
    weightNum > 0 ? roundChargeable(Math.max(weightNum, volumeKg)) : 0;
  const weightTooLow =
    weight !== "" && weightNum > 0 && chargeableKg < MIN_WEIGHT;

  const resetResult = () => setResult(null);

  const handleCalculate = () => {
    if (!from || !to || !weight || weightTooLow) return;

    const nextResult = computeResult(from, to, String(chargeableKg), service);
    setResult(nextResult);
  };

  const fromLabel =
    originCities.find((city) => city.value === from)?.label ?? "";

  const toLabel = to
    ? findOngkirCity(to)?.city.label ?? selectedCity?.label ?? ""
    : "";

  const serviceOptions: {
    value: ServiceType;
    label: string;
    desc: string;
    icon: React.FC<{ size?: number; className?: string }>;
    available: boolean;
  }[] = [
    {
      value: "Regular",
      label: "Regular",
      desc: "Lebih ekonomis",
      icon: Clock,
      available: !to || regularAvailable,
    },
    {
      value: "Express",
      label: "Express",
      desc: "Lebih cepat sampai",
      icon: Zap,
      available: !to || expressAvailable,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Kota Asal
          </label>
          <div className="relative">
            <select
              value={from}
              onChange={(event) => {
                setFrom(event.target.value);
                setResult(null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CC1F2A] focus:outline-none appearance-none bg-white font-medium text-gray-700"
            >
              <option value="">Pilih kota asal...</option>
              {originCities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <div ref={dropdownRef}>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Kota Tujuan
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
            />
            <input
              type="text"
              value={toSearch}
              onChange={(event) => {
                setToSearch(event.target.value);
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
                  <p className="text-sm text-gray-400 text-center py-4">
                    Kota tidak ditemukan
                  </p>
                ) : (
                  groupedFiltered.map((group) => (
                    <div key={group.groupLabel}>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1 sticky top-0 bg-white">
                        {group.groupLabel}
                      </p>

                      {group.cities.map((city) => (
                        <button
                          type="button"
                          key={city.value}
                          onMouseDown={() =>
                            handleSelectCity(city.value, city.label)
                          }
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-red-50 hover:text-[#CC1F2A] transition-colors ${
                            to === city.value
                              ? "bg-red-50 text-[#CC1F2A]"
                              : "text-gray-700"
                          }`}
                        >
                          <MapPin
                            size={13}
                            className="shrink-0 text-gray-300"
                          />
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

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Berat (kg)
          </label>
          <div className="relative">
            <Package
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="number"
              value={weight}
              onChange={(event) => {
                setWeight(event.target.value);
                setResult(null);
              }}
              placeholder="Min. 100 kg"
              min="100"
              className={`w-full pl-9 pr-4 py-3 rounded-xl border focus:outline-none font-medium text-gray-700 transition-colors ${
                weightTooLow
                  ? "border-red-400 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-[#CC1F2A]"
              }`}
            />
          </div>

          <p className="mt-1.5 text-xs font-semibold text-gray-500">
            Minimum pengiriman 100 kg.
          </p>

          {weightTooLow && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <AlertCircle size={13} />
              Berat pengiriman belum mencapai minimum 100 kg.
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setShowDimension((open) => !open);
              resetResult();
            }}
            aria-expanded={showDimension}
            className="mt-3 w-full flex items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3 py-2.5 text-left text-sm font-bold text-gray-700 hover:border-[#CC1F2A] transition-colors"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#CC1F2A] text-white">
              {showDimension ? <Minus size={12} /> : <Plus size={12} />}
            </span>
            Barang besar tapi ringan? Isi dimensi barang
          </button>

          {showDimension && (
            <div className="mt-3 rounded-xl border border-[#CC1F2A]/20 bg-red-50/60 p-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Dimensi barang (cm)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Panjang", value: length, set: setLength },
                  { label: "Lebar", value: width, set: setWidth },
                  { label: "Tinggi", value: height, set: setHeight },
                ].map((field) => (
                  <input
                    key={field.label}
                    type="number"
                    min="0"
                    inputMode="decimal"
                    aria-label={`${field.label} (cm)`}
                    placeholder={field.label}
                    value={field.value}
                    onChange={(event) => {
                      field.set(event.target.value);
                      resetResult();
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#CC1F2A] font-medium text-gray-700"
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Punya beberapa koli dengan ukuran berbeda? Tanya CS lewat
                WhatsApp, kami bantu hitungkan.
              </p>
              {hasDimension && (
                <p className="mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700" aria-live="polite">
                  Berat volume: {formatKg(volumeKg)} kg
                  {weightNum > 0 && (
                    <>
                      {" "}→ ongkir dihitung dari{" "}
                      <strong className="text-[#CC1F2A]">
                        {formatKg(chargeableKg)} kg
                      </strong>{" "}
                      ({usesVolume ? "berat volume" : "berat timbangan"}).
                    </>
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Tipe Layanan
          </label>
          <div className="grid grid-cols-2 gap-3">
            {serviceOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                disabled={!option.available}
                onClick={() => {
                  setService(option.value);
                  setResult(null);
                }}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all ${
                  !option.available
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : service === option.value
                    ? "border-[#CC1F2A] bg-[#CC1F2A] text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <option.icon size={18} />
                <span>{option.label}</span>
                <span
                  className={`font-normal text-[10px] ${
                    !option.available
                      ? "text-gray-400"
                      : service === option.value
                      ? "text-white/80"
                      : "text-gray-400"
                  }`}
                >
                  {option.available
                    ? option.desc
                    : "Tidak tersedia untuk tujuan ini"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={!from || !to || !weight || weightTooLow}
          className="bg-[#CC1F2A] hover:bg-[#1A1A1A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
        >
          <Calculator size={18} />
          Hitung Ongkir
        </button>

        <WALink
          href={(() => {
            const origin = fromLabel || "Jabodetabek";
            const destination = toLabel || "-";
            const shipmentWeight = weight ? `${weight} kg` : "-";
            const dimensionLine = hasDimension
              ? `\n- Dimensi: ${length} × ${width} × ${height} cm`
              : "";
            const message = `Halo BJA Logistic, saya mau tanya ongkir cargo:\n- Dari: ${origin}\n- Ke: ${destination}\n- Berat: ${shipmentWeight}${dimensionLine}\n\nBisa bantu info harga dan jadwal pengirimannya?`;

            return `https://api.whatsapp.com/send/?phone=6281513335157&text=${encodeURIComponent(
              message
            )}`;
          })()}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black py-3.5 px-5 rounded-xl transition-colors text-sm whitespace-nowrap"
        >
          <MessageCircle size={18} />
          Minta Penawaran
        </WALink>
      </div>

      {result === "not_found" && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <AlertCircle
            size={32}
            className="text-amber-500 mx-auto mb-3"
          />
          <h3 className="font-black text-[#111111] mb-1">
            Layanan Belum Tersedia
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Layanan {service} untuk rute{" "}
            <strong>
              {fromLabel} → {toLabel}
            </strong>{" "}
            belum tersedia pada master tarif saat ini. Silakan pilih layanan
            lain yang tersedia atau hubungi CS BJA Logistic.
          </p>
          <WALink
            href={buildGeneralMessage()}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Tanya CS via WhatsApp
          </WALink>
        </div>
      )}

      {result && result !== "not_found" && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                Harga per Kg
              </p>
              <p className="text-3xl font-black text-[#CC1F2A]">
                {formatPrice(result.pricePerKg)}
                <span className="text-lg font-bold text-gray-400">
                  /kg
                </span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                Layanan
              </p>
              <span className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm font-black text-[#CC1F2A]">
                {result.service}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="col-span-2 sm:col-span-1 bg-[#CC1F2A] rounded-xl p-4 text-white">
              <p className="text-white/70 text-xs mb-1">
                Total Estimasi
              </p>
              <p className="text-2xl font-black">
                {formatPrice(result.total)}
              </p>
              <p className="text-white/60 text-xs mt-1">
                {formatPrice(result.pricePerKg)}/kg × {formatKg(chargeableKg)} kg
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">
                Estimasi Pengiriman
              </p>
              <p className="text-xl font-black text-[#CC1F2A]">
                {result.estimation}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">
                Minimum Pengiriman
              </p>
              <p className="text-xl font-black text-[#111111]">
                {result.minWeightKg} kg
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
            Rute:{" "}
            <strong className="text-[#111111]">{fromLabel}</strong> →{" "}
            <strong className="text-[#111111]">{toLabel}</strong>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 leading-relaxed">
            <strong>Catatan estimasi:</strong> Estimasi waktu dihitung sejak
            kapal berangkat dari pelabuhan asal, bukan sejak barang dipesan
            atau di-pickup. Jadwal kapal dapat berubah karena kondisi
            operasional, cuaca, pelabuhan, atau perjalanan. Pastikan
            konfirmasi jadwal kapal terdekat ke CS BJA Logistic sebelum
            melakukan pengiriman.
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
            {hasDimension
              ? "Estimasi sudah memperhitungkan berat volume dari dimensi yang kamu isi. Perhitungan final mengikuti hasil timbang dan ukur saat barang kami terima."
              : "Harga di atas berdasarkan berat yang kamu isi. Untuk barang besar tapi ringan, isi dimensi barang supaya estimasinya lebih akurat. Perhitungan final mengikuti hasil timbang dan ukur saat barang kami terima."}
          </div>
        </div>
      )}
    </div>
  );
}
