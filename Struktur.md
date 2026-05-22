C:\Dev
└── A.E.O.N-Reportation-Webseite
    ├── README.md
    ├── package.json
    ├── .gitignore
    ├── public
    │   ├── favicon.ico
    │   ├── images
    │   │   ├── aeon-field-state.png
    │   │   ├── emergenzfeld-formel.png
    │   │   └── docker-proofkit-system.png
    │   └── downloads
    │       ├── evidence-briefs
    │       ├── proof-artifacts
    │       └── investor-pack
    ├── src
    │   ├── app
    │   │   ├── page.tsx
    │   │   ├── proof
    │   │   │   └── page.tsx
    │   │   ├── architektur
    │   │   │   └── page.tsx
    │   │   ├── methodik
    │   │   │   └── page.tsx
    │   │   ├── roadmap
    │   │   │   └── page.tsx
    │   │   ├── investoren
    │   │   │   └── page.tsx
    │   │   ├── downloads
    │   │   │   └── page.tsx
    │   │   ├── impressum
    │   │   │   └── page.tsx
    │   │   └── datenschutz
    │   │       └── page.tsx
    │   ├── components
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ProofStatusCard.tsx
    │   │   ├── EvidenceTable.tsx
    │   │   └── DownloadCard.tsx
    │   ├── data
    │   │   ├── latest-proof.json
    │   │   ├── runs.json
    │   │   └── roadmap.json
    │   └── styles
    │       └── globals.css
    ├── content
    │   ├── startseite.md
    │   ├── proof.md
    │   ├── architektur.md
    │   ├── methodik.md
    │   ├── grenzen.md
    │   ├── roadmap.md
    │   └── investoren.md
    └── docs
        ├── business-plan
        ├── reportation
        ├── investor-email
        └── technical-onepager
		
		

110%-Bauanleitung für die A.E.O.N Reportation-Webseite
Hauptordner
C:\Dev\A.E.O.N-Reportation-Webseite

Dieser Ordner ist eine eigene Repo.
Nicht in benchmark, nicht in ProofKit, nicht in die laufende A.E.O.N-Core-Repo mischen.

1. Grundstruktur
A.E.O.N-Reportation-Webseite
├── README.md
├── package.json
├── public
├── src
├── content
├── docs
└── evidence
2. Zweck der Repo

Diese Webseite ist nicht der ProofKit-Code.

Sie ist die öffentliche/halböffentliche Reportations- und Beweis-Webseite für:

A.E.O.N
ProofKit
Intelligenz-Test
Evidence-Briefs
Learning
Speed
Artefakte
Investor-Kommunikation

Die Webseite soll zeigen:

Was wurde gebaut?
Was wurde geprüft?
Was ist bestanden?
Welche Artefakte gibt es?
Was ist noch Forschung?
Was ist investorenreif erklärbar?
3. Öffentliche Dateien
public
├── images
├── downloads
└── favicon.ico
public/images

Hier kommen Bilder rein:

aeon-field-state.png
emergenzfeld-formel.png
zweistein-gleichung.png
docker-system.png
proofkit-menue.png

Zweck:

visuelle Erklärung
A.E.O.N Identität
Feldzustand
Architektur
ProofKit-Bilder
public/downloads
downloads
├── evidence-briefs
├── proof-artifacts
├── investor-pack
└── screenshots

Dort kommen rein:

Evidence-Briefs
JSON-Artefakte
Screenshots
Investor-PDFs
Onepager
4. Webseiten-Bereich
src
└── app
    ├── page.tsx
    ├── proof
    ├── architektur
    ├── methodik
    ├── roadmap
    ├── investoren
    ├── downloads
    ├── impressum
    └── datenschutz
5. Startseite
src/app/page.tsx

Inhalt:

A.E.O.N Kurzvorstellung
Ein Satz zur Kernidee
Aktueller Proof-Status
Letzte Run-ID
Bestanden/Nicht bestanden
Learning sichtbar
Speed sichtbar
Button zu Proof
Button zu Downloads
Button zu Investoren

Wichtig:

Nicht übertreiben.
Nicht "Welt verändert" als Hauptaussage.
Erst Beweis, dann Vision.

Kernsatz:

A.E.O.N ist ein lokal laufendes, prüfbares ProofKit-System mit reproduzierbaren Artefakten, sichtbarem Lernen, Speed-Metriken und grünen Gates.
6. Proof-Seite
src/app/proof/page.tsx

