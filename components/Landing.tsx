import Link from "next/link";
import { Skyline } from "./Skyline";

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
            Votre soumission de nettoyage Commercial{" "}
            <span className="nowrap-group">
              en{" "}
              <span className="accent-wrap">
                <img
                  className="broom-sweep"
                  src="/broom.png"
                  alt=""
                  aria-hidden="true"
                  width={243}
                  height={500}
                />
                <span className="accent">60 secondes</span>
              </span>
            </span>
          </h1>
          <p className="hero-subtitle">
            Bureaux, commerces, industriel, immeubles — une soumission sur mesure, rapidement.
          </p>
          <Link href="/soumission" className="cta-button">
            Obtenir ma soumission gratuite
          </Link>
          <p className="hero-fineprint">Aucune carte de crédit · On vous recontacte rapidement</p>
        </div>
      </section>

      <Skyline />

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} GMV Services. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
