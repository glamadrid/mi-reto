export const metadata = { title: "MiReto - Demo" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui", margin: 0 }}>
        <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h1 style={{ fontSize: 20 }}>MiReto (demo legal)</h1>
            <nav style={{ display: "flex", gap: 12 }}>
              <a href="/">Inicio</a>
              <a href="/terms">Términos</a>
              <a href="/privacy">Privacidad</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
