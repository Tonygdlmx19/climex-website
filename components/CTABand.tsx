import Link from 'next/link'
import { MessageCircle, Phone, ArrowRight } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'
import TrackedLink from '@/components/TrackedLink'

export default function CTABand() {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 px-6 py-12 text-white sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-navy-500/50 blur-3xl" />
          </div>
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
                ¿Listo para tener tu espacio fresco y sin preocupaciones?
              </h2>
              <p className="mt-3 max-w-xl text-navy-100">
                Cotización gratuita, respuesta el mismo día y garantía por escrito en {site.coverage.slice(0, 4).join(', ')} y alrededores.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <TrackedLink
                event="contact_whatsapp"
                location="cta"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </TrackedLink>
              <TrackedLink event="contact_call" location="cta" href={`tel:${site.phones.main.e164}`} className="btn-ghost-light flex-1">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="tabular">{site.phones.main.display}</span>
              </TrackedLink>
              <Link href="/contacto" className="btn bg-white text-navy-800 hover:bg-brand-50 flex-1">
                Formulario
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
