/**
 * Conversación guiada del asistente de WhatsApp de Climex.
 *
 * Flujo:  menú de servicio → tipo de equipo → zona → nombre → (detalle si es
 * reparación/otro) → resumen + aviso al equipo.  En cualquier momento el
 * cliente puede escribir "asesor" para hablar con una persona o "menu" para
 * empezar de nuevo.  Fuera de horario se avisa cuándo se responde.
 */
import { site } from '@/lib/site'
import { faqs } from '@/lib/faq'
import { isBusinessHours } from './hours'
import type { OutboundMessage } from './api'
import type { Session } from './store'

export type Inbound = {
  from: string
  profileName?: string
  text?: string
  /** id del botón o de la fila de lista elegida */
  choice?: string
}

export type Lead = {
  telefono: string
  nombre: string
  servicio: string
  equipo: string
  zona: string
  detalle: string
  origen: 'bot' | 'asesor'
}

export type FlowResult = { session: Session; messages: OutboundMessage[]; lead?: Lead }

const SERVICES: { id: string; title: string; description: string }[] = [
  { id: 'srv_mantenimiento', title: 'Mantenimiento', description: 'Limpieza profunda, gas y revisión eléctrica' },
  { id: 'srv_reparacion', title: 'Reparación', description: 'No enfría, gotea, no enciende, ruidos' },
  { id: 'srv_instalacion', title: 'Instalación', description: 'Equipo nuevo o que ya tienes' },
  { id: 'srv_venta', title: 'Venta de equipo', description: `${site.brands.map((b) => b.name).join(', ')}` },
  { id: 'srv_proyecto', title: 'Proyecto comercial', description: 'Oficinas, locales, naves, VRF' },
  { id: 'srv_otro', title: 'Otro / hablar con asesor', description: 'Te atiende una persona' },
]

const EQUIPOS = [
  { id: 'eq_minisplit', title: 'Minisplit' },
  { id: 'eq_pisotecho', title: 'Piso techo / paquete' },
  { id: 'eq_otro', title: 'Otro / no sé' },
]

const HOURS = `${site.hours[0].days} ${site.hours[0].time} · ${site.hours[1].days} ${site.hours[1].time}`

const serviceTitle = (id?: string) => SERVICES.find((s) => s.id === id)?.title ?? id ?? ''
const equipoTitle = (id?: string) => EQUIPOS.find((e) => e.id === id)?.title ?? id ?? ''

const norm = (s = '') =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

const wantsHuman = (t: string) => /\b(asesor|persona|humano|agente|llamar|llamenme|llámenme)\b/.test(t)
const wantsMenu = (t: string) => /^(menu|menú|inicio|hola|buenas|buenos dias|buenas tardes|buenas noches|reiniciar|empezar)\b/.test(t)

/** Intenta reconocer el servicio escrito a mano (sin usar el menú). */
function guessService(t: string): string | undefined {
  if (/manten|limpieza|servicio preventivo/.test(t)) return 'srv_mantenimiento'
  if (/repar|no enfria|no enfría|gotea|no prende|no enciende|falla|ruido|fuga|hielo/.test(t)) return 'srv_reparacion'
  if (/instal|colocar|poner un/.test(t)) return 'srv_instalacion'
  if (/venta|comprar|precio de un|cotizar un minisplit|cuanto cuesta un/.test(t)) return 'srv_venta'
  if (/proyecto|oficina|nave|local|vrf|comercial|industrial/.test(t)) return 'srv_proyecto'
  return undefined
}

/** Responde preguntas frecuentes por palabras clave (sin IA). */
function faqAnswer(t: string): string | undefined {
  const all = [...faqs.general, ...faqs.mantenimiento, ...faqs.reparacion, ...faqs.instalacion]
  const rules: [RegExp, string][] = [
    [/horario|a que hora|abren|cierran/, `Nuestro horario es ${HOURS}.`],
    [/donde estan|direccion|ubicacion|sucursal/, `Estamos en ${site.address.street}, ${site.address.neighborhood}, ${site.address.city}. Atendemos a domicilio en ${site.coverage.join(', ')}.`],
    [/zona|cobertura|llegan a|atienden en/, all.find((f) => /zonas atienden/.test(f.q))!.a],
    [/garantia/, all.find((f) => /garantía ofrecen/.test(f.q))!.a],
    [/cada cuanto|frecuencia/, all.find((f) => /Cada cuánto/.test(f.q))!.a],
    [/cuanto cuesta|precio|costo|tarifa/, all.find((f) => /Cuánto cuesta el mantenimiento/.test(f.q))!.a],
    [/marca/, all.find((f) => /marcas de aire/.test(f.q))!.a],
    [/capacidad|tonelada|btu|metros/, all.find((f) => /capacidad de minisplit/.test(f.q))!.a],
    [/tardan en (llegar|atender|venir)|cuando pueden|cuando vienen|hoy mismo|urgente|atenderme/, all.find((f) => /tiempo pueden atenderme/.test(f.q))!.a],
    [/cuanto tarda|cuanto dura|demora/, all.find((f) => /Cuánto tarda el servicio/.test(f.q))!.a],
    [/refrigera|chiller|congelador|refrigerador/, all.find((f) => /refrigeración comercial/.test(f.q))!.a],
    [/factur/, 'Sí, somos una empresa establecida y emitimos factura.'],
    [/telefono|llamar|numero/, `Puedes llamarnos al ${site.phones.main.display} en horario de oficina.`],
  ]
  for (const [re, a] of rules) if (re.test(t)) return a
  return undefined
}

