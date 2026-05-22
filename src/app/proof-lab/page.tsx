import type { Metadata } from "next";
import styles from "./proof-lab.module.css";

export const metadata: Metadata = {
  title: "Proof Lab | A.E.O.N Reportation",
  description:
    "A.E.O.N Proof Lab: Premium-HUD für Evidence, Gates, Artefakte und No-Fake-Green Kontrolle.",
};

const evidenceLanes = [
  {
    code: "01",
    title: "Evidence Intake",
    signal: "FILES / STRUCTURE / BINDING",
    text:
      "Die Evidence Struktur ist sichtbar angebunden. Platzhalter bleiben aber Platzhalter, bis echte Artefakte den fachlichen Beweis tragen.",
    state: "BOUND",
  },
  {
    code: "02",
    title: "Artifact Vault",
    signal: "6 EXPECTED / PLACEHOLDER",
    text:
      "Erwartete Evidence-Dateien existieren physisch. Dieser Status ist kein offizieller Grünbeweis, sondern nur ein strukturierter Eingang.",
    state: "WAITING",
  },
  {
    code: "03",
    title: "Gate Chamber",
    signal: "LINT / BUILD / JSON / SURFACE",
    text:
      "Technische Gates zeigen Stabilitaet. Sie ersetzen keinen fachlichen Proof und werden nicht als Erfolg verkauft, wenn Artefakte leer sind.",
    state: "CONTROL",
  },
  {
    code: "04",
    title: "Learning Loop",
    signal: "RUN / RESULT / CONSISTENCY",
    text:
      "Bewertbar ist erst ein Lauf, bei dem fachliche Gates, Artefakte, Learning und Speed zusammen konsistent gruen sind.",
    state: "LOCKED",
  },
  {
    code: "05",
    title: "Official Green",
    signal: "FALSE / SAFE / HONEST",
    text:
      "Official Green bleibt false, solange der Beweis nicht echt ist. Diese Seite macht den Sperrstatus sichtbar statt ihn zu kaschieren.",
    state: "FALSE",
  },
];

const telemetry = [
  ["BUILD", "technisch prüfen", "stabiler Prozess"],
  ["LINT", "Code prüfen", "saubere Flaeche"],
  ["JSON", "Daten prüfen", "lesbare Struktur"],
  ["SURFACE", "UI prüfen", "kein Designbruch"],
  ["PROOF", "fachlich prüfen", "kein Fake-Grün"],
];

const guardRules = [
  "Keine Aenderung an globals.css.",
  "Keine Aenderung an Header, Footer, Layout oder Startseite.",
  "Keine Aenderung an bestehenden Patch-Seiten.",
  "Keine grüne Proof-Behauptung ohne echte Artefakte.",
  "Neue Route bleibt isoliert unter /proof-lab.",
];

const leftConsole = [
  ["EVIDENCE", "STRUCTURE", "BOUND", "PLACEHOLDER", "06"],
  ["GATES", "BUILD", "LINT", "SURFACE", "04"],
  ["STATUS", "OFFICIAL", "GREEN", "FALSE", "00"],
];

const rightConsole = [
  ["PROOF", "ARTIFACT", "LEARNING", "SPEED", "LOCK"],
  ["GUARD", "DESIGN", "HASH", "SAFE", "100"],
  ["AEON", "NEXUS", "HUD", "LAB", "11"],
];

function ConsoleStack({
  side,
  items,
}: {
  side: "left" | "right";
  items: string[][];
}) {
  return (
    <div
      className={`${styles.consoleStack} ${
        side === "left" ? styles.leftStack : styles.rightStack
      }`}
      aria-hidden="true"
    >
      {items.map(([title, one, two, three, value]) => (
        <div className={styles.consoleCard} key={title}>
          <strong>{title}</strong>
          <span>{one}</span>
          <span>{two}</span>
          <span>{three}</span>
          <i />
          <small>{value}</small>
        </div>
      ))}
    </div>
  );
}

