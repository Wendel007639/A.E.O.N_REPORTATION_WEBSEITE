import fs from "node:fs";

const files = [
  "package.json",
  "tsconfig.json",
  "src/data/latest-proof.json",
  "src/data/runs.json",
  "src/data/metrics.json",
  "src/data/roadmap.json",
  "src/data/downloads.json",
  "src/data/evidence-index.json"
];

let failed = false;

for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
    console.log(`OK JSON ${file}`);
  } catch (error) {
    failed = true;
    console.error(`FEHLER JSON ${file}: ${error.message}`);
  }
}

if (failed) {
  process.exit(1);
}
