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

  // 2) WhatsApp al equipo (plantilla aprobada; fuera de la ventana de 24 h solo se permiten plantillas)
  const team = process.env.WA_TEAM_NUMBER
  const template = process.env.WA_TEAM_TEMPLATE
  if (team && template) {
    tasks.push(
      send({
        type: 'template',
        to: team,
        name: template,
        lang: process.env.WA_TEAM_TEMPLATE_LANG || 'es_MX',
        params: [lead.nombre, lead.servicio, lead.equipo || '-', lead.zona, `${lead.detalle}${lead.horario ? ` · Horario: ${lead.horario}` : ''}${lead.acceso ? ` · Acceso: ${lead.acceso}` : ''}`, `+${lead.telefono}`],
      })
    )
  }

  await Promise.all(tasks)
}
