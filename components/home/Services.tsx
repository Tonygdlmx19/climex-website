'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, X, Check, MessageCircle } from 'lucide-react'
import { services, type Service } from '@/lib/services'
import { whatsappUrl } from '@/lib/site'
import { serviceHref } from '@/lib/landings'
import SectionHeading from '@/components/ui/SectionHeading'
import TrackedLink from '@/components/TrackedLink'

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <section id="servicios" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que tu aire acondicionado necesita, en un solo lugar"
          description="Desde el mantenimiento de un minisplit hasta el proyecto de climatización completo de tu negocio."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.id} className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lift">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-extrabold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.short}</p>
                <div className="mt-5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelected(s)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                  >
                    Ver detalles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                  <Link href={serviceHref(s.id)} className="text-xs font-semibold text-slate-400 hover:text-ink">
                    Página del servicio
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && <ServiceDialog service={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

function ServiceDialog({ service, onClose }: { service: Service; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogo-servicio"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="relative h-44 shrink-0 sm:h-52">
          <Image src={service.image} alt="" fill sizes="672px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" aria-hidden="true" />
          <h3 id="dialogo-servicio" className="absolute bottom-5 left-6 right-16 text-2xl font-extrabold text-white">
            {service.title}
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <p className="leading-relaxed text-slate-600">{service.intro}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {service.includes.map((sec) => (
              <div key={sec.title}>
                <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-navy-700">{sec.title}</h4>
                <ul className="mt-3 space-y-2">
                  {sec.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-slate-600">{service.outro}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-line p-4 sm:flex-row sm:px-6">
          <TrackedLink
            event="contact_whatsapp"
            location={`servicio-${service.id}`}
            href={whatsappUrl(`Hola Climex, me interesa el servicio de ${service.title.toLowerCase()}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Cotizar este servicio
          </TrackedLink>
          <Link href="/#contacto" onClick={onClose} className="btn-outline flex-1">
            Enviar formulario
          </Link>
        </div>
      </div>
    </div>
  )
}
