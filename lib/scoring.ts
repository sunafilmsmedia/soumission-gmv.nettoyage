import {
  COMMERCIAL_POINTS,
  COMMERCIAL_THRESHOLDS,
  PRICING,
  RESIDENTIAL_PRIORITY,
} from "./config";
import type { Answers, Priorite } from "./types";

export function residentialResult(answers: Answers): {
  priorite: Priorite;
  score: null;
  price: number;
} {
  const priorite = RESIDENTIAL_PRIORITY[answers.quand] ?? "froid";
  const price = PRICING[answers.maison]?.price ?? 0;
  return { priorite, score: null, price };
}

export function commercialResult(answers: Answers): {
  priorite: Priorite;
  score: number;
} {
  let score = 0;
  for (const field of Object.keys(COMMERCIAL_POINTS)) {
    const value = answers[field];
    score += COMMERCIAL_POINTS[field]?.[value] ?? 0;
  }

  let priorite: Priorite = "froid";
  if (score >= COMMERCIAL_THRESHOLDS.chaud) priorite = "chaud";
  else if (score >= COMMERCIAL_THRESHOLDS.tiede) priorite = "tiede";

  return { priorite, score };
}
