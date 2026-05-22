import data from "@/data/activity-feed.json";
import styles from "./taetigkeit.module.css";

export const metadata = {
  title: "Tätigkeit | A.E.O.N Reportation",
  description: "Kuratierte öffentliche Tätigkeitsreportation für Investoren und Prüfer."
};

export default function TaetigkeitPage() {
  const blocks = data.body.split("\n\n");

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.orbit} />
        <div className={styles.kicker}>A.E.O.N Activity Layer</div>
        <h1>{data.title}</h1>
        <p>{data.protection}</p>

        <div className={styles.heroGrid}>
          <div>
            <span>Status</span>
            <strong>{data.status}</strong>
          </div>
          <div>
            <span>Modus</span>
            <strong>Text Only</strong>
          </div>
          <div>
            <span>Schutz</span>
            <strong>Keine Rohdaten</strong>
          </div>
        </div>
      </section>

      <section className={styles.signalGrid}>
        <article className={styles.card}>
          <span>01</span>
          <h2>Tätigkeit</h2>
          <p>Öffentliche Kurzfassung dessen, was nach außen sichtbar sein darf.</p>
        </article>

        <article className={styles.card}>
          <span>02</span>
          <h2>Einordnung</h2>
          <p>Keine Hype Sprache. Keine falschen Proof Aussagen. Nur belastbare Beschreibung.</p>
        </article>

        <article className={styles.card}>
          <span>03</span>
          <h2>Investorensicht</h2>
          <p>Verdichtete Darstellung für Kontaktaufnahme, Prüfung und strategische Bewertung.</p>
        </article>
      </section>

      <section className={styles.report}>
        <div className={styles.reportTop}>
          <span>Öffentliche Tätigkeit</span>
          <strong>Freigegebene Reportation</strong>
        </div>

        <div className={styles.text}>
          {blocks.map((block, index) => (
            <p key={index}>{block}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