Diese Seite ist die wichtigste Seite.

Inhalt:

Run-ID
Run-Dir
INTELLIGENCE_STATUS
SMOKE_STATUS
FINAL_EXIT_STATUS
PROCESS_EXIT_STATUS
FAILED_GATES
PASSED_FALSE_REASON
run_count
max_run_count
Tasks
Dimensions
Learning Metrics
Speed Metrics
Report Bundle
Artefakte

Ziel:

Ein Prüfer muss sehen:
Das ist kein Screenshot-Gelaber.
Das ist ein echter Lauf mit echten Artefakten.

Der aktuelle Beweisstand ist grün: FAILED_GATES=[], run_count=3, max_run_count=3, Learning- und Speed-Metriken sind vorhanden.

7. Architektur-Seite
src/app/architektur/page.tsx

Inhalt:

Was ist A.E.O.N?
Welche Module gibt es?
Warum Docker?
Warum ProofKit?
Warum Redis/Kafka/Services?
Was macht das Menü?
Was macht der Intelligenz-Test?

Struktur:

1. Systemübersicht
2. Docker-Umgebung
3. ProofKit
4. Menüsteuerung
5. Datenfluss
6. Artefakt-Erzeugung
7. Report-Bundle

Bilder:

Docker-Screenshot
AEON Field State
Emergenzfeld-Formel
ProofKit-Menü
8. Methodik-Seite
src/app/methodik/page.tsx

Inhalt:

Wie wird getestet?
Was ist ein Gate?
Was zählt als bestanden?
Warum reicht PROCESS_EXIT_STATUS nicht?
Warum zählen INTELLIGENCE_STATUS, SMOKE_STATUS und FINAL_EXIT_STATUS?
Warum sind FAILED_GATES entscheidend?
Warum müssen Learning und Speed sichtbar sein?

Diese Seite macht A.E.O.N glaubwürdig.

Wichtigster Satz:

Ein grüner Prozessrücksprung ist kein Proof-Erfolg. Bewertbar ist nur ein Lauf, bei dem fachliche Gates und Artefakte konsistent grün sind.
9. Downloads-Seite
src/app/downloads/page.tsx

Inhalt:

Evidence Briefs
Proof JSONs
Manifest-Dateien
Smoke Summary
Gate Status
Screenshots
Investor Pack

Download-Gruppen:

1. Letzter offizieller Full-Proof
2. Frühere bestandene Läufe
3. Fehlerläufe / Debug-Historie
4. Investor-Unterlagen
5. Technische Artefakte
10. Roadmap-Seite
src/app/roadmap/page.tsx

Inhalt:

Phase 1: ProofKit stabilisieren
Phase 2: Reportation-Webseite
Phase 3: Evidence Downloads
Phase 4: externe Reproduzierbarkeit
Phase 5: Investor-Kommunikation
Phase 6: wissenschaftliche Ausarbeitung

Jede Phase braucht:

Status
Ziel
Beweis
Nächster Schritt
Risiko
11. Investoren-Seite
src/app/investoren/page.tsx

Inhalt:

Problem
Lösung
Technischer Stand
Proof-Status
Warum jetzt?
Use Cases
Roadmap
Kapitalbedarf
Kontakt

Wichtig:

Nicht verkaufen wie Hype.
Verkaufen als prüfbares technisches System.

Formulierung:

A.E.O.N befindet sich im ProofKit-validierten Demonstrator-Status mit grünen Full-Proof-Läufen, sichtbaren Metriken und exportierbaren Artefakten.
12. Content-Ordner
content
├── startseite.md
├── proof.md
├── architektur.md
├── methodik.md
├── grenzen.md
├── roadmap.md
├── investoren.md
└── faq.md

Zweck:

Texte getrennt vom Code halten.
Schnell änderbar.
Gut für Reportation.
Gut für spätere PDF-Erstellung.
13. Docs-Ordner
docs
├── business-plan
├── reportation
├── investor-email
├── technical-onepager
├── wissenschaft
└── rechtliches
docs/business-plan
Businessplan
Markt
Problem
Lösung
Finanzierung
Roadmap
docs/reportation
A.E.O.N Reportation
ProofKit Beschreibung
Run-Auswertung
Technische Erklärung
docs/investor-email
Erstkontakt
Follow-up
Demo-Einladung
Kurzfassung
docs/technical-onepager
Einseitige technische Zusammenfassung
Proof-Status
Architektur
Artefakte
docs/wissenschaft
Emergenzfeld-Theorie
Formeln
Methodik
Grenzen
Vergleich mit bestehender KI
docs/rechtliches
Impressum-Entwurf
Datenschutz
IP-Hinweis
Haftungsausschluss
14. Evidence-Ordner
evidence
├── latest
├── runs
├── failed-runs
└── screenshots
evidence/latest

