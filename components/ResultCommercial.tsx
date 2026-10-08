const STEPS = [
  "L'urgence de votre projet et la date de début souhaitée",
  "La superficie exacte de votre espace",
  "La localisation exacte de votre espace",
];

export function ResultCommercial({
  prenom,
  tel,
  onRestart,
}: {
  prenom: string;
  tel: string;
  onRestart: () => void;
}) {
  return (
    <>
      <span className="result-badge fade-in-up" style={{ animationDelay: "0ms" }}>
        <span className="result-badge-dot" />
        Demande reçue
      </span>

      <h1 className="result-headline fade-in-up" style={{ animationDelay: "70ms" }}>
        Merci {prenom}, un agent GMV va vous appeler
      </h1>

      <p
        className="question-subtitle fade-in-up"
        style={{ animationDelay: "140ms", marginBottom: 20 }}
      >
        Chaque espace commercial est différent. Pour vous donner un prix juste, notre agent va
        valider avec vous :
      </p>

      <ol className="steps-numbered fade-in-up" style={{ animationDelay: "210ms" }}>
        {STEPS.map((step, i) => (
          <li key={step}>
            <span className="step-number-badge">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <div className="callout-box fade-in-up" style={{ animationDelay: "280ms" }}>
        <strong>On vous appelle au {tel}</strong>
        Gardez votre téléphone près de vous, l&apos;appel dure environ 10 minutes.
      </div>

      <button type="button" className="result-restart" onClick={onRestart}>
        Refaire une soumission
      </button>
    </>
  );
}
