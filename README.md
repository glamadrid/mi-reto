# MiReto Demo Legal (Next.js)

Sitio mínimo para cumplir con requisitos del portal de TikTok::
- Página de Términos: /terms
- Página de Privacidad: /privacy
- Callback OAuth: /api/tiktok/callback (placeholder que devuelve JSON)

## Cómo desplegar
1) Sube este repo a GitHub.
2) Entra a Vercel → Import Project → selecciona el repo → Deploy.
3) Usa la URL de Vercel como:
   - Web/Desktop URL (portal TikTok)
   - Terms of Service URL: https://TU-PROYECTO.vercel.app/terms
   - Privacy Policy URL: https://TU-PROYECTO.vercel.app/privacy
   - Redirect URI: https://TU-PROYECTO.vercel.app/api/tiktok/callback
