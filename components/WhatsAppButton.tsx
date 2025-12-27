'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneNumber = '523328000443'
  const message = 'Hola, me gustaría solicitar información sobre sus servicios de aire acondicionado.'

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip/Message bubble */}
      <div
        className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-w-[280px] transition-all duration-300 ${
          isExpanded
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsExpanded(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="text-sm text-gray-600 mb-3">
          ¿Tienes dudas? Escríbenos por WhatsApp y te atenderemos de inmediato.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-green-600 transition-colors w-full justify-center"
        >
          <MessageCircle className="w-4 h-4" />
          Iniciar chat
        </a>
      </div>

      {/* Main button */}
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />

        {/* Label badge */}
        <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg px-4 py-2 whitespace-nowrap transition-all duration-300 ${
          isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          <span className="text-sm font-medium text-gray-700">¿Necesitas ayuda?</span>
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rotate-45 shadow-sm" />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  )
}
