import fs from "node:fs";

const errors = [];
const warnings = [];

const latest = JSON.parse(fs.readFileSync("src/data/latest-proof.json", "utf8"));
const index = JSON.parse(fs.readFileSync("src/data/evidence-index.json", "utf8"));

if (!Array.isArray(latest.artifacts)) errors.push("latest-proof.json: artifacts muss Array sein");
if (!Array.isArray(index.artifacts)) errors.push("evidence-index.json: artifacts muss Array sein");

for (const artifact of latest.artifacts ?? []) {
  for (const key of ["key", "file", "path", "exists", "physical_exists", "bytes", "sha256", "href", "content_status", "required_for_green", "description"]) {
    if (!(key in artifact)) errors.push(`Artefakt ${artifact.file ?? "unbekannt"}: Feld fehlt: ${key}`);
  }

  if (!["missing", "placeholder", "connected", "invalid"].includes(artifact.content_status)) {
    errors.push(`Artefakt ${artifact.file}: content_status ungueltig`);
  }

  if (artifact.exists === true && artifact.content_status !== "connected") {
    errors.push(`Artefakt ${artifact.file}: exists=true verlangt connected`);
  }

  if (artifact.physical_exists === true && (typeof artifact.bytes !== "number" || artifact.bytes <= 0)) {
    errors.push(`Artefakt ${artifact.file}: physical_exists verlangt bytes > 0`);
  }

  if (artifact.physical_exists === true && !artifact.sha256) {
    errors.push(`Artefakt ${artifact.file}: physical_exists verlangt sha256`);
  }
}

if (latest.is_real_proof !== true) {
  warnings.push("Kein echter gruener Proof erkannt. Korrekt, solange Artefakte Platzhalter sind.");
}

if (errors.length) {
  console.error("FEHLER Evidence Binding:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

for (const warning of warnings) console.warn(`WARNUNG: ${warning}`);
console.log("OK Evidence Binding gueltig");
