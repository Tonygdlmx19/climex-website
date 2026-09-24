/**
 * Procesa un webhook de WhatsApp (ya validado): por cada mensaje entrante decide
 * la respuesta (IA o menú), la envía y avisa al equipo si hay lead.
 * Lo usan la ruta app/api/whatsapp (modo local) y la función en segundo plano
 * netlify/functions/whatsapp-process-background (producción).
 */
import { next as advance, type Inbound } from './flow'
import { getSession, setSession, logEvent } from './store'
import { send, markRead, dryRun, downloadMedia, type OutboundMessage } from './api'
import { notifyTeam } from './notify'
import { aiEnabled, aiTurn, wantsReset } from './ai'

type WaMessage = {
  id: string
  from: string
  type: string
  text?: { body: string }
  interactive?: { type: string; button_reply?: { id: string; title: string }; list_reply?: { id: string; title: string } }
  button?: { payload?: string; text?: string }
  image?: { id: string; mime_type?: string; caption?: string }
}

export async function processWebhook(body: unknown): Promise<OutboundMessage[]> {
  const outbox: OutboundMessage[] = []
  const payload = body as { entry?: { changes?: { value?: { messages?: WaMessage[]; contacts?: { profile?: { name?: string } }[] } }[] }[] }
  for (const entry of payload?.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value as typeof change.value & { statuses?: { id: string; status: string; recipient_id?: string; errors?: unknown }[] }
      if (value?.statuses) {
        for (const st of value.statuses) {
          if (st.status === 'failed' || st.errors) await logEvent('estado_envio', st.recipient_id, { status: st.status, errors: st.errors })
        }
      }
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
        else if (m.type === 'image') inbound.text = m.image?.caption ?? ''
        else inbound.text = '' // audio, ubicación, documento… se pide texto

        const prev = await getSession(m.from)
        if (prev?.lastMessageId === m.id) continue // Meta reintenta: no procesar dos veces

        await markRead(m.id)
        const isText = m.type === 'text' || m.type === 'interactive' || m.type === 'button'
        const isImage = m.type === 'image' && !!m.image?.id

        // Modo IA (conversación natural) si hay clave; si falla, cae al menú guiado.
        if (aiEnabled() && ((isText && inbound.text) || isImage)) {
          try {
            const image = isImage ? (await downloadMedia(m.image!.id)) ?? undefined : undefined
            if (isImage && !image) {
              const msg: OutboundMessage = { type: 'text', to: m.from, body: 'No pude abrir la foto. ¿Me la mandas de nuevo, por favor?' }
              outbox.push(msg)
              await send(msg)
              continue
            }
            const reset = !isImage && wantsReset(inbound.text!)
            const base = reset ? null : prev
            const userText = reset ? 'Hola' : inbound.text || ''
            const ai = await aiTurn(m.from, userText, base, contactName, image)
            ai.session.lastMessageId = m.id
            ai.session.lastUserAt = Date.now()
            ai.session.lastUserText = (userText || (isImage ? '[foto]' : '')).slice(0, 120)
            ai.session.followups = 0
            ai.session.lastBotAt = Date.now()
            await setSession(m.from, ai.session)
            const msg: OutboundMessage = { type: 'text', to: m.from, body: ai.reply }
            outbox.push(msg)
            await logEvent('ia_turno', m.from, { in: userText.slice(0, 80), out: ai.reply.slice(0, 80), lead: !!ai.lead, step: ai.session.step, empty: ai.session.lastEmptyReason })
            ai.session.lastEmptyReason = undefined
            // Primero el aviso al equipo (es lo importante), después la respuesta al cliente.
            if (ai.lead) {
              try {
                const report = await notifyTeam(ai.lead)
                await logEvent('aviso_equipo', m.from, report)
              } catch (e) {
                await logEvent('aviso_equipo_error', m.from, String(e))
              }
            }
            const sent = await send(msg)
            if (!sent.ok) await logEvent('respuesta_error', m.from, sent.error)
            continue
          } catch (e) {
            await logEvent('ia_error', m.from, String(e))
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
        if (result.lead) await notifyTeam(result.lead)
        for (const msg of result.messages) {
          outbox.push(msg)
          await send(msg)
        }
      }
    }
  }
  void dryRun
  return outbox
}