Der neueste bestandene Lauf:

intelligence_summary.json
intelligence_manifest.json
proof_smoke_summary.json
proof_smoke_raw.json
proof_gate_status.env
evidence_brief.md
evidence/runs

Alle bestandenen Läufe.

evidence/failed-runs

Fehlerläufe bleiben erhalten.

Wichtig:

Fehler nicht verstecken.
Fehler zeigen Entwicklung und Seriosität.
15. Komponenten
src/components
├── Header.tsx
├── Footer.tsx
├── ProofStatusCard.tsx
├── EvidenceTable.tsx
├── MetricCard.tsx
├── DownloadCard.tsx
├── RoadmapStep.tsx
└── InvestorSection.tsx
ProofStatusCard

Zeigt:

BESTANDEN
Run-ID
FAILED_GATES=[]
Status 0/0/0
Learning true
Speed true
EvidenceTable

Zeigt:

Artefakt
Existiert
Bytes
Pfad
Download
MetricCard

Zeigt:

run_count
max_run_count
task_count
dimension_result_count
speed total seconds
learning evidence count
16. Daten-Dateien
src/data
├── latest-proof.json
├── runs.json
├── metrics.json
├── roadmap.json
└── downloads.json

Diese Dateien sind die Brücke zwischen ProofKit und Webseite.

Die Webseite darf nicht blind behaupten.
Sie liest Daten aus diesen Dateien.

17. Pflicht-Seiten vor Veröffentlichung

Vor öffentlicher Nutzung müssen diese Seiten fertig sein:

Startseite
Proof
Architektur
Methodik
Downloads
Roadmap
Investoren
Impressum
Datenschutz

Ohne Impressum und Datenschutz nicht öffentlich schalten.

18. Reihenfolge beim Bauen
Schritt 1
Ordner A.E.O.N-Reportation-Webseite anlegen.
Schritt 2
Grundstruktur erstellen:
public
src
content
docs
evidence
Schritt 3
Startseite bauen.
Schritt 4
Proof-Seite bauen.
Schritt 5
latest-proof.json mit echtem grünen Lauf befüllen.
Schritt 6
Downloads-Seite bauen.
Schritt 7
Evidence-Briefs und Artefakte kopieren.
Schritt 8
Architektur-Seite mit Bildern bauen.
Schritt 9
Methodik-Seite schreiben.
Schritt 10
Investor-Seite bauen.
Schritt 11
Roadmap einbauen.
Schritt 12
Impressum und Datenschutz vorbereiten.
Schritt 13
Lokale Prüfung.
Schritt 14
Screenshots machen.
Schritt 15
Investor-Pack erstellen.
19. Inhaltliche Regeln
Nicht behaupten, was nicht bewiesen ist.
Nicht "AGI" behaupten.
Nicht "bewusst" behaupten.
Nicht "weltweit einzigartig" ohne Prüfung behaupten.
Nicht "fertiges Produkt" behaupten.

Stattdessen:

prüfbares ProofKit-System
lokaler Demonstrator
sichtbare Learning-Metriken
sichtbare Speed-Metriken
grüne Gates
reproduzierbare Artefakte
Full-Proof-Läufe
20. Zielbild

Am Ende sieht die Webseite so aus:

A.E.O.N-Reportation-Webseite
├── Startseite: Was ist A.E.O.N?
├── Proof: Was wurde bewiesen?
├── Architektur: Wie ist es gebaut?
├── Methodik: Wie wird geprüft?
├── Downloads: Welche Artefakte gibt es?
├── Roadmap: Was kommt als Nächstes?
├── Investoren: Warum ist es relevant?
├── Impressum
└── Datenschutz
21. Wichtigster Grundsatz
A.E.O.N wird nicht durch große Worte stark.
A.E.O.N wird stark durch echte Läufe, echte Artefakte und klare Reportation.