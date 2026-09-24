/**
 * Seguimiento de conversaciones a medias (modo IA).
 *  - 5 min sin respuesta del cliente → primer recordatorio
 *  - 1 h después → segundo recordatorio
 *  - 1 h después del segundo → despedida cordial (queda a sus órdenes)
 * Lo ejecuta netlify/functions/whatsapp-followups (cada 3 min). Solo aplica a
 * conversaciones sin lead registrado, donde el bot habló al último y el cliente
 * escribió en las últimas 24 h (ventana de Meta para mensajes normales).
 */
import { site } from '../site'
import { send } from './api'
import { listSessions, setSession, logEvent, type Session } from './store'

const MIN = 60 * 1000
const R1_AFTER = 5 * MIN
const R2_AFTER = 60 * MIN
const BYE_AFTER = 60 * MIN
const WINDOW = 24 * 60 * MIN

const farewell = (t = '') => /\b(gracias|grasias|adios|adiós|hasta luego|bye|nos vemos|luego te escribo|despues te escribo|después te escribo|ok gracias)\b/i.test(t)

function firstName(s: Session) {
  const n = s.nombre || s.profileName || ''
  return n.split(' ')[0]
}

function messages(s: Session) {
  const nombre = firstName(s)
  const hola = nombre ? `Hola, ${nombre} 👋` : 'Hola 👋'
  return {
    r1: `${hola} ¿Seguimos? Me quedé esperando tu respuesta para terminar de registrar tu solicitud y que un asesor te contacte. Cuando gustes, continuamos 😊`,
    r2: `Sigo por aquí por si quieres continuar con tu solicitud. Solo responde este mensaje y retomamos donde nos quedamos.`,
    bye: `Entiendo que quizá ahora no es buen momento. Quedo a tus órdenes para retomar tu solicitud cuando lo necesites: solo escríbeme por aquí. ¡Gracias por contactar a Climex Soluciones Integrales! 😊\nUrgencias: ${site.phones.main.display}.`,
  }
}

export type FollowupReport = { revisadas: number; enviados: { phone: string; tipo: string; ok: boolean; error?: string }[] }

export async function runFollowups(now = Date.now()): Promise<FollowupReport> {
  const report: FollowupReport = { revisadas: 0, enviados: [] }
  const sessions = await listSessions()
  for (const { phone, session: s } of sessions) {
    report.revisadas++
    if (!s.history || s.leadSent || s.step === 'humano') continue
    if (!s.lastBotAt || !s.lastUserAt) continue
    if (s.lastUserAt > s.lastBotAt) continue // el cliente habló al último: no hay nada que recordar
    if (now - s.lastUserAt > WINDOW) continue // fuera de la ventana de 24 h no se puede escribir
    if (farewell(s.lastUserText)) continue // se despidió; no insistir
    const n = s.followups ?? 0
    const idle = now - s.lastBotAt
    let tipo: 'r1' | 'r2' | 'bye' | null = null
    if (n === 0 && idle >= R1_AFTER) tipo = 'r1'
    else if (n === 1 && idle >= R2_AFTER) tipo = 'r2'
    else if (n === 2 && idle >= BYE_AFTER) tipo = 'bye'
    if (!tipo) continue

    const body = messages(s)[tipo]
    const r = await send({ type: 'text', to: phone, body })
    report.enviados.push({ phone, tipo, ok: r.ok, error: r.error })
    if (r.ok) {
      s.followups = n + 1
      s.lastBotAt = now
      s.history.push({ role: 'assistant', content: body })
      s.updatedAt = now
      await setSession(phone, s)
    }
    await logEvent(`seguimiento_${tipo}`, phone, { ok: r.ok, error: r.error })
  }
  return report
}
