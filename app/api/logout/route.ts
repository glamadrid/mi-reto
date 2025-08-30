import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.redirect('/');
  res.cookies.set('tiktok_display_name', '', { path: '/', maxAge: 0 });
  res.cookies.set('tiktok_avatar_url', '', { path: '/', maxAge: 0 });
  return res;
}
