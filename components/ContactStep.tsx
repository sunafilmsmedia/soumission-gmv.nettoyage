"use client";

import { useState } from "react";
import type { ContactField } from "@/lib/validation";
import { validateContact } from "@/lib/validation";
import type { ContactInfo } from "@/lib/types";

export function ContactStep({
  initialValue,
  title,
  subtitle,
  ctaLabel,
  onSubmit,
}: {
  initialValue: ContactInfo;
  title: string;
  subtitle: string;
  ctaLabel: string;
  onSubmit: (contact: ContactInfo) => void;
}) {
  const [contact, setContact] = useState<ContactInfo>(initialValue);
  const [error, setError] = useState<{ field: ContactField; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) {
    setContact((c) => ({ ...c, [key]: value }));
  }

  function handleSubmit() {
    if (submitting) return;
    const err = validateContact(contact);
    setError(err);
    if (err) return;
    setSubmitting(true);
    onSubmit(contact);
  }

  return (
    <>
      <h1 className="question-title">{title}</h1>
      <p className="question-subtitle">{subtitle}</p>

      <div className="form-field">
        <label htmlFor="nom">Nom complet</label>
        <input
          id="nom"
          type="text"
          autoComplete="name"
          value={contact.nom}
          onChange={(e) => update("nom", e.target.value)}
        />
        {error?.field === "nom" ? <p className="field-error">{error.message}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="telephone">Téléphone</label>
        <input
          id="telephone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={contact.telephone}
          onChange={(e) => update("telephone", e.target.value)}
        />
        {error?.field === "telephone" ? <p className="field-error">{error.message}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="courriel">Courriel</label>
        <input
          id="courriel"
          type="email"
          autoComplete="email"
          value={contact.courriel}
          onChange={(e) => update("courriel", e.target.value)}
        />
        {error?.field === "courriel" ? <p className="field-error">{error.message}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="ville">Ville</label>
        <input
          id="ville"
          type="text"
          autoComplete="address-level2"
          value={contact.ville}
          onChange={(e) => update("ville", e.target.value)}
        />
        {error?.field === "ville" ? <p className="field-error">{error.message}</p> : null}
      </div>

      <div className="consent-row">
        <input
          id="consentement"
          type="checkbox"
          checked={contact.consentementSms}
          onChange={(e) => update("consentementSms", e.target.checked)}
        />
        <label htmlFor="consentement">
          J&apos;accepte d&apos;être contacté par texto et courriel par GMV Services.
        </label>
      </div>
      {error?.field === "consentementSms" ? <p className="field-error">{error.message}</p> : null}

      <button type="button" className="primary-button" disabled={submitting} onClick={handleSubmit}>
        {ctaLabel}
      </button>
    </>
  );
}
