type ProofStatusCardProps = {
  label: string;
  value: string;
  tone?: "good" | "warn" | "neutral" | "danger";
  detail?: string;
};

export default function ProofStatusCard({
  label,
  value,
  tone = "neutral",
  detail
}: ProofStatusCardProps) {
  return (
    <article className={`aeon-proof-status-card aeon-proof-status-card-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail ? <p>{detail}</p> : null}
    </article>
  );
}
