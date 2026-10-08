"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { QuestionScreen } from "./QuestionScreen";
import { ContactStep } from "./ContactStep";
import { StepIcon } from "./icons";
import { ResultResidential } from "./ResultResidential";
import { ResultCommercial } from "./ResultCommercial";
import { getSteps } from "@/lib/steps";
import { PRICING } from "@/lib/config";
import { commercialResult, residentialResult } from "@/lib/scoring";
import { buildCrmPayload } from "@/lib/payload";
import { submitLead } from "@/lib/submitLead";
import {
  captureUtmParams,
  fireMetaPixelLead,
  getPresetSegment,
  newEventId,
} from "@/lib/tracking";
import { firstName } from "@/lib/validation";
import type { Answers, ContactInfo, Segment, UtmParams } from "@/lib/types";

type ResultState =
  | { kind: "residentiel"; prenom: string; propertyLabel: string; price: number; tel: string }
  | { kind: "commercial"; prenom: string; tel: string };

const EMPTY_CONTACT: ContactInfo = {
  nom: "",
  telephone: "",
  courriel: "",
  ville: "",
  consentementSms: false,
};

export function FormFlow() {
  const [segment, setSegment] = useState<Segment | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [utm, setUtm] = useState<UtmParams>({});
  const [result, setResult] = useState<ResultState | null>(null);

  useEffect(() => {
    setUtm(captureUtmParams());
    const preset = getPresetSegment();
    if (preset) {
      setSegment(preset);
      setStepIndex(1);
    }
  }, []);

  const steps = getSteps(segment);
  const currentStep = steps[stepIndex];

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function handleSelect(field: string, value: string) {
    if (field === "segment") {
      if (segment && segment !== value) {
        setAnswers({});
      }
      setSegment(value as Segment);
      setStepIndex(1);
      return;
    }
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setStepIndex((i) => i + 1);
  }

  function handleContactSubmit(submittedContact: ContactInfo) {
    setContact(submittedContact);
    const eventId = newEventId();
    const prenom = firstName(submittedContact.nom);

    if (segment === "commercial") {
      const { priorite, score } = commercialResult(answers);
      const crm = buildCrmPayload({
        segment: "commercial",
        priorite,
        score,
        answers,
        contact: submittedContact,
        prixAffiche: null,
        utm,
      });
      submitLead(crm, eventId);
      fireMetaPixelLead(eventId);
      setResult({ kind: "commercial", prenom, tel: submittedContact.telephone });
      return;
    }

    const { priorite, price } = residentialResult(answers);
    const crm = buildCrmPayload({
      segment: "residentiel",
      priorite,
      score: null,
      answers,
      contact: submittedContact,
      prixAffiche: price,
      utm,
    });
    submitLead(crm, eventId, price);
    fireMetaPixelLead(eventId, price);
    setResult({
      kind: "residentiel",
      prenom,
      propertyLabel: PRICING[answers.maison]?.label ?? "",
      price,
      tel: submittedContact.telephone,
    });
  }

  if (result) {
    return (
      <>
        <BrandHeader />
        <main className="screen">
          <div className="screen-inner">
            {result.kind === "residentiel" ? (
              <ResultResidential
                prenom={result.prenom}
                propertyLabel={result.propertyLabel}
                price={result.price}
                tel={result.tel}
              />
            ) : (
              <ResultCommercial prenom={result.prenom} tel={result.tel} />
            )}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <BrandHeader />
      <main className="screen">
        <div className="screen-inner">
          <ProgressBar
            current={stepIndex + 1}
            total={steps.length}
            onBack={handleBack}
            showBack={stepIndex > 0}
          />

          {currentStep.type === "question" && currentStep.icon ? (
            <span className="step-icon-badge">
              <StepIcon icon={currentStep.icon} className="step-icon" />
            </span>
          ) : null}

          {currentStep.type === "question" ? (
            <QuestionScreen
              question={currentStep.question}
              subtitle={currentStep.subtitle}
              options={currentStep.options}
              selectedValue={
                currentStep.field === "segment" ? segment ?? undefined : answers[currentStep.field]
              }
              onSelect={(value) => handleSelect(currentStep.field, value)}
            />
          ) : (
            <>
              <span className="step-icon-badge">
                <StepIcon icon="phone" className="step-icon" />
              </span>
              <ContactStep
                initialValue={contact}
                title={
                  segment === "commercial" ? "Qui doit-on appeler ?" : "Où envoyer votre prix ?"
                }
                subtitle={
                  segment === "commercial"
                    ? "Un agent vous rappelle pour finaliser votre soumission."
                    : "On confirme votre date par texto."
                }
                ctaLabel={segment === "commercial" ? "Envoyer ma demande" : "Voir mon prix"}
                previewPrice={
                  segment === "residentiel" ? residentialResult(answers).price : undefined
                }
                onSubmit={handleContactSubmit}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}

function BrandHeader() {
  return (
    <header className="brand-header">
      <img src="/logo-gmv.png" alt="GMV Services" width={170} height={110} />
    </header>
  );
}
