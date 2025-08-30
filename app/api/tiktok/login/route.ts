import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const base = process.env.APP_BASE_URL;

  // DEBUG: si faltan vars, avisamos claro
  if (!clientKey || !base) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Faltan variables de entorno en runtime',
        detail: {
          has_TIKTOK_CLIENT_KEY: !!clientKey,
          has_APP_BASE_URL: !!base,
        },
        hint: 'Revisa scopes (Functions) y vuelve a hacer Deploy.',
      },
      { status: 500 }
    );
  }

  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: 'code',
    scope: 'user.info.basic',
    redirect_uri: `${base}/api/tiktok/callback`,
    state,
  });
  const authorizeUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;

  // Modo debug: si llamas con ?debug=1, NO redirigimos; devolvemos la URL construida
  const urlObj = new URL(request.url);
  if (urlObj.searchParams.get('debug') === '1') {
    return NextResponse.json({
      ok: true,
      debug: {
        has_TIKTOK_CLIENT_KEY: true,
        APP_BASE_URL: base,
        authorizeUrl,
      },
    });
  }

  const res = NextResponse.redirect(authorizeUrl);
  res.cookies.set('tiktok_oauth_state', state, {
    httpOnly: true,
    path: '/',
    maxAge: 600,
    sameSite: 'lax',
  });
  return res;
}
