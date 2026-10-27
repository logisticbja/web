"use client";

import { useMemo, useState } from "react";
export type FreightRow = { city: string; price: number; eta: string };

export type FreightRegion = { region: string; rates: FreightRow[] };

function rupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export function FreightRateTable({ regions, idPrefix, placeholder }: { regions: FreightRegion[]; idPrefix: string; placeholder: string }) {
  const [region, setRegion] = useState(regions[0]?.region ?? "");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return regions
        .map((r) => ({ ...r, rates: r.rates.filter((rate) => rate.city.toLowerCase().includes(q)) }))
        .filter((r) => r.rates.length > 0);
    }
    return regions.filter((r) => r.region === region);
  }, [regions, region, query]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor={`${idPrefix}-city`} className="sr-only">
          Cari kota tujuan
        </label>
        <input
          id={`${idPrefix}-city`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#CC1F2A] sm:max-w-xs"
        />
        <label htmlFor={`${idPrefix}-region`} className="sr-only">
          Pilih wilayah
        </label>
        <select
          id={`${idPrefix}-region`}
          value={region}
          onChange={(event) => {
            setRegion(event.target.value);
            setQuery("");
          }}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#CC1F2A] sm:max-w-xs"
        >
          {regions.map((r) => (
            <option key={r.region} value={r.region}>
              {r.region}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
          Kota belum ada di daftar. Tanyakan tarifnya ke tim kami lewat WhatsApp.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Kota tujuan</th>
                <th className="px-4 py-3 font-semibold">Tarif per kg</th>
                <th className="px-4 py-3 font-semibold">Estimasi</th>
              </tr>
            </thead>
            {visible.map((r) => (
              <tbody key={r.region} className="divide-y divide-gray-100">
                {query ? (
                  <tr className="bg-white">
                    <th colSpan={3} className="px-4 pt-4 pb-1 text-left text-xs font-bold uppercase tracking-wide text-[#CC1F2A]">
                      {r.region}
                    </th>
                  </tr>
                ) : null}
                {r.rates.map((rate) => (
                  <tr key={`${r.region}-${rate.city}`} className="bg-white">
                    <td className="px-4 py-3 font-semibold text-gray-900">{rate.city}</td>
                    <td className="px-4 py-3 text-gray-700">{rupiah(rate.price)}</td>
                    <td className="px-4 py-3 text-gray-700">{rate.eta}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
