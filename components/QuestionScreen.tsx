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
      <h1 className="question-title fade-in-up">{question}</h1>
      {subtitle ? <p className="question-subtitle fade-in-up">{subtitle}</p> : null}
      <div className="options">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            type="button"
            className={`option-button fade-in-up${selectedValue === opt.value ? " selected" : ""}`}
            style={{ animationDelay: `${i * 45}ms` }}
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
            <span className="option-radio" aria-hidden="true" />
          </button>
        ))}
      </div>
    </>
  );
}
