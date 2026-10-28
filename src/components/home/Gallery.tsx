"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryContent } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 40;
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduceMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function Gallery({ content, edit }: { content: GalleryContent } & EditProps) {
  const photos = content.photos;
  const total = photos.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReduceMotion,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false
  );
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1]));
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const indexRef = useRef(0);

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      const n = ((next % total) + total) % total;
      const after = (n + 1) % total;
      indexRef.current = n;
      setIndex(n);
      setSeen((prev) => {
        if (prev.has(n) && prev.has(after)) return prev;
        const s = new Set(prev);
        s.add(n);
        s.add(after);
        return s;
      });
    },
    [total]
  );

  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[index];
    if (strip && thumb) {
      const left = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
      strip.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [index, total, reduceMotion]);

  useEffect(() => {
    if (edit || paused || reduceMotion || total < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") go(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [edit, paused, reduceMotion, total, index, go]);

  if (total === 0) return null;

  const current = photos[index];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {content.eyebrow && (
            <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2" {...cms(edit, "gallery.eyebrow")}>{content.eyebrow}</p>
          )}
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]" {...cms(edit, "gallery.title")}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto" {...cms(edit, "gallery.subtitle")}>
              {content.subtitle}
            </p>
          )}
        </div>

        <div
          className="max-w-5xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label={content.title}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3] sm:aspect-[16/9] select-none"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
              setPaused(true);
            }}
            onTouchEnd={(e) => {
              const start = touchX.current;
              touchX.current = null;
              setPaused(false);
              if (start === null) return;
              const dx = e.changedTouches[0].clientX - start;
              if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? index + 1 : index - 1);
            }}
          >
            {photos.map((photo, i) =>
              seen.has(i) ? (
                <div
                  key={`${i}-${photo.src}`}
                  className={`absolute inset-0 transition-opacity ${reduceMotion ? "duration-0" : "duration-700"} ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                  aria-hidden={i !== index}
                  {...(i === index ? cms(edit, `gallery.photos.${i}`) : {})}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    {...(edit ? { unoptimized: true } : {})}
                  />
                </div>
              ) : null
            )}

            {current.caption && (
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 sm:px-8 pt-16 pb-5 sm:pb-7 pointer-events-none">
                <p className="text-white font-bold text-lg sm:text-2xl" aria-live="polite">
                  {current.caption}
                </p>
              </div>
            )}

            <div className="absolute top-4 right-4 z-20 rounded-full bg-black/50 text-white text-xs font-semibold px-3 py-1 pointer-events-none">
              {index + 1} / {total}
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Foto sebelumnya"
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Foto berikutnya"
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-md flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {total > 1 && (
            <div
              ref={stripRef}
              className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {photos.map((photo, i) => (
                <button
                  key={`${i}-${photo.src}`}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Lihat foto ${i + 1}${photo.caption ? `: ${photo.caption}` : ""}`}
                  aria-current={i === index}
                  className={`relative shrink-0 w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-offset-[#F8FAFC] transition-all ${i === index ? "ring-[#CC1F2A] opacity-100" : "ring-transparent opacity-60 hover:opacity-100"}`}
                  {...cms(edit, `gallery.photos.${i}`)}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                    {...(edit ? { unoptimized: true } : {})}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
