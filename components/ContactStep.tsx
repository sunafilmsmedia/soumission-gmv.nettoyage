"use client";

import { useState } from "react";
import type { ContactField } from "@/lib/validation";
import { validateContact } from "@/lib/validation";
import { formatPrice } from "@/lib/format";
import type { ContactInfo } from "@/lib/types";

export function ContactStep({
  initialValue,
  title,
  subtitle,
  ctaLabel,
  previewPrice,
  onSubmit,
}: {
  initialValue: ContactInfo;
  title: string;
  subtitle: string;
  ctaLabel: string;
  previewPrice?: number;
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
    // Petite pause mise en scène (le balai "calcule" la soumission) avant
    // d'afficher le résultat — l'envoi réel au CRM se fait en arrière-plan
    // sans attendre, via onSubmit.
    window.setTimeout(() => onSubmit(contact), 1400);
  }

  if (submitting) {
    return (
      <div className="calculating">
        <div className="calculating-ring">
          <span className="calculating-ring-pulse" aria-hidden="true" />
          <img src="/broom.png" alt="" aria-hidden="true" className="calculating-broom" />
        </div>
        <p className="calculating-eyebrow">Envoi en cours</p>
        <p className="calculating-text shimmer-text">On calcule votre soumission&hellip;</p>
        <div className="calculating-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="question-title fade-in-up">{title}</h1>
      <p className="question-subtitle fade-in-up">{subtitle}</p>

      {previewPrice !== undefined ? (
        <div className="price-preview fade-in-up">
          <span className="price-preview-label">Votre prix</span>
          <span className="price-preview-value" aria-hidden="true">
            {formatPrice(previewPrice)}
          </span>
          <span className="price-preview-hint">
            Entrez vos coordonnées ci-dessous pour le révéler
          </span>
        </div>
      ) : null}

      <div className="form-field fade-in-up" style={{ animationDelay: "40ms" }}>
        <label htmlFor="nomComplet">Nom complet</label>
        <input
          id="nomComplet"
          type="text"
          autoComplete="name"
          value={contact.nomComplet}
          onChange={(e) => update("nomComplet", e.target.value)}
        />
        {error?.field === "nomComplet" ? <p className="field-error">{error.message}</p> : null}
      </div>

      <div className="form-field fade-in-up" style={{ animationDelay: "80ms" }}>
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

      <div className="form-field fade-in-up" style={{ animationDelay: "120ms" }}>
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

      <div className="consent-row fade-in-up" style={{ animationDelay: "160ms" }}>
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

      <button
        type="button"
        className="primary-button fade-in-up"
        style={{ animationDelay: "200ms" }}
        disabled={submitting}
        onClick={handleSubmit}
      >
        {ctaLabel}
      </button>
    </>
  );
}
