/**
 * Webhook de WhatsApp Cloud API.
 *  GET  → verificación del webhook (Meta manda hub.challenge)
 *  POST → valida la firma y delega el procesamiento a la función en segundo plano
 *         netlify/functions/whatsapp-process-background (sin límite de 10 s).
 *         En desarrollo local (sin WA_TOKEN) procesa en línea y devuelve lo que enviaría.
 *
 * Variables de entorno (Netlify → Environment variables):
 *  WA_TOKEN            token permanente del usuario del sistema (Meta Business)
 *  WA_PHONE_ID         "Phone number ID" del número del asistente
 *  WA_VERIFY_TOKEN     texto secreto que tú inventas y pegas igual en Meta
 *  WA_APP_SECRET       "App secret" de la app de Meta (valida la firma de cada webhook)
 *  WA_TEAM_NUMBER      (opcional) número del equipo en formato 521XXXXXXXXXX para avisos
 *  WA_TEAM_TEMPLATE    (opcional) nombre de la plantilla aprobada para el aviso
 *  ANTHROPIC_API_KEY   (opcional) activa el asistente conversacional con IA (lib/whatsapp/ai.ts);
 *                      sin ella se usa el menú guiado (lib/whatsapp/flow.ts)
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { dryRun } from '@/lib/whatsapp/api'
import { processWebhook } from '@/lib/whatsapp/process'
import { site } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  if (p.get('hub.mode') === 'subscribe' && p.get('hub.verify_token') === process.env.WA_VERIFY_TOKEN) {
    return new NextResponse(p.get('hub.challenge') ?? '', { status: 200 })
  }
  return new NextResponse('forbidden', { status: 403 })
}

function validSignature(raw: string, header: string | null): boolean {
  const secret = process.env.WA_APP_SECRET
  if (!secret) return dryRun() // en local sin secreto se acepta; en producción es obligatorio
  if (!header?.startsWith('sha256=')) return false
  const expected = createHmac('sha256', secret).update(raw).digest('hex')
  const got = header.slice(7)
  return expected.length === got.length && timingSafeEqual(Buffer.from(expected), Buffer.from(got))
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!validSignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new NextResponse('bad signature', { status: 401 })
  }

  // Sin mensajes (solo estados de entrega) no hay nada que procesar.
  if (!raw.includes('"messages"')) return NextResponse.json({ ok: true })

  if (dryRun()) {
    let body: unknown
    try {
      body = JSON.parse(raw)
    } catch {
      return new NextResponse('bad json', { status: 400 })
    }
    const sent = await processWebhook(body)
    return NextResponse.json({ ok: true, sent })
  }

  // Producción: entrega a la función en segundo plano y responde a Meta de inmediato.
  const res = await fetch(`${site.url}/.netlify/functions/whatsapp-process-background`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-internal-key': process.env.WA_VERIFY_TOKEN ?? '' },
    body: raw,
  }).catch((e) => {
    console.error('[whatsapp] no se pudo delegar al background', e)
    return null
  })
  if (!res || (res.status !== 202 && res.status !== 200)) {
    // Respaldo: procesar aquí mismo (con el límite de tiempo de la función).
    console.error('[whatsapp] background no disponible, procesando en línea', res?.status)
    try {
      await processWebhook(JSON.parse(raw))
    } catch (e) {
      console.error('[whatsapp] proceso en línea falló', e)
    }
  }
  return NextResponse.json({ ok: true })
}
