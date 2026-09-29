/**
 * Folio legible para identificar cada solicitud en los correos y avisos.
 * Formato: PREFIJO-AAMMDD-HHMM (hora de Guadalajara), por ejemplo C-260929-1432.
 *  C = cotización desde el formulario del sitio · W = lead del asistente de WhatsApp
 */
export function makeFolio(prefix: 'C' | 'W', date = new Date()): string {
  const parts = new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value.padStart(2, '0') ?? '00'
  return `${prefix}-${get('year')}${get('month')}${get('day')}-${get('hour')}${get('minute')}`
}
