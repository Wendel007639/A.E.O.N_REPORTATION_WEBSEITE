import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "A.E.O.N Reportation Webseite",
    template: "%s | A.E.O.N Reportation"
  },
  description:
    "Pruefbare Reportations- und Beweis-Webseite fuer A.E.O.N, ProofKit, Evidence-Briefs, Metriken und Artefakte.",
  applicationName: "A.E.O.N Reportation Webseite"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="aeon-background" aria-hidden="true">
          <div className="aeon-bg-grid" />
          <div className="aeon-bg-orb aeon-bg-orb-one" />
          <div className="aeon-bg-orb aeon-bg-orb-two" />
          <div className="aeon-bg-scanlines" />
        </div>

        <div className="aeon-site-frame">
          <Header />
          <div className="aeon-page-frame">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
