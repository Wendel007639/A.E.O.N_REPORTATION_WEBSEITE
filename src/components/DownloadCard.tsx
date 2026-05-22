type DownloadCardProps = {
  title: string;
  description: string;
  format: string;
  href?: string | null;
  available: boolean;
  note: string;
  sourcePath: string;
};

export default function DownloadCard({
  title,
  description,
  format,
  href,
  available,
  note,
  sourcePath
}: DownloadCardProps) {
  return (
    <article className="aeon-download-card">
      <div className="aeon-download-card-top">
        <span className="aeon-download-format">{format}</span>
        <span
          className={
            available
              ? "aeon-download-state aeon-download-state-ready"
              : "aeon-download-state aeon-download-state-locked"
          }
        >
          {available ? "bereit" : "vorbereitet"}
        </span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="aeon-download-source">
        <span>Quelle</span>
        <code>{sourcePath}</code>
      </div>

      <div className="aeon-download-card-bottom">
        {available && href ? (
          <a className="aeon-download-action" href={href} download>
            Download
          </a>
        ) : (
          <span className="aeon-download-action aeon-download-action-disabled">
            Noch nicht freigeschaltet
          </span>
        )}

        <small>{note}</small>
      </div>
    </article>
  );
}
