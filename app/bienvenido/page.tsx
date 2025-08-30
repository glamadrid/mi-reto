import { cookies } from 'next/headers';

export default function Bienvenido() {
  const name = cookies().get('tiktok_display_name')?.value || 'Usuario';
  const avatar = cookies().get('tiktok_avatar_url')?.value || '';

  return (
    <main style={{ padding: 24 }}>
      <h1>¡Bienvenido!</h1>
      <p>Login con TikTok completado en Sandbox.</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
        {avatar ? (
          <img src={avatar} alt="avatar" width={64} height={64}
               style={{ borderRadius: '50%' }} />
        ) : null}
        <strong>{name}</strong>
      </div>

      <p style={{ marginTop: 24 }}>
        <a href="/api/logout">Cerrar sesión</a>
      </p>
    </main>
  );
}
