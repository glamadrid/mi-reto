export default function Home() {
  return (
    <main>
      <h2>Demo de sitio para completar el portal de TikTok</h2>
      <p>Incluye páginas públicas de Términos y Privacidad, y un endpoint de callback.</p>
      <ul>
        <li>Redirect de OAuth: <code>/api/tiktok/callback</code> (placeholder)</li>
        <li>Páginas legales: <a href="/terms">/terms</a> y <a href="/privacy">/privacy</a></li>
      </ul>
    </main>
  );
}
