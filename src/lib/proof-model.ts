import type { LatestProofData, ProofEvaluation } from "@/types/proof";

function isZero(value: unknown): boolean {
  return value === 0;
}

export function evaluateProofData(proof: LatestProofData): ProofEvaluation {
  const failedGateCount = Array.isArray(proof.failed_gates)
    ? proof.failed_gates.length
    : null;

  const requiredArtifacts = proof.artifacts.filter(
    (artifact) => artifact.required_for_green
  );

  const missingRequiredArtifacts = requiredArtifacts
    .filter(
      (artifact) =>
        artifact.exists !== true ||
        typeof artifact.bytes !== "number" ||
        artifact.bytes <= 0
    )
    .map((artifact) => artifact.file);

  const coreStatusesGreen =
    isZero(proof.intelligence_status) &&
    isZero(proof.smoke_status) &&
    isZero(proof.final_exit_status);

  const officialGreen =
    proof.is_real_proof === true &&
    coreStatusesGreen &&
    failedGateCount === 0 &&
    proof.learning_visible === true &&
    proof.speed_visible === true &&
    missingRequiredArtifacts.length === 0;

  const reasons: string[] = [];

  if (proof.is_real_proof !== true) {
    reasons.push("is_real_proof ist false");
  }

  if (!coreStatusesGreen) {
    reasons.push("INTELLIGENCE_STATUS, SMOKE_STATUS oder FINAL_EXIT_STATUS ist nicht gruen");
  }

  if (failedGateCount !== 0) {
    reasons.push("FAILED_GATES ist nicht als leeres Array belegt");
  }

  if (proof.learning_visible !== true) {
    reasons.push("Learning-Metriken sind nicht sichtbar belegt");
  }

  if (proof.speed_visible !== true) {
    reasons.push("Speed-Metriken sind nicht sichtbar belegt");
  }

  if (missingRequiredArtifacts.length > 0) {
    reasons.push("Pflicht-Artefakte fehlen oder haben keine Byte-Groesse");
  }

  return {
    official_green: officialGreen,
    failed_gate_count: failedGateCount,
    missing_required_artifacts: missingRequiredArtifacts,
    reasons
  };
}

export function formatProofValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "nicht belegt";
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  return String(value);
}
