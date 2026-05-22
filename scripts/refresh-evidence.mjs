import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const now = new Date().toISOString();

const latestProofFile = "src/data/latest-proof.json";
const downloadsFile = "src/data/downloads.json";
const evidenceIndexFile = "src/data/evidence-index.json";

const expected = [
  ["intelligence_summary", "intelligence_summary.json", "evidence/latest/intelligence_summary.json", "/downloads/proof-artifacts/latest/intelligence_summary.json", "public/downloads/proof-artifacts/latest/intelligence_summary.json", "Zusammenfassung des Intelligenz-Tests."],
  ["intelligence_manifest", "intelligence_manifest.json", "evidence/latest/intelligence_manifest.json", "/downloads/proof-artifacts/latest/intelligence_manifest.json", "public/downloads/proof-artifacts/latest/intelligence_manifest.json", "Manifest fuer reproduzierbare ProofKit-Auswertung."],
  ["proof_smoke_summary", "proof_smoke_summary.json", "evidence/latest/proof_smoke_summary.json", "/downloads/proof-artifacts/latest/proof_smoke_summary.json", "public/downloads/proof-artifacts/latest/proof_smoke_summary.json", "Smoke-Summary fuer ProofKit."],
  ["proof_smoke_raw", "proof_smoke_raw.json", "evidence/latest/proof_smoke_raw.json", "/downloads/proof-artifacts/latest/proof_smoke_raw.json", "public/downloads/proof-artifacts/latest/proof_smoke_raw.json", "Rohdaten der Smoke-Pruefung."],
  ["proof_gate_status", "proof_gate_status.env", "evidence/latest/proof_gate_status.env", "/downloads/proof-artifacts/latest/proof_gate_status.env", "public/downloads/proof-artifacts/latest/proof_gate_status.env", "Gate-Status mit FAILED_GATES."],
  ["evidence_brief", "evidence_brief.md", "evidence/latest/evidence_brief.md", "/downloads/evidence-briefs/latest-evidence-brief.md", "public/downloads/evidence-briefs/latest-evidence-brief.md", "Menschlich lesbarer Evidence-Brief."]
];

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function hash(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function isPlaceholder(file, text) {
  const lower = text.toLowerCase().trim();
  if (!lower) return true;

  if (file.endsWith(".json")) {
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && Object.keys(parsed).length === 0) return true;
      const s = JSON.stringify(parsed).toLowerCase();
      return s.includes("placeholder") || s.includes("noch keine echten");
    } catch {
      return true;
    }
  }

  return lower.includes("placeholder") || lower.includes("noch keine echten") || lower.includes("failed_gates_placeholder");
}

