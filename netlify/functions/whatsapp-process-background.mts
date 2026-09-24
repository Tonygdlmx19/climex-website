/**
 * Función en segundo plano (sufijo -background: responde 202 al instante y puede
 * correr hasta 15 minutos). Recibe el webhook ya validado desde app/api/whatsapp
 * y hace el trabajo pesado: IA, respuesta al cliente y aviso al equipo.
 */
import { processWebhook } from '../../lib/whatsapp/process'

export default async (req: Request) => {
  if (req.headers.get('x-internal-key') !== process.env.WA_VERIFY_TOKEN) {
    return new Response('forbidden', { status: 403 })
  }
  try {
    const body = await req.json()
    const sent = await processWebhook(body)
    console.log('[whatsapp-background] procesado', sent.length, 'mensaje(s)')
  } catch (e) {
    console.error('[whatsapp-background] error', e)
  }
  return new Response('ok')
}
