"use client";
import { useState } from "react";
import { Ship, MessageCircle, Filter } from "lucide-react";
import { buildGeneralMessage } from "@/lib/whatsapp";
import type { ShipSchedule } from "@/lib/schedule";

const regions = ["Semua", "Papua", "Maluku", "NTT", "Sulawesi"];

export function ScheduleClient({ schedules }: { schedules: ShipSchedule[] }) {
  const [activeRegion, setActiveRegion] = useState("Semua");

  const filtered = activeRegion === "Semua"
    ? schedules
    : schedules.filter((s) => s.region === activeRegion);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#CC1F2A] py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center mx-auto mb-3">
            <Ship size={20} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mb-1.5">
            Jadwal Kapal
          </h1>
          <p className="text-white/70 text-sm">
            Jadwal keberangkatan kapal PELNI & Roro ke Papua & Indonesia Timur
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Filter */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Filter size={16} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-600">Filter:</span>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeRegion === r
                  ? "bg-[#CC1F2A] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#CC1F2A]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Table - desktop */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-[#CC1F2A] text-white">
                <th className="text-left px-6 py-4 text-sm font-bold">Rute</th>
                <th className="text-left px-6 py-4 text-sm font-bold">Kapal</th>
                <th className="text-left px-6 py-4 text-sm font-bold">Operator</th>
                <th className="text-left px-6 py-4 text-sm font-bold">Jadwal</th>
                <th className="text-left px-6 py-4 text-sm font-bold">ETA</th>
                <th className="text-left px-6 py-4 text-sm font-bold">Frekuensi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={`${s.route}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#111111] text-sm">{s.route}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#CC1F2A]/10 text-[#CC1F2A] font-semibold mt-1 inline-block">
                      {s.region}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-sm text-gray-700">{s.ship}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.operator}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{s.departure}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#CC1F2A] text-sm">{s.eta}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards - mobile */}
        <div className="md:hidden space-y-4 mb-6">
          {filtered.map((s, i) => (
            <div key={`${s.route}-${i}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-[#111111]">{s.route}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#CC1F2A]/10 text-[#CC1F2A] font-semibold mt-1 inline-block">
                    {s.region}
                  </span>
                </div>
                <span className="font-bold text-[#CC1F2A] text-sm">{s.eta}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Kapal</p>
                  <p className="font-semibold text-gray-700">{s.ship}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Operator</p>
                  <p className="font-semibold text-gray-700">{s.operator}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Jadwal</p>
                  <p className="font-semibold text-gray-700">{s.departure}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 text-sm text-yellow-800">
          <strong>Perhatian:</strong> Jadwal di atas bersifat estimasi dan dapat berubah sewaktu-waktu tergantung cuaca, kondisi laut, dan kebijakan operator. Konfirmasi jadwal terkini via WhatsApp.
        </div>

        <a
          href={buildGeneralMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black text-lg py-4 rounded-2xl transition-all hover:shadow-lg w-full"
        >
          <MessageCircle size={22} />
          Konfirmasi Jadwal via WhatsApp
        </a>
      </div>
    </div>
  );
}
