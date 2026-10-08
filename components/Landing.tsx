import Link from "next/link";

export function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <img src="/logo-gmv.png" alt="GMV Services" width={170} height={110} />
      </header>

      <section className="hero">
        <div className="hero-inner">
          <span className="hero-badge">Propulsé par l&apos;IA</span>
          <h1>
            Votre soumission de nettoyage en <span className="accent">60 secondes</span>
          </h1>
          <p className="hero-subtitle">
            Prix fixe instantané pour le résidentiel. Soumission sur mesure pour le commercial.
          </p>
          <Link href="/soumission" className="cta-button">
            Obtenir ma soumission gratuite
          </Link>
          <p className="hero-fineprint">Aucune carte de crédit · Réponse immédiate</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} GMV Services. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
