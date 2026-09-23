import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, MessageCircle } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import CTABand from '@/components/CTABand'
import TrackedLink from '@/components/TrackedLink'
import { services } from '@/lib/services'
import { whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Servicios de aire acondicionado en Guadalajara',
  description:
    'Instalación, mantenimiento, reparación y venta de aire acondicionado en Guadalajara. Proyectos comerciales e industriales. Cotización gratis.',
  alternates: { canonical: '/servicios' },
}

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Servicios de aire acondicionado en Guadalajara"
        description="Residencial, comercial e industrial. Todas las marcas, técnicos certificados y garantía por escrito."
        crumbs={[{ name: 'Servicios' }]}
      />

      <nav aria-label="Servicios" className="sticky top-[72px] z-30 border-b border-line bg-white/90 backdrop-blur">
        <ul className="container flex gap-1 overflow-x-auto py-2 text-sm font-semibold">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} className="block rounded-full px-3.5 py-2 text-slate-600 hover:bg-mist hover:text-ink">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container space-y-20 py-16 lg:space-y-28 lg:py-24">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className="grid scroll-mt-32 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card ${i % 2 ? 'lg:order-2' : ''}`}>
              <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <span className="eyebrow">Servicio {String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.intro}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {s.includes.map((sec) => (
                  <div key={sec.title}>
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-navy-700">{sec.title}</h3>
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
              <p className="mt-6 text-sm text-slate-600">{s.outro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  event="contact_whatsapp"
                  location={`pagina-servicio-${s.id}`}
                  href={whatsappUrl(`Hola Climex, me interesa el servicio de ${s.title.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Cotizar por WhatsApp
                </TrackedLink>
                <Link href="/contacto" className="btn-outline">
                  Solicitar cotización
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <CTABand />
    </>
  )
}
