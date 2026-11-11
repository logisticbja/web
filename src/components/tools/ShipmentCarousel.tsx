"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cms } from "@/components/home/cms";
import type { TujuanGalleryItem } from "@/lib/sitePages/tujuan";

const AUTOPLAY_MS = 3500;
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduceMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function ShipmentCarousel({ items, title, edit }: { items: TujuanGalleryItem[]; title: string; edit?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReduceMotion,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
      const width = card.offsetWidth + gap;
      const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
      const max = el.scrollWidth - el.clientWidth;
      if (dir === 1 && el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior });
      else if (dir === -1 && el.scrollLeft <= 4) el.scrollTo({ left: max, behavior });
      else el.scrollBy({ left: dir * width, behavior });
    },
    [reduceMotion]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => setOverflow(el.scrollWidth - el.clientWidth > 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  useEffect(() => {
    if (edit || paused || reduceMotion || !overflow) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") step(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [edit, paused, reduceMotion, overflow, step]);

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((ph, i) => (
          <figure
            key={`${ph.image}-${i}`}
            className="snap-start shrink-0 w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm"
            {...cms(edit, `gallery.items.${i}`)}
          >
            <div className="relative aspect-[4/3] bg-gray-100">
              <Image
                src={ph.image}
                alt={ph.alt || ph.caption || title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                draggable={false}
                {...(edit ? { unoptimized: true } : {})}
              />
            </div>
            {(ph.caption.trim() !== "" || ph.citySlug !== "") && (
              <figcaption className="px-4 py-3 text-xs text-gray-600 leading-relaxed">
                {ph.caption}
                {ph.citySlug !== "" && (
                  <>
                    {" "}
                    <Link href={`/kirim-ke/${ph.citySlug}`} className="text-[#CC1F2A] font-semibold hover:underline">
                      Lihat ongkir
                    </Link>
                  </>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {overflow && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Foto sebelumnya"
            className="absolute left-2 top-[calc((100%-3rem)/2)] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Foto berikutnya"
            className="absolute right-2 top-[calc((100%-3rem)/2)] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
