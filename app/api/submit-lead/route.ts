import { NextRequest, NextResponse } from "next/server";
import { sendAlertEmail } from "@/lib/server/alertEmail";
import { sendMetaConversionEvent } from "@/lib/server/metaCapi";
import type { CrmPayload } from "@/lib/types";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 4; // 1 essai + 3 nouvelles tentatives
const RETRY_DELAYS_MS = [500, 1000, 2000];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postToCrm(url: string, lead: CrmPayload): Promise<boolean> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (res.ok) return true;
      console.error(`[submit-lead] Tentative ${attempt}/${MAX_ATTEMPTS} — CRM a répondu ${res.status}.`);
    } catch (err) {
      console.error(`[submit-lead] Tentative ${attempt}/${MAX_ATTEMPTS} — exception réseau.`, err);
    }
    if (attempt < MAX_ATTEMPTS) {
      await wait(RETRY_DELAYS_MS[attempt - 1]);
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  let body: { crm?: CrmPayload; eventId?: string; metaValue?: number; pageUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 });
  }

  const lead = body.crm;
  if (!lead) {
    return NextResponse.json({ ok: false, error: "Champ 'crm' manquant" }, { status: 400 });
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  let delivered = false;

  if (webhookUrl) {
    delivered = await postToCrm(webhookUrl, lead);
  } else {
    console.error("[submit-lead] CRM_WEBHOOK_URL n'est pas configuré.");
  }

  if (!delivered) {
    await sendAlertEmail(lead);
  }

  if (body.eventId) {
    const clientIp = req.headers.get("x-forwarded-for") ?? undefined;
    const clientUserAgent = req.headers.get("user-agent") ?? undefined;
    await sendMetaConversionEvent({
      eventId: body.eventId,
      email: lead.courriel,
      phoneE164: lead.telephone,
      value: body.metaValue ?? lead.prix_affiche,
      eventSourceUrl: body.pageUrl,
      clientIp,
      clientUserAgent,
    });
  }

  return NextResponse.json({ ok: true, delivered });
}
