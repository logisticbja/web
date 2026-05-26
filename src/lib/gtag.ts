// Ganti dengan Google Ads ID Anda — format: AW-XXXXXXXXXX
// Temukan di: Google Ads → Tools & Settings → Conversions → Tag setup
export const GOOGLE_ADS_ID = "AW-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Salin label dari masing-masing conversion action di Google Ads
// Google Ads → Tools → Conversions → [pilih action] → Tag → "Conversion label"
export const CONVERSION_LABELS = {
  waGeneral:   "REPLACE_ME", // Klik WA umum — semua halaman
  waCorporate: "REPLACE_ME", // Klik WA corporate — lead B2B
} as const;

export type ConversionKey = keyof typeof CONVERSION_LABELS;

export function fireConversion(key: ConversionKey) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS[key]}`,
  });
}
