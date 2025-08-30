import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Fuerza runtime Node (evita Edge por si tu build lo cambiara)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const baseUrl = process.env.APP_BASE_URL;

  // Validación: las 2 variables necesarias
  if (!clientKey || !baseUrl) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Faltan variables de entorno para el login de TikTok.',
        detail: {
          has_TIKTOK_CLIENT_KEY: !!clientKey,
          has_APP_BASE_URL: !!baseUrl,
        },
        hint:
          'Revisa Project configuration → Environment variables en Netlify, ' +
          'asegúrate de tener Functions en el scope y vuelve a desplegar.',
      },
      { status: 500 }
    );
  }

  // CSRF state
  const state = randomUUID();

  // Parámetros oficiales del Login Kit
  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: 'code',
    scope: 'user.info.basic', // mínimo para obtener nombre y avatar
    redirect_uri: `${baseUrl}/api/tiktok/callback`,
    state,
  });

  const authorizeUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;

  // Modo debug opcional: /api/tiktok/login?debug=1
  if (req.nextUrl.searchParams.get('debug') === '1') {
    return NextResponse.json({
      ok: true,
      debug: {
        has_TIKTOK_CLIENT_KEY: true,
        APP_BASE_URL: baseUrl,
        authorizeUrl,
      },
    });
  }

  // Redirección a TikTok + cookie con el state
  const res = NextResponse.redirect(authorizeUrl);
  res.cookies.set({
    name: 'tiktok_oauth_state',
    value: state,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10, // 10 minutos
  });

  return res;
}
