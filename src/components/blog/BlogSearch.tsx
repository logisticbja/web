"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Entry = { t: string; s: string; c: string };

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const loading = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  function loadIndex() {
    if (index || loading.current) return;
    loading.current = true;
    fetch("/blog/search-index.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Entry[]) => setIndex(data))
      .catch(() => setFailed(true))
      .finally(() => {
        loading.current = false;
      });
  }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    if (!index || words.length === 0) return [];
    return index
      .map((entry) => {
        const title = normalize(entry.t);
        const haystack = `${title} ${normalize(entry.c)} ${entry.s.replace(/-/g, " ")}`;
        if (!words.every((word) => haystack.includes(word))) return null;
        const score = words.reduce((sum, word) => sum + (title.includes(word) ? 2 : 1), 0);
        return { entry, score };
      })
      .filter((item): item is { entry: Entry; score: number } => item !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((item) => item.entry);
  }, [index, query]);

  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={wrapRef} className="relative w-full sm:max-w-md">
      <label htmlFor="blog-search" className="sr-only">
        Cari artikel
      </label>
      <div className="relative">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="blog-search"
          type="search"
          value={query}
          placeholder="Cari artikel, mis. packing, Wamena, ongkir"
          autoComplete="off"
          onFocus={() => {
            loadIndex();
            setOpen(true);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#CC1F2A]"
        />
      </div>
      {showPanel ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {failed ? (
            <p className="px-4 py-3 text-sm text-gray-500">Pencarian sedang tidak tersedia. Coba lagi nanti.</p>
          ) : !index ? (
            <p className="px-4 py-3 text-sm text-gray-500">Memuat…</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">Tidak ada artikel yang cocok.</p>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-1">
              {results.map((entry) => (
                <li key={entry.s}>
                  <Link href={`/blog/${entry.s}`} className="block px-4 py-2.5 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    <span className="block text-sm font-semibold leading-snug text-[#111111]">{entry.t}</span>
                    {entry.c ? <span className="mt-0.5 block text-xs text-gray-400">{entry.c}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
