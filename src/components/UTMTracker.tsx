"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUTMParams, saveUTM } from "@/lib/utm";

export function UTMTracker() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const current = new URLSearchParams(searchParams.toString());
    saveUTM(current);

    // Re-append the session's UTM params to any page that lands without
    // them, so the campaign trail stays visible in the URL as the user
    // navigates around the site.
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

  return null;
}
