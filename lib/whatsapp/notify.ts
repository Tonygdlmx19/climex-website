/**
 * Avisa al equipo de Climex de un nuevo lead:
 *  1) Netlify Forms (formulario "lead-whatsapp") → correo a administracion@…
 *  2) Plantilla de WhatsApp al número del equipo (opcional, requiere plantilla aprobada en Meta).
 */
import { site } from '@/lib/site'
import { send, dryRun } from './api'
import type { Lead } from './flow'

export async function notifyTeam(lead: Lead): Promise<void> {
  const tasks: Promise<unknown>[] = []

  // 1) Correo vía Netlify Forms
  if (!dryRun()) {
    const body = new URLSearchParams({
      'form-name': 'lead-whatsapp',
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
        lead.origen === 'asesor'
          ? 'Pidió hablar con asesor'
          : lead.origen === 'ia'
            ? 'Listo para agendar (asistente IA)'
            : 'Cotización por bot',
      chat: `https://wa.me/${lead.telefono}`,
    })
    tasks.push(
      fetch(`${site.url}/__forms.html`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      }).catch((e) => console.error('[whatsapp] netlify form failed', e))
    )
  }

  // 2) WhatsApp al equipo. Primero mensaje normal (funciona si el equipo escribió al bot en las
  //    últimas 24 h); si Meta lo rechaza, plantilla aprobada (funciona siempre).
  //    Número y plantilla se pueden cambiar por variables de entorno.
  const team = process.env.WA_TEAM_NUMBER || '5213324568104'
  const template = process.env.WA_TEAM_TEMPLATE || 'nuevo_lead'
  if (team) {
    const texto = [
      `🔔 *Nuevo contacto por WhatsApp*${lead.origen === 'asesor' ? ' (pide asesor)' : ''}`,
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
        const r = await send({ type: 'text', to: team, body: texto })
        if (!r.ok && template) {
          await send({
            type: 'template',
            to: team,
            name: template,
            lang: process.env.WA_TEAM_TEMPLATE_LANG || 'es_MX',
            params: [
              lead.nombre,
              lead.servicio,
              lead.equipo || '-',
              lead.zona,
              `${lead.detalle}${lead.horario ? ` · Horario: ${lead.horario}` : ''}${lead.acceso ? ` · Acceso: ${lead.acceso}` : ''}`,
              `+${lead.telefono}`,
            ],
          })
        }
      })()
    )
  }

  await Promise.all(tasks)
}