function greeting(name?: string): string {
  const hi = name ? `¡Hola, ${name.split(' ')[0]}! 👋` : '¡Hola! 👋'
  const away = isBusinessHours()
    ? ''
    : `\n\n⏰ Ahora estamos fuera de horario (${HOURS}). Déjanos tus datos y te contactamos a primera hora.`
  return `${hi} Soy el asistente de *Climex Soluciones Integrales*, aire acondicionado en Guadalajara.\n\nCuéntame qué necesitas y te ayudo a cotizar en un minuto.${away}`
}

const menuMessage = (to: string, body: string): OutboundMessage => ({
  type: 'list',
  to,
  body,
  button: 'Elegir servicio',
  sections: [{ title: 'Servicios', rows: SERVICES }],
})

const equipoMessage = (to: string, servicio: string): OutboundMessage => ({
  type: 'buttons',
  to,
  body: `Perfecto, *${serviceTitle(servicio).toLowerCase()}*. ¿Qué tipo de equipo es?`,
  buttons: EQUIPOS,
})

const zonaMessage = (to: string): OutboundMessage => ({
  type: 'text',
  to,
  body: '¿En qué colonia o municipio está el equipo? (por ejemplo: Providencia, Zapopan)',
})

const nombreMessage = (to: string, profileName?: string): OutboundMessage =>
  profileName
    ? {
        type: 'buttons',
        to,
        body: `¿A nombre de quién hacemos la cotización?`,
        buttons: [{ id: 'name_profile', title: profileName.slice(0, 20) }, { id: 'name_other', title: 'Otro nombre' }],
      }
    : { type: 'text', to, body: '¿A nombre de quién hacemos la cotización?' }

function detalleMessage(to: string, servicio?: string): OutboundMessage {
  const body =
    servicio === 'srv_reparacion'
      ? 'Cuéntame brevemente qué falla tiene el equipo (no enfría, gotea, no enciende, hace ruido, etc.).'
      : servicio === 'srv_venta'
        ? '¿Para qué espacio es el equipo y de cuántos metros aproximadamente? Si ya tienes una marca o capacidad en mente, dímelo.'
        : servicio === 'srv_proyecto'
          ? 'Cuéntame brevemente del proyecto: tipo de espacio, metros aproximados y cuántos equipos.'
          : '¿Algo más que debamos saber? (cantidad de equipos, urgencia, acceso, etc.). Si no, escribe "no".'
  return { type: 'text', to, body }
}

function summary(to: string, s: Session, lead: Lead): OutboundMessage {
  const datos = [
    `• Servicio: ${lead.servicio}`,
    lead.equipo ? `• Equipo: ${lead.equipo}` : null,
    `• Zona: ${lead.zona}`,
    lead.detalle && lead.detalle !== '-' ? `• Detalle: ${lead.detalle}` : null,
  ].filter(Boolean)
  const cuando = isBusinessHours()
    ? `Un asesor te escribe o te llama en unos minutos para darte la cotización (desde el ${site.whatsappAsesores.display}).`
    : `Un asesor te contacta a primera hora del siguiente día hábil (${HOURS}) desde el ${site.whatsappAsesores.display}.`
  void s
  return {
    type: 'text',
    to,
    body: `✅ Listo, *${lead.nombre.split(' ')[0]}*. Registré tu solicitud:\n${datos.join('\n')}\n\n${cuando}\nSi es urgente, llámanos al ${site.phones.main.display}.\n\nEscribe *menu* si quieres cotizar otro servicio.`,
  }
}

function buildLead(from: string, s: Session, origen: Lead['origen']): Lead {
  return {
    telefono: from,
    nombre: s.nombre || s.profileName || 'Sin nombre',
    servicio: serviceTitle(s.servicio) || 'Por definir',
    equipo: equipoTitle(s.equipo),
    zona: s.zona || 'Por definir',
    detalle: s.detalle || '-',
    origen,
  }
}

const fresh = (profileName?: string): Session => ({ step: 'menu', profileName, updatedAt: Date.now() })

