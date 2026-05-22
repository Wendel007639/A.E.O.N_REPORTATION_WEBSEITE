import Link from "next/link";
import EvidenceTable, { type EvidenceRow } from "@/components/EvidenceTable";
import MetricCard from "@/components/MetricCard";
import ProofStatusCard from "@/components/ProofStatusCard";
import latestProofData from "@/data/latest-proof.json";

type ProofArtifactForPage = {
  key: string;
  file: string;
  path: string;
  exists: boolean;
  physical_exists?: boolean;
  bytes: number | null;
  sha256: string | null;
  href?: string | null;
  content_status?: "missing" | "placeholder" | "connected" | "invalid";
  required_for_green: boolean;
  description: string;
};

type LatestProof = {
  status?: string;
  is_real_proof?: boolean;
  warning?: string;
  run_id?: string | null;
  run_dir?: string | null;
  failed_gates?: string[] | null;
  passed_false_reason?: string | null;
  intelligence_status?: number | string | null;
  smoke_status?: number | string | null;
  final_exit_status?: number | string | null;
  process_exit_status?: number | string | null;
  run_count?: number | null;
  max_run_count?: number | null;
  task_count?: number | null;
  dimension_result_count?: number | null;
  learning_visible?: boolean;
  speed_visible?: boolean;
  speed_total_seconds?: number | null;
  learning_evidence_count?: number | null;
  artifacts?: ProofArtifactForPage[];
};

const latestProof = latestProofData as LatestProof;

const failedGateCount = Array.isArray(latestProof.failed_gates)
  ? latestProof.failed_gates.length
  : null;

const allCoreStatusesZero =
  latestProof.intelligence_status === 0 &&
  latestProof.smoke_status === 0 &&
  latestProof.final_exit_status === 0;

const officialGreen =
  latestProof.is_real_proof === true &&
  failedGateCount === 0 &&
  latestProof.learning_visible === true &&
  latestProof.speed_visible === true &&
  allCoreStatusesZero;

const display = {
  runId: latestProof.run_id ?? "Noch kein offizieller Run angebunden",
  runDir: latestProof.run_dir ?? "Noch kein Run-Verzeichnis angebunden",
  failedGates:
    failedGateCount === 0
      ? "[]"
      : failedGateCount === null
        ? "nicht belegt"
        : `${failedGateCount} offen`,
  passedFalseReason: latestProof.passed_false_reason ?? "nicht belegt",
  intelligenceStatus: String(latestProof.intelligence_status ?? "nicht belegt"),
  smokeStatus: String(latestProof.smoke_status ?? "nicht belegt"),
  finalExitStatus: String(latestProof.final_exit_status ?? "nicht belegt"),
  processExitStatus: String(latestProof.process_exit_status ?? "nicht belegt"),
  runCount: String(latestProof.run_count ?? "nicht belegt"),
  maxRunCount: String(latestProof.max_run_count ?? "nicht belegt"),
  taskCount: String(latestProof.task_count ?? "nicht belegt"),
  dimensionCount: String(latestProof.dimension_result_count ?? "nicht belegt"),
  speedSeconds:
    typeof latestProof.speed_total_seconds === "number"
      ? `${latestProof.speed_total_seconds}s`
      : "nicht belegt",
  learningEvidence:
    typeof latestProof.learning_evidence_count === "number"
      ? String(latestProof.learning_evidence_count)
      : "nicht belegt"
};

const statusCards = [
  {
    label: "INTELLIGENCE_STATUS",
    value: display.intelligenceStatus,
    tone: latestProof.intelligence_status === 0 ? "good" : "warn",
    detail: "Fachlicher Status des Intelligenz-Laufs."
  },
  {
    label: "SMOKE_STATUS",
    value: display.smokeStatus,
    tone: latestProof.smoke_status === 0 ? "good" : "warn",
    detail: "Smoke-Prüfung für ProofKit-Artefakte."
  },
  {
    label: "FINAL_EXIT_STATUS",
    value: display.finalExitStatus,
    tone: latestProof.final_exit_status === 0 ? "good" : "warn",
    detail: "Abschlussstatus des bewerteten Full-Proofs."
  },
  {
    label: "PROCESS_EXIT_STATUS",
    value: display.processExitStatus,
    tone: latestProof.process_exit_status === 0 ? "neutral" : "warn",
    detail: "Allein nicht ausreichend für Proof-Erfolg."
  }
] as const;

const metricCards = [
  {
    label: "run_count",
    value: display.runCount,
    detail: "Anzahl tatsaechlicher ProofKit-Durchlaeufe."
  },
  {
    label: "max_run_count",
    value: display.maxRunCount,
    detail: "Erwartete maximale Durchlaufzahl."
  },
  {
    label: "task_count",
    value: display.taskCount,
    detail: "Anzahl bewerteter Aufgaben."
  },
  {
    label: "dimension_result_count",
    value: display.dimensionCount,
    detail: "Anzahl ausgewerteter Dimensionen."
  },
  {
    label: "speed_total_seconds",
    value: display.speedSeconds,
    detail: "Gesamtdauer aus Speed Metriken."
  },
  {
    label: "learning_evidence_count",
    value: display.learningEvidence,
    detail: "Sichtbare Learning-Belege im Lauf."
  }
];

