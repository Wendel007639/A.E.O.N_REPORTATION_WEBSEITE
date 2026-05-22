import fs from "fs";
import path from "path";

const roots = ["content", "src", "docs", "public"];
const exts = [".md", ".tsx", ".ts", ".json", ".txt"];

const replacements = [
  ["Pruefbare", "Prüfbare"],
  ["pruefbare", "prüfbare"],
  ["Pruefung", "Prüfung"],
  ["Pruefer", "Prüfer"],
  ["Pruef", "Prüf"],
  ["fuer", "für"],
  ["Fuer", "Für"],
  ["gruene", "grüne"],
  ["gruener", "grüner"],
  ["gruenen", "grünen"],
  ["Gruen", "Grün"],
  ["oeffnen", "öffnen"],
  ["Oeffnen", "Öffnen"],
  ["spaeter", "später"],
  ["Spaeter", "Später"],
  ["Laeufe", "Läufe"],
  ["laeuft", "läuft"],
  ["faehig", "fähig"],
  ["Faehig", "Fähig"],
  ["koennen", "können"],
  ["Koennen", "Können"],
  ["muessen", "müssen"],
  ["Muessen", "Müssen"],
  ["ueber", "über"],
  ["Ueber", "Über"],
  ["sichtbar", "sichtbar"]
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git", ".aeon_patch_backups"].includes(entry.name)) return [];
      return walk(full);
    }
    return exts.includes(path.extname(entry.name)) ? [full] : [];
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

console.log(`Fertig. Geänderte Dateien: ${changed}`);
