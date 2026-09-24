/**
 * Webhook de WhatsApp Cloud API.
 *  GET  → verificación del webhook (Meta manda hub.challenge)
 *  POST → mensajes entrantes → motor de conversación → respuestas
 *
 * Variables de entorno (Netlify → Environment variables):
 *  WA_TOKEN            token permanente del usuario del sistema (Meta Business)
 *  WA_PHONE_ID         "Phone number ID" del número 33 2456 8104
 *  WA_VERIFY_TOKEN     texto secreto que tú inventas y pegas igual en Meta
 *  WA_APP_SECRET       "App secret" de la app de Meta (valida la firma de cada webhook)
 *  WA_TEAM_NUMBER      (opcional) número del equipo en formato 521XXXXXXXXXX para avisos
 *  WA_TEAM_TEMPLATE    (opcional) nombre de la plantilla aprobada para el aviso
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { next as advance, type Inbound } from '@/lib/whatsapp/flow'
import { getSession, setSession } from '@/lib/whatsapp/store'
import { send, markRead, dryRun } from '@/lib/whatsapp/api'
import { notifyTeam } from '@/lib/whatsapp/notify'

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

type WaMessage = {
  id: string
  from: string
  type: string
  text?: { body: string }
  interactive?: { type: string; button_reply?: { id: string; title: string }; list_reply?: { id: string; title: string } }
  button?: { payload?: string; text?: string }
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  if (!validSignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new NextResponse('bad signature', { status: 401 })
  }

  let body: any
  try {
    body = JSON.parse(raw)
  } catch {
    return new NextResponse('bad json', { status: 400 })
  }

  const outbox: unknown[] = []
  for (const entry of body?.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value
      if (!value?.messages) continue // estados de entrega, etc.
      const contactName: string | undefined = value.contacts?.[0]?.profile?.name
      for (const m of value.messages as WaMessage[]) {
        const inbound: Inbound = { from: m.from, profileName: contactName }
        if (m.type === 'text') inbound.text = m.text?.body
        else if (m.type === 'interactive') {
          const r = m.interactive?.button_reply ?? m.interactive?.list_reply
          inbound.choice = r?.id
          inbound.text = r?.title
        } else if (m.type === 'button') inbound.text = m.button?.text
        else inbound.text = '' // audio, imagen, ubicación… se pide texto

        const prev = await getSession(m.from)
        if (prev?.lastMessageId === m.id) continue // Meta reintenta: no procesar dos veces

        const result = advance(inbound, prev)
        result.session.lastMessageId = m.id
        await setSession(m.from, result.session)
        await markRead(m.id)

        if (m.type !== 'text' && m.type !== 'interactive' && m.type !== 'button' && result.messages.length === 0) {
          result.messages.push({ type: 'text', to: m.from, body: 'Por ahora solo puedo leer texto. ¿Me lo escribes, por favor?' })
        }
        for (const msg of result.messages) {
          outbox.push(msg)
          await send(msg)
        }
        if (result.lead) await notifyTeam(result.lead)
      }
    }
  }

  // Meta solo necesita un 200 rápido. En modo local devolvemos lo que se habría enviado.
  return NextResponse.json(dryRun() ? { ok: true, sent: outbox } : { ok: true })
}
