import { createHash } from "crypto";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendMetaConversionEvent(params: {
  eventId: string;
  email: string;
  phoneE164: string;
  value?: number | null;
  eventSourceUrl?: string;
  clientIp?: string;
  clientUserAgent?: string;
}): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const { eventId, email, phoneE164, value, eventSourceUrl, clientIp, clientUserAgent } = params;

  const userData: Record<string, unknown> = {
    em: [sha256(email)],
    ph: [sha256(phoneE164.replace(/[^\d]/g, ""))],
  };
  if (clientIp) userData.client_ip_address = clientIp;
  if (clientUserAgent) userData.client_user_agent = clientUserAgent;

  const eventData: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    user_data: userData,
  };
  if (eventSourceUrl) eventData.event_source_url = eventSourceUrl;
  if (typeof value === "number") {
    eventData.custom_data = { value, currency: "CAD" };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [eventData] }),
      }
    );
    if (!res.ok) {
      console.error(`[submit-lead] Meta CAPI a répondu ${res.status}.`, await res.text());
    }
  } catch (err) {
    console.error("[submit-lead] Exception lors de l'appel Meta CAPI.", err);
  }
}
