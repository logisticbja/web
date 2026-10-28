const UTM_KEY = "bja_utm";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const CLICK_ID_PARAMS = ["gclid", "gbraid", "wbraid"] as const;

export interface UTMData {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  clickId?: string;
  savedAt?: number;
}

const UTM_PARAM_NAMES: Record<"source" | "medium" | "campaign" | "content" | "term", string> = {
  source: "utm_source",
  medium: "utm_medium",
  campaign: "utm_campaign",
  content: "utm_content",
  term: "utm_term",
};

function readStore(storage: Storage | undefined): UTMData | null {
  try {
    const raw = storage?.getItem(UTM_KEY);
    if (!raw) return null;
    const data: UTMData = JSON.parse(raw);
    if (data.savedAt && Date.now() - data.savedAt > MAX_AGE_MS) {
      storage?.removeItem(UTM_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeStore(data: UTMData) {
  const raw = JSON.stringify(data);
  try {
    localStorage.setItem(UTM_KEY, raw);
  } catch {}
  try {
    sessionStorage.setItem(UTM_KEY, raw);
  } catch {}
}

export function readUTM(): UTMData | null {
  if (typeof window === "undefined") return null;
  return readStore(window.sessionStorage) ?? readStore(window.localStorage);
}

export function saveUTM(params: URLSearchParams): void {
  const clickParam = CLICK_ID_PARAMS.find((p) => params.get(p));
  const data: UTMData = {
    source: params.get("utm_source") || undefined,
    medium: params.get("utm_medium") || undefined,
    campaign: params.get("utm_campaign") || undefined,
    content: params.get("utm_content") || undefined,
    term: params.get("utm_term") || undefined,
    clickId: clickParam || undefined,
  };
  if (!data.source && data.clickId) {
    data.source = "google";
    data.medium = data.medium || "cpc";
  }
  if (!data.source) return;
  writeStore({ ...data, savedAt: Date.now() });
}

export function getUTMParams(): Record<string, string> {
  const data = readUTM();
  if (!data) return {};
  const out: Record<string, string> = {};
  for (const key of Object.keys(UTM_PARAM_NAMES) as (keyof typeof UTM_PARAM_NAMES)[]) {
    const value = data[key];
    if (value) out[UTM_PARAM_NAMES[key]] = value;
  }
  return out;
}

function isAds(data: UTMData) {
  return Boolean(data.clickId) || /^(cpc|ppc|paid|paidsearch|paid_search|display)$/i.test(data.medium ?? "");
}

export function getUTMRef(): string {
  const data = readUTM();
  if (!data?.source) return "";
  const label = isAds(data) && /google/i.test(data.source) ? "Google Ads" : [data.source, data.medium].filter(Boolean).join(" / ");
  const parts = [label, data.campaign, data.content, data.term].filter(Boolean);
  return `\n\n[Ref: ${parts.join(" / ")}]`;
}

export function isWhatsAppHref(href: string): boolean {
  return /^https?:\/\/(api\.whatsapp\.com|wa\.me|web\.whatsapp\.com|whatsapp\.com)\//i.test(href);
}

export function appendUTMToWAHref(href: string): string {
  try {
    if (!isWhatsAppHref(href)) return href;
    const ref = getUTMRef();
    if (!ref) return href;
    const url = new URL(href);
    const text = url.searchParams.get("text") ?? "";
    if (text.includes("[Ref:")) return href;
    url.searchParams.set("text", text ? text + ref : ref.trim());
    return url.toString();
  } catch {
    return href;
  }
}
