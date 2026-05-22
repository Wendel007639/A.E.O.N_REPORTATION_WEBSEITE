import fs from "fs";
import path from "path";

const roots = ["content", "src/app", "src/components", "src/data", "docs", "public"];
const exts = [".md", ".tsx", ".ts", ".json", ".txt"];

const fixed = [
  ["ProofKit-System", "ProofKit System"],
  ["PROOF-ANBINDUNG", "PROOF ANBINDUNG"],
  ["Proof-Anbindung", "Proof Anbindung"],
  ["Evidence-Struktur", "Evidence Struktur"],
  ["Run-ID", "Run ID"],
  ["Gate-Status", "Gate Status"],
  ["Proof-Status", "Proof Status"],
  ["Evidence-Briefs", "Evidence Briefs"],
  ["Manifest-Dateien", "Manifestdateien"],
  ["Investor-Unterlagen", "Investorenunterlagen"],
  ["Investor-Kommunikation", "Investorenkommunikation"],
  ["Learning-Metriken", "Lernmetriken"],
  ["Speed-Metriken", "Speedmetriken"],
  ["Demonstrator-Status", "Demonstratorstatus"],
  ["Hype-Verkauf", "Hypeverkauf"],
  ["Hype-Behauptungen", "Hypebehauptungen"],
  ["Proof-Aussagen", "Proof Aussagen"],
  ["AGI-, Bewusstseins- oder Hypebehauptungen", "AGI Behauptungen, Bewusstseinsbehauptungen oder Hypebehauptungen"],
  ["AGI-, Bewusstseins- oder Hype-Behauptungen", "AGI Behauptungen, Bewusstseinsbehauptungen oder Hypebehauptungen"],

  ["Pruefbare", "Prüfbare"],
  ["pruefbares", "prüfbares"],
  ["pruefbare", "prüfbare"],
  ["Pruefer", "Prüfer"],
  ["Pruefung", "Prüfung"],
  ["pruefen", "prüfen"],
  ["geprueft", "geprüft"],
  ["fuer", "für"],
  ["gruener", "grüner"],
  ["gruenen", "grünen"],
  ["gruene", "grüne"],
  ["Gruen", "Grün"],
  ["oeffnen", "öffnen"],
  ["spaeter", "später"],
  ["Laeufe", "Läufe"],
  ["Lautstaerke", "Lautstärke"],
  ["koennen", "können"],
  ["ueber", "über"],
  ["Erklaerung", "Erklärung"]
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git", "out"].includes(e.name)) return [];
      return walk(full);
    }
    return exts.includes(path.extname(e.name)) ? [full] : [];
  });
}

let changed = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    let text = fs.readFileSync(file, "utf8");
    const before = text;

    for (const [from, to] of fixed) {
      text = text.replaceAll(from, to);
    }

    if (text !== before) {
      fs.writeFileSync(file, text, "utf8");
      console.log("PATCHED", file);
      changed++;
    }
  }
}

console.log("Geänderte Dateien:", changed);
