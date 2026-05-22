import fs from "node:fs";

const downloads = JSON.parse(fs.readFileSync("src/data/downloads.json", "utf8"));
const latestProof = JSON.parse(fs.readFileSync("src/data/latest-proof.json", "utf8"));

const errors = [];
const warnings = [];

const requiredGroups = [
  "official-full-proof",
  "passed-runs",
  "failed-runs",
  "investor-pack",
  "technical-artifacts"
];

if (!Array.isArray(downloads.groups)) {
  errors.push("downloads.groups muss ein Array sein");
}

const groupIds = Array.isArray(downloads.groups)
  ? downloads.groups.map((group) => group.id)
  : [];

for (const groupId of requiredGroups) {
  if (!groupIds.includes(groupId)) {
    errors.push(`Download-Gruppe fehlt: ${groupId}`);
  }
}

const forbiddenClaims = [
  "agi",
  "bewusst",
  "weltweit einzigartig",
  "fertiges produkt"
];

const text = JSON.stringify(downloads).toLowerCase();

for (const claim of forbiddenClaims) {
  if (text.includes(claim)) {
    errors.push(`Unbelegte/unerwuenschte Behauptung gefunden: ${claim}`);
  }
}

if (Array.isArray(downloads.groups)) {
  for (const group of downloads.groups) {
    if (!group.id || !group.title || !group.description) {
      errors.push(`Download-Gruppe unvollstaendig: ${group.id ?? "unbekannt"}`);
    }

    if (!Array.isArray(group.items)) {
      errors.push(`Download-Gruppe ${group.id}: items muss Array sein`);
      continue;
    }

    if (group.items.length === 0) {
      errors.push(`Download-Gruppe ${group.id}: mindestens ein Item erforderlich`);
    }

    for (const item of group.items) {
      for (const key of [
        "id",
        "title",
        "description",
        "format",
        "href",
        "source_path",
        "available",
        "requires_real_proof",
        "note"
      ]) {
        if (!(key in item)) {
          errors.push(`Download-Item ${item.id ?? "unbekannt"}: Feld fehlt: ${key}`);
        }
      }

      if (typeof item.available !== "boolean") {
        errors.push(`Download-Item ${item.id}: available muss boolean sein`);
      }

      if (typeof item.requires_real_proof !== "boolean") {
        errors.push(`Download-Item ${item.id}: requires_real_proof muss boolean sein`);
      }

      if (item.available === true && (!item.href || typeof item.href !== "string")) {
        errors.push(`Download-Item ${item.id}: available=true verlangt href`);
      }

      if (
        latestProof.is_real_proof !== true &&
        item.requires_real_proof === true &&
        item.available === true
      ) {
        errors.push(
          `Download-Item ${item.id}: darf ohne echten Proof nicht freigeschaltet sein`
        );
      }
    }
  }
}

if (latestProof.is_real_proof !== true) {
  warnings.push("Kein echter Proof angebunden: offizielle Proof-Downloads bleiben gesperrt.");
}

if (errors.length > 0) {
  console.error("FEHLER in Download-Daten:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`WARNUNG: ${warning}`);
}

console.log("OK Download-Daten gueltig");
