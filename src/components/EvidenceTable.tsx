export type EvidenceRow = {
  artifact: string;
  exists: boolean;
  bytes: string;
  path: string;
  note: string;
  statusLabel?: string;
  statusTone?: "good" | "warn";
};

type EvidenceTableProps = {
  rows: EvidenceRow[];
};

export default function EvidenceTable({ rows }: EvidenceTableProps) {
  return (
    <div className="aeon-evidence-table-wrap">
      <table className="aeon-evidence-table">
        <thead>
          <tr>
            <th>Artefakt</th>
            <th>Status</th>
            <th>Bytes</th>
            <th>Pfad</th>
            <th>Hinweis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const tone = row.statusTone ?? (row.exists ? "good" : "warn");

            return (
              <tr key={row.artifact}>
                <td>{row.artifact}</td>
                <td>
                  <span
                    className={
                      tone === "good"
                        ? "aeon-evidence-badge aeon-evidence-badge-good"
                        : "aeon-evidence-badge aeon-evidence-badge-warn"
                    }
                  >
                    {row.statusLabel ?? (row.exists ? "verbunden" : "offen")}
                  </span>
                </td>
                <td>{row.bytes}</td>
                <td>
                  <code>{row.path}</code>
                </td>
                <td>{row.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
