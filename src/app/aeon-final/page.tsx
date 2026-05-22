import type { Metadata } from "next";
import styles from "./aeon-final.module.css";

export const metadata: Metadata = {
  title: "A.E.O.N Final Gate | A.E.O.N Reportation",
  description:
    "A.E.O.N Final Gate: Premium-HUD für Architektur, Nexus, Proof Lab, Mission Control und Design-Guard.",
};

const finalNodes = [
  {
    code: "09",
    title: "Architektur",
    route: "/architektur",
    signal: "SYSTEM / LAYERS / ROUTE",
    text:
      "Die Architektur-Seite zeigt den Nexus-Aufbau als kontrollierte Systemkarte mit isolierter Route und Design-Guard.",
    state: "BUILT",
  },
  {
    code: "10",
    title: "Nexus",
    route: "/nexus",
    signal: "VALUES / CORE / CONTROL",
    text:
      "Die Nexus-Seite verbindet Intelligenz, Wissen, Schutz, Vertrauen und Verbundenheit als Premium-HUD.",
    state: "BUILT",
  },
  {
    code: "11",
    title: "Proof Lab",
    route: "/proof-lab",
    signal: "EVIDENCE / GATES / LOCK",
    text:
      "Das Proof Lab macht sichtbar, dass Proof nicht behauptet wird. Official Green bleibt false, solange Artefakte Platzhalter sind.",
    state: "BUILT",
  },
  {
    code: "12",
    title: "Mission Control",
    route: "/mission-control",
    signal: "SURFACE / GUARD / DELIVERY",
    text:
      "Mission Control fuehrt Surface, Nexus, Proof, Guard und Delivery in einer steuerbaren Kontrollbruecke zusammen.",
    state: "BUILT",
  },
];

const finalChecks = [
  ["DESIGN", "globals.css unberuehrt", "Header, Footer, Layout und Startseite bleiben unangetastet."],
  ["PROOF", "kein Fake-Grün", "Official Green bleibt false, solange echte Artefakte fehlen."],
  ["BUILD", "Validierung Pflicht", "Lint und Build müssen nach diesem Patch wieder sauber laufen."],
  ["MOBILE", "responsive HUD", "Die finale Seite bleibt für kleinere Displays kontrolliert reduziert."],
  ["FINAL", "isolierte Route", "Patch 13 schreibt nur unter /aeon-final."],
];

const guardRules = [
  "Keine Aenderung an globals.css.",
  "Keine Aenderung an Header, Footer, Layout oder Startseite.",
  "Keine Aenderung an /architektur, /nexus, /proof-lab oder /mission-control.",
  "Keine grüne Proof-Behauptung ohne echte Artefakte.",
  "Finale Route bleibt isoliert unter /aeon-final.",
];

const leftPanels = [
  ["ARCH", "PATCH", "09", "SYSTEM", "OK"],
  ["NEXUS", "PATCH", "10", "CORE", "OK"],
  ["PROOF", "PATCH", "11", "FALSE", "LOCK"],
];

const rightPanels = [
  ["MISSION", "PATCH", "12", "CONTROL", "OK"],
  ["FINAL", "PATCH", "13", "GATE", "LIVE"],
  ["GUARD", "HASH", "FILES", "SAFE", "100"],
];

function FinalStack({
  side,
  items,
}: {
  side: "left" | "right";
  items: string[][];
}) {
  return (
    <div
      className={`${styles.finalStack} ${
        side === "left" ? styles.leftStack : styles.rightStack
      }`}
      aria-hidden="true"
    >
      {items.map(([title, one, two, three, value]) => (
        <div className={styles.finalPanel} key={title}>
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

export default function AeonFinalPage() {
  return (
    <main className={styles.finalPage}>
      <div className={styles.gridLayer} aria-hidden="true" />
      <div className={styles.starLayer} aria-hidden="true" />
      <div className={styles.scanLayer} aria-hidden="true" />
      <div className={styles.circuitLayer} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>PATCH 13 / A.E.O.N FINAL GATE</p>
          <h1>Final Gate verbindet alle Premium-Systemseiten.</h1>

          <p className={styles.lead}>
            Patch 13 ist der finale isolierte Launch-Hub: Architektur, Nexus,
            Proof Lab und Mission Control werden als geschlossenes A.E.O.N
            System sichtbar, ohne bestehende Flaechen zu beruehren.
          </p>

          <div className={styles.finalLock}>
            <span>FINAL DESIGN-GUARD</span>
            <strong>SEALED</strong>
            <p>
              Kein globals.css. Kein Header-Eingriff. Kein Layout-Eingriff.
              Kein Fake-Grün. Nur eine neue isolierte Finalseite.
            </p>
          </div>

          <div className={styles.actions}>
            <a href="#final-map">Final-Map</a>
            <a href="#final-checks">Checks</a>
          </div>
        </div>

        <div className={styles.finalVisual} aria-label="A.E.O.N Final Gate Visual">
          <FinalStack side="left" items={leftPanels} />

          <div className={styles.coreStage}>
            <div className={styles.energyField} aria-hidden="true" />
            <div className={styles.ringAlpha} aria-hidden="true" />
            <div className={styles.ringBeta} aria-hidden="true" />
            <div className={styles.ringGamma} aria-hidden="true" />
            <div className={styles.ringDelta} aria-hidden="true" />
            <div className={styles.floorGrid} aria-hidden="true" />

            <div className={styles.hexTop}>FINAL</div>
            <div className={styles.hexLeft}>ARCH</div>
            <div className={styles.hexRight}>NEXUS</div>
            <div className={styles.hexBottomLeft}>PROOF</div>
            <div className={styles.hexBottomRight}>MISSION</div>

            <div className={styles.core}>
              <div className={styles.crown} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className={styles.coreText}>
                <span>A.E.O.N</span>
                <strong>FINAL GATE</strong>
              </div>

              <div className={styles.coreDock}>
                <i>ARCHITEKTUR</i>
                <i>NEXUS</i>
                <i>PROOF LAB</i>
                <i>MISSION</i>
                <i>FINAL</i>
              </div>
            </div>
          </div>

          <FinalStack side="right" items={rightPanels} />
        </div>
      </section>

      <section className={styles.mapSection} id="final-map">
        <div className={styles.sectionHead}>
          <p>FINAL-MAP</p>
          <h2>Vier Systemseiten. Ein finales Gate.</h2>
        </div>

        <div className={styles.nodeGrid}>
          {finalNodes.map((node) => (
            <article className={styles.nodeCard} key={node.code}>
              <div className={styles.nodeCode}>{node.code}</div>
              <span>{node.signal}</span>
              <h3>{node.title}</h3>
              <p>{node.text}</p>
              <a href={node.route}>{node.route}</a>
              <strong>{node.state}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.checkSection} id="final-checks">
        <div className={styles.sectionHead}>
          <p>FINAL-CHECKS</p>
          <h2>Der Abschluss bleibt ehrlich, sichtbar und pruefbar.</h2>
        </div>

        <div className={styles.checkGrid}>
          {finalChecks.map(([title, text, detail]) => (
            <article className={styles.checkNode} key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guardSection}>
        <div className={styles.guardTitle}>
          <p>PATCH 13 DESIGN GUARD</p>
          <h2>Finale Erweiterung, null Schaden am Bestand.</h2>
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