function parseEnv(text) {
  const out = {};
  for (const lineRaw of text.split(/\r?\n/)) {
    const line = lineRaw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return out;
}

function parseNum(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : value;
}

function first(...values) {
  for (const value of values) {
    const parsed = parseNum(value);
    if (parsed !== null && parsed !== undefined) return parsed;
  }
  return null;
}

function parseFailedGates(value) {
  if (value === undefined || value === null || value === "") return null;
  if (Array.isArray(value)) return value;
  const text = String(value).trim();
  if (text === "[]" || text === '""' || text === "''") return [];
  if (text.toLowerCase().includes("placeholder")) return null;
  if (text.startsWith("[") && text.endsWith("]")) {
    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return text.split(",").map((x) => x.trim()).filter(Boolean);
}

const latest = readJson(latestProofFile, {});
const downloads = readJson(downloadsFile, { schema_version: "1.0.0", status: "prepared", warning: "", groups: [] });

const artifacts = expected.map(([key, file, sourcePath, href, publicPath, description]) => {
  const physical = fs.existsSync(sourcePath);
  let bytes = null;
  let sha256 = null;
  let content_status = "missing";

  if (physical) {
    const buffer = fs.readFileSync(sourcePath);
    const text = buffer.toString("utf8");
    bytes = buffer.length;
    sha256 = hash(buffer);
    content_status = isPlaceholder(file, text) ? "placeholder" : "connected";

    fs.mkdirSync(path.dirname(publicPath), { recursive: true });
    fs.copyFileSync(sourcePath, publicPath);
  }

  return {
    key,
    file,
    path: sourcePath,
    href: physical ? href : null,
    physical_exists: physical,
    exists: physical && content_status === "connected",
    bytes,
    sha256,
    content_status,
    last_seen_at: physical ? now : null,
    required_for_green: true,
    description
  };
});

let summary = null;
let smoke = null;
let gates = null;

try {
  if (fs.existsSync("evidence/latest/intelligence_summary.json")) {
    summary = JSON.parse(fs.readFileSync("evidence/latest/intelligence_summary.json", "utf8"));
  }
} catch {}

try {
  if (fs.existsSync("evidence/latest/proof_smoke_summary.json")) {
    smoke = JSON.parse(fs.readFileSync("evidence/latest/proof_smoke_summary.json", "utf8"));
  }
} catch {}

if (fs.existsSync("evidence/latest/proof_gate_status.env")) {
  gates = parseEnv(fs.readFileSync("evidence/latest/proof_gate_status.env", "utf8"));
}

const failedGates = parseFailedGates(gates?.FAILED_GATES ?? summary?.failed_gates ?? latest.failed_gates);

const intelligenceStatus = first(gates?.INTELLIGENCE_STATUS, summary?.intelligence_status, summary?.INTELLIGENCE_STATUS, latest.intelligence_status);
const smokeStatus = first(gates?.SMOKE_STATUS, smoke?.smoke_status, smoke?.SMOKE_STATUS, latest.smoke_status);
const finalExitStatus = first(gates?.FINAL_EXIT_STATUS, smoke?.final_exit_status, smoke?.FINAL_EXIT_STATUS, latest.final_exit_status);
const processExitStatus = first(gates?.PROCESS_EXIT_STATUS, smoke?.process_exit_status, latest.process_exit_status);

const learningVisible = gates?.LEARNING_VISIBLE === "true" || summary?.learning_visible === true || latest.learning_visible === true;
const speedVisible = gates?.SPEED_VISIBLE === "true" || summary?.speed_visible === true || latest.speed_visible === true;

const allRequiredConnected = artifacts.every((a) => a.exists === true);
const officialGreen =
  allRequiredConnected &&
  intelligenceStatus === 0 &&
  smokeStatus === 0 &&
  finalExitStatus === 0 &&
  Array.isArray(failedGates) &&
  failedGates.length === 0 &&
  learningVisible === true &&
  speedVisible === true;

const updated = {
  ...latest,
  schema_version: latest.schema_version ?? "1.0.0",
  status: officialGreen ? "evidence-connected" : "evidence-bound-not-verified",
  proof_level: officialGreen ? "verified" : "placeholder",
  is_real_proof: officialGreen,
  warning: officialGreen
    ? "Echte ProofKit-Artefakte angebunden und gruene Mindestbedingungen erkannt."
    : "Evidence-Struktur angebunden. Noch kein echter gruener Proof erkannt oder Artefakte sind Platzhalter.",
  updated_at: now,
  run_id: gates?.RUN_ID ?? summary?.run_id ?? smoke?.run_id ?? latest.run_id ?? null,
  run_dir: gates?.RUN_DIR ?? summary?.run_dir ?? smoke?.run_dir ?? latest.run_dir ?? null,
  intelligence_status: intelligenceStatus,
  smoke_status: smokeStatus,
  final_exit_status: finalExitStatus,
  process_exit_status: processExitStatus,
  failed_gates: failedGates,
  passed_false_reason: gates?.PASSED_FALSE_REASON ?? summary?.passed_false_reason ?? latest.passed_false_reason ?? null,
  run_count: first(gates?.RUN_COUNT, summary?.run_count, latest.run_count),
  max_run_count: first(gates?.MAX_RUN_COUNT, summary?.max_run_count, latest.max_run_count),
  task_count: first(gates?.TASK_COUNT, summary?.task_count, latest.task_count),
  dimension_result_count: first(gates?.DIMENSION_RESULT_COUNT, summary?.dimension_result_count, latest.dimension_result_count),
  learning_visible: learningVisible,
  speed_visible: speedVisible,
  speed_total_seconds: first(gates?.SPEED_TOTAL_SECONDS, summary?.speed_total_seconds, latest.speed_total_seconds),
  learning_evidence_count: first(gates?.LEARNING_EVIDENCE_COUNT, summary?.learning_evidence_count, latest.learning_evidence_count),
  artifacts,
  report_bundle: {
    available: officialGreen,
    path: officialGreen ? "public/downloads/proof-artifacts/latest" : null,
    files: artifacts.filter((a) => a.physical_exists).map((a) => a.href).filter(Boolean)
  },
  audit: {
    ...(latest.audit ?? {}),
    source: "evidence/latest",
    real_artifacts_connected: allRequiredConnected,
    created_by_patch: "patch-8-fixed",
    notes: [
      "Evidence-Struktur wurde angebunden.",
      "Placeholder-Dateien werden nicht als echter Proof gewertet.",
      "Gruen nur bei Artefakten, Gates, Learning und Speed."
    ]
  }
};

fs.writeFileSync(latestProofFile, JSON.stringify(updated, null, 2) + "\n");

const index = {
  schema_version: "1.0.0",
  generated_at: now,
  source_dir: "evidence/latest",
  public_dir: "public/downloads",
  artifacts,
  summary: {
    total: artifacts.length,
    physical_existing: artifacts.filter((a) => a.physical_exists).length,
    connected: artifacts.filter((a) => a.content_status === "connected").length,
    placeholder: artifacts.filter((a) => a.content_status === "placeholder").length,
    missing: artifacts.filter((a) => a.content_status === "missing").length,
    official_green: officialGreen
  }
};

fs.writeFileSync(evidenceIndexFile, JSON.stringify(index, null, 2) + "\n");

if (Array.isArray(downloads.groups)) {
  for (const group of downloads.groups) {
    if (!Array.isArray(group.items)) continue;
    for (const item of group.items) {
      if (item.requires_real_proof === true) {
        item.available = officialGreen;
        item.href = officialGreen ? item.href : null;
        item.note = officialGreen
          ? "Offizieller Proof-Download freigeschaltet."
          : "Noch nicht freigeschaltet, weil kein echter gruener Proof erkannt wurde.";
      }
    }
  }
  downloads.status = officialGreen ? "official-downloads-ready" : "evidence-bound-not-verified";
  downloads.warning = officialGreen
    ? "Offizielle Proof-Downloads sind freigeschaltet."
    : "Evidence-Struktur ist angebunden. Offizielle Downloads bleiben gesperrt.";
  fs.writeFileSync(downloadsFile, JSON.stringify(downloads, null, 2) + "\n");
}

console.log("OK Evidence Refresh abgeschlossen");
console.log(`Artifacts total: ${artifacts.length}`);
console.log(`Physical existing: ${artifacts.filter((a) => a.physical_exists).length}`);
console.log(`Connected: ${artifacts.filter((a) => a.content_status === "connected").length}`);
console.log(`Placeholder: ${artifacts.filter((a) => a.content_status === "placeholder").length}`);
console.log(`Missing: ${artifacts.filter((a) => a.content_status === "missing").length}`);
console.log(`Official green: ${officialGreen}`);
