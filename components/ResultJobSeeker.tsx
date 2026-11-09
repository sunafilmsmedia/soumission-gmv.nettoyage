export function ResultJobSeeker({ onRestart }: { onRestart: () => void }) {
  return (
    <>
      <span className="result-badge fade-in-up" style={{ animationDelay: "0ms" }}>
        <span className="result-badge-dot" />
        Message reçu
      </span>

      <h1 className="result-headline fade-in-up" style={{ animationDelay: "70ms" }}>
        Merci de votre intérêt pour GMV Services !
      </h1>

      <p
        className="question-subtitle fade-in-up"
        style={{ animationDelay: "140ms", marginBottom: 20 }}
      >
        On va vous rappeler bientôt pour en discuter.
      </p>

      <button
        type="button"
        className="result-restart fade-in-up"
        style={{ animationDelay: "210ms" }}
        onClick={onRestart}
      >
        Retour
      </button>
    </>
  );
}
