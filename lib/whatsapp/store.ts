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
