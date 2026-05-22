import type { Metadata } from "next";
import styles from "./architecture.module.css";

export const metadata: Metadata = {
  title: "Architektur | A.E.O.N Reportation",
  description:
    "A.E.O.N Architektur-Seite mit Nexus-HUD, Design-Guard, Evidence-Spine und Gate-Logik.",
};

const pillars = [
  {
    key: "01",
    title: "Surface Shell",
    kicker: "Interface / Mobile / Downloads",
    text:
      "Die sichtbaren Flaechen bleiben an die bestehende A.E.O.N Design-DNA gebunden. Keine globale Überschreibung, kein Bruch im Nexus-Stil.",
    status: "DESIGN-GUARD",
  },
  {
    key: "02",
    title: "Nexus Routing",
    kicker: "Pages / Sections / Flow",
    text:
      "Die Architektur-Seite arbeitet als isolierte Route. Header, Footer, Layout und Startseite bleiben unberuehrt.",
    status: "ISOLIERT",
  },
  {
    key: "03",
    title: "Evidence Spine",
    kicker: "Artefakte / Bindings / Proof",
    text:
      "Evidence wird sichtbar eingeordnet, aber nicht kuenstlich gruen verkauft. Platzhalter bleiben Platzhalter, bis echte Artefakte liefern.",
    status: "NO FAKE GREEN",
  },
  {
    key: "04",
    title: "Gate Kernel",
    kicker: "Build / Lint / JSON / Surface",
    text:
      "Technische Gates prüfen Stabilitaet. Fachlicher Proof entsteht erst, wenn Lauf, Artefakte, Learning und Speed konsistent sind.",
    status: "CONTROLLED",
  },
  {
    key: "05",
    title: "Delivery Mesh",
    kicker: "Patch / Review / Deployment",
    text:
      "Jeder Patch erweitert das System kontrolliert. Architektur, Proof und Design werden verbunden, aber nicht vermischt.",
    status: "PATCH SAFE",
  },
];

const proof = [
  {
    title: "Build / Lint",
    value: "CHECK",
    text: "Der technische Lauf muss nach diesem Patch erneut gruen sein.",
  },
  {
    title: "Evidence Binding",
    value: "BOUND",
    text: "Die Evidence Struktur ist angebunden, bleibt aber inhaltlich streng bewertet.",
  },
  {
    title: "Official Green",
    value: "FALSE",
    text: "Korrekt, solange Artefakte noch Platzhalter sind.",
  },
  {
    title: "Design Guard",
    value: "ACTIVE",
    text: "Keine Aenderung an Header, Footer, Layout, Startseite oder globals.css.",
  },
];

const railsLeft = [
  ["INTELLIGENZ", "Kontext", "Analyse", "Fuehrung"],
  ["WISSEN", "Daten", "Verstehen", "Fortschritt"],
  ["SCHUTZ", "Sicher", "Ethisch", "Verlaesslich"],
];

const railsRight = [
  ["VERTRAUEN", "Transparent", "Menschlich", "Verbunden"],
  ["VERBUNDENHEIT", "Grenzenlos", "Vernetzt", "Zukunft"],
  ["KERNWERTE", "Proof", "Guard", "Nexus"],
];

const guardRails = [
  "Keine globale CSS-Operation.",
  "Keine Aenderung an Header, Footer, Layout oder Startseite.",
  "Keine grüne Proof-Behauptung ohne echte Artefakte.",
  "Keine Template-Optik, kein Standard-Kartenbau, kein Anfaenger-Niveau.",
];

function SignalRail({
  side,
  items,
}: {
  side: "left" | "right";
  items: string[][];
}) {
  return (
    <div
      className={`${styles.signalRail} ${
        side === "left" ? styles.leftRail : styles.rightRail
      }`}
      aria-hidden="true"
    >
      {items.map(([title, lineOne, lineTwo, lineThree]) => (
        <div className={styles.signalCard} key={title}>
          <strong>{title}</strong>
          <span>{lineOne}</span>
          <span>{lineTwo}</span>
          <span>{lineThree}</span>
          <div className={styles.signalBar}>
            <i />
          </div>
          <small>100%</small>
        </div>
      ))}
    </div>
  );
}

export default function ArchitekturPage() {
  return (
    <main className={styles.architecturePage}>
      <div className={styles.gridLayer} aria-hidden="true" />
      <div className={styles.scanLayer} aria-hidden="true" />
      <div className={styles.lightningLayer} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>PATCH 9 / ARCHITECTURE NEXUS</p>

          <h1>Architektur, die wie ein lebendes System wirkt.</h1>

          <p className={styles.lead}>
            A.E.O.N Reportation wird als kontrollierter Nexus sichtbar:
            Surface, Evidence, Gates und Delivery greifen ineinander, ohne das
            bestehende Design zu beschaedigen.
          </p>

          <div className={styles.commandStrip}>
            <span>DESIGN-GUARD</span>
            <strong>ACTIVE</strong>
            <p>
              Isolierte Route. Kein globals.css. Kein Header-Eingriff. Kein
              falsches Grün.
            </p>
          </div>

          <div className={styles.heroActions}>
            <a href="#system-map">System-Map</a>
            <a href="#proof-spine">Proof-Spine</a>
          </div>
        </div>

        <div className={styles.nexusStage} aria-label="A.E.O.N Nexus Architektur Visual">
          <SignalRail side="left" items={railsLeft} />

          <div className={styles.coreWrap}>
            <div className={styles.energyField} aria-hidden="true" />
            <div className={styles.outerRing} aria-hidden="true" />
            <div className={styles.midRing} aria-hidden="true" />
            <div className={styles.innerRing} aria-hidden="true" />
            <div className={styles.floor} aria-hidden="true" />

            <div className={styles.hexTop}>AI</div>
            <div className={styles.hexLeft}>DATA</div>
            <div className={styles.hexRight}>GUARD</div>
            <div className={styles.hexBottom}>{"\u221e"}</div>

            <div className={styles.core}>
              <div className={styles.brain}>
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className={styles.coreTitle}>
                <span>A.E.O.N</span>
                <strong>ARCHITECTURE</strong>
              </div>

              <div className={styles.coreDock}>
                <i>INTELLIGENZ</i>
                <i>WISSEN</i>
                <i>SCHUTZ</i>
                <i>VERTRAUEN</i>
                <i>VERBUNDENHEIT</i>
              </div>
            </div>
          </div>

          <SignalRail side="right" items={railsRight} />
        </div>
      </section>

      <section className={styles.systemMap} id="system-map">
        <div className={styles.sectionHead}>
          <p>SYSTEM-MAP</p>
          <h2>Fuenf Schichten. Ein kontrollierter Nexus.</h2>
        </div>

        <div className={styles.pillarGrid}>
          {pillars.map((pillar) => (
            <article className={styles.pillarCard} key={pillar.key}>
              <div className={styles.pillarIndex}>{pillar.key}</div>
              <span>{pillar.kicker}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <strong>{pillar.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.proofSpine} id="proof-spine">
        <div className={styles.sectionHead}>
          <p>PROOF-SPINE</p>
          <h2>Erst Beweis, dann Vision.</h2>
        </div>

        <div className={styles.proofGrid}>
          {proof.map((item) => (
            <article className={styles.proofCard} key={item.title}>
              <span>{item.title}</span>
              <strong>{item.value}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guardSection}>
        <div className={styles.guardCore}>
          <p>ARCHITECTURE GUARD</p>
          <h2>Was dieser Patch garantiert nicht macht.</h2>
        </div>

        <div className={styles.guardList}>
          {guardRails.map((item) => (
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
