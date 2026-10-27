"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

type Mode = "laut" | "udara";

const DIVISOR: Record<Mode, number> = { laut: 4000, udara: 5000 };

function roundChargeable(value: number) {
  const whole = Math.floor(value + 1e-9);
  const fraction = Math.round((value - whole) * 100) / 100;
  return fraction >= 0.6 ? whole + 1 : whole;
}

function fmt(value: number, digits = 2) {
  return value.toLocaleString("id-ID", { maximumFractionDigits: digits });
}

export function VolumeCalculator() {
  const [mode, setMode] = useState<Mode>("laut");
  const [length, setLength] = useState("50");
  const [width, setWidth] = useState("40");
  const [height, setHeight] = useState("30");
  const [qty, setQty] = useState("1");
  const [weight, setWeight] = useState("");

  const p = Number(length) || 0;
  const l = Number(width) || 0;
  const t = Number(height) || 0;
  const k = Math.max(1, Math.floor(Number(qty) || 1));
  const actual = (Number(weight) || 0) * k;

  const cm3 = p * l * t * k;
  const m3 = cm3 / 1_000_000;
  const volumeKg = cm3 / DIVISOR[mode];
  const chargeable = roundChargeable(Math.max(volumeKg, actual));
  const hasSize = cm3 > 0;

  const inputClass =
    "mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[15px] font-medium text-gray-800 focus:border-[#CC1F2A] focus:outline-none";
  const labelClass = "text-xs font-bold text-gray-700";

  const fields = [
    { label: "Panjang (cm)", value: length, set: setLength },
    { label: "Lebar (cm)", value: width, set: setWidth },
    { label: "Tinggi (cm)", value: height, set: setHeight },
    { label: "Jumlah koli", value: qty, set: setQty },
  ];

  return (
    <div className="not-prose my-8 rounded-2xl border border-[#CC1F2A]/20 bg-red-50/60 p-5 sm:p-6">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CC1F2A] px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white">
          <Calculator size={12} /> Kalkulator
        </span>
        <p className="mt-2 text-lg font-black text-[#111111]">Hitung Volume, Kubikasi &amp; Berat Volumetrik</p>
        <p className="text-sm text-gray-500">Isi ukuran barang dalam cm. Hasilnya langsung muncul.</p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2" role="group" aria-label="Jenis pengiriman">
        {(
          [
            { value: "laut", label: "Laut / Darat", note: "÷ 4.000" },
            { value: "udara", label: "Udara", note: "÷ 5.000" },
          ] as const
        ).map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setMode(option.value)}
            aria-pressed={mode === option.value}
            className={`rounded-xl border-2 px-3 py-2.5 text-sm font-black transition-colors ${
              mode === option.value
                ? "border-[#CC1F2A] bg-[#CC1F2A] text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="block">{option.label}</span>
            <span className={`block text-xs font-semibold ${mode === option.value ? "text-white/80" : "text-gray-400"}`}>
              {option.note}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {fields.map((field) => (
          <label key={field.label} className={labelClass}>
            {field.label}
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={field.value}
              onChange={(event) => field.set(event.target.value)}
              className={inputClass}
            />
          </label>
        ))}
        <label className={`${labelClass} col-span-2`}>
          Berat timbangan per koli (kg) <span className="font-medium text-gray-400">opsional</span>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-500">Volume</p>
          <p className="text-lg font-black text-[#111111]">{fmt(cm3)} cm³</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-500">Kubikasi</p>
          <p className="text-lg font-black text-[#111111]">{fmt(m3, 3)} m³</p>
        </div>
        <div className="col-span-2 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:col-span-1">
          <p className="text-xs text-gray-500">Berat volumetrik</p>
          <p className="text-lg font-black text-[#111111]">{fmt(volumeKg)} kg</p>
        </div>
        <div className="col-span-2 rounded-xl border border-[#CC1F2A]/30 bg-white px-4 py-3 sm:col-span-3">
          <p className="text-xs text-gray-500">Berat yang dihitung ongkir</p>
          <p className="text-2xl font-black text-[#CC1F2A]">{hasSize ? `${fmt(chargeable)} kg` : "-"}</p>
          <p className="mt-0.5 text-sm text-gray-600">
            {!hasSize
              ? "Isi panjang, lebar, dan tinggi."
              : actual <= 0
              ? "Isi berat timbangan untuk membandingkan dengan berat volume."
              : volumeKg > actual
              ? `Dipakai berat volume, karena lebih besar dari berat timbangan (${fmt(actual)} kg).`
              : "Dipakai berat timbangan, karena lebih besar dari berat volume."}
          </p>
        </div>
      </div>

      <Link
        href="/cek-ongkir"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#CC1F2A] py-3 text-sm font-black text-white transition-colors hover:bg-[#1A1A1A]"
      >
        Lanjut cek ongkir ke kota tujuan <ArrowRight size={16} />
      </Link>
    </div>
  );
}
