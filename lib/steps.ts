import type { QuestionStepDef, StepDef } from "./types";

export const DIVISION_STEP: QuestionStepDef = {
  type: "question",
  id: "division",
  field: "segment",
  question: "Le service est pour quel type d'espace ?",
  options: [
    {
      value: "residentiel",
      label: "Résidentiel",
      subtext: "Lavage à pression de votre maison",
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

const R2: QuestionStepDef = {
  type: "question",
  id: "R2",
  field: "etat",
  question: "Depuis quand les surfaces n'ont-elles pas été lavées ?",
  icon: "droplet",
  options: [
    { value: "1an", label: "Moins d'un an" },
    { value: "3ans", label: "1 à 3 ans" },
    { value: "jamais", label: "Plus de 3 ans ou jamais" },
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

const C2: QuestionStepDef = {
  type: "question",
  id: "C2",
  field: "taille",
  question: "Superficie approximative ?",
  subtitle: "Un estimé suffit, on la mesure avec vous.",
  icon: "ruler",
  options: [
    { value: "s", label: "Moins de 2 000 pi²" },
    { value: "m", label: "2 000 à 5 000 pi²" },
    { value: "l", label: "5 000 à 15 000 pi²" },
    { value: "xl", label: "Plus de 15 000 pi²" },
    { value: "nsp", label: "Je ne sais pas" },
  ],
};

const C3: QuestionStepDef = {
  type: "question",
  id: "C3",
  field: "freq",
  question: "À quelle fréquence ?",
  icon: "repeat",
  options: [
    { value: "soir", label: "Chaque soir" },
    { value: "2-3", label: "2 à 3 fois par semaine" },
    { value: "1", label: "1 fois par semaine" },
    { value: "unique", label: "Une seule fois" },
    { value: "nsp", label: "À déterminer" },
  ],
};

const C4: QuestionStepDef = {
  type: "question",
  id: "C4",
  field: "fournisseur",
  question: "Avez-vous un fournisseur en ce moment ?",
  icon: "handshake",
  options: [
    { value: "insat", label: "Oui, et ça ne marche pas" },
    { value: "sat", label: "Oui, et je suis satisfait" },
    { value: "aucun", label: "Non" },
  ],
};

const C5: QuestionStepDef = {
  type: "question",
  id: "C5",
  field: "quand",
  question: "Quand voulez-vous commencer ?",
  icon: "calendar",
  options: [
    { value: "urgent", label: "Le plus vite possible" },
    { value: "mois", label: "Dans le mois" },
    { value: "3mois", label: "D'ici 1 à 3 mois" },
    { value: "magasine", label: "Je compare les prix" },
  ],
};

const C6: QuestionStepDef = {
  type: "question",
  id: "C6",
  field: "decideur",
  question: "Êtes-vous la personne qui prend la décision ?",
  icon: "user",
  options: [
    { value: "oui", label: "Oui" },
    { value: "partage", label: "Je décide avec quelqu'un" },
    { value: "non", label: "Non, je fais la recherche" },
  ],
};

const CONTACT_STEP: StepDef = { type: "contact", id: "contact" };

export const RESIDENTIAL_STEPS: StepDef[] = [
  DIVISION_STEP,
  R1,
  R2,
  R3,
  CONTACT_STEP,
];

export const COMMERCIAL_STEPS: StepDef[] = [
  DIVISION_STEP,
  C1,
  C2,
  C3,
  C4,
  C5,
  C6,
  CONTACT_STEP,
];

export function getSteps(segment: "residentiel" | "commercial" | null): StepDef[] {
  if (segment === "commercial") return COMMERCIAL_STEPS;
  // Avant la sélection du segment, on utilise la longueur résidentielle
  // (5 écrans) comme valeur par défaut pour l'écran de division.
  return RESIDENTIAL_STEPS;
}
