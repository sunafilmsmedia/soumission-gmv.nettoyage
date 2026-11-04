import type { Answers, CalculatingStepDef, InputStepDef, QuestionStepDef, StepDef } from "./types";

export const DIVISION_STEP: QuestionStepDef = {
  type: "question",
  id: "division",
  field: "segment",
  question: "Le service est pour quel type d'espace ?",
  options: [
    {
      value: "residentiel",
      label: "Résidentiel",
      subtext: "Lavage à pression, entretien ménager et plus",
      icon: "house",
    },
    {
      value: "commercial",
      label: "Commercial",
      subtext: "Entretien ménager, après-construction, immeubles",
      icon: "building",
    },
  ],
};

const R0_SERVICE: QuestionStepDef = {
  type: "question",
  id: "R0",
  field: "service",
  question: "Quel type de nettoyage vous intéresse ?",
  icon: "droplet",
  options: [
    { value: "menager", label: "Entretien ménager" },
    { value: "construction", label: "Après-construction" },
    { value: "pression", label: "Lavage à pression" },
  ],
};

const R1: QuestionStepDef = {
  type: "question",
  id: "R1",
  field: "maison",
  question: "Quel type de propriété ?",
  subtitle: "Votre prix exact s'affiche à la fin.",
  icon: "house",
  options: [
    { value: "semi", label: "Semi-détaché" },
    { value: "bungalow", label: "Bungalow" },
    { value: "deux", label: "Unifamiliale à 2 étages" },
    {
      value: "hors",
      label: "Hors standard",
      subtext: "Plus de 2 étages, très grand terrain, accès difficile",
    },
  ],
};

const R3: QuestionStepDef = {
  type: "question",
  id: "R3",
  field: "quand",
  question: "Quand voulez-vous le service ?",
  icon: "calendar",
  options: [
    { value: "2sem", label: "Dans les 2 prochaines semaines" },
    { value: "mois", label: "Dans le mois" },
    { value: "saison", label: "Plus tard cette saison" },
  ],
};

const C1: QuestionStepDef = {
  type: "question",
  id: "C1",
  field: "type",
  question: "Quel type d'espace ?",
  icon: "building",
  options: [
    { value: "bureaux", label: "Bureaux" },
    { value: "sante", label: "Clinique ou santé" },
    { value: "commerce", label: "Commerce ou restaurant" },
    { value: "industriel", label: "Industriel ou entrepôt" },
    { value: "immeuble", label: "Immeuble locatif ou condo" },
    { value: "chantier", label: "Chantier, après-construction" },
  ],
};

const C2_SUPERFICIE: InputStepDef = {
  type: "input",
  id: "C2",
  field: "superficie",
  question: "Quel est le nombre de pieds carrés ?",
  subtitle: "Une estimation suffit.",
  icon: "ruler",
  inputType: "number",
  placeholder: "Ex. : 2500",
};

const C3_VILLE: InputStepDef = {
  type: "input",
  id: "C3",
  field: "ville",
  question: "Dans quelle ville ?",
  icon: "pin",
  inputType: "text",
  placeholder: "Ex. : Gatineau",
};

const CALCULATING_STEP: CalculatingStepDef = {
  type: "calculating",
  id: "calc",
  text: "L'IA calcule le prix selon le déplacement, la grandeur et le type d'espace.",
};

const CONTACT_STEP: StepDef = { type: "contact", id: "contact" };

// Pour l'instant, l'offre résidentielle est mise de côté : le parcours
// commercial démarre directement sur C1, sans écran de division.
export const COMMERCIAL_STEPS: StepDef[] = [
  C1,
  C2_SUPERFICIE,
  C3_VILLE,
  CALCULATING_STEP,
  CONTACT_STEP,
];

export function getResidentialSteps(answers: Answers): StepDef[] {
  // Le prix fixe ne s'applique qu'au lavage à pression (R1 sert à choisir
  // le prix). Pour entretien ménager / après-construction, pas de prix :
  // on saute directement à "quand" puis aux coordonnées.
  if (answers.service === "menager" || answers.service === "construction") {
    return [DIVISION_STEP, R0_SERVICE, R3, CONTACT_STEP];
  }
  return [DIVISION_STEP, R0_SERVICE, R1, R3, CONTACT_STEP];
}

export function getSteps(
  segment: "residentiel" | "commercial" | null,
  answers: Answers
): StepDef[] {
  if (segment === "commercial") return COMMERCIAL_STEPS;
  return getResidentialSteps(answers);
}
