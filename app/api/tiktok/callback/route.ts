import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const savedState = req.cookies.get('tiktok_oauth_state')?.value;

  if (!code || !state || state !== savedState) {
    return NextResponse.json({ ok: false, error: 'Estado inválido' }, { status: 400 });
  }

  const body = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY!,
    client_secret: process.env.TIKTOK_CLIENT_SECRET!,
    code,
    grant_type: 'authorization_code',
    redirect_uri: `${process.env.APP_BASE_URL}/api/tiktok/callback`,
  });

  const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) {
    return NextResponse.json({ ok: false, step: 'token', details: tokenJson }, { status: 400 });
  }

  const accessToken = tokenJson.access_token as string;

  const infoRes = await fetch(
    'https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const infoJson = await infoRes.json();

  return NextResponse.json({ ok: true, user: infoJson, token: tokenJson });
}
