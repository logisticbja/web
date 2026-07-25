const UTM_KEY = "bja_utm";

export interface UTMData {
  source?:   string;
  medium?:   string;
  campaign?: string;
  content?:  string;
  term?:     string;
}

// Maps UTMData keys back to their `utm_*` query param names.
const UTM_PARAM_NAMES: Record<keyof UTMData, string> = {
  source:   "utm_source",
  medium:   "utm_medium",
  campaign: "utm_campaign",
  content:  "utm_content",
  term:     "utm_term",
};

export function saveUTM(params: URLSearchParams): void {
  const data: UTMData = {
    source:   params.get("utm_source")   || undefined,
    medium:   params.get("utm_medium")   || undefined,
    campaign: params.get("utm_campaign") || undefined,
    content:  params.get("utm_content")  || undefined,
    term:     params.get("utm_term")     || undefined,
  };
  if (data.source) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(data));
  }
}

// Returns the stored UTM data as `utm_*` query params, for re-appending
// to the URL on pages that don't have them (so they persist across navigation).
export function getUTMParams(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return {};
    const data: UTMData = JSON.parse(raw);
    const out: Record<string, string> = {};
    for (const key of Object.keys(UTM_PARAM_NAMES) as (keyof UTMData)[]) {
      const value = data[key];
      if (value) out[UTM_PARAM_NAMES[key]] = value;
    }
    return out;
  } catch {
    return {};
  }
}

export function getUTMRef(): string {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return "";
    const data: UTMData = JSON.parse(raw);
    const parts = [data.source, data.medium, data.campaign, data.content].filter(Boolean);
    if (!parts.length) return "";
    return `\n[Ref: ${parts.join(" / ")}]`;
  } catch {
    return "";
  }
}

export function appendUTMToWAHref(href: string): string {
  try {
    const ref = getUTMRef();
    if (!ref) return href;
    const url = new URL(href);
    const text = url.searchParams.get("text") ?? "";
    url.searchParams.set("text", text + ref);
    return url.toString();
  } catch {
    return href;
  }
}
