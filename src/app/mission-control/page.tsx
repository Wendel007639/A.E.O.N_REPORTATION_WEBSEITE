import type { Metadata } from "next";
import styles from "./mission-control.module.css";

export const metadata: Metadata = {
  title: "Mission Control | A.E.O.N Reportation",
  description:
    "A.E.O.N Mission Control: Premium-HUD fuer Surface, Nexus, Proof, Guard und Delivery.",
};

const missionStack = [
  {
    code: "M-01",
    title: "Signal Intake",
    signal: "CONTEXT / INPUT / PRIORITY",
    text:
      "Alle Signale laufen zuerst in eine kontrollierte Lageerfassung. Kein Impuls wird direkt als Wahrheit behandelt.",
    status: "LISTENING",
  },
  {
    code: "M-02",
    title: "Nexus Core",
    signal: "ARCHITECTURE / VALUES / SYSTEM",
    text:
      "Architektur, Werte und Systemlogik werden verbunden, ohne bestehende Flaechen oder globale Styles zu beruehren.",
    status: "ONLINE",
  },
  {
    code: "M-03",
    title: "Proof Lock",
    signal: "EVIDENCE / ARTIFACTS / GATES",
    text:
      "Proof bleibt gesperrt, solange Artefakte nur Platzhalter sind. Technisch gruen ist nicht automatisch fachlich bewiesen.",
    status: "LOCKED",
  },
  {
    code: "M-04",
    title: "Surface Guard",
    signal: "DESIGN / MOBILE / UI",
    text:
      "Jede sichtbare Erweiterung muss aussehen wie A.E.O.N, nicht wie ein Template. Bestehendes Design bleibt unangetastet.",
    status: "GUARDED",
  },
  {
    code: "M-05",
    title: "Delivery Control",
    signal: "PATCH / REVIEW / BUILD",
    text:
      "Auslieferung erfolgt nur nach Guard-Kontrolle, Lint, Build und klarer Trennung zwischen Vision und Beweis.",
    status: "READY",
  },
];

const launchFlow = [
  ["SCAN", "Lage erfassen", "Kontext stabilisieren"],
  ["ROUTE", "System fuehren", "Nexus-Pfad setzen"],
  ["GUARD", "Design sichern", "Bestehendes schuetzen"],
  ["VERIFY", "Gates pruefen", "Build und Lint"],
  ["REPORT", "Status liefern", "kein Fake-Gruen"],
];

const guardRules = [
  "Keine Aenderung an globals.css.",
  "Keine Aenderung an Header, Footer, Layout oder Startseite.",
  "Keine Aenderung an /architektur, /nexus oder /proof-lab.",
  "Keine gruene Proof-Behauptung ohne echte Artefakte.",
  "Neue Route bleibt isoliert unter /mission-control.",
];

const leftPanels = [
  ["SURFACE", "UI", "MOBILE", "HUD", "SAFE"],
  ["NEXUS", "VALUES", "FLOW", "CORE", "SYNC"],
  ["PROOF", "FALSE", "LOCK", "HONEST", "00"],
];

const rightPanels = [
  ["BUILD", "LINT", "NEXT", "STATIC", "OK"],
  ["GUARD", "HASH", "FILES", "STABLE", "100"],
  ["PATCH", "12", "MISSION", "CONTROL", "LIVE"],
];

function ControlStack({
  side,
  items,
}: {
  side: "left" | "right";
  items: string[][];
}) {
  return (
    <div
      className={`${styles.controlStack} ${
        side === "left" ? styles.leftStack : styles.rightStack
      }`}
      aria-hidden="true"
    >
      {items.map(([title, one, two, three, value]) => (
        <div className={styles.controlCard} key={title}>
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

export default function MissionControlPage() {
  return (
    <main className={styles.missionPage}>
      <div className={styles.gridLayer} aria-hidden="true" />
      <div className={styles.scanLayer} aria-hidden="true" />
      <div className={styles.starLayer} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>PATCH 12 / A.E.O.N MISSION CONTROL</p>
          <h1>Mission Control macht den gesamten Nexus steuerbar.</h1>

          <p className={styles.lead}>
            Diese Seite ist die Kontrollbruecke: Surface, Nexus, Proof, Guard
            und Delivery werden in einem Premium-HUD zusammengefuehrt, ohne
            bestehende Design-Flaechen zu beruehren.
          </p>

          <div className={styles.commandLock}>
            <span>DESIGN-GUARD</span>
            <strong>SEALED</strong>
            <p>
              Neue Route. Isolierte Styles. Keine globale CSS-Operation. Kein
              Eingriff in Header, Footer, Layout oder Startseite.
            </p>
          </div>

          <div className={styles.actions}>
            <a href="#mission-stack">Mission-Stack</a>
            <a href="#launch-flow">Launch-Flow</a>
          </div>
        </div>

        <div className={styles.missionVisual} aria-label="A.E.O.N Mission Control Visual">
          <ControlStack side="left" items={leftPanels} />

          <div className={styles.coreStage}>
            <div className={styles.energyField} aria-hidden="true" />
            <div className={styles.ringAlpha} aria-hidden="true" />
            <div className={styles.ringBeta} aria-hidden="true" />
            <div className={styles.ringGamma} aria-hidden="true" />
            <div className={styles.floorGrid} aria-hidden="true" />

            <div className={styles.hexTop}>CONTROL</div>
            <div className={styles.hexLeft}>SURFACE</div>
            <div className={styles.hexRight}>PROOF</div>
            <div className={styles.hexBottomLeft}>GUARD</div>
            <div className={styles.hexBottomRight}>BUILD</div>

            <div className={styles.core}>
              <div className={styles.tower} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className={styles.coreText}>
                <span>A.E.O.N</span>
                <strong>MISSION CONTROL</strong>
              </div>

              <div className={styles.coreDock}>
                <i>SURFACE</i>
                <i>NEXUS</i>
                <i>PROOF</i>
                <i>GUARD</i>
                <i>DELIVERY</i>
              </div>
            </div>
          </div>

          <ControlStack side="right" items={rightPanels} />
        </div>
      </section>

      <section className={styles.stackSection} id="mission-stack">
        <div className={styles.sectionHead}>
          <p>MISSION-STACK</p>
          <h2>Fuenf Kontrollachsen. Kein Designbruch.</h2>
        </div>

        <div className={styles.stackGrid}>
          {missionStack.map((item) => (
            <article className={styles.stackCard} key={item.code}>
              <div className={styles.stackCode}>{item.code}</div>
              <span>{item.signal}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <strong>{item.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.flowSection} id="launch-flow">
        <div className={styles.sectionHead}>
          <p>LAUNCH-FLOW</p>
          <h2>Jeder Schritt sichtbar, pruefbar und kontrolliert.</h2>
        </div>

        <div className={styles.flowGrid}>
          {launchFlow.map(([title, text, detail]) => (
            <article className={styles.flowNode} key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guardSection}>
        <div className={styles.guardTitle}>
          <p>PATCH 12 DESIGN GUARD</p>
          <h2>Mission Control erweitert nur, was isoliert sicher ist.</h2>
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
