export type ProofStatusValue = number | string | null;

export type ProofLevel = "placeholder" | "candidate" | "verified";

export type ProofArtifact = {
  key: string;
  file: string;
  path: string;
  exists: boolean;
  bytes: number | null;
  sha256: string | null;
  required_for_green: boolean;
  description: string;
};

export type ProofTask = {
  id: string;
  title: string;
  status: "open" | "passed" | "failed" | "unknown";
  score: number | null;
};

export type ProofDimension = {
  id: string;
  title: string;
  status: "open" | "passed" | "failed" | "unknown";
  value: number | string | null;
};

export type ProofMetricItem = {
  key: string;
  label: string;
  value: number | string | boolean | null;
  unit: string | null;
};

export type ProofReportBundle = {
  available: boolean;
  path: string | null;
  files: string[];
};

export type LatestProofData = {
  schema_version: string;
  status: string;
  proof_level: ProofLevel;
  is_real_proof: boolean;
  warning: string;

  run_id: string | null;
  run_dir: string | null;
  created_at: string | null;
  updated_at: string | null;

  intelligence_status: ProofStatusValue;
  smoke_status: ProofStatusValue;
  final_exit_status: ProofStatusValue;
  process_exit_status: ProofStatusValue;

  failed_gates: string[] | null;
  passed_false_reason: string | null;

  run_count: number | null;
  max_run_count: number | null;
  task_count: number | null;
  dimension_result_count: number | null;

  learning_visible: boolean;
  speed_visible: boolean;
  speed_total_seconds: number | null;
  learning_evidence_count: number | null;

  tasks: ProofTask[];
  dimensions: ProofDimension[];

  learning_metrics: {
    visible: boolean;
    evidence_count: number | null;
    items: ProofMetricItem[];
  };

  speed_metrics: {
    visible: boolean;
    total_seconds: number | null;
    items: ProofMetricItem[];
  };

  report_bundle: ProofReportBundle;
  artifacts: ProofArtifact[];

  audit: {
    source: string;
    real_artifacts_connected: boolean;
    created_by_patch: string;
    notes: string[];
  };
};

export type ProofEvaluation = {
  official_green: boolean;
  failed_gate_count: number | null;
  missing_required_artifacts: string[];
  reasons: string[];
};
