import fs from "node:fs";

const required = [
  "README.md",
  "package.json",
  ".gitignore",
  "public",
  "public/images",
  "public/downloads",
  "src",
  "src/app",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/proof/page.tsx",
  "src/app/architektur/page.tsx",
  "src/app/methodik/page.tsx",
  "src/app/roadmap/page.tsx",
  "src/app/investoren/page.tsx",
  "src/app/downloads/page.tsx",
  "src/app/impressum/page.tsx",
  "src/app/datenschutz/page.tsx",
  "src/components",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/data/latest-proof.json",
  "src/data/runs.json",
  "src/data/metrics.json",
  "src/data/roadmap.json",
  "src/data/downloads.json",
  "src/styles/globals.css",
  "content",
  "docs",
  "evidence",
  "evidence/latest",
  "evidence/runs",
  "evidence/failed-runs",
  "evidence/screenshots"
];

const missing = required.filter((entry) => !fs.existsSync(entry));

if (missing.length > 0) {
  console.error("FEHLENDE STRUKTUR:");
  for (const entry of missing) {
    console.error(`- ${entry}`);
  }
  process.exit(1);
}

console.log("OK Struktur vollständig");
