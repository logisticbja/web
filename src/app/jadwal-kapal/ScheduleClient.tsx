"use client";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Ship, MessageCircle, Filter, Search, X, MapPin, CalendarClock, Anchor } from "lucide-react";
import { buildGeneralMessage, buildShipCargoMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { formatScheduleDate, formatServiceType, jakartaToday, type ShipSchedule } from "@/lib/schedule";
import type { JadwalKapalContent, JadwalKapalSection } from "@/lib/sitePages/jadwalKapal";
import { cms } from "@/components/home/cms";
import { Sec, ToolHero } from "@/components/tools/ToolHero";
import { scheduleRoute, type ScheduleStop } from "@/lib/scheduleLinks";

const regions = ["Semua", "Papua", "Maluku", "NTT", "Sulawesi"];
const VISIBLE_STOPS = 4;

interface ScheduleGroup extends ShipSchedule {
  key: string;
  regions: string[];
  origin: string;
  stops: ScheduleStop[];
}

const noopSubscribe = () => () => {};
const serverToday = () => null;

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function groupSchedules(list: ShipSchedule[]): ScheduleGroup[] {
  const map = new Map<string, ScheduleGroup>();
  for (const s of list) {
    const key = [s.from, s.route, s.ship, s.serviceType, s.closingDate, s.etdDate, s.etaDate].join("|");
    const existing = map.get(key);
    if (existing) {
      if (s.region && !existing.regions.includes(s.region)) existing.regions.push(s.region);
      continue;
    }
    const { origin, stops } = scheduleRoute(s.route, s.from);
    map.set(key, { ...s, key, regions: s.region ? [s.region] : [], origin, stops });
  }
  return [...map.values()];
}

function daysBetween(from: string, to: string) {
  const a = Date.UTC(+from.slice(0, 4), +from.slice(5, 7) - 1, +from.slice(8, 10));
  const b = Date.UTC(+to.slice(0, 4), +to.slice(5, 7) - 1, +to.slice(8, 10));
  return Math.round((b - a) / 86400000);
}

function ServiceTypeBadge({ type }: { type: string }) {
  if (!type) return null;
  const isExpress = type === "Express";
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap text-[11px] leading-none px-2.5 py-1.5 rounded-full font-bold ${
        isExpress ? "bg-[#CC1F2A]/10 text-[#CC1F2A]" : "bg-blue-50 text-blue-600"
      }`}
    >
      {formatServiceType(type)}
    </span>
  );
}

function ClosingInfo({ date, today }: { date: string | null; today: string | null }) {
  if (!date) return <span className="text-gray-400">-</span>;
  const d = today ? daysBetween(today, date) : null;
  let hint: React.ReactNode = null;
  if (d !== null) {
    if (d < 0) hint = <span className="text-[11px] font-semibold text-gray-400">Closing sudah lewat</span>;
    else if (d === 0) hint = <span className="text-[11px] font-bold text-[#CC1F2A]">Closing hari ini</span>;
    else if (d <= 3) hint = <span className="text-[11px] font-bold text-amber-600">Sisa {d} hari</span>;
    else hint = <span className="text-[11px] font-semibold text-emerald-600">Sisa {d} hari</span>;
  }
  return (
    <span className="flex flex-col">
      <span className={`font-semibold whitespace-nowrap ${d !== null && d < 0 ? "text-gray-400 line-through" : "text-gray-800"}`}>{formatScheduleDate(date)}</span>
      {hint}
    </span>
  );
}

function EtaCta({ s }: { s: ScheduleGroup }) {
  if (s.etaDate) {
    return (
      <span className="flex flex-col">
        <span className="text-[11px] text-gray-400">ETA</span>
        <span className="text-[#CC1F2A] text-sm font-bold whitespace-nowrap">{formatScheduleDate(s.etaDate)}</span>
      </span>
    );
  }
  return (
    <WALink
      href={buildShipCargoMessage(s.route, s.ship, s.etdDate ? formatScheduleDate(s.etdDate) : undefined)}
      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#CC1F2A] px-3.5 py-2.5 text-xs font-bold text-white hover:bg-[#A01820] w-full md:w-auto"
    >
      <MessageCircle size={14} />
      Konfirmasi CS
    </WALink>
  );
}

function StopChip({ stop, highlight }: { stop: ScheduleStop; highlight: boolean }) {
  const cls = `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
    highlight ? "border-[#CC1F2A] bg-[#CC1F2A] text-white" : "border-gray-200 bg-white text-gray-600"
  }`;
  if (stop.href) {
    return (
      <Link href={stop.href} className={`${cls} ${highlight ? "" : "hover:border-[#CC1F2A] hover:text-[#CC1F2A]"}`}>
        {stop.name}
      </Link>
    );
  }
  return <span className={cls}>{stop.name}</span>;
}

function RouteBlock({ s, query }: { s: ScheduleGroup; query: string }) {
  const [open, setOpen] = useState(false);
  const q = norm(query);
  const matches = (name: string) => q.length > 1 && norm(name).includes(q);
  const last = s.stops[s.stops.length - 1];
  const hasMatch = s.stops.some((x) => matches(x.name));
  const showAll = open || hasMatch || s.stops.length <= VISIBLE_STOPS + 1;
  const visible = showAll ? s.stops : s.stops.slice(0, VISIBLE_STOPS);
  const hidden = s.stops.length - visible.length;

  return (
    <div className="min-w-0">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-black text-[#111111] text-base leading-snug">
        <span>{s.origin || s.stops[0]?.name || "-"}</span>
        <span className="text-[#CC1F2A]">→</span>
        <span>{last?.name ?? "-"}</span>
      </p>
      {s.stops.length > 1 && (
        <div className="mt-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
            Singgah di {s.stops.length} pelabuhan
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visible.map((stop) => (
              <StopChip key={stop.name} stop={stop} highlight={matches(stop.name)} />
            ))}
            {hidden > 0 && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center rounded-full border border-dashed border-gray-300 px-2.5 py-1 text-xs font-bold text-gray-500 hover:border-[#CC1F2A] hover:text-[#CC1F2A]"
              >
                +{hidden} lainnya
              </button>
            )}
            {open && !hasMatch && s.stops.length > VISIBLE_STOPS + 1 && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-gray-400 hover:text-gray-600"
              >
                Ringkas
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ScheduleCard({ s, query, today }: { s: ScheduleGroup; query: string; today: string | null }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <RouteBlock s={s} query={query} />
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <ServiceTypeBadge type={s.serviceType} />
          {s.regions.map((r) => (
            <span key={r} className="inline-flex items-center whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1.5 text-[11px] leading-none font-semibold text-gray-500">
              {r}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
        <div className="col-span-2 md:col-span-1 flex items-start gap-2">
          <Anchor size={15} className="mt-0.5 shrink-0 text-gray-400" />
          <span className="flex flex-col min-w-0">
            <span className="text-[11px] text-gray-400">Kapal</span>
            <span className="font-semibold text-gray-800 truncate">{s.ship || "-"}</span>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <CalendarClock size={15} className="mt-0.5 shrink-0 text-gray-400" />
          <span className="flex flex-col">
            <span className="text-[11px] text-gray-400">Closing barang</span>
            <ClosingInfo date={s.closingDate} today={today} />
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Ship size={15} className="mt-0.5 shrink-0 text-gray-400" />
          <span className="flex flex-col">
            <span className="text-[11px] text-gray-400">Kapal berangkat (ETD)</span>
            <span className="font-semibold text-gray-800 whitespace-nowrap">{formatScheduleDate(s.etdDate)}</span>
          </span>
        </div>
        <div className="col-span-2 md:col-span-1 md:justify-self-end">
          <EtaCta s={s} />
        </div>
      </div>
    </article>
  );
}

export function ScheduleClient({
  schedules,
  content,
  edit,
  extra,
}: {
  schedules: ShipSchedule[];
  content: JadwalKapalContent;
  edit?: boolean;
  extra?: React.ReactNode;
}) {
  const [activeRegion, setActiveRegion] = useState("Semua");
  const [query, setQuery] = useState("");
  const [list, setList] = useState(schedules);
  const today = useSyncExternalStore(noopSubscribe, jakartaToday, serverToday);

  useEffect(() => {
    if (schedules.length > 0 || edit) return;
    let active = true;
    fetch("/api/jadwal-kapal")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: ShipSchedule[]) => {
        if (active && Array.isArray(data) && data.length > 0) setList(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [schedules, edit]);

  const groups = useMemo(() => groupSchedules(list), [list]);

  const filtered = useMemo(() => {
    const q = norm(query);
    return groups.filter((s) => {
      if (activeRegion !== "Semua" && !s.regions.includes(activeRegion)) return false;
      if (q.length < 2) return true;
      return (
        s.stops.some((x) => norm(x.name).includes(q)) ||
        norm(s.origin).includes(q) ||
        norm(s.ship).includes(q)
      );
    });
  }, [groups, activeRegion, query]);

  const blocks: Record<Exclude<JadwalKapalSection, "hero">, React.ReactNode> = {
    schedule: (
      <>
        <h2 className="sr-only">Jadwal Keberangkatan Kapal Terdekat</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 mb-6">
          <label htmlFor="jadwal-search" className="block text-sm font-bold text-[#111111] mb-2">
            Mau kirim barang ke kota mana?
          </label>
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="jadwal-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik kota tujuan, mis. Jayapura, Ambon, Sorong"
              autoComplete="off"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-10 text-[16px] text-[#111111] outline-none focus:border-[#CC1F2A] focus:bg-white"
            />
            {query && (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Filter size={15} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600" {...cms(edit, "schedule.filterLabel")}>{content.schedule.filterLabel}</span>
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRegion(r)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all ${
                  activeRegion === r
                    ? "bg-[#CC1F2A] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#CC1F2A]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {groups.length > 0 && (
          <p className="text-sm text-gray-500 mb-4 flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400" />
            {filtered.length} jadwal keberangkatan
            {query.trim().length > 1 ? <> untuk <strong className="text-gray-700">&ldquo;{query.trim()}&rdquo;</strong></> : null}
            {activeRegion !== "Semua" ? <> di wilayah <strong className="text-gray-700">{activeRegion}</strong></> : null}
          </p>
        )}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center mb-6">
            <p className="text-sm text-gray-500" {...cms(edit, "schedule.emptyText")}>
              {content.schedule.emptyText}
            </p>
            {query.trim().length > 1 && (
              <WALink
                href={buildShipCargoMessage(`ke ${query.trim()}`)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#CC1F2A] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#A01820]"
              >
                <MessageCircle size={15} />
                Tanya jadwal ke {query.trim()}
              </WALink>
            )}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="space-y-4 mb-6">
            {filtered.map((s) => (
              <ScheduleCard key={s.key} s={s} query={query} today={today} />
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
        className="flex items-center justify-center gap-3 bg-[#CC1F2A] hover:bg-[#A01820] text-white font-black text-lg py-4 rounded-2xl transition-all hover:shadow-lg w-full"
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
