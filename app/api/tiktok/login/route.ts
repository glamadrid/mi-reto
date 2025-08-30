import { NextResponse } from 'next/server';

export async function GET() {
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY!,
    response_type: 'code',
    scope: 'user.info.basic',
    redirect_uri: `${process.env.APP_BASE_URL}/api/tiktok/callback`,
    state,
  });

  const url = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;

  const res = NextResponse.redirect(url);
  res.cookies.set('tiktok_oauth_state', state, {
    httpOnly: true,
    path: '/',
    maxAge: 600,
    sameSite: 'lax',
  });
  return res;
}
