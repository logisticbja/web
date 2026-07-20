const UTM_KEY = "bja_utm";

export interface UTMData {
  source?:   string;
  medium?:   string;
  campaign?: string;
  content?:  string;
  term?:     string;
}

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

export function getUTMRef(): string {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return "";
    const data: UTMData = JSON.parse(raw);
    const parts = [data.source, data.medium, data.campaign].filter(Boolean);
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
