import { toE164 } from "./validation";
import { nowIsoWithOffset } from "./tracking";
import type { Answers, ContactInfo, CrmPayload, Priorite, Segment, UtmParams } from "./types";

const RESIDENTIAL_FIELDS = ["maison", "etat", "quand"];
const COMMERCIAL_FIELDS = ["type", "taille", "freq", "fournisseur", "quand", "decideur"];

export function buildCrmPayload(params: {
  segment: Segment;
  priorite: Priorite;
  score: number | null;
  answers: Answers;
  contact: ContactInfo;
  prixAffiche: number | null;
  utm: UtmParams;
}): CrmPayload {
  const { segment, priorite, score, answers, contact, prixAffiche, utm } = params;
  const fields = segment === "residentiel" ? RESIDENTIAL_FIELDS : COMMERCIAL_FIELDS;

  const reponses: Record<string, string> = {};
  for (const field of fields) {
    reponses[field] = answers[field] ?? "";
  }

  return {
    segment,
    priorite,
    score,
    nom: contact.nom.trim(),
    telephone: toE164(contact.telephone),
    courriel: contact.courriel.trim(),
    ville: contact.ville.trim(),
    consentement_sms: contact.consentementSms,
    reponses,
    prix_affiche: prixAffiche,
    source: utm,
    soumis_le: nowIsoWithOffset(),
  };
}
