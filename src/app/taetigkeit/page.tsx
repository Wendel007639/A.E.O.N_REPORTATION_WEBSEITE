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
        <div className={styles.scanline} />
        <div className={styles.glowOne} />
        <div className={styles.glowTwo} />

        <div className={styles.kicker}>A.E.O.N Activity Console</div>
        <h1>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>

        <div className={styles.statusBar}>
          <span>{data.status}</span>
          <strong>Text Only · Secure Publishing</strong>
        </div>
      </section>

      <section className={styles.signalGrid}>
        {data.signals.map((signal, index) => (
          <article className={styles.signalCard} key={signal}>
            <span>0{index + 1}</span>
            <h2>{signal}</h2>
            <p>
              Freigegebene Außenkommunikation ohne Rohdaten, ohne private Notizen
              und ohne unnötige technische Offenlegung.
            </p>
          </article>
        ))}
      </section>

      <section className={styles.report}>
        <div className={styles.reportHead}>
          <div>
            <span>Öffentliche Tätigkeit</span>
            <h2>Freigegebene Reportation</h2>
          </div>
          <p>{data.protection}</p>
        </div>

        <div className={styles.textGrid}>
          {blocks.map((block, index) => (
            <article className={styles.textBlock} key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{block}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
