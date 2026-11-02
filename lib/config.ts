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

// Parcours commercial réduit à "type d'espace" + "fréquence" : le seul
// signal d'intention restant est la fréquence (plus c'est récurrent, plus
// le contrat potentiel est intéressant), donc mapping direct comme pour
// le résidentiel plutôt qu'un système de points devenu inutile.
export const COMMERCIAL_PRIORITY: Record<string, Priorite> = {
  soir: "chaud",
  "2-3": "chaud",
  "1": "tiede",
  unique: "froid",
  nsp: "froid",
};

// Villes desservies (Outaouais + région d'Ottawa). À confirmer avec Véronique.
export const NEARBY_CITIES = [
  "Gatineau",
  "Hull",
  "Aylmer",
  "Buckingham",
  "Masson-Angers",
  "Chelsea",
  "Cantley",
  "Val-des-Monts",
  "La Pêche",
  "Pontiac",
  "Thurso",
  "Papineauville",
  "Montebello",
  "Ottawa",
  "Orléans",
  "Kanata",
  "Nepean",
  "Barrhaven",
  "Gloucester",
  "Rockland",
  "Embrun",
  "Casselman",
];
