import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "A.E.O.N Reportation Webseite",
  description:
    "Pruefbare Reportations- und Beweis-Webseite fuer A.E.O.N, ProofKit, Evidence-Briefs und Artefakte."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
