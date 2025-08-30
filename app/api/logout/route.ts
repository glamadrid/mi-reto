import { NextResponse } from 'next/server';

// Garantiza que es función Node y no se intente prerender
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const base = process.env.APP_BASE_URL || 'https://reliable-starburst-f814a0.netlify.app';

  // Redirige con URL ABSOLUTA (no '/')
  const res = NextResponse.redirect(new URL('/', base));

  // Limpia cookies
  res.cookies.set('tiktok_display_name', '', { path: '/', maxAge: 0 });
  res.cookies.set('tiktok_avatar_url', '', { path: '/', maxAge: 0 });
  return res;
}
