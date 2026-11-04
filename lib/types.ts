export type Segment = "residentiel" | "commercial";
export type Priorite = "chaud" | "tiede" | "froid";

export type Answers = Record<string, string>;

export interface ContactInfo {
  nomComplet: string;
  telephone: string;
  courriel: string;
  ville: string;
  consentementSms: boolean;
}

export type StepIconKey =
  | "house"
  | "building"
  | "droplet"
  | "calendar"
  | "ruler"
  | "repeat"
  | "handshake"
  | "user"
  | "phone"
  | "pin";

export interface OptionDef {
  value: string;
  label: string;
  subtext?: string;
  icon?: StepIconKey;
}

export interface QuestionStepDef {
  type: "question";
  id: string;
  field: string;
  question: string;
  subtitle?: string;
  icon?: StepIconKey;
  options: OptionDef[];
}

export interface InputStepDef {
  type: "input";
  id: string;
  field: string;
  question: string;
  subtitle?: string;
  icon?: StepIconKey;
  inputType: "number" | "text";
  placeholder?: string;
  suffix?: string;
}

export interface CalculatingStepDef {
  type: "calculating";
  id: string;
  text: string;
}

export interface ContactStepDef {
  type: "contact";
  id: string;
}

export type StepDef = QuestionStepDef | InputStepDef | CalculatingStepDef | ContactStepDef;

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  gclid?: string;
}

export interface CrmPayload {
  segment: Segment;
  priorite: Priorite;
  score: number | null;
  nom: string;
  telephone: string;
  courriel: string;
  ville: string;
  consentement_sms: boolean;
  reponses: Record<string, string>;
  prix_affiche: number | null;
  source: UtmParams;
  soumis_le: string;
}
