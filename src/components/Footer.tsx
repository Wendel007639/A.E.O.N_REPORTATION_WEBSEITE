import Link from "next/link";

const footerLinks = [
  { href: "/proof", label: "Proof" },
  { href: "/downloads", label: "Artefakte" },
  { href: "/methodik", label: "Methodik" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" }
];

export default function Footer() {
  return (
    <footer className="aeon-footer">
      <div className="aeon-footer-grid">
        <section className="aeon-footer-panel">
          <span className="aeon-kicker">A.E.O.N Prinzip</span>
          <h2>Echte Läufe. Echte Artefakte. Klare Reportation.</h2>
          <p>
            Diese Webseite ist die sichtbare Reportationsschicht für ProofKit,
            Evidence Briefs, Metriken, Gates und investorentaugliche Erklärung.
          </p>
        </section>

        <section className="aeon-footer-panel aeon-footer-panel-compact">
          <span className="aeon-kicker">Navigation</span>
          <div className="aeon-footer-links">
            {footerLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="aeon-footer-panel aeon-footer-panel-compact">
          <span className="aeon-kicker">Status</span>
          <p>
            Bis echte ProofKit-Daten angebunden sind, bleiben Proof Aussagen
            bewusst als Platzhalter markiert.
          </p>
        </section>
      </div>

      <div className="aeon-footer-bottom">
        <span>A.E.O.N Reportation Webseite</span>
        <span>Erst Beweis, dann Vision.</span>
      </div>
    </footer>
  );
}