export default function ProofLabPage() {
  return (
    <main className={styles.proofLabPage}>
      <div className={styles.gridLayer} aria-hidden="true" />
      <div className={styles.scanLayer} aria-hidden="true" />
      <div className={styles.pulseLayer} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>PATCH 11 / A.E.O.N PROOF LAB</p>
          <h1>Proof wird nicht behauptet. Proof wird sichtbar kontrolliert.</h1>

          <p className={styles.lead}>
            Das Proof Lab zeigt die Beweisarchitektur als lebendes HUD:
            Evidence, Artefakte, technische Gates und Official-Green-Sperre
            bleiben getrennt sichtbar, damit kein Platzhalter als Erfolg wirkt.
          </p>

          <div className={styles.lockStrip}>
            <span>NO FAKE GREEN</span>
            <strong>ACTIVE</strong>
            <p>
              Official Green bleibt gesperrt, solange Artefakte nur
              Platzhalter sind. Design-Guard bleibt geschlossen.
            </p>
          </div>

          <div className={styles.actions}>
            <a href="#evidence-matrix">Evidence-Matrix</a>
            <a href="#gate-telemetry">Gate-Telemetrie</a>
          </div>
        </div>

        <div className={styles.labVisual} aria-label="A.E.O.N Proof Lab Visual">
          <ConsoleStack side="left" items={leftConsole} />

          <div className={styles.coreStage}>
            <div className={styles.energyShell} aria-hidden="true" />
            <div className={styles.outerRing} aria-hidden="true" />
            <div className={styles.midRing} aria-hidden="true" />
            <div className={styles.innerRing} aria-hidden="true" />
            <div className={styles.floorGrid} aria-hidden="true" />

            <div className={styles.hexTop}>PROOF</div>
            <div className={styles.hexLeft}>DATA</div>
            <div className={styles.hexRight}>GATE</div>
            <div className={styles.hexLowerLeft}>LOCK</div>
            <div className={styles.hexLowerRight}>SAFE</div>

            <div className={styles.core}>
              <div className={styles.shield} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className={styles.coreText}>
                <span>A.E.O.N</span>
                <strong>PROOF LAB</strong>
              </div>

              <div className={styles.coreDock}>
                <i>EVIDENCE</i>
                <i>ARTIFACTS</i>
                <i>GATES</i>
                <i>LEARNING</i>
                <i>OFFICIAL FALSE</i>
              </div>
            </div>
          </div>

          <ConsoleStack side="right" items={rightConsole} />
        </div>
      </section>

      <section className={styles.matrixSection} id="evidence-matrix">
        <div className={styles.sectionHead}>
          <p>EVIDENCE-MATRIX</p>
          <h2>Fuenf Kontrollschichten gegen falsches Grün.</h2>
        </div>

        <div className={styles.laneGrid}>
          {evidenceLanes.map((lane) => (
            <article className={styles.laneCard} key={lane.code}>
              <div className={styles.laneCode}>{lane.code}</div>
              <span>{lane.signal}</span>
              <h3>{lane.title}</h3>
              <p>{lane.text}</p>
              <strong>{lane.state}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.telemetrySection} id="gate-telemetry">
        <div className={styles.sectionHead}>
          <p>GATE-TELEMETRIE</p>
          <h2>Technisch gruen ist nicht automatisch fachlich bewiesen.</h2>
        </div>

        <div className={styles.telemetryGrid}>
          {telemetry.map(([title, text, detail]) => (
            <article className={styles.telemetryNode} key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guardSection}>
        <div className={styles.guardTitle}>
          <p>PATCH 11 DESIGN GUARD</p>
          <h2>Dieser Patch baut neu, ohne Bestehendes zu verletzen.</h2>
        </div>

        <div className={styles.guardGrid}>
          {guardRules.map((rule) => (
            <div className={styles.guardItem} key={rule}>
              <span />
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
