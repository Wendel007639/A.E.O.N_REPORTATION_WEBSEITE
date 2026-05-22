import fs from "node:fs";
import path from "node:path";

const errors = [];
const warnings = [];

const requiredFiles = [
  "public/site.webmanifest",
  "public/robots.txt",
  "public/browserconfig.xml",
  "src/data/surface-support.json",
  "src/styles/globals.css",
  "src/app/page.tsx",
  "src/app/proof/page.tsx",
  "src/app/downloads/page.tsx",
  "src/app/architektur/page.tsx",
  "src/app/methodik/page.tsx",
  "src/app/roadmap/page.tsx",
  "src/app/investoren/page.tsx",
  "src/app/impressum/page.tsx",
  "src/app/datenschutz/page.tsx"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    errors.push(`Pflichtdatei fehlt: ${file}`);
  }
}

const css = fs.existsSync("src/styles/globals.css")
  ? fs.readFileSync("src/styles/globals.css", "utf8")
  : "";

const requiredCssSignals = [
  "overflow-x: hidden",
  "@media (max-width: 1180px)",
  "@media (max-width: 1120px)",
  "@media (max-width: 820px)",
  "@media (max-width: 720px)",
  "@media (prefers-reduced-motion: reduce)",
  "@media print",
  "@media (pointer: coarse)",
  "-webkit-overflow-scrolling: touch",
  "SURFACE RELIABILITY PATCH START"
];

for (const signal of requiredCssSignals) {
  if (!css.includes(signal)) {
    errors.push(`Surface-CSS-Signal fehlt: ${signal}`);
  }
}

const pageRoutes = new Set([
  "/",
  "/proof",
  "/architektur",
  "/methodik",
  "/roadmap",
  "/investoren",
  "/downloads",
  "/impressum",
  "/datenschutz"
]);

const scanDirs = ["src/app", "src/components"];

function walk(dir) {
  const result = [];

  if (!fs.existsSync(dir)) {
    return result;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...walk(full));
    } else if (/\.(tsx|ts)$/.test(entry.name)) {
      result.push(full);
    }
  }

  return result;
}

const codeFiles = scanDirs.flatMap(walk);

const browserOnlyPattern = /\b(window|document|localStorage|sessionStorage)\s*\./;

for (const file of codeFiles) {
  const source = fs.readFileSync(file, "utf8");

  if (browserOnlyPattern.test(source)) {
    errors.push(`Browser-only Global in Server-Code gefunden: ${file}`);
  }

  const jsxHrefPattern = /href="(\/[^"#?]*)/g;
  const objectHrefPattern = /href:\s*"(\/[^"#?]*)"/g;

  for (const pattern of [jsxHrefPattern, objectHrefPattern]) {
    for (const match of source.matchAll(pattern)) {
      const route = match[1];

      if (!pageRoutes.has(route)) {
        warnings.push(`Interner Link ohne bekannte Route in ${file}: ${route}`);
      }
    }
  }
}

try {
  const manifest = JSON.parse(fs.readFileSync("public/site.webmanifest", "utf8"));

  if (manifest.display !== "standalone") {
    errors.push("site.webmanifest: display muss standalone sein");
  }

  if (manifest.start_url !== "/") {
    errors.push("site.webmanifest: start_url muss / sein");
  }

  if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
    errors.push("site.webmanifest: mindestens ein Icon erforderlich");
  }
} catch (error) {
  errors.push(`site.webmanifest ungueltig: ${error.message}`);
}

try {
  const support = JSON.parse(fs.readFileSync("src/data/surface-support.json", "utf8"));

  if (!Array.isArray(support.surfaces) || support.surfaces.length < 6) {
    errors.push("surface-support.json: mindestens 6 Surface-Eintraege erforderlich");
  }
} catch (error) {
  errors.push(`surface-support.json ungueltig: ${error.message}`);
}

if (!fs.existsSync(".next")) {
  warnings.push(".next fehlt vor Build. Das ist okay, wenn next build danach laeuft.");
}

if (errors.length > 0) {
  console.error("FEHLER Surface Reliability:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`WARNUNG: ${warning}`);
}

console.log("OK Surface Reliability Checks gueltig");
