'use client'

import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/site'
import { track } from '@/lib/analytics'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('contact_whatsapp', { location: 'flotante' })}
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 hidden items-center sm:flex gap-2 rounded-full bg-whatsapp py-3 pl-3 pr-3 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,.7)] transition-all hover:bg-whatsapp-dark sm:pr-5"
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/30 motion-safe:animate-ping" aria-hidden="true" />
        <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
      </span>
      <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
    </a>
  )
}
