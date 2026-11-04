import { COMMERCIAL_SURFACE_PRIORITY, PRICING, RESIDENTIAL_PRIORITY } from "./config";
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
  score: null;
} {
  const superficie = Number(answers.superficie) || 0;
  const priorite =
    COMMERCIAL_SURFACE_PRIORITY.find((tier) => superficie >= tier.min)?.priorite ?? "froid";
  return { priorite, score: null };
}