const evidenceRows: EvidenceRow[] = (latestProof.artifacts ?? []).map((artifact) => {
  const contentStatus = artifact.content_status ?? "missing";
  const connected = artifact.exists === true && contentStatus === "connected";

  return {
    artifact: artifact.file,
    exists: connected,
    bytes:
      typeof artifact.bytes === "number"
        ? String(artifact.bytes)
        : artifact.physical_exists
          ? "unbekannt"
          : "offen",
    path: artifact.path,
    statusLabel:
      contentStatus === "connected"
        ? "verbunden"
        : contentStatus === "placeholder"
          ? "platzhalter"
          : contentStatus === "invalid"
            ? "ungueltig"
            : "offen",
    statusTone: connected ? "good" : "warn",
    note:
      contentStatus === "placeholder"
        ? "Datei existiert, wurde aber als Platzhalter erkannt."
        : artifact.description
  };
});

export default function ProofPage() {
  return (
    <main className="aeon-proof-page">
      <section className="aeon-proof-hero">
        <div className="aeon-proof-hero-copy">
          <div className="aeon-pill">ProofKit Evidence Control</div>

          <h1 className="aeon-title">Proof ist kein Screenshot. Proof ist ein Lauf.</h1>

          <p className="aeon-lead">
            Diese Seite zeigt Run ID, Gates, Statuswerte, Learning, Speed und
            Artefakte. Ein grüner Prozessruecksprung allein zaehlt nicht als
            Proof-Erfolg.
          </p>

          <div
            className={
              officialGreen
                ? "aeon-proof-master aeon-proof-master-good"
                : "aeon-proof-master aeon-proof-master-warn"
            }
          >
            <span>{officialGreen ? "OFFIZIELL BESTANDEN" : "DATENANBINDUNG OFFEN"}</span>
            <strong>{officialGreen ? "FULL-PROOF GRUEN" : "NOCH NICHT ALS GRUEN BEHAUPTEN"}</strong>
            <p>
              {latestProof.warning ??
                "Echte Proof Aussagen werden erst mit angebundenen Artefakten aktiviert."}
            </p>
          </div>

          <div className="aeon-actions">
            <Link className="aeon-button aeon-button-primary" href="/downloads">
              Artefakte prüfen
            </Link>
            <Link className="aeon-button aeon-button-secondary" href="/methodik">
              Methodik lesen
            </Link>
          </div>
        </div>

        <aside className="aeon-proof-hud" aria-label="ProofKit Status HUD">
          <div className="aeon-proof-hud-frame">
            <div className="aeon-proof-hud-core">
              <span>FAILED_GATES</span>
              <strong>{display.failedGates}</strong>
            </div>

            <div className="aeon-proof-hud-ring aeon-proof-hud-ring-one" />
            <div className="aeon-proof-hud-ring aeon-proof-hud-ring-two" />
            <div className="aeon-proof-hud-ring aeon-proof-hud-ring-three" />

            <div className="aeon-proof-hud-panel aeon-proof-hud-panel-top">
              <span>RUN-ID</span>
              <strong>{display.runId}</strong>
            </div>

            <div className="aeon-proof-hud-panel aeon-proof-hud-panel-bottom">
              <span>LEARNING / SPEED</span>
              <strong>
                {latestProof.learning_visible ? "Learning sichtbar" : "Learning offen"} /{" "}
                {latestProof.speed_visible ? "Speed sichtbar" : "Speed offen"}
              </strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="aeon-proof-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Run-Identitaet</span>
          <h2>Jeder Proof braucht eine nachvollziehbare Herkunft.</h2>
        </div>

        <div className="aeon-proof-run-grid">
          <article className="aeon-proof-run-card">
            <span>Run ID</span>
            <strong>{display.runId}</strong>
          </article>

          <article className="aeon-proof-run-card aeon-proof-run-card-wide">
            <span>Run-Dir</span>
            <strong>{display.runDir}</strong>
          </article>

          <article className="aeon-proof-run-card">
            <span>PASSED_FALSE_REASON</span>
            <strong>{display.passedFalseReason}</strong>
          </article>
        </div>
      </section>

      <section className="aeon-proof-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Status-Gates</span>
          <h2>Bewertbar ist nur ein konsistenter grüner Lauf.</h2>
          <p>
            PROCESS_EXIT_STATUS ist sichtbar, aber nicht entscheidend allein.
            Entscheidend sind fachliche Gates, Artefakte und konsistente
            Statuswerte.
          </p>
        </div>

        <div className="aeon-proof-status-grid">
          {statusCards.map((card) => (
            <ProofStatusCard
              detail={card.detail}
              key={card.label}
              label={card.label}
              tone={card.tone}
              value={card.value}
            />
          ))}
        </div>
      </section>

      <section className="aeon-proof-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Metriken</span>
          <h2>Learning und Speed müssen sichtbar sein.</h2>
        </div>

        <div className="aeon-proof-metric-grid">
          {metricCards.map((card) => (
            <MetricCard
              detail={card.detail}
              key={card.label}
              label={card.label}
              value={card.value}
            />
          ))}
        </div>
      </section>

      <section className="aeon-proof-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Artefakte</span>
          <h2>Der Beweis liegt in Dateien, nicht in Behauptungen.</h2>
          <p>
            Diese Tabelle ist vorbereitet für echte ProofKit-Artefakte. Solange
            Patch 6 und Patch 8 noch nicht angebunden sind, bleibt der Status
            bewusst offen.
          </p>
        </div>

        <EvidenceTable rows={evidenceRows} />
      </section>
    </main>
  );
}
