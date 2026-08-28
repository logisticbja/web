"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Package,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  MapPin,
  Truck,
  Calendar,
  Ship,
  Info,
} from "lucide-react";
import { buildTrackingMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import type { TrackingData } from "@/lib/sheets";

// ─── Status definitions ───────────────────────────────────────────────────────
// These are the standardised status values to use in the Google Sheet.
export const TRACKING_STATUSES = [
  {
    value: "Diterima",
    label: "Diterima",
    desc: "Paket masuk & dicatat di gudang asal",
  },
  {
    value: "Proses",
    label: "Proses",
    desc: "Sedang dikemas dan diproses",
  },
  {
    value: "Siap Muat",
    label: "Siap Muat",
    desc: "Menunggu jadwal kapal / pesawat",
  },
  {
    value: "Dalam Perjalanan",
    label: "Dalam Perjalanan",
    desc: "Kapal / pesawat sudah berangkat",
  },
  {
    value: "Transit",
    label: "Transit",
    desc: "Singgah di hub / pelabuhan transit",
  },
  {
    value: "Tiba di Pelabuhan",
    label: "Tiba di Pelabuhan",
    desc: "Tiba di pelabuhan / bandara tujuan",
  },
  {
    value: "Proses Bongkar",
    label: "Proses Bongkar",
    desc: "Sedang dibongkar dan disiapkan",
  },
  {
    value: "Pengiriman Terakhir",
    label: "Pengiriman Terakhir",
    desc: "Sedang diantar ke alamat penerima",
  },
  {
    value: "Terkirim",
    label: "Terkirim ✓",
    desc: "Paket telah diterima penerima",
  },
] as const;

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "found"; data: TrackingData }
  | { kind: "not_found"; resi: string }
  | { kind: "error" };

