"use client";

import { useState } from "react";

export function InputScreen({
  question,
  subtitle,
  inputType,
  placeholder,
  suffix,
  initialValue,
  onSubmit,
}: {
  question: string;
  subtitle?: string;
  inputType: "number" | "text";
  placeholder?: string;
  suffix?: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (!value.trim()) {
      setError("Ce champ est requis.");
      return;
    }
    onSubmit(value.trim());
  }

  return (
    <>
      <h1 className="question-title fade-in-up">{question}</h1>
      {subtitle ? <p className="question-subtitle fade-in-up">{subtitle}</p> : null}
      {inputType === "number" ? (
        <div className="input-live-preview fade-in-up" style={{ animationDelay: "60ms" }}>
          <span className="input-live-value">{value || "0"}</span>
          {suffix ? <span className="input-live-suffix">{suffix}</span> : null}
        </div>
      ) : null}
      <div className="form-field fade-in-up" style={{ animationDelay: "100ms" }}>
        <input
          type={inputType === "number" ? "number" : "text"}
          inputMode={inputType === "number" ? "numeric" : "text"}
          placeholder={placeholder}
          value={value}
          autoFocus
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        {error ? <p className="field-error">{error}</p> : null}
      </div>
      <button
        type="button"
        className="primary-button fade-in-up"
        style={{ animationDelay: "150ms" }}
        onClick={handleSubmit}
      >
        Continuer
      </button>
    </>
  );
}
