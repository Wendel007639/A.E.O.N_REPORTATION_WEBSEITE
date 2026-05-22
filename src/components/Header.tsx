import Link from "next/link";

const primaryNavItems = [
  { href: "/", label: "Start" },
  { href: "/proof", label: "Proof" },
  { href: "/architektur", label: "Architektur" },
  { href: "/methodik", label: "Methodik" },
  { href: "/downloads", label: "Downloads" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/investoren", label: "Investoren" }
];

export default function Header() {
  return (
    <header className="aeon-header">
      <div className="aeon-header-frame">
        <Link className="aeon-brand" href="/" aria-label="A.E.O.N Startseite">
          <span className="aeon-brand-mark" aria-hidden="true">
            <span className="aeon-brand-orbit" />
            <span className="aeon-brand-core" />
          </span>

          <span className="aeon-brand-copy">
            <span className="aeon-brand-title">A.E.O.N</span>
            <span className="aeon-brand-subtitle">Reportation Netzwerk</span>
          </span>
        </Link>

        <nav className="aeon-nav" aria-label="Hauptnavigation">
          {primaryNavItems.map((item) => (
            <Link className="aeon-nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="aeon-header-status" aria-label="Systemstatus">
          <span className="aeon-status-dot" />
          <span>ProofKit Ready</span>
        </div>
      </div>
    </header>
  );
}
