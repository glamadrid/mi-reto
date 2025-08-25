import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, note: "Aquí iría el redirect a TikTok OAuth en la versión funcional." });
}
