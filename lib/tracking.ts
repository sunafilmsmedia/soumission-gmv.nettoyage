import type { UtmParams } from "./types";

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
];

const STORAGE_KEY = "gmv_source_params";

/** Capte les UTM / fbclid de l'URL au premier chargement et les garde en mémoire pour toute la session. */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const fromUrl: UtmParams = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch {
    // sessionStorage indisponible (navigation privée, etc.) : on continue sans.
  }
  return fromUrl;
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function fireMetaPixelLead(eventId: string, value?: number): void {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== "function") return;

  const payload: Record<string, unknown> = { currency: "CAD" };
  if (typeof value === "number") payload.value = value;

  fbq("track", "Lead", payload, { eventID: eventId });
}

export function nowIsoWithOffset(): string {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");

  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const offsetStr = `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${offsetStr}`
  );
}
