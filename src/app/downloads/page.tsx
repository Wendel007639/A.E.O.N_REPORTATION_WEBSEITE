import Link from "next/link";
import DownloadCard from "@/components/DownloadCard";
import downloadsJson from "@/data/downloads.json";
import latestProofJson from "@/data/latest-proof.json";
import type { LatestProofData } from "@/types/proof";

type DownloadItem = {
  id: string;
  title: string;
  description: string;
  format: string;
  href: string | null;
  source_path: string;
  available: boolean;
  requires_real_proof: boolean;
  note: string;
};

type DownloadGroup = {
  id: string;
  title: string;
  description: string;
  items: DownloadItem[];
};

type DownloadsData = {
  schema_version: string;
  status: string;
  warning: string;
  groups: DownloadGroup[];
};

const downloadsData = downloadsJson as DownloadsData;
const latestProof = latestProofJson as LatestProofData;

const artifactCount = latestProof.artifacts.length;
const availableArtifactCount = latestProof.artifacts.filter(
  (artifact) => artifact.exists === true
).length;

const requiredArtifactCount = latestProof.artifacts.filter(
  (artifact) => artifact.required_for_green === true
).length;

const proofReady =
  latestProof.is_real_proof === true &&
  latestProof.proof_level === "verified" &&
  Array.isArray(latestProof.failed_gates) &&
  latestProof.failed_gates.length === 0;

const summaryStats = [
  {
    label: "Download-Gruppen",
    value: String(downloadsData.groups.length),
    detail: "Full-Proof, Runs, Fehlerhistorie, Investor-Pack und Technik."
  },
  {
    label: "Artefakte sichtbar",
    value: `${availableArtifactCount}/${artifactCount}`,
    detail: "Kommt aus latest-proof.json und wird nicht erfunden."
  },
  {
    label: "Pflicht-Artefakte",
    value: String(requiredArtifactCount),
    detail: "Diese Dateien sind für einen gruennen Proof erforderlich."
  },
  {
    label: "Freigabe",
    value: proofReady ? "bereit" : "gesperrt",
    detail: "Echte Downloads werden erst mit echtem Proof freigeschaltet."
  }
];

export default function DownloadsPage() {
  return (
    <main className="aeon-downloads-page">
      <section className="aeon-downloads-hero">
        <div className="aeon-downloads-copy">
          <div className="aeon-pill">Evidence Download Vault</div>

          <h1 className="aeon-title">Downloads für Beweise, nicht für Behauptungen.</h1>

          <p className="aeon-lead">
            Diese Seite sammelt Evidence Briefs, Proof-JSONs, Manifestdateien,
            Smoke Summary, Gate Status, Screenshots, technische Artefakte und
            Investorenunterlagen. Freigeschaltet wird nur, was wirklich belegt ist.
          </p>

          <div
            className={
              proofReady
                ? "aeon-downloads-master aeon-downloads-master-ready"
                : "aeon-downloads-master aeon-downloads-master-locked"
            }
          >
            <span>{proofReady ? "DOWNLOADS BEREIT" : "DOWNLOADS VORBEREITET"}</span>
            <strong>{proofReady ? "OFFIZIELLE ARTEFAKTE FREIGESCHALTET" : "ECHTE ARTEFAKTE NOCH NICHT ANGEBUNDEN"}</strong>
            <p>{downloadsData.warning}</p>
          </div>

          <div className="aeon-actions">
            <Link className="aeon-button aeon-button-primary" href="/proof">
              Proof prüfen
            </Link>
            <Link className="aeon-button aeon-button-secondary" href="/methodik">
              Methodik lesen
            </Link>
          </div>
        </div>

        <aside className="aeon-downloads-vault" aria-label="Download Vault Status">
          <div className="aeon-vault-frame">
            <div className="aeon-vault-core">
              <span>ARTEFAKTE</span>
              <strong>{availableArtifactCount}/{artifactCount}</strong>
              <small>{proofReady ? "freigegeben" : "gesperrt"}</small>
            </div>

            <div className="aeon-vault-ring aeon-vault-ring-one" />
            <div className="aeon-vault-ring aeon-vault-ring-two" />
            <div className="aeon-vault-ring aeon-vault-ring-three" />

            <div className="aeon-vault-panel aeon-vault-panel-left">
              <span>FULL-PROOF</span>
              <strong>{proofReady ? "READY" : "LOCKED"}</strong>
            </div>

            <div className="aeon-vault-panel aeon-vault-panel-right">
              <span>INVESTOR PACK</span>
              <strong>PREPARED</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="aeon-downloads-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Download Status</span>
          <h2>Jede Datei braucht Herkunft, Status und Zweck.</h2>
          <p>
            Der Download-Bereich ist vorbereitet, bleibt aber ehrlich gesperrt,
            bis echte ProofKit-Artefakte angebunden sind.
          </p>
        </div>

        <div className="aeon-downloads-stat-grid">
          {summaryStats.map((stat) => (
            <article className="aeon-downloads-stat-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aeon-downloads-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Download-Gruppen</span>
          <h2>Belege geordnet nach Prüfung, Historie und Kommunikation.</h2>
        </div>

        <div className="aeon-download-group-list">
          {downloadsData.groups.map((group) => (
            <section className="aeon-download-group" key={group.id}>
              <div className="aeon-download-group-heading">
                <span>{group.id}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>

              <div className="aeon-download-card-grid">
                {group.items.map((item) => (
                  <DownloadCard
                    available={item.available}
                    description={item.description}
                    format={item.format}
                    href={item.href}
                    key={item.id}
                    note={item.note}
                    sourcePath={item.source_path}
                    title={item.title}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="aeon-downloads-section">
        <div className="aeon-section-heading">
          <span className="aeon-kicker">Technische Artefakt-Liste</span>
          <h2>Die Webseite zeigt, welche Dateien erwartet werden.</h2>
        </div>

        <div className="aeon-download-artifact-grid">
          {latestProof.artifacts.map((artifact) => (
            <article className="aeon-download-artifact-card" key={artifact.key}>
              <div>
                <span>{artifact.required_for_green ? "pflicht" : "optional"}</span>
                <h3>{artifact.file}</h3>
                <p>{artifact.description}</p>
              </div>

              <div className="aeon-download-artifact-meta">
                <code>{artifact.path}</code>
                <strong>{artifact.exists ? "vorhanden" : "offen"}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
