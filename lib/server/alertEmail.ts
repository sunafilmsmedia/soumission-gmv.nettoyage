import type { CrmPayload } from "../types";

/** Envoie un courriel d'alerte à GMV quand le webhook CRM a échoué après toutes les tentatives. */
export async function sendAlertEmail(lead: CrmPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ALERT_EMAIL_TO;
  const from = process.env.ALERT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      "[submit-lead] Webhook CRM en échec et alerte courriel non configurée (RESEND_API_KEY / ALERT_EMAIL_TO / ALERT_EMAIL_FROM manquants). Lead perdu si non récupéré manuellement :",
      JSON.stringify(lead)
    );
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `⚠️ Lead GMV non transmis au CRM — ${lead.nom}`,
        html: `
          <p>L'envoi au CRM a échoué après plusieurs tentatives. Voici les données du lead à saisir manuellement :</p>
          <pre style="background:#f4f4f4;padding:12px;border-radius:6px;white-space:pre-wrap;">${JSON.stringify(
            lead,
            null,
            2
          )}</pre>
        `,
      }),
    });

    if (!res.ok) {
      console.error(
        `[submit-lead] Échec de l'envoi du courriel d'alerte (${res.status}). Lead :`,
        JSON.stringify(lead)
      );
    }
  } catch (err) {
    console.error("[submit-lead] Exception lors de l'envoi du courriel d'alerte.", err, JSON.stringify(lead));
  }
}
