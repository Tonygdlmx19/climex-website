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
 *  ANTHROPIC_API_KEY   (opcional) activa el asistente conversacional con IA (lib/whatsapp/ai.ts);
 *                      sin ella se usa el menú guiado (lib/whatsapp/flow.ts)
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { next as advance, type Inbound } from '@/lib/whatsapp/flow'
import { getSession, setSession } from '@/lib/whatsapp/store'
import { send, markRead, dryRun, downloadMedia } from '@/lib/whatsapp/api'
import { notifyTeam } from '@/lib/whatsapp/notify'
import { aiEnabled, aiTurn, wantsReset } from '@/lib/whatsapp/ai'

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
  image?: { id: string; mime_type?: string; caption?: string }
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

        await markRead(m.id)
        const isText = m.type === 'text' || m.type === 'interactive' || m.type === 'button'

        // Modo IA (conversación natural) si hay clave; si falla, cae al menú guiado.
        const isImage = m.type === 'image' && !!m.image?.id
        if (aiEnabled() && ((isText && inbound.text) || isImage)) {
          try {
            const image = isImage ? (await downloadMedia(m.image!.id)) ?? undefined : undefined
            if (isImage && !image) {
              const msg = { type: 'text' as const, to: m.from, body: 'No pude abrir la foto. ¿Me la mandas de nuevo, por favor?' }
              outbox.push(msg)
              await send(msg)
              continue
            }
            const reset = !isImage && wantsReset(inbound.text!)
            const base = reset ? null : prev
            const userText = reset ? 'Hola' : inbound.text || ''
            const ai = await aiTurn(m.from, userText, base, contactName, image)
            ai.session.lastMessageId = m.id
            await setSession(m.from, ai.session)
            const msg = { type: 'text' as const, to: m.from, body: ai.reply }
            outbox.push(msg)
            await send(msg)
            if (ai.lead) await notifyTeam(ai.lead)
            continue
          } catch (e) {
            console.error('[whatsapp] IA falló, usando menú guiado', e)
          }
        }

        const result = advance(inbound, prev)
        result.session.lastMessageId = m.id
        await setSession(m.from, result.session)

        if (!isText && result.messages.length === 0) {
          result.messages.push({
            type: 'text',
            to: m.from,
            body: m.type === 'audio' ? 'No puedo escuchar audios. ¿Me lo escribes, por favor?' : 'Por ahora solo puedo leer texto y fotos. ¿Me lo escribes, por favor?',
          })
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
