/**
 * Cliente mínimo de la API de WhatsApp Cloud (Meta).
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 *
 * Si no hay WA_TOKEN configurado (desarrollo local), no llama a Meta:
 * devuelve el mensaje que habría enviado para poder probar el flujo.
 */
const GRAPH = 'https://graph.facebook.com/v22.0'

export type OutboundMessage =
  | { type: 'text'; to: string; body: string }
  | { type: 'buttons'; to: string; body: string; buttons: { id: string; title: string }[] }
  | {
      type: 'list'
      to: string
      body: string
      button: string
      sections: { title: string; rows: { id: string; title: string; description?: string }[] }[]
    }
  | { type: 'template'; to: string; name: string; lang: string; params: string[] }

export const dryRun = () => !process.env.WA_TOKEN

function toPayload(m: OutboundMessage): Record<string, unknown> {
  const base = { messaging_product: 'whatsapp', recipient_type: 'individual', to: m.to }
  switch (m.type) {
    case 'text':
      return { ...base, type: 'text', text: { preview_url: false, body: m.body } }
    case 'buttons':
      return {
        ...base,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: m.body },
          action: {
            buttons: m.buttons.slice(0, 3).map((b) => ({
              type: 'reply',
              reply: { id: b.id, title: b.title.slice(0, 20) },
            })),
          },
        },
      }
    case 'list':
      return {
        ...base,
        type: 'interactive',
        interactive: {
          type: 'list',
          body: { text: m.body },
          action: {
            button: m.button.slice(0, 20),
            sections: m.sections.map((s) => ({
              title: s.title.slice(0, 24),
              rows: s.rows.slice(0, 10).map((r) => ({
                id: r.id,
                title: r.title.slice(0, 24),
                ...(r.description ? { description: r.description.slice(0, 72) } : {}),
              })),
            })),
          },
        },
      }
    case 'template':
      return {
        ...base,
        type: 'template',
        template: {
          name: m.name,
          language: { code: m.lang },
          components: m.params.length
            ? [{ type: 'body', parameters: m.params.map((p) => ({ type: 'text', text: p })) }]
            : [],
        },
      }
  }
}

export async function send(m: OutboundMessage): Promise<{ ok: boolean; error?: string }> {
  if (dryRun()) return { ok: true }
  const res = await fetch(`${GRAPH}/${process.env.WA_PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WA_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toPayload(m)),
  })
  if (!res.ok) {
    const error = await res.text().catch(() => String(res.status))
    console.error('[whatsapp] send failed', res.status, error)
    return { ok: false, error }
  }
  return { ok: true }
}

/** Marca el mensaje como leído (palomitas azules) para que el cliente vea que hay respuesta. */
export async function markRead(messageId: string) {
  if (dryRun()) return
  await fetch(`${GRAPH}/${process.env.WA_PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WA_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: messageId }),
  }).catch(() => {})
}

/** Descarga una imagen enviada por el cliente (id de media de WhatsApp). */
export async function downloadMedia(mediaId: string): Promise<{ base64: string; mimeType: string } | null> {
  if (dryRun()) return null
  try {
    const meta = await fetch(`${GRAPH}/${mediaId}`, { headers: { Authorization: `Bearer ${process.env.WA_TOKEN}` } }).then((r) => r.json())
    if (!meta?.url) return null
    const res = await fetch(meta.url, { headers: { Authorization: `Bearer ${process.env.WA_TOKEN}` } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length > 4_500_000) return null // límite razonable para enviarla a la IA
    return { base64: buf.toString('base64'), mimeType: meta.mime_type || 'image/jpeg' }
  } catch (e) {
    console.error('[whatsapp] downloadMedia', e)
    return null
  }
}
