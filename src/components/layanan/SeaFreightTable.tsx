"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type SeaRate = { price: number; eta: string } | null;
export type SeaRow = { city: string; slug: string; reguler: SeaRate; express: SeaRate };
export type SeaRegion = { region: string; rows: SeaRow[] };

function cell(rate: SeaRate) {
  if (!rate) return <span className="text-gray-300">—</span>;
  return (
    <span>
      <span className="font-semibold text-gray-900">Rp{rate.price.toLocaleString("id-ID")}</span>
      <span className="block text-xs text-gray-500">{rate.eta}</span>
    </span>
  );
}

export function SeaFreightTable({ regions }: { regions: SeaRegion[] }) {
  const [region, setRegion] = useState(regions[0]?.region ?? "");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return regions
        .map((r) => ({ ...r, rows: r.rows.filter((row) => row.city.toLowerCase().includes(q)) }))
        .filter((r) => r.rows.length > 0);
    }
    return regions.filter((r) => r.region === region);
  }, [regions, region, query]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="laut-city" className="sr-only">
          Cari kota tujuan
        </label>
        <input
          id="laut-city"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari kota, mis. Jayapura"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#CC1F2A] sm:max-w-xs"
        />
        <label htmlFor="laut-region" className="sr-only">
          Pilih wilayah
        </label>
        <select
          id="laut-region"
          value={region}
          onChange={(event) => {
            setRegion(event.target.value);
            setQuery("");
          }}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#CC1F2A] sm:max-w-xs"
        >
          {regions.map((r) => (
            <option key={r.region} value={r.region}>
              {r.region} ({r.rows.length} kota)
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
          <table className="w-full min-w-[460px] text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Kota tujuan</th>
                <th className="px-4 py-3 font-semibold">Reguler / kg</th>
                <th className="px-4 py-3 font-semibold">Express / kg</th>
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
                {r.rows.map((row) => (
                  <tr key={row.slug} className="bg-white align-top">
                    <td className="px-4 py-3">
                      <Link href={`/kirim-ke/${row.slug}`} className="font-semibold text-gray-900 hover:text-[#CC1F2A] hover:underline">
                        {row.city}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{cell(row.reguler)}</td>
                    <td className="px-4 py-3">{cell(row.express)}</td>
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
