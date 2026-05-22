import fs from "node:fs";

const file = "src/data/latest-proof.json";
const proof = JSON.parse(fs.readFileSync(file, "utf8"));

const errors = [];
const warnings = [];

const requiredRootKeys = [
  "schema_version",
  "status",
  "proof_level",
  "is_real_proof",
  "warning",
  "run_id",
  "run_dir",
  "created_at",
  "updated_at",
  "intelligence_status",
  "smoke_status",
  "final_exit_status",
  "process_exit_status",
  "failed_gates",
  "passed_false_reason",
  "run_count",
  "max_run_count",
  "task_count",
  "dimension_result_count",
  "learning_visible",
  "speed_visible",
  "speed_total_seconds",
  "learning_evidence_count",
  "tasks",
  "dimensions",
  "learning_metrics",
  "speed_metrics",
  "report_bundle",
  "artifacts",
  "audit"
];

for (const key of requiredRootKeys) {
  if (!(key in proof)) {
    errors.push(`Pflichtfeld fehlt: ${key}`);
  }
}

if (typeof proof.schema_version !== "string") {
  errors.push("schema_version muss string sein");
}

if (!["placeholder", "candidate", "verified"].includes(proof.proof_level)) {
  errors.push("proof_level muss placeholder, candidate oder verified sein");
}

if (typeof proof.is_real_proof !== "boolean") {
  errors.push("is_real_proof muss boolean sein");
}

if (proof.failed_gates !== null && !Array.isArray(proof.failed_gates)) {
  errors.push("failed_gates muss null oder Array sein");
}

if (!Array.isArray(proof.tasks)) {
  errors.push("tasks muss Array sein");
}

if (!Array.isArray(proof.dimensions)) {
  errors.push("dimensions muss Array sein");
}

if (!Array.isArray(proof.artifacts)) {
  errors.push("artifacts muss Array sein");
}

const expectedArtifacts = [
  "intelligence_summary.json",
  "intelligence_manifest.json",
  "proof_smoke_summary.json",
  "proof_smoke_raw.json",
  "proof_gate_status.env",
  "evidence_brief.md"
];

const artifactFiles = Array.isArray(proof.artifacts)
  ? proof.artifacts.map((artifact) => artifact.file)
  : [];

for (const expected of expectedArtifacts) {
  if (!artifactFiles.includes(expected)) {
    errors.push(`Pflicht-Artefakt fehlt im Datenmodell: ${expected}`);
  }
}

if (Array.isArray(proof.artifacts)) {
  for (const artifact of proof.artifacts) {
    for (const key of [
      "key",
      "file",
      "path",
      "exists",
      "bytes",
      "sha256",
      "required_for_green",
      "description"
    ]) {
      if (!(key in artifact)) {
        errors.push(`Artefakt ${artifact.file ?? "unbekannt"}: Feld fehlt: ${key}`);
      }
    }

    if (typeof artifact.exists !== "boolean") {
      errors.push(`Artefakt ${artifact.file}: exists muss boolean sein`);
    }

    if (typeof artifact.required_for_green !== "boolean") {
      errors.push(`Artefakt ${artifact.file}: required_for_green muss boolean sein`);
    }
  }
}

const forbiddenClaims = [
  "agi",
  "bewusst",
  "weltweit einzigartig",
  "fertiges produkt"
];

const proofText = JSON.stringify(proof).toLowerCase();

for (const claim of forbiddenClaims) {
  if (proofText.includes(claim)) {
    errors.push(`Unbelegte/unerwuenschte Behauptung im Proof-Datenmodell gefunden: ${claim}`);
  }
}

if (proof.is_real_proof === true) {
  if (!proof.run_id || typeof proof.run_id !== "string") {
    errors.push("Gruener Proof verlangt eine echte run_id");
  }

  if (!proof.run_dir || typeof proof.run_dir !== "string") {
    errors.push("Gruener Proof verlangt ein echtes run_dir");
  }

  if (proof.intelligence_status !== 0) {
    errors.push("Gruener Proof verlangt INTELLIGENCE_STATUS = 0");
  }

  if (proof.smoke_status !== 0) {
    errors.push("Gruener Proof verlangt SMOKE_STATUS = 0");
  }

  if (proof.final_exit_status !== 0) {
    errors.push("Gruener Proof verlangt FINAL_EXIT_STATUS = 0");
  }

  if (!Array.isArray(proof.failed_gates) || proof.failed_gates.length !== 0) {
    errors.push("Gruener Proof verlangt FAILED_GATES = []");
  }

  if (proof.learning_visible !== true) {
    errors.push("Gruener Proof verlangt learning_visible = true");
  }

  if (proof.speed_visible !== true) {
    errors.push("Gruener Proof verlangt speed_visible = true");
  }

  const requiredArtifacts = proof.artifacts.filter(
    (artifact) => artifact.required_for_green === true
  );

  for (const artifact of requiredArtifacts) {
    if (artifact.exists !== true) {
      errors.push(`Gruener Proof verlangt vorhandenes Artefakt: ${artifact.file}`);
    }

    if (typeof artifact.bytes !== "number" || artifact.bytes <= 0) {
      errors.push(`Gruener Proof verlangt bytes > 0 fuer: ${artifact.file}`);
    }
  }
} else {
  warnings.push("is_real_proof=false: Datenmodell ist vorbereitet, aber noch kein echter gruener Proof.");
}

if (errors.length > 0) {
  console.error("FEHLER im Proof-Datenmodell:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`WARNUNG: ${warning}`);
}

console.log("OK Proof-Datenmodell gueltig");
