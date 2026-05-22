# latest-proof.json Datenmodell

Zweck:

`src/data/latest-proof.json` ist die Bruecke zwischen ProofKit und Webseite.

Die Webseite darf nicht blind behaupten. Sie liest Status, Runs, Gates, Metriken und Artefakte aus diesem Datenmodell.

## Gruen-Regel

Ein Lauf darf nur als gruen gelten, wenn mindestens gilt:

- `is_real_proof = true`
- `INTELLIGENCE_STATUS = 0`
- `SMOKE_STATUS = 0`
- `FINAL_EXIT_STATUS = 0`
- `FAILED_GATES = []`
- `learning_visible = true`
- `speed_visible = true`
- alle Pflicht-Artefakte existieren
- alle Pflicht-Artefakte haben `bytes > 0`

## PROCESS_EXIT_STATUS

`PROCESS_EXIT_STATUS` wird angezeigt, ist aber allein kein Proof-Erfolg.

Wichtigster Satz:

Ein gruener Prozessruecksprung ist kein Proof-Erfolg. Bewertbar ist nur ein Lauf, bei dem fachliche Gates und Artefakte konsistent gruen sind.

## Pflicht-Artefakte

- `intelligence_summary.json`
- `intelligence_manifest.json`
- `proof_smoke_summary.json`
- `proof_smoke_raw.json`
- `proof_gate_status.env`
- `evidence_brief.md`

## Aktueller Stand nach Patch 6

Das Datenmodell ist vorbereitet.

Es ist noch kein echter gruener Proof angebunden.
