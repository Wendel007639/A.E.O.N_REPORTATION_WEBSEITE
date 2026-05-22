import "../styles/globals.css";

export const metadata = {
  title: "A.E.O.N Reportation Webseite",
  description: "Prüfbare Reportations- und Beweis-Webseite für A.E.O.N."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

