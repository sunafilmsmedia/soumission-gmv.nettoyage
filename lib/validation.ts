import type { ContactInfo } from "./types";

export type ContactField = "nom" | "telephone" | "courriel" | "ville" | "consentementSms";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function digitsOnlyPhone(raw: string): string {
  return raw.replace(/[\s\-().]/g, "");
}

export function isValidPhone(raw: string): boolean {
  return /^\d{10}$/.test(digitsOnlyPhone(raw));
}

export function toE164(raw: string): string {
  return `+1${digitsOnlyPhone(raw)}`;
}

export function validateContact(
  contact: ContactInfo
): { field: ContactField; message: string } | null {
  if (!contact.nom.trim()) {
    return { field: "nom", message: "Entrez votre nom." };
  }
  if (!isValidPhone(contact.telephone)) {
    return {
      field: "telephone",
      message: "Entrez un numéro de téléphone à 10 chiffres.",
    };
  }
  if (!EMAIL_RE.test(contact.courriel.trim())) {
    return { field: "courriel", message: "Entrez une adresse courriel valide." };
  }
  if (!contact.ville.trim()) {
    return { field: "ville", message: "Entrez votre ville." };
  }
  if (!contact.consentementSms) {
    return {
      field: "consentementSms",
      message: "Veuillez accepter d'être contacté par texto et courriel.",
    };
  }
  return null;
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}
