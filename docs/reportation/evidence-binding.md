# Evidence Binding

Patch 8 bindet die lokale Evidence Struktur an die Webseite an.

Quelle:
evidence/latest

Erwartete Dateien:
- intelligence_summary.json
- intelligence_manifest.json
- proof_smoke_summary.json
- proof_smoke_raw.json
- proof_gate_status.env
- evidence_brief.md

Die Webseite prueft:
- Datei vorhanden
- Byte-Groesse
- SHA256
- Platzhalter oder echte Datei
- Download-Pfad
- Pflicht-Artefakt für Grün

Wichtig:
Placeholder-Dateien werden erkannt und nicht als echter Proof gewertet.

Befehle:
npm run evidence:refresh
npm run check:evidence-binding
npm run check
