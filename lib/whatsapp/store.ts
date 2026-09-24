/**
 * Estado de cada conversación. En Netlify usa Blobs (persistente entre
 * invocaciones); en desarrollo local usa memoria.
 */
import { getStore } from '@netlify/blobs'

export type Step =
  | 'menu'
  | 'equipo'
  | 'zona'
  | 'nombre'
  | 'detalle'
  | 'done'
  | 'humano'

export type Session = {
  step: Step
  servicio?: string
  equipo?: string
  zona?: string
  nombre?: string
  detalle?: string
  profileName?: string
  updatedAt: number
  lastMessageId?: string
  /** Modo IA: historial de la conversación (últimos turnos) */
  history?: { role: 'user' | 'assistant'; content: string }[]
  /** Modo IA: ya se envió el lead al equipo en esta conversación */
  leadSent?: boolean
  /** Diagnóstico: motivo de la última respuesta vacía de la IA */
  lastEmptyReason?: string
}

const memory = new Map<string, Session>()

function blobs() {
  try {
    // Solo existe en el entorno de Netlify (build/functions). Fuera de él lanza.
    return getStore({ name: 'whatsapp-sessions', consistency: 'strong' })
  } catch {
    return null
  }
}

export async function getSession(phone: string): Promise<Session | null> {
  const store = blobs()
  if (!store) return memory.get(phone) ?? null
  try {
    return ((await store.get(phone, { type: 'json' })) as Session | null) ?? null
  } catch {
    return null
  }
}

export async function setSession(phone: string, s: Session): Promise<void> {
  const store = blobs()
  if (!store) {
    memory.set(phone, s)
    return
  }
  await store.setJSON(phone, s)
}

export async function clearSession(phone: string): Promise<void> {
  const store = blobs()
  if (!store) {
    memory.delete(phone)
    return
  }
  await store.delete(phone).catch(() => {})
}

/** Registro de diagnóstico (últimos eventos) para /api/whatsapp/test-notify?log=1 */
export type LogEntry = { t: string; from?: string; ev: string; data?: unknown }

export async function logEvent(ev: string, from?: string, data?: unknown): Promise<void> {
  const entry: LogEntry = { t: new Date().toISOString(), from, ev, data }
  const store = blobs()
  if (!store) {
    console.log('[whatsapp-log]', JSON.stringify(entry))
    return
  }
  try {
    const prev = ((await store.get('log', { type: 'json' })) as LogEntry[] | null) ?? []
    prev.push(entry)
    while (prev.length > 60) prev.shift()
    await store.setJSON('log', prev)
  } catch (e) {
    console.error('[whatsapp-log] fallo', e)
  }
}

export async function readLog(): Promise<LogEntry[]> {
  const store = blobs()
  if (!store) return []
  return ((await store.get('log', { type: 'json' })) as LogEntry[] | null) ?? []
}
