/**
 * Avisa al equipo de Climex de un nuevo lead:
 *  1) Netlify Forms (formulario "lead-whatsapp") → correo a administracion@…
 *  2) Plantilla de WhatsApp al número del equipo (opcional, requiere plantilla aprobada en Meta).
 */
import { site } from '../site'
import { send, dryRun } from './api'
import type { Lead } from './flow'
import { makeFolio } from '../folio'
import { teamWindowOpen } from './store'

export type NotifyReport = { form?: string; whatsappText?: string; whatsappTemplate?: string; ventana?: 'abierta' | 'cerrada' }

/**
 * Meta rechaza parámetros de plantilla con saltos de línea, tabulaciones, más de 4 espacios
 * seguidos o más de ~1024 caracteres. Se limpian antes de enviar.
 */
const templateParam = (v: string, max = 900) =>
  (v || '-')
    .replace(/[\r\n\t]+/g, ' · ')
    .replace(/ {2,}/g, ' ')
    .trim()
    .slice(0, max) || '-'

export async function notifyTeam(lead: Lead): Promise<NotifyReport> {
  const report: NotifyReport = {}
  const tasks: Promise<unknown>[] = []
  const folio = lead.folio || makeFolio('W')
  const tipo = lead.origen === 'asesor' ? 'Pide asesor' : lead.actualizacion ? 'Actualización' : 'Lead WhatsApp'
  const subject = `${tipo} ${folio} · ${lead.nombre} · ${lead.servicio}`

  // 1) Correo vía Netlify Forms
  if (!dryRun()) {
    const body = new URLSearchParams({
      'form-name': 'lead-whatsapp',
      subject,
      folio,
      telefono: `+${lead.telefono}`,
      nombre: lead.nombre,
      servicio: lead.servicio,
      equipo: lead.equipo,
      zona: lead.zona,
      detalle: lead.detalle,
      horario: lead.horario || '-',
      acceso: lead.acceso || '-',
      contacto_en_sitio: lead.contactoEnSitio || '-',
      logistica: lead.logistica || '-',
      resumen: lead.resumen || '-',
      origen:
        (lead.origen === 'asesor'
          ? 'Pidió hablar con asesor'
          : lead.origen === 'ia'
            ? 'Listo para agendar (asistente IA)'
            : 'Cotización por bot') + (lead.actualizacion ? ' · actualización de una solicitud ya registrada' : ''),
      chat: `https://wa.me/${lead.telefono}`,
    })
    tasks.push(
      fetch(`${site.url}/__forms.html`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
        .then((r) => {
          report.form = `HTTP ${r.status}`
          if (!r.ok) console.error('[whatsapp] netlify form failed', r.status)
        })
        .catch((e) => {
          report.form = `error ${String(e)}`
          console.error('[whatsapp] netlify form failed', e)
        })
    )
  }

  // 2) WhatsApp al equipo. Meta ACEPTA un mensaje normal aunque después lo marque como fallido
  //    (error 131047) si el equipo no ha escrito al bot en 24 h; por eso no basta con "reintentar
  //    si falla": se decide antes. Ventana abierta → mensaje normal (más completo); cerrada →
  //    plantilla aprobada (funciona siempre). El equipo abre la ventana escribiendo cualquier
  //    cosa al número del bot. Número y plantilla se cambian por variables de entorno.
  const team = process.env.WA_TEAM_NUMBER || '5213324568104'
  const template = process.env.WA_TEAM_TEMPLATE || 'nuevo_lead'
  if (team) {
    const texto = [
      `🔔 *${lead.actualizacion ? 'Actualización de solicitud' : 'Nuevo contacto por WhatsApp'}*${lead.origen === 'asesor' ? ' (pide asesor)' : ''}`,
      `Folio: ${folio}`,
      `Nombre: ${lead.nombre}`,
      `Servicio: ${lead.servicio}`,
      lead.equipo ? `Equipo: ${lead.equipo}` : null,
      `Zona: ${lead.zona}`,
      `Detalle: ${lead.detalle}`,
      lead.horario ? `Horario preferido: ${lead.horario}` : null,
      lead.acceso ? `Acceso: ${lead.acceso}` : null,
      lead.contactoEnSitio ? `Recibe: ${lead.contactoEnSitio}` : null,
      lead.logistica ? `Logística: ${lead.logistica}` : null,
      lead.resumen ? `\nResumen: ${lead.resumen}` : null,
      `\nResponder: https://wa.me/${lead.telefono}`,
    ]
      .filter(Boolean)
      .join('\n')
    tasks.push(
      (async () => {
        const abierta = await teamWindowOpen()
        report.ventana = abierta ? 'abierta' : 'cerrada'
        let textOk = false
        if (abierta) {
          const r = await send({ type: 'text', to: team, body: texto.slice(0, 4000) })
          textOk = r.ok
          report.whatsappText = r.ok ? 'ok' : `error ${r.error}`
        }
        if (!textOk && template) {
          const t = await send({
            type: 'template',
            to: team,
            name: template,
            lang: process.env.WA_TEAM_TEMPLATE_LANG || 'es_MX',
            params: [
              templateParam(`${lead.nombre} (${folio})`, 120),
              templateParam(lead.servicio, 120),
              templateParam(lead.equipo || '-', 200),
              templateParam(lead.zona, 200),
              templateParam(`${lead.detalle}${lead.horario ? ` · Horario: ${lead.horario}` : ''}${lead.acceso ? ` · Acceso: ${lead.acceso}` : ''}`),
              templateParam(`+${lead.telefono}`, 40),
            ],
          })
          report.whatsappTemplate = t.ok ? 'ok' : `error ${t.error}`
        }
      })()
    )
  }

  await Promise.all(tasks)
  console.log('[whatsapp] notifyTeam', JSON.stringify(report))
  return report
}