/** Motor de la conversación: recibe el mensaje y el estado, devuelve el nuevo estado y las respuestas. */
export function next(inb: Inbound, prev: Session | null): FlowResult {
  const to = inb.from
  const text = norm(inb.text)
  const choice = inb.choice
  const profileName = inb.profileName || prev?.profileName
  const stale = !prev || Date.now() - prev.updatedAt > 12 * 60 * 60 * 1000 // 12 h sin actividad = empezar de nuevo
  let s: Session = stale ? fresh(profileName) : { ...prev!, profileName }
  s.updatedAt = Date.now()
  const msgs: OutboundMessage[] = []

  // Atajos globales
  if (text && wantsHuman(text)) {
    s = { ...s, step: 'humano' }
    const lead = buildLead(to, s, 'asesor')
    msgs.push({
      type: 'text',
      to,
      body: isBusinessHours()
        ? `Claro. Ya avisé a un asesor; te escribe en unos minutos desde el ${site.whatsappAsesores.display}. Si prefieres, llámanos al ${site.phones.main.display}.`
        : `Claro. Un asesor te escribe a primera hora del siguiente día hábil (${HOURS}) desde el ${site.whatsappAsesores.display}. Si es urgente, llama al ${site.phones.main.display}.`,
    })
    return { session: s, messages: msgs, lead }
  }
  if (text && wantsMenu(text) && s.step !== 'menu') {
    s = fresh(profileName)
  }
  if (s.step === 'humano') {
    // Ya hay una persona atendiendo: el bot no interfiere salvo que pidan el menú.
    if (text && wantsMenu(text)) s = fresh(profileName)
    else return { session: s, messages: [] }
  }

  switch (s.step) {
    case 'menu': {
      const picked = choice?.startsWith('srv_') ? choice : text ? guessService(text) : undefined
      if (picked === 'srv_otro') {
        s = { ...s, servicio: picked, step: 'humano' }
        const lead = buildLead(to, s, 'asesor')
        msgs.push({
          type: 'text',
          to,
          body: `Con gusto. Cuéntame por aquí qué necesitas y un asesor te responde ${isBusinessHours() ? 'en unos minutos' : `en horario de oficina (${HOURS})`}.`,
        })
        return { session: s, messages: msgs, lead }
      }
      if (picked) {
        s = { ...s, servicio: picked, step: 'equipo' }
        if (picked === 'srv_proyecto') {
          s.step = 'zona'
          msgs.push({ type: 'text', to, body: 'Perfecto, un *proyecto comercial*. Te hacemos unas preguntas rápidas.' }, zonaMessage(to))
        } else {
          msgs.push(equipoMessage(to, picked))
        }
        return { session: s, messages: msgs }
      }
      // Pregunta libre antes de elegir servicio
      const ans = text ? faqAnswer(text) : undefined
      if (ans) {
        msgs.push({ type: 'text', to, body: ans })
        msgs.push(menuMessage(to, '¿Te ayudo a cotizar algo?'))
        return { session: s, messages: msgs }
      }
      msgs.push(menuMessage(to, greeting(profileName)))
      return { session: s, messages: msgs }
    }

    case 'equipo': {
      const picked = choice?.startsWith('eq_') ? choice : undefined
      if (picked) s.equipo = picked
      else if (text) s.equipo = inb.text!.trim().slice(0, 60)
      else {
        msgs.push(equipoMessage(to, s.servicio!))
        return { session: s, messages: msgs }
      }
      s.step = 'zona'
      msgs.push(zonaMessage(to))
      return { session: s, messages: msgs }
    }

    case 'zona': {
      if (!text) {
        msgs.push(zonaMessage(to))
        return { session: s, messages: msgs }
      }
      s.zona = inb.text!.trim().slice(0, 80)
      s.step = 'nombre'
      msgs.push(nombreMessage(to, profileName))
      return { session: s, messages: msgs }
    }

    case 'nombre': {
      if (choice === 'name_profile' && profileName) s.nombre = profileName
      else if (choice === 'name_other') {
        msgs.push({ type: 'text', to, body: 'Escríbeme el nombre, por favor.' })
        return { session: s, messages: msgs }
      } else if (text) s.nombre = inb.text!.trim().slice(0, 60)
      else {
        msgs.push(nombreMessage(to, profileName))
        return { session: s, messages: msgs }
      }
      s.step = 'detalle'
      msgs.push(detalleMessage(to, s.servicio))
      return { session: s, messages: msgs }
    }

    case 'detalle': {
      if (!text) {
        msgs.push(detalleMessage(to, s.servicio))
        return { session: s, messages: msgs }
      }
      s.detalle = /^(no|nada|ninguno|ninguna|-)$/.test(text) ? '-' : inb.text!.trim().slice(0, 400)
      s.step = 'done'
      const lead = buildLead(to, s, 'bot')
      msgs.push(summary(to, s, lead))
      return { session: s, messages: msgs, lead }
    }

    case 'done': {
      // Después del resumen: preguntas sueltas o nuevo menú.
      const ans = text ? faqAnswer(text) : undefined
      if (ans) {
        msgs.push({ type: 'text', to, body: ans })
        return { session: s, messages: msgs }
      }
      if (choice?.startsWith('srv_')) return next(inb, fresh(profileName))
      msgs.push({
        type: 'text',
        to,
        body: `Recibido. Un asesor te contacta ${isBusinessHours() ? 'en unos minutos' : 'en horario de oficina'}. Escribe *menu* para cotizar otro servicio o *asesor* para hablar con una persona.`,
      })
      return { session: s, messages: msgs }
    }
  }
  return { session: s, messages: msgs }
}
