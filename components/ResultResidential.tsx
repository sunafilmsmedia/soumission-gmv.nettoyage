import { RESIDENTIAL_INCLUS } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export function ResultResidential({
  prenom,
  propertyLabel,
  price,
  tel,
}: {
  prenom: string;
  propertyLabel: string;
  price: number;
  tel: string;
}) {
  return (
    <>
      <h1 className="question-title">
        {prenom}, voici le prix pour votre {propertyLabel.toLowerCase()}
      </h1>
      <p className="result-price">{formatPrice(price)}</p>
      <p className="result-note">Plus taxes. Prix fixe, aucune surprise à l&apos;arrivée.</p>

      <ul className="checklist">
        {RESIDENTIAL_INCLUS.map((item) => (
          <li key={item}>
            <span className="check-icon">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="callout-box">
        <strong>Prochaine étape</strong>
        Un membre de l&apos;équipe GMV vous texte au {tel} pour confirmer votre date.
      </div>
    </>
  );
}
