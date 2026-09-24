/**
 * Tarea programada: cada 3 minutos revisa conversaciones a medias y manda
 * recordatorios / despedida (lib/whatsapp/followups.ts).
 */
import { runFollowups } from '../../lib/whatsapp/followups'

export default async () => {
  try {
    const r = await runFollowups()
    if (r.enviados.length) console.log('[whatsapp-followups]', JSON.stringify(r))
  } catch (e) {
    console.error('[whatsapp-followups] error', e)
  }
  return new Response('ok')
}

export const config = { schedule: '*/3 * * * *' }
