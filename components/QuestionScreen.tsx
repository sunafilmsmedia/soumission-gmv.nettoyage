"use client";

import { StepIcon } from "./icons";
import type { OptionDef } from "@/lib/types";

export function QuestionScreen({
  question,
  subtitle,
  options,
  selectedValue,
  onSelect,
}: {
  question: string;
  subtitle?: string;
  options: OptionDef[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <>
      <h1 className="question-title">{question}</h1>
      {subtitle ? <p className="question-subtitle">{subtitle}</p> : null}
      <div className="options">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`option-button${opt.icon ? " has-icon" : ""}${
              selectedValue === opt.value ? " selected" : ""
            }`}
            onClick={() => onSelect(opt.value)}
          >
            {opt.icon ? (
              <span className="option-icon-badge">
                <StepIcon icon={opt.icon} className="option-icon" />
              </span>
            ) : null}
            <span className="option-text">
              <span className="option-label">{opt.label}</span>
              {opt.subtext ? <span className="option-subtext">{opt.subtext}</span> : null}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
