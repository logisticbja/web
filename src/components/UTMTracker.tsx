"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { appendUTMToWAHref, getUTMParams, isWhatsAppHref, saveUTM } from "@/lib/utm";

export function UTMTracker() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const current = new URLSearchParams(searchParams.toString());
    saveUTM(current);

    const stored = getUTMParams();
    let changed = false;
    for (const [key, value] of Object.entries(stored)) {
      if (!current.has(key)) {
        current.set(key, value);
        changed = true;
      }
    }
    if (changed) {
      router.replace(`${pathname}?${current.toString()}`, { scroll: false });
    }
  }, [pathname, searchParams, router]);

  useEffect(() => {
    function tag(event: Event) {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !isWhatsAppHref(link.href)) return;
      const next = appendUTMToWAHref(link.href);
      if (next !== link.href) link.href = next;
    }
    document.addEventListener("click", tag, true);
    document.addEventListener("auxclick", tag, true);
    document.addEventListener("contextmenu", tag, true);
    return () => {
      document.removeEventListener("click", tag, true);
      document.removeEventListener("auxclick", tag, true);
      document.removeEventListener("contextmenu", tag, true);
    };
  }, []);

  return null;
}
