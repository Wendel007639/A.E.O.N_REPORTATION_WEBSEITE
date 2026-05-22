const statusItems = [
  {
    label: "Proof-Status",
    value: "Platzhalter",
    note: "Noch nicht als echter gruener Lauf behaupten."
  },
  {
    label: "Learning",
    value: "sichtbar geplant",
    note: "Wird spaeter aus ProofKit-Artefakten gelesen."
  },
  {
    label: "Speed",
    value: "sichtbar geplant",
    note: "Wird spaeter aus ProofKit-Metriken gelesen."
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="aeon-shell">
        <div className="aeon-pill">A.E.O.N Reportation Webseite</div>

        <h1 className="aeon-title">Pruefbare Reportation statt Hype.</h1>

        <p className="aeon-lead">
          A.E.O.N ist ein lokal laufendes, pruefbares ProofKit-System mit
          reproduzierbaren Artefakten, sichtbarem Lernen, Speed-Metriken und
          gruenen Gates.
        </p>

        <div className="aeon-grid">
          {statusItems.map((item) => (
            <article className="aeon-card" key={item.label}>
              <div className="aeon-kicker">{item.label}</div>
              <h2>{item.value}</h2>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
