"use client";

import { useState } from "react";
import type { ContactField } from "@/lib/validation";
import { validateContact } from "@/lib/validation";
import { NEARBY_CITIES } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { ContactInfo } from "@/lib/types";

const OTHER_CITY = "__autre__";

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

  const initialKnownCity = NEARBY_CITIES.includes(initialValue.ville) ? initialValue.ville : "";
  const [citySelection, setCitySelection] = useState<string>(
    initialValue.ville && !initialKnownCity ? OTHER_CITY : initialKnownCity
  );
  const [customCity, setCustomCity] = useState<string>(
    initialValue.ville && !initialKnownCity ? initialValue.ville : ""
  );

  function update<K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) {
    setContact((c) => ({ ...c, [key]: value }));
  }

  function handleCityChange(value: string) {
    setCitySelection(value);
    update("ville", value === OTHER_CITY ? customCity : value);
  }

  function handleCustomCityChange(value: string) {
    setCustomCity(value);
    update("ville", value);
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

      {previewPrice !== undefined ? (
        <div className="price-preview">
          <span className="price-preview-label">Votre prix</span>
          <span className="price-preview-value" aria-hidden="true">
            {formatPrice(previewPrice)}
          </span>
          <span className="price-preview-hint">
            Entrez vos coordonnées ci-dessous pour le révéler
          </span>
        </div>
      ) : null}

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
        <select
          id="ville"
          autoComplete="address-level2"
          value={citySelection}
          onChange={(e) => handleCityChange(e.target.value)}
        >
          <option value="" disabled>
            Choisissez votre ville
          </option>
          {NEARBY_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
          <option value={OTHER_CITY}>Autre ville</option>
        </select>
        {citySelection === OTHER_CITY ? (
          <input
            type="text"
            placeholder="Nom de votre ville"
            value={customCity}
            onChange={(e) => handleCustomCityChange(e.target.value)}
            style={{ marginTop: 8 }}
          />
        ) : null}
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