export function TrackingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [resi, setResi] = useState(searchParams.get("resi") ?? "");
  const [state, setState] = useState<State>({ kind: "idle" });

  // ─── Fetch tracking data ──────────────────────────────────────────────────
  const doFetch = useCallback(async (query: string) => {
    const q = query.trim();

    if (!q) return;

    setState({ kind: "loading" });

    try {
      const res = await fetch(
        `/api/tracking?resi=${encodeURIComponent(q)}`
      );

      if (res.status === 404) {
        setState({
          kind: "not_found",
          resi: q,
        });
        return;
      }

      if (!res.ok) {
        setState({ kind: "error" });
        return;
      }

      const data: TrackingData = await res.json();

      setState({
        kind: "found",
        data,
      });
    } catch {
      setState({ kind: "error" });
    }
  }, []);

  // ─── Load tracking from URL ───────────────────────────────────────────────
  useEffect(() => {
    const q = searchParams.get("resi");

    if (q) {
      setResi(q);
      doFetch(q);
    }
  }, [searchParams, doFetch]);

  // ─── Submit tracking search ───────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const q = resi.trim();

    if (!q) return;

    router.push(`/tracking?resi=${encodeURIComponent(q)}`);

    doFetch(q);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* ─────────────────────────────────────────────────────────────────────
          SEARCH BOX
      ───────────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Nomor Resi
        </label>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={resi}
              onChange={(e) => {
                setResi(e.target.value);
                setState({ kind: "idle" });
              }}
              placeholder="Masukkan nomor resi — contoh: BJA-2024-001"
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#CC1F2A] focus:outline-none font-medium text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={!resi.trim() || state.kind === "loading"}
            className="flex items-center gap-2 bg-[#CC1F2A] hover:bg-[#1A1A1A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors shrink-0"
          >
            {state.kind === "loading" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Search size={16} />
            )}

            Cek
          </button>
        </form>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          FOUND
      ───────────────────────────────────────────────────────────────────── */}
      {state.kind === "found" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          {/* ───────────────────────────────────────────────────────────────
              HEADER
          ─────────────────────────────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <Package size={20} className="text-green-600" />
              </div>

              <div>
                <p className="font-black text-[#111111]">
                  Resi #{state.data.noResi}
                </p>

                <p className="text-sm font-semibold text-[#CC1F2A]">
                  {state.data.events[
                    state.data.events.length - 1
                  ]?.status ?? "—"}
                </p>
              </div>
            </div>

            {state.data.estimasiTiba && (
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5 text-xs text-blue-700 shrink-0">
                <Clock size={12} />

                <span>
                  Est. tiba:{" "}
                  <strong>{state.data.estimasiTiba}</strong>
                </span>
              </div>
            )}
          </div>

          {/* ───────────────────────────────────────────────────────────────
              SHIPMENT INFO
          ─────────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              {
                icon: MapPin,
                label: "Asal",
                value: state.data.asal,
              },
              {
                icon: Truck,
                label: "Tujuan",
                value: state.data.tujuan,
              },
              {
                icon: Calendar,
                label: "Layanan",
                value: state.data.layanan,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-xl p-3"
              >
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <item.icon size={12} />

                  <span className="text-xs font-semibold">
                    {item.label}
                  </span>
                </div>

                <p className="text-sm font-bold text-[#111111]">
                  {item.value || "—"}
                </p>
              </div>
            ))}
          </div>

          {/* ───────────────────────────────────────────────────────────────
              TIMELINE
          ─────────────────────────────────────────────────────────────── */}
          <div>
            <h2 className="text-sm font-black tracking-wide text-[#111111] mb-6">
              RIWAYAT PERJALANAN
            </h2>

            <div className="relative pl-7">
              {/* Main vertical rail */}
              <div className="absolute left-[8px] top-2 bottom-2 w-px bg-gray-200" />

              <div className="space-y-0">
                {state.data.events.map((event, i) => {
                  const isLast =
                    i === state.data.events.length - 1;

                  /*
                   * Information kapal hanya ditampilkan
                   * pada status "Dalam Perjalanan".
                   */
                  const isPerjalanan =
                    event.status === "Dalam Perjalanan";

                  const showShipInfo =
                    isPerjalanan &&
                    Boolean(state.data.namaKapal);

                  return (
                    <div
                      key={i}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >
                      {/* ───────────────────────────────────────────────
                          TIMELINE DOT
                      ─────────────────────────────────────────────── */}
                      <div
                        className={`absolute -left-7 mt-0.5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                          isLast
                            ? "bg-[#CC1F2A] border-[#CC1F2A]"
                            : "bg-green-500 border-green-500"
                        }`}
                      >
                        {isLast ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        ) : (
                          <CheckCircle
                            size={11}
                            className="text-white"
                          />
                        )}
                      </div>

                      {/* ───────────────────────────────────────────────
                          EVENT CONTENT
                      ─────────────────────────────────────────────── */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm font-bold ${
                              isLast
                                ? "text-[#CC1F2A]"
                                : "text-[#111111]"
                            }`}
                          >
                            {event.status}
                          </p>

                          {event.waktu && (
                            <span className="text-xs text-gray-400 shrink-0 mt-0.5">
                              {event.waktu}
                            </span>
                          )}
                        </div>

                        {event.catatan && (
                          <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                            {event.catatan}
                          </p>
                        )}

                        {/* ─────────────────────────────────────────────
                            SHIP INFORMATION BRANCH
                        ───────────────────────────────────────────── */}
                        {showShipInfo && (
                          <div className="relative mt-4 ml-1 pl-6">
                            {/* Dashed branch */}
                            <div className="absolute left-0 top-0 h-7 w-5 border-l border-t border-dashed border-gray-300 rounded-tl-lg" />

                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                <Ship
                                  size={14}
                                  className="text-[#CC1F2A]"
                                />
                              </div>

                              <div className="pt-0.5">
                                <p className="text-xs font-bold text-gray-700">
                                  Informasi Kapal
                                </p>

                                {state.data.namaKapal && (
                                  <p className="text-sm font-semibold text-[#111111] mt-0.5">
                                    {state.data.namaKapal}
                                  </p>
                                )}

                                {state.data.tanggalBerangkat && (
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Keberangkatan:{" "}
                                    {state.data.tanggalBerangkat}
                                  </p>
                                )}

                                {state.data.estimasiPerjalanan && (
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    Estimasi perjalanan:{" "}
                                    {state.data.estimasiPerjalanan} hari
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────────
              TRACKING NOTE
          ─────────────────────────────────────────────────────────────── */}
          <div className="mt-8 pt-5 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Info
                  size={14}
                  className="text-gray-500"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-700">
                  Catatan
                </p>

                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  Jadwal perjalanan dapat berubah sesuai kondisi
                  cuaca, operasional kapal, pelabuhan, dan kondisi
                  perjalanan.
                </p>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────────
              WHATSAPP CTA
          ─────────────────────────────────────────────────────────────── */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <WALink
              href={buildTrackingMessage(state.data.noResi)}
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black py-4 rounded-xl transition-all hover:shadow-lg w-full"
            >
              <MessageCircle size={20} />
              Tanya CS via WhatsApp
            </WALink>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          NOT FOUND
      ───────────────────────────────────────────────────────────────────── */}
      {state.kind === "not_found" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
              <AlertCircle
                size={20}
                className="text-red-500"
              />
            </div>

            <div>
              <p className="font-black text-[#111111]">
                Resi Tidak Ditemukan
              </p>

              <p className="text-sm text-gray-500">
                <strong>{state.resi}</strong> tidak ada dalam
                sistem kami
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Pastikan nomor resi sudah benar. Jika baru saja
            melakukan pengiriman, data mungkin belum diinput.
            Hubungi CS kami untuk konfirmasi.
          </p>

          <WALink
            href={buildTrackingMessage(state.resi)}
            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black py-4 rounded-xl transition-all hover:shadow-lg w-full"
          >
            <MessageCircle size={20} />
            Tanya CS via WhatsApp
          </WALink>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          ERROR
      ───────────────────────────────────────────────────────────────────── */}
      {state.kind === "error" && (
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 mb-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle size={18} />

            <p className="text-sm font-semibold">
              Terjadi kesalahan. Coba lagi beberapa saat.
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          INFO CARDS
      ───────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: MessageCircle,
            title: "WhatsApp",
            desc: "Chat langsung dengan CS kami untuk info status real-time",
          },
          {
            icon: Package,
            title: "Nomor Resi",
            desc: "Diberikan setelah barang diterima di gudang kami",
          },
          {
            icon: Clock,
            title: "Update Status",
            desc: "Kami update status setiap ada perubahan posisi paket",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-5 border border-gray-100 flex gap-3"
          >
            <item.icon
              size={20}
              className="text-[#CC1F2A] shrink-0 mt-0.5"
            />

            <div>
              <p className="font-bold text-[#111111] text-sm">
                {item.title}
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
