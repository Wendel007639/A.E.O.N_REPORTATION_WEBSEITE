import data from "@/data/activity-feed.json";
import styles from "./taetigkeit.module.css";

export const metadata = {
  title: "Tätigkeit | A.E.O.N Reportation",
  description: "Öffentliche kuratierte Tätigkeitsreportation für Investoren und Prüfer."
};

export default function TaetigkeitPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.kicker}>A.E.O.N Reportation</div>
        <h1>{data.title}</h1>
        <p>{data.protection}</p>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <span className={styles.label}>Status</span>
          <h2>{data.status}</h2>
          <p>Diese Seite zeigt ausschließlich freigegebene Texte. Interne Rohdaten, private Notizen und technische Geheimnisse bleiben lokal.</p>
        </article>

        <article className={styles.panel}>
          <span className={styles.label}>Aktualisiert</span>
          <h2>{new Date(data.updatedAt).toLocaleDateString("de-DE")}</h2>
          <p>Änderungen werden lokal geprüft, gebaut und anschließend über GitHub Pages veröffentlicht.</p>
        </article>
      </section>

      <section className={styles.report}>
        <div className={styles.reportHeader}>
          <span>Öffentliche Tätigkeit</span>
          <strong>Investorentaugliche Kurzfassung</strong>
        </div>
        <div className={styles.text}>
          {data.body.split("\n\n").map((block, index) => (
            <p key={index}>{block}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
