import type { Metadata } from "next";
import styles from "./nexus.module.css";

export const metadata: Metadata = {
  title: "Nexus | A.E.O.N Reportation",
  description:
    "A.E.O.N Nexus Control: Premium-HUD für Intelligenz, Wissen, Schutz, Vertrauen und Verbundenheit.",
};

const values = [
  {
    code: "01",
    title: "Intelligenz",
    signal: "Kuenstlich / Tief / Acht",
    text:
      "Der Nexus erkennt Muster, ordnet Signale und fuehrt Entscheidungen erst dann nach vorne, wenn Kontext und Kontrolle zusammenpassen.",
  },
  {
    code: "02",
    title: "Wissen",
    signal: "Daten / Verstehen / Fortschritt",
    text:
      "Wissen ist kein Schmuckelement. Es ist die operative Verbindung aus Daten, Methodik, Evidence und nachvollziehbarer Bewertung.",
  },
  {
    code: "03",
    title: "Schutz",
    signal: "Sicher / Ethisch / Verlaesslich",
    text:
      "Schutz bedeutet: keine falschen Grünmeldungen, keine unbewiesenen Behauptungen und keine Design-Operation ohne Guard.",
  },
  {
    code: "04",
    title: "Vertrauen",
    signal: "Transparent / Menschlich / Verbunden",
    text:
      "Vertrauen entsteht durch sichtbare Grenzen, prüfbare Zustaende und eine Oberflaeche, die nicht mehr verspricht als sie beweisen kann.",
  },
  {
    code: "05",
    title: "Verbundenheit",
    signal: "Grenzenlos / Vernetzt / Zukunft",
    text:
      "Jede Flaeche, jeder Patch und jede Evidence-Spur bleibt Teil eines verbundenen Systems statt einzelner Template-Bloecke.",
  },
];

const controlFlow = [
  ["INPUT", "Signale sammeln"],
  ["BIND", "Evidence anbinden"],
  ["GATE", "technisch prüfen"],
  ["PROOF", "fachlich bewerten"],
  ["DELIVER", "kontrolliert ausliefern"],
];

const guards = [
  "Keine globale CSS-Aenderung.",
  "Keine Aenderung an Header, Footer, Layout oder Startseite.",
  "Keine Standard-Template-Optik.",
  "Keine grüne Proof-Behauptung ohne echte Artefakte.",
  "Neue Route bleibt isoliert unter /nexus.",
];

function SideConsole({
  side,
}: {
  side: "left" | "right";
}) {
  const panels =
    side === "left"
      ? [
          ["INTELLIGENZ", "KONTEXT", "ANALYSE", "FUEHRUNG"],
          ["WISSEN", "DATEN", "METHODIK", "EVIDENCE"],
          ["SCHUTZ", "SICHER", "ETHISCH", "STABIL"],
        ]
      : [
          ["VERTRAUEN", "KLAR", "MENSCHLICH", "PRUEFBAR"],
          ["VERBUNDEN", "SYSTEM", "NEXUS", "ZUKUNFT"],
          ["CONTROL", "BUILD", "LINT", "GUARD"],
        ];

  return (
    <div
      className={`${styles.sideConsole} ${
        side === "left" ? styles.leftConsole : styles.rightConsole
      }`}
      aria-hidden="true"
    >
      {panels.map(([title, one, two, three]) => (
        <div className={styles.consolePanel} key={title}>
          <strong>{title}</strong>
          <span>{one}</span>
          <span>{two}</span>
          <span>{three}</span>
          <i />
          <small>100%</small>
        </div>
      ))}
    </div>
  );
}

export default function NexusPage() {
  return (
    <main className={styles.nexusPage}>
      <div className={styles.starField} aria-hidden="true" />
      <div className={styles.gridField} aria-hidden="true" />
      <div className={styles.scanField} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>PATCH 10 / A.E.O.N NEXUS CONTROL</p>
          <h1>Der Nexus verbindet Werte mit beweisbarer Kontrolle.</h1>
          <p className={styles.lead}>
            Diese Seite übersetzt die A.E.O.N DNA in ein sichtbares
            Kontrollsystem: Intelligenz, Wissen, Schutz, Vertrauen und
            Verbundenheit werden nicht nur genannt, sondern als lebende
            Systemarchitektur dargestellt.
          </p>

          <div className={styles.statusBar}>
            <span>DESIGN-GUARD</span>
            <strong>LOCKED</strong>
            <p>
              Isolierte Route. Keine globale CSS-Operation. Kein Eingriff in
              bestehende Design-Flaechen.
            </p>
          </div>

          <div className={styles.actions}>
            <a href="#values">Werte-Matrix</a>
            <a href="#control">Control-Flow</a>
          </div>
        </div>

        <div className={styles.nexusVisual} aria-label="A.E.O.N Nexus Visual">
          <SideConsole side="left" />

          <div className={styles.coreStage}>
            <div className={styles.energyCorona} aria-hidden="true" />
            <div className={styles.ringOne} aria-hidden="true" />
            <div className={styles.ringTwo} aria-hidden="true" />
            <div className={styles.ringThree} aria-hidden="true" />
            <div className={styles.floorGrid} aria-hidden="true" />

            <div className={styles.nodeA}>AI</div>
            <div className={styles.nodeB}>DATA</div>
            <div className={styles.nodeC}>GUARD</div>
            <div className={styles.nodeD}>PROOF</div>
            <div className={styles.nodeE}>{"\u221e"}</div>

            <div className={styles.core}>
              <div className={styles.brain} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className={styles.coreText}>
                <span>A.E.O.N</span>
                <strong>NEXUS</strong>
              </div>

              <div className={styles.coreDock}>
                <i>INTELLIGENZ</i>
                <i>WISSEN</i>
                <i>SCHUTZ</i>
                <i>VERTRAUEN</i>
                <i>VERBUNDEN</i>
              </div>
            </div>
          </div>

          <SideConsole side="right" />
        </div>
      </section>

      <section className={styles.valuesSection} id="values">
        <div className={styles.sectionHead}>
          <p>WERTE-MATRIX</p>
          <h2>Fuenf Signale. Ein Systemkern.</h2>
        </div>

        <div className={styles.valueGrid}>
          {values.map((item) => (
            <article className={styles.valueCard} key={item.code}>
              <div className={styles.valueCode}>{item.code}</div>
              <span>{item.signal}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.controlSection} id="control">
        <div className={styles.sectionHead}>
          <p>CONTROL-FLOW</p>
          <h2>Kein Glueck. Keine Magie. Ein prüfbarer Ablauf.</h2>
        </div>

        <div className={styles.flowLine}>
          {controlFlow.map(([title, text]) => (
            <article className={styles.flowNode} key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guardSection}>
        <div className={styles.guardTitle}>
          <p>NEXUS DESIGN GUARD</p>
          <h2>Patch 10 schuetzt den aktuellen Stand.</h2>
        </div>

        <div className={styles.guardGrid}>
          {guards.map((item) => (
            <div className={styles.guardItem} key={item}>
              <span />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
