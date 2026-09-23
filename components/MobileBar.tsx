'use client'

import { Phone, MessageCircle } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'
import { track } from '@/lib/analytics'

/** Barra fija inferior en móvil con Llamar y WhatsApp. En escritorio no se muestra. */
export default function MobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white/95 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur sm:hidden"
      role="region"
      aria-label="Contacto rápido"
    >
      <a
        href={`tel:${site.phones.main.e164}`}
        onClick={() => track('contact_call', { location: 'barra-movil' })}
        className="btn-navy py-3"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Llamar
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('contact_whatsapp', { location: 'barra-movil' })}
        className="btn-whatsapp py-3"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  )
}
