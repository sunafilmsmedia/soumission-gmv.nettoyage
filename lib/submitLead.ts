import type { CrmPayload } from "./types";

/**
 * Envoie le lead à notre API (qui relaie vers le CRM avec retries + alerte).
 * Volontairement "fire and forget" côté UI : l'écran de résultat s'affiche
 * immédiatement, sans attendre la confirmation du CRM.
 */
export function submitLead(crm: CrmPayload, eventId: string, metaValue?: number | null): void {
  try {
    fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crm,
        eventId,
        metaValue: metaValue ?? undefined,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      }),
      keepalive: true,
    }).catch((err) => {
      console.error("Échec de l'envoi du lead à l'API interne.", err);
    });
  } catch (err) {
    console.error("Échec de l'envoi du lead à l'API interne.", err);
  }
}
