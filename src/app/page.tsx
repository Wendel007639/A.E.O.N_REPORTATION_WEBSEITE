import Link from "next/link";
import latestProofData from "@/data/latest-proof.json";

type LatestProof = {
  status?: string;
  is_real_proof?: boolean;
  warning?: string;
  run_id?: string | null;
  failed_gates?: string[] | null;
  learning_visible?: boolean;
  speed_visible?: boolean;
};

const latestProof = latestProofData as LatestProof;

const failedGateCount = Array.isArray(latestProof.failed_gates)
  ? latestProof.failed_gates.length
  : null;

const officialResult =
  latestProof.is_real_proof === true &&
  failedGateCount === 0 &&
  latestProof.learning_visible === true &&
  latestProof.speed_visible === true;

const proofStage = officialResult
  ? "VERIFIZIERTER FULL-PROOF"
  : "PROOF-ANBINDUNG VORBEREITET";

const proofStatusLabel = officialResult
  ? "BESTANDEN"
  : "NOCH NICHT ALS BESTANDEN BEHAUPTEN";

const runIdLabel = latestProof.run_id ?? "Noch kein offizieller Run angebunden";

const gateLabel =
  failedGateCount === 0
    ? "FAILED_GATES = []"
    : failedGateCount === null
      ? "FAILED_GATES noch nicht belegt"
      : `${failedGateCount} failed gates`;

const telemetryCards = [
  {
    label: "Run-ID",
    value: runIdLabel,
    detail: "Kommt spaeter aus echten ProofKit-Artefakten."
  },
  {
    label: "Gate-Status",
    value: gateLabel,
    detail: "Gruen ist nur ein konsistenter Lauf mit fachlichen Gates."
  },
  {
    label: "Learning",
    value: latestProof.learning_visible ? "sichtbar" : "noch Platzhalter",
    detail: "Learning-Metriken werden nicht erfunden."
  },
  {
    label: "Speed",
    value: latestProof.speed_visible ? "sichtbar" : "noch Platzhalter",
    detail: "Speed-Metriken werden aus Artefakten gelesen."
  }
];

const pillars = [
  {
    title: "Intelligenz",
    text: "Pruefbar ueber Aufgaben, Dimensionen, Gates und Artefakte."
  },
  {
    title: "Wissen",
    text: "Reportation trennt belegte Daten von Interpretation."
  },
  {
    title: "Schutz",
    text: "Keine AGI-, Bewusstseins- oder Hype-Behauptungen ohne Beweis."
  },
  {
    title: "Vertrauen",
    text: "Ein Pruefer muss Runs, Status und Dateien nachvollziehen koennen."
  },
  {
    title: "Verbundenheit",
    text: "Proof, Downloads, Roadmap und Investor-Kommunikation greifen zusammen."
  }
];

const routeCards = [
  {
    href: "/proof",
    label: "Proof ansehen",
    text: "Run-ID, Gates, Statuswerte, Learning, Speed und Artefakte."
  },
  {
    href: "/downloads",
    label: "Downloads pruefen",
    text: "Evidence-Briefs, JSONs, Manifest-Dateien und Investor-Unterlagen."
  },
  {
    href: "/investoren",
    label: "Investorensicht",
    text: "Technischer Demonstrator-Status ohne Hype-Verkauf."
  }
];

function SignalBars() {
  return (
    <div className="aeon-signal-bars" aria-hidden="true">
      {Array.from({ length: 28 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="aeon-home">
      <section className="aeon-home-hero">
        <div className="aeon-hero-panel">
          <div className="aeon-pill">A.E.O.N Reportation Webseite</div>

          <h1 className="aeon-title">
            Pruefbare Reportation fuer ein echtes ProofKit-System.
          </h1>

          <p className="aeon-lead">
            A.E.O.N ist ein lokal laufendes, pruefbares ProofKit-System mit
            reproduzierbaren Artefakten, sichtbarem Lernen, Speed-Metriken und
            gruenen Gates.
          </p>

          <div className="aeon-proof-ribbon">
            <span className="aeon-proof-ribbon-kicker">{proofStage}</span>
            <strong>{proofStatusLabel}</strong>
            <span>{latestProof.warning ?? "Status wird aus Daten gelesen."}</span>
          </div>

          <div className="aeon-actions" aria-label="Schnellnavigation">
            <Link className="aeon-button aeon-button-primary" href="/proof">
              Proof oeffnen
            </Link>
            <Link className="aeon-button aeon-button-secondary" href="/downloads">
              Artefakte ansehen
            </Link>
            <Link className="aeon-button aeon-button-ghost" href="/investoren">
              Investoren
            </Link>
          </div>
        </div>

        <aside className="aeon-nexus-stage" aria-label="A.E.O.N Statusvisualisierung">
          <div className="aeon-floating-panel aeon-floating-panel-left">
            <span>INTELLIGENZ</span>
            <strong>{latestProof.is_real_proof ? "belegt" : "wartet"}</strong>
            <SignalBars />
          </div>

          <div className="aeon-floating-panel aeon-floating-panel-right">
            <span>VERTRAUEN</span>
            <strong>{officialResult ? "100%" : "Proof offen"}</strong>
            <SignalBars />
          </div>

          <div className="aeon-nexus-rings" aria-hidden="true">
            <div className="aeon-nexus-ring aeon-nexus-ring-one" />
            <div className="aeon-nexus-ring aeon-nexus-ring-two" />
            <div className="aeon-nexus-ring aeon-nexus-ring-three" />
            <div className="aeon-nexus-core">
              <span className="aeon-core-brain">A.E.O.N</span>
              <span className="aeon-core-sub">NETZWERK</span>
            </div>
            <div className="aeon-nexus-orbit aeon-nexus-orbit-one" />
            <div className="aeon-nexus-orbit aeon-nexus-orbit-two" />
            <div className="aeon-nexus-orbit aeon-nexus-orbit-three" />
          </div>

          <div className="aeon-nexus-console">
            <span>INTELLIGENZ</span>
            <span>WISSEN</span>
            <span>SCHUTZ</span>
            <span>VERTRAUEN</span>
            <span>VERBUNDENHEIT</span>
          </div>
        </aside>
      </section>

      <section className="aeon-home-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Aktueller Proof-Status</span>
          <h2>Die Startseite behauptet nur, was Daten hergeben.</h2>
          <p>
            Diese Seite ist die Eingangsschicht fuer Pruefer, Investoren und
            technische Leser. Status, Runs und Metriken werden nicht frei
            erfunden, sondern aus dem Datenmodell abgeleitet.
          </p>
        </div>

        <div className="aeon-telemetry-grid">
          {telemetryCards.map((card) => (
            <article className="aeon-telemetry-card" key={card.label}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aeon-home-section aeon-route-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Direkte Pruefung</span>
          <h2>Von der Vision direkt zum Beleg.</h2>
        </div>

        <div className="aeon-route-grid">
          {routeCards.map((card) => (
            <Link className="aeon-route-card" href={card.href} key={card.href}>
              <span>{card.label}</span>
              <p>{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="aeon-home-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">A.E.O.N Leitwerte</span>
          <h2>Technische Wirkung braucht Vertrauen, nicht Lautstaerke.</h2>
        </div>

        <div className="aeon-pillar-grid">
          {pillars.map((pillar) => (
            <article className="aeon-pillar-card" key={pillar.title}>
              <div className="aeon-pillar-icon" aria-hidden="true" />
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
