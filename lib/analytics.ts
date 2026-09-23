/**
 * Eventos de conversión. Si existe gtag (Google Ads / GA4 configurado con
 * NEXT_PUBLIC_GA_ID) se envían; si no, no hacen nada.
 *
 * Eventos usados en el sitio:
 *  - contact_whatsapp  clic en cualquier botón de WhatsApp
 *  - contact_call      clic en un teléfono
 *  - contact_email     clic en correo
 *  - form_submit       envío del formulario de cotización
 */
export type ConversionEvent =
  | 'contact_whatsapp'
  | 'contact_call'
  | 'contact_email'
  | 'form_submit'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function track(event: ConversionEvent, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return
  try {
    window.gtag?.('event', event, params)
    window.dataLayer?.push({ event, ...params })
  } catch {
    /* sin analítica */
  }
}
