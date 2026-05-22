# Surface Reliability

Ziel:

Die A.E.O.N Reportation-Webseite soll auf bekannten Oberflaechen stabil laufen:

- Desktop / Wide
- Tablet / Medium
- Mobile / Narrow
- Touch-Geraete
- Reduced Motion
- Print / PDF

## Technische Massnahmen

- Manifest für App-/Standalone-Kontext
- Robots-Datei
- Browserconfig für Windows-Kacheln
- Touch-Hardening
- Fallback für fehlendes `backdrop-filter`
- Print-Fallback
- Reduced-Motion bleibt aktiv
- Interne Link-Prüfung
- Browser-only Global-Prüfung
- Build-, Lint-, JSON-, Proof-, Download- und Surface-Checks

## Design-Schutz

Der Sonder-Patch veraendert das bestehende Design nicht.

`globals.css` wurde nur um einen isolierten Surface-Fallback-Block erweitert.
