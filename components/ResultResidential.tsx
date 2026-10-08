import { RESIDENTIAL_INCLUS } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export function ResultResidential({
  prenom,
  propertyLabel,
  price,
  tel,
  onRestart,
}: {
  prenom: string;
  propertyLabel: string;
  price: number;
  tel: string;
  onRestart: () => void;
}) {
  return (
    <>
      <span className="result-badge fade-in-up" style={{ animationDelay: "0ms" }}>
        <span className="result-badge-dot" />
        Prix confirmé
      </span>

      <h1 className="result-headline fade-in-up" style={{ animationDelay: "70ms" }}>
        {prenom}, voici le prix pour votre {propertyLabel.toLowerCase()}
      </h1>

      <div className="price-card fade-in-up" style={{ animationDelay: "140ms" }}>
        <span className="price-card-blob price-card-blob-1" />
        <span className="price-card-blob price-card-blob-2" />
        <div className="price-card-inner">
          <p className="price-card-label">Prix fixe</p>
          <p className="price-card-value">{formatPrice(price)}</p>
          <p className="price-card-note">Plus taxes. Aucune surprise à l&apos;arrivée.</p>
        </div>
      </div>

      <div className="fade-in-up" style={{ animationDelay: "210ms" }}>
        <p className="result-section-title">Inclus dans votre forfait</p>
        <div className="inclusions-grid">
          {RESIDENTIAL_INCLUS.map((item) => (
            <div className="inclusion-chip" key={item}>
              <span className="check-icon">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="callout-box fade-in-up" style={{ animationDelay: "280ms" }}>
        <strong>Prochaine étape</strong>
        Un membre de l&apos;équipe GMV vous texte au {tel} pour confirmer votre date.
      </div>

      <button type="button" className="result-restart" onClick={onRestart}>
        Refaire une soumission
      </button>
    </>
  );
}
