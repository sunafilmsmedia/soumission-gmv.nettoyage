import type { Priorite } from "./types";

/**
 * Table de config — prix, points et seuils.
 * Ce fichier est le SEUL endroit où GMV (ou un développeur) doit modifier
 * un prix, un point ou un seuil. Rien d'autre dans le code ne doit contenir
 * de prix ou de pointage codé en dur.
 */

export const PRICING: Record<string, { label: string; price: number }> = {
  semi: { label: "Semi-détaché", price: 399.99 },
  bungalow: { label: "Bungalow", price: 449.99 },
  deux: { label: "Unifamiliale à 2 étages", price: 499.99 },
  hors: { label: "Hors standard", price: 649.99 },
};

export const RESIDENTIAL_INCLUS = [
  "Entrée",
  "Revêtement extérieur",
  "Clôture",
  "Surfaces asphaltées",
  "Pierre, patio et murets",
  "Lavage des vitres",
  "Produits certifiés biologiques",
];

export const RESIDENTIAL_PRIORITY: Record<string, Priorite> = {
  "2sem": "chaud",
  mois: "tiede",
  saison: "froid",
};

export const COMMERCIAL_POINTS: Record<string, Record<string, number>> = {
  fournisseur: { insat: 3, aucun: 2, sat: 0 },
  quand: { urgent: 3, mois: 2, "3mois": 1, magasine: 0 },
  decideur: { oui: 2, partage: 1, non: 0 },
  taille: { l: 2, xl: 2, m: 1, s: 0, nsp: 0 },
  freq: { soir: 1, "2-3": 1, "1": 0, unique: 0, nsp: 0 },
};

export const COMMERCIAL_THRESHOLDS = {
  chaud: 8, // score >= 8
  tiede: 5, // 5 <= score < 8
  // < 5 => froid
};
