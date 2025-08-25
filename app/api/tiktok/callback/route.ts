import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Placeholder: el portal solo necesita una URL válida para pruebas iniciales.
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  return NextResponse.json({ ok: true, message: "Callback recibido", code });
}
