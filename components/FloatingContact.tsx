'use client'

import { useEffect, useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'
import { track } from '@/lib/analytics'

/**
 * Control flotante de contacto (Llamar + WhatsApp), igual en móvil y escritorio.
 * Para no ser invasivo:
 *  - aparece solo después de pasar la primera pantalla (el hero ya tiene su botón de WhatsApp);
 *  - se oculta mientras esté visible una zona que ya tiene botones de contacto
 *    (elementos con el atributo data-contact-zone: banda de CTA, sección de contacto y footer).
 */
export default function FloatingContact() {
  const [pastTop, setPastTop] = useState(false)
  const [zoneVisible, setZoneVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastTop(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const zones = Array.from(document.querySelectorAll<HTMLElement>('[data-contact-zone]'))
    if (!zones.length) return
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
        setZoneVisible(visible.size > 0)
      },
      { threshold: 0, rootMargin: '0px 0px -96px 0px' }
    )
    zones.forEach((z) => io.observe(z))
    return () => io.disconnect()
  }, [])

  const show = pastTop && !zoneVisible

  return (
    <div
      aria-hidden={!show}
      className={`fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full border border-line bg-white/95 p-1.5 shadow-[0_12px_32px_-10px_rgba(15,27,51,.35)] backdrop-blur transition-all duration-300 sm:bottom-6 sm:right-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={`tel:${site.phones.main.e164}`}
        onClick={() => track('contact_call', { location: 'flotante' })}
        aria-label={`Llamar al ${site.phones.main.display}`}
        tabIndex={show ? 0 : -1}
        className="flex h-11 w-11 items-center justify-center rounded-full text-navy-700 transition-colors hover:bg-navy-50"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('contact_whatsapp', { location: 'flotante' })}
        tabIndex={show ? 0 : -1}
        className="flex h-11 items-center gap-2 rounded-full bg-whatsapp pl-3.5 pr-4 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Cotizar
      </a>
    </div>
  )
}
