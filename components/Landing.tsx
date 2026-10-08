import Link from "next/link";
import { RESIDENTIAL_INCLUS } from "@/lib/config";

const STEPS = [
  {
    title: "Répondez à quelques questions",
    desc: "Sur votre propriété ou votre espace commercial — ça prend environ une minute, sur votre téléphone.",
  },
  {
    title: "Obtenez votre prix instantanément",
    desc: "Résidentiel : prix fixe affiché tout de suite. Commercial : notre équipe prépare votre dossier sur mesure.",
  },
  {
    title: "Confirmez par texto",
    desc: "On vous contacte rapidement pour fixer la date qui vous convient.",
  },
];

const BENEFITS = [
  "Prix fixe, aucune surprise",
  "Produits certifiés biologiques",
  "Réponse rapide, même pour les urgences",
  "Résidentiel et commercial",
];

export function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <img src="/logo-gmv.png" alt="GMV Services" width={170} height={110} />
        <Link href="/soumission" className="cta-button header-cta">
          Obtenir ma soumission
        </Link>
      </header>

      <section className="hero">
        <img className="hero-icon-bg" src="/logo-gmv.png" alt="" aria-hidden="true" />
        <div className="hero-inner">
          <span className="hero-badge">Propulsé par l&apos;IA</span>
          <h1>
            Obtenez votre <span className="accent">soumission de nettoyage</span> en 60 secondes
            grâce à l&apos;IA
          </h1>
          <p className="hero-subtitle">
            Lavage à pression résidentiel à prix fixe instantané, ou entretien commercial sur
            mesure. Répondez à quelques questions, c&apos;est tout.
          </p>
          <div className="hero-cta-row">
            <Link href="/soumission" className="cta-button">
              Obtenir ma soumission gratuite
            </Link>
            <span className="hero-fineprint">
              Aucune carte de crédit · Réponse immédiate pour le résidentiel
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-eyebrow">Comment ça marche</p>
        <h2 className="section-title">Votre prix en 3 étapes</h2>
        <p className="section-subtitle">
          Conçu pour être rapide sur mobile — pas de formulaire interminable.
        </p>
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <div className="step-card" key={step.title}>
              <span className="step-number">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Nos services</p>
        <h2 className="section-title">Résidentiel ou commercial</h2>
        <p className="section-subtitle">Choisissez votre parcours — chacun a sa propre soumission.</p>

        <div className="offers-grid">
          <div className="offer-card highlight">
            <span className="offer-kicker">Résidentiel</span>
            <h3>Lavage à pression</h3>
            <p className="offer-desc">
              Entrée, revêtement extérieur, clôture et plus — un prix fixe affiché immédiatement,
              sans surprise.
            </p>
            <ul className="offer-list">
              {RESIDENTIAL_INCLUS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="offer-price">
              À partir de <strong>399,99 $</strong>
            </p>
            <Link href="/soumission?segment=residentiel" className="cta-button">
              Voir mon prix
            </Link>
          </div>

          <div className="offer-card">
            <span className="offer-kicker">Commercial</span>
            <h3>Entretien commercial</h3>
            <p className="offer-desc">
              Bureaux, cliniques, commerces, industriel, immeubles, après-construction — on
              valide votre projet avec vous.
            </p>
            <ul className="offer-list">
              <li>Fréquence sur mesure (quotidien à ponctuel)</li>
              <li>Soumission adaptée à votre espace</li>
              <li>Un agent vous rappelle pour finaliser</li>
            </ul>
            <p className="offer-price">Sur mesure — un agent vous rappelle</p>
            <Link href="/soumission?segment=commercial" className="cta-button">
              Demander ma soumission
            </Link>
          </div>
        </div>
      </section>

      <section className="benefits-strip">
        <div className="benefits-grid">
          {BENEFITS.map((benefit) => (
            <div className="benefit-item" key={benefit}>
              <span className="check-icon">✓</span>
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <h2>Prêt à obtenir votre prix ?</h2>
        <p>Ça prend moins d&apos;une minute, directement depuis votre téléphone.</p>
        <Link href="/soumission" className="cta-button">
          Obtenir ma soumission gratuite
        </Link>
      </section>

      <footer className="landing-footer">
        <img src="/logo-gmv.png" alt="GMV Services" width={170} height={110} />
        <p>© {new Date().getFullYear()} GMV Services. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
