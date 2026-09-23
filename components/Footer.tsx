import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'
import TrackedLink from '@/components/TrackedLink'
import { serviceHref } from '@/lib/landings'

const servicios = [
  { name: 'Instalación', href: serviceHref('instalacion') },
  { name: 'Mantenimiento', href: serviceHref('mantenimiento') },
  { name: 'Reparación', href: serviceHref('reparacion') },
  { name: 'Venta de equipos', href: '/servicios#venta' },
  { name: 'Proyectos comerciales', href: '/servicios#proyectos' },
]

const empresa = [
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Trabajos realizados', href: '/proyectos' },
  { name: 'Opiniones', href: '/#opiniones' },
  { name: 'Preguntas frecuentes', href: '/#preguntas' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Aviso de privacidad', href: '/privacidad' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1">
                <Image src="/images/logo-globo.png" alt="" width={44} height={44} className="h-10 w-10 object-contain" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-extrabold text-white">CLIMEX</span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300">
                  Soluciones Integrales
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">
              {site.yearsExperience} años instalando, manteniendo y reparando aire acondicionado en
              Guadalajara y su zona metropolitana. Servicio residencial, comercial e industrial.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-300">
              Cobertura
            </p>
            <p className="mt-1 text-sm text-navy-200">{site.coverage.join(' · ')}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Servicios</h3>
            <ul className="mt-4 space-y-2.5">
              {servicios.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-navy-200 transition-colors hover:text-white">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Empresa</h3>
            <ul className="mt-4 space-y-2.5">
              {empresa.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-navy-200 transition-colors hover:text-white">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <span className="flex flex-col">
                  <TrackedLink event="contact_call" href={`tel:${site.phones.main.e164}`} className="tabular text-white hover:text-brand-200">
                    {site.phones.main.display}
                  </TrackedLink>
                  <TrackedLink
                    event="contact_whatsapp"
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tabular text-navy-200 hover:text-white"
                  >
                    WhatsApp {site.whatsapp.display}
                  </TrackedLink>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <TrackedLink event="contact_email" href={`mailto:${site.email}`} className="text-navy-200 hover:text-white">
                  {site.email}
                </TrackedLink>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-navy-200 hover:text-white">
                  {site.address.street}, {site.address.neighborhood}
                  <br />
                  {site.address.city}, {site.address.state}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <span className="text-navy-200">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: <span className="tabular">{h.time}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</p>
          <p>Guadalajara, Jalisco, México</p>
        </div>
      </div>
    </footer>
  )
}
