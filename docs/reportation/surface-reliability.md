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

- Manifest fuer App-/Standalone-Kontext
- Robots-Datei
- Browserconfig fuer Windows-Kacheln
- Touch-Hardening
- Fallback fuer fehlendes `backdrop-filter`
- Print-Fallback
- Reduced-Motion bleibt aktiv
- Interne Link-Pruefung
- Browser-only Global-Pruefung
- Build-, Lint-, JSON-, Proof-, Download- und Surface-Checks

## Design-Schutz

Der Sonder-Patch veraendert das bestehende Design nicht.

`globals.css` wurde nur um einen isolierten Surface-Fallback-Block erweitert.
