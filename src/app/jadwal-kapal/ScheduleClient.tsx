"use client";
import { useState } from "react";
import Link from "next/link";
import { Ship, MessageCircle, Filter, Package, ArrowRight } from "lucide-react";
import { buildGeneralMessage, buildScheduleMessage, buildShipCargoMessage } from "@/lib/whatsapp";
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

function ShipCargoLink({ route, etdDate }: { route: string; etdDate: string | null }) {
  return (
    <WALink
      href={buildShipCargoMessage(route, etdDate ? formatScheduleDate(etdDate) : undefined)}
      className="inline-flex items-center gap-1 text-xs font-bold text-[#25D366] hover:underline mt-2"
    >
      <MessageCircle size={13} /> Kirim barang dengan kapal ini
    </WALink>
  );
}

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

const cargoRegions = [
  { label: "Papua", href: "/cargo/papua" },
  { label: "Maluku", href: "/cargo/maluku" },
  { label: "NTT", href: "/cargo/ntt" },
  { label: "Sulawesi", href: "/cargo/sulawesi" },
];

function CargoBox() {
  return (
    <div className="bg-white rounded-2xl border border-[#CC1F2A]/20 shadow-sm p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#CC1F2A]/10 text-[#CC1F2A] flex items-center justify-center shrink-0">
          <Package size={20} />
        </div>
        <div>
          <h2 className="font-black text-[#111111] text-lg">Kirim Cargo Ikut Jadwal Kapal Ini</h2>
          <p className="text-sm text-gray-600 mt-1">
            Minimal 100 kg, dari Jakarta atau Surabaya, diantar sampai alamat penerima. Pilih wilayah untuk lihat tarif dan estimasi.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {cargoRegions.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="px-4 py-2 rounded-full text-sm font-bold bg-[#CC1F2A]/10 text-[#CC1F2A] hover:bg-[#CC1F2A] hover:text-white transition-all"
          >
            Cargo ke {r.label}
          </Link>
        ))}
        <Link
          href="/cek-ongkir"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border border-gray-200 text-gray-700 hover:border-[#CC1F2A] transition-all"
        >
          Cek Ongkir <ArrowRight size={14} />
        </Link>
      </div>
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
                        <ShipCargoLink route={s.route} etdDate={s.etdDate} />
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
                      <EtaCell etaDate={s.etaDate} route={s.route} ship={s.ship} bold={false} />
                    </div>
                  </div>
                  <ShipCargoLink route={s.route} etdDate={s.etdDate} />
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
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black text-lg py-4 rounded-2xl transition-all hover:shadow-lg w-full"
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
