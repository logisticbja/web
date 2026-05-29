// Google Analytics 4 Measurement ID — format: G-XXXXXXXXXX
// Buat di: analytics.google.com → Admin → Create Property → Data Streams → Web
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

// Google Ads ID — format: AW-XXXXXXXXXX
// Temukan di: Google Ads → Tools & Settings → Conversions → Tag setup
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Salin label dari masing-masing conversion action di Google Ads
// Google Ads → Tools → Conversions → [pilih action] → Tag → "Conversion label"
export const CONVERSION_LABELS = {
  waGeneral:   process.env.NEXT_PUBLIC_CONVERSION_WA_GENERAL   ?? "REPLACE_ME",
  waCorporate: process.env.NEXT_PUBLIC_CONVERSION_WA_CORPORATE ?? "REPLACE_ME",
} as const;

export type ConversionKey = keyof typeof CONVERSION_LABELS;

export function fireConversion(key: ConversionKey) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS[key]}`,
  });
}

export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
  window.gtag("config", GA_ID, { page_path: url });
}
