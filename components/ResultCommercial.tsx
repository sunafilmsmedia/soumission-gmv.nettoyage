export function ResultCommercial({ prenom, tel }: { prenom: string; tel: string }) {
  return (
    <>
      <h1 className="question-title">Merci {prenom}, un agent GMV va vous appeler</h1>
      <p className="question-subtitle">
        Chaque espace commercial est différent. Pour vous donner un prix juste, notre agent va
        valider avec vous :
      </p>

      <ol className="steps-list">
        <li>L&apos;urgence de votre projet et la date de début souhaitée</li>
        <li>La superficie exacte de votre espace</li>
        <li>La localisation exacte de votre espace</li>
      </ol>

      <div className="callout-box">
        <strong>On vous appelle au {tel}</strong>
        Gardez votre téléphone près de vous, l&apos;appel dure environ 10 minutes.
      </div>
    </>
  );
}
