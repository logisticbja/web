"use client";
import { useState } from "react";
import Link from "next/link";
import { Ship, MessageCircle, Filter } from "lucide-react";
import { buildGeneralMessage, buildJadwalInquiryMessage, buildShipCargoMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { formatScheduleDate, formatServiceType, type ShipSchedule } from "@/lib/schedule";
import type { JadwalKapalContent, JadwalKapalSection } from "@/lib/sitePages/jadwalKapal";
import { cms } from "@/components/home/cms";
import { Sec, ToolHero } from "@/components/tools/ToolHero";
import { scheduleCityLinks } from "@/lib/scheduleLinks";

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

function ShipCargoButton({ s, full = false }: { s: ShipSchedule; full?: boolean }) {
  return (
    <WALink
      href={buildShipCargoMessage(s.route, s.ship, s.etdDate ? formatScheduleDate(s.etdDate) : undefined)}
      aria-label={`Chat WhatsApp untuk kirim barang rute ${s.route}`}
      className={
        full
          ? "mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] py-3 text-sm font-bold text-white active:bg-[#166534]"
          : "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#15803D] px-3 py-2 text-xs font-bold text-white hover:bg-[#166534]"
      }
    >
      <MessageCircle size={full ? 17 : 14} />
      {full ? "Kirim dengan kapal ini" : "Pesan"}
    </WALink>
  );
}

function EtaCell({ etaDate, bold = true }: { etaDate: string | null; bold?: boolean }) {
  if (etaDate) {
    return <span className={`text-[#CC1F2A] text-sm ${bold ? "font-bold" : ""}`}>{formatScheduleDate(etaDate)}</span>;
  }
  return <span className="text-sm text-gray-500">Konfirmasi CS</span>;
}

function CargoCityLinks({ route }: { route: string }) {
  const links = scheduleCityLinks(route);
  if (links.length === 0) return null;
  return (
    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
      Kirim barang ke{" "}
      {links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && ", "}
          <Link href={l.href} className="font-semibold text-[#CC1F2A] hover:underline">
            {l.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

function CargoBox() {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <h2 className="font-black text-[#111111]">Kirim Cargo Ikut Jadwal Kapal Ini</h2>
        <p className="mt-0.5 text-sm text-gray-600">Minimal 100 kg, dari Jakarta atau Surabaya, diantar sampai alamat.</p>
      </div>
      <WALink
        href={buildJadwalInquiryMessage()}
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#15803D] px-5 py-3 text-sm font-bold text-white hover:bg-[#166534]"
      >
        <MessageCircle size={18} /> Tanya Tarif &amp; Jadwal
      </WALink>
    </div>
  );
}

export function ScheduleClient({
  schedules,
  content,
  edit,
  updatedAt,
  extra,
}: {
  schedules: ShipSchedule[];
  content: JadwalKapalContent;
  edit?: boolean;
  updatedAt?: string;
  extra?: React.ReactNode;
}) {
  const [activeRegion, setActiveRegion] = useState("Semua");

  const filtered = activeRegion === "Semua"
    ? schedules
    : schedules.filter((s) => s.region === activeRegion);

  const blocks: Record<Exclude<JadwalKapalSection, "hero">, React.ReactNode> = {
    schedule: (
      <>
            <CargoBox />
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-600" {...cms(edit, "schedule.filterLabel")}>{content.schedule.filterLabel}</span>
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
            {updatedAt && <p className="text-xs text-gray-500 mb-6">Diperbarui {updatedAt}. Jadwal yang sudah berangkat otomatis disembunyikan.</p>}

            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-sm text-gray-400 mb-6" {...cms(edit, "schedule.emptyText")}>
                {content.schedule.emptyText}
              </div>
            )}

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
                    <th className="px-4 py-4"><span className="sr-only">Pesan</span></th>
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
                        <CargoCityLinks route={s.route} />
                      </td>
                      <td className="px-6 py-4 font-semibold text-sm text-gray-700">{s.ship || "-"}</td>
                      <td className="px-6 py-4"><ServiceTypeBadge type={s.serviceType} /></td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatScheduleDate(s.closingDate)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatScheduleDate(s.etdDate)}</td>
                      <td className="px-6 py-4">
                        <EtaCell etaDate={s.etaDate} />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <ShipCargoButton s={s} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}

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
                      <CargoCityLinks route={s.route} />
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
                      <EtaCell etaDate={s.etaDate} bold={false} />
                    </div>
                  </div>
                  <ShipCargoButton s={s} full />
                </div>
              ))}
            </div>
            )}
      </>
    ),
    notice: (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6 text-sm text-yellow-800" {...cms(edit, "notice.text")}>
              <strong>{content.notice.label}</strong> {content.notice.text}
            </div>
    ),
    cta: (
            <WALink
              href={buildGeneralMessage()}
              className="flex items-center justify-center gap-3 bg-[#15803D] hover:bg-[#166534] text-white font-black text-lg py-4 rounded-2xl transition-all hover:shadow-lg w-full"
            >
              <MessageCircle size={22} />
              {edit ? <span data-cms="cta.waLabel">{content.cta.waLabel}</span> : content.cta.waLabel}
            </WALink>
    ),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sec edit={edit} id="hero">
        <ToolHero icon={Ship} hero={content.hero} maxWidth="max-w-5xl" edit={edit} />
      </Sec>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {content.order
          .filter((k): k is Exclude<JadwalKapalSection, "hero"> => k !== "hero" && !content.hidden.includes(k))
          .map((k) => (
            <Sec key={k} edit={edit} id={k}>
              {blocks[k]}
            </Sec>
          ))}
        {!edit && extra}
      </div>
    </div>
  );
}
