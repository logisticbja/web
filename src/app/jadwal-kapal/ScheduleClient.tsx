"use client";
import { useState } from "react";
import Image from "next/image";
import { Ship, MessageCircle, Filter } from "lucide-react";
import { buildGeneralMessage, buildScheduleMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { formatScheduleDate, formatServiceType, type ShipSchedule } from "@/lib/schedule";
import type { PageHeroContent } from "@/lib/pageHero";

const regions = ["Semua", "Papua", "Maluku", "NTT", "Sulawesi"];

function ServiceTypeBadge({ type }: { type: string }) {
  if (!type) return <span className="text-gray-300">-</span>;
  const isExpress = type === "Express";
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
        isExpress ? "bg-[#CC1F2A]/10 text-[#CC1F2A]" : "bg-blue-50 text-blue-600"
      }`}
    >
      {formatServiceType(type)}
    </span>
  );
}

// ETA kosong (biasanya karena 1 kapal transit ke beberapa Wilayah sekaligus, jadi ETA per
// tujuan beda-beda) -> tampilkan ajakan tanya CS langsung (dengan rute & kapalnya udah
// disebut di pesan WA), bukan tanda "-" yang gak actionable.
function EtaCell({ etaDate, route, ship, bold = true }: { etaDate: string | null; route: string; ship: string; bold?: boolean }) {
  if (etaDate) {
    return <span className={`text-[#CC1F2A] text-sm ${bold ? "font-bold" : ""}`}>{formatScheduleDate(etaDate)}</span>;
  }
  return (
    <WALink
      href={buildScheduleMessage(route, ship)}
      className="inline-flex items-center gap-1 text-xs font-bold text-[#25D366] hover:underline"
    >
      Tanya CS →
    </WALink>
  );
}

export function ScheduleClient({ schedules, hero }: { schedules: ShipSchedule[]; hero?: PageHeroContent | null }) {
  const [activeRegion, setActiveRegion] = useState("Semua");

  const filtered = activeRegion === "Semua"
    ? schedules
    : schedules.filter((s) => s.region === activeRegion);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header — ukuran & gaya disamakan dengan hero /layanan/{slug} & /cargo/{region}. */}
      <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[220px] flex items-center w-full">
        {hero?.image && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <Image src={hero.image} alt={hero.alt || "Jadwal Kapal"} fill priority sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          </>
        )}
        <div className="relative max-w-5xl mx-auto text-center px-4 w-full min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F5C518] flex items-center justify-center mx-auto mb-5">
            <Ship size={30} className="text-[#1A1A1A]" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
            {hero?.tagline || "Jadwal Kapal"}
          </h1>
          <p className="inline-block bg-[#7A0F17] border border-white/10 text-white text-sm sm:text-base font-semibold px-4 py-2.5 rounded-xl leading-relaxed">
            {hero?.description || "Jadwal keberangkatan kapal ke Papua & Indonesia Timur"}
          </p>
          {hero?.stats && hero.stats.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
              {hero.stats.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {s.value ? `${s.value} ${s.label}` : s.label}
                </span>
              ))}
            </div>
          )}
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

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-sm text-gray-400 mb-6">
            Belum ada jadwal kapal untuk wilayah ini. Konfirmasi jadwal terkini via WhatsApp.
          </div>
        )}

        {/* Table - desktop */}
        {filtered.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-[#CC1F2A] text-white">
                <th className="text-left px-6 py-4 text-sm font-bold">Rute</th>
                <th className="text-left px-6 py-4 text-sm font-bold">Nama Kapal</th>
                <th className="text-left px-6 py-4 text-sm font-bold">Jenis</th>
                <th className="text-left px-6 py-4 text-sm font-bold">Closing Date</th>
                <th className="text-left px-6 py-4 text-sm font-bold">ETD</th>
                <th className="text-left px-6 py-4 text-sm font-bold">ETA</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={`${s.route}-${s.ship}-${s.etdDate}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#111111] text-sm">{s.route}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#CC1F2A]/10 text-[#CC1F2A] font-semibold mt-1 inline-block">
                      {s.region}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-sm text-gray-700">{s.ship || "-"}</td>
                  <td className="px-6 py-4"><ServiceTypeBadge type={s.serviceType} /></td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatScheduleDate(s.closingDate)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatScheduleDate(s.etdDate)}</td>
                  <td className="px-6 py-4">
                    <EtaCell etaDate={s.etaDate} route={s.route} ship={s.ship} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Cards - mobile */}
        {filtered.length > 0 && (
        <div className="md:hidden space-y-4 mb-6">
          {filtered.map((s, i) => (
            <div key={`${s.route}-${s.ship}-${s.etdDate}-${i}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-[#111111]">{s.route}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#CC1F2A]/10 text-[#CC1F2A] font-semibold mt-1 inline-block">
                    {s.region}
                  </span>
                </div>
                <ServiceTypeBadge type={s.serviceType} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Nama Kapal</p>
                  <p className="font-semibold text-gray-700">{s.ship || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Closing Date</p>
                  <p className="font-semibold text-gray-700">{formatScheduleDate(s.closingDate)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">ETD</p>
                  <p className="font-semibold text-gray-700">{formatScheduleDate(s.etdDate)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">ETA</p>
                  <EtaCell etaDate={s.etaDate} route={s.route} ship={s.ship} bold={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Disclaimer + CTA */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 text-sm text-yellow-800">
          <strong>Perhatian:</strong> Jadwal di atas bersifat estimasi dan dapat berubah sewaktu-waktu tergantung cuaca, kondisi laut, dan kebijakan operator. Konfirmasi jadwal terkini via WhatsApp.
        </div>

        <WALink
          href={buildGeneralMessage()}
          className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black text-lg py-4 rounded-2xl transition-all hover:shadow-lg w-full"
        >
          <MessageCircle size={22} />
          Konfirmasi Jadwal via WhatsApp
        </WALink>
      </div>
    </div>
  );
}
