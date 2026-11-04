"use client";

import { useState } from "react";

export function InputScreen({
  question,
  subtitle,
  inputType,
  placeholder,
  initialValue,
  onSubmit,
}: {
  question: string;
  subtitle?: string;
  inputType: "number" | "text";
  placeholder?: string;
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
      <h1 className="question-title">{question}</h1>
      {subtitle ? <p className="question-subtitle">{subtitle}</p> : null}
      <div className="form-field">
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
      <button type="button" className="primary-button" onClick={handleSubmit}>
        Continuer
      </button>
    </>
  );
}
