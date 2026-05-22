import fs from "fs";
import path from "path";

const roots = ["content", "src/app", "src/components", "src/data", "docs", "public"];
const exts = [".md", ".tsx", ".ts", ".json", ".txt"];

const replacements = [
  ["Pruefbare", "Prüfbare"],
  ["pruefbares", "prüfbares"],
  ["pruefbare", "prüfbare"],
  ["Pruefung", "Prüfung"],
  ["Pruefer", "Prüfer"],
  ["Pruef", "Prüf"],
  ["fuer", "für"],
  ["gruener", "grüner"],
  ["gruenen", "grünen"],
  ["gruene", "grüne"],
  ["Gruen", "Grün"],
  ["oeffnen", "öffnen"],
  ["pruefen", "prüfen"],
  ["geprueft", "geprüft"],
  ["spaeter", "später"],
  ["Laeufe", "Läufe"],
  ["Lautstaerke", "Lautstärke"],
  ["koennen", "können"],
  ["ueber", "über"],
  ["Erklaerung", "Erklärung"],

  ["Proof-ANBINDUNG", "Proof Anbindung"],
  ["Run-ID", "Run ID"],
  ["Gate-Status", "Gate Status"],
  ["Learning-Metriken", "Learning Metriken"],
  ["Speed-Metriken", "Speed Metriken"],
  ["Investor-Kommunikation", "Investorenkommunikation"],
  ["Proof-Aussagen", "Proof Aussagen"],
  ["AGI-, Bewusstseins- oder Hype-Behauptungen", "AGI Behauptungen, Bewusstseinsbehauptungen oder Hype Behauptungen"]
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return exts.includes(path.extname(e.name)) ? [full] : [];
  });
}

let changed = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    let text = fs.readFileSync(file, "utf8");
    const before = text;

    for (const [from, to] of replacements) {
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
