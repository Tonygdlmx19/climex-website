/** Horario de atención de Climex en hora de Guadalajara. */
const TZ = 'America/Mexico_City'

export function isBusinessHours(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(date)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0') % 24
  if (weekday === 'Sun') return false
  if (weekday === 'Sat') return hour >= 9 && hour < 14
  return hour >= 9 && hour < 18
}
