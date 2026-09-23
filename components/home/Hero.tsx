import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, ShieldCheck, Star, Clock } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'
import TrackedLink from '@/components/TrackedLink'

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-mist">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="container relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            {site.googleRating} en Google · {site.yearsExperience} años de experiencia
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
            Aire acondicionado en Guadalajara,{' '}
            <span className="text-brand-600">bien instalado y con garantía.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Instalación, mantenimiento, reparación y venta de equipos para casas, oficinas y
            negocios. Técnicos certificados, refacciones originales y cotización sin compromiso.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              event="contact_whatsapp"
              location="hero"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-7 py-3.5 text-[15px]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Cotizar por WhatsApp
            </TrackedLink>
            <Link href="/#contacto" className="btn-outline px-7 py-3.5 text-[15px]">
              Solicitar cotización
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 flex max-w-xl flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-700">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              Garantía por escrito
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              Respuesta el mismo día
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              Todas las marcas
            </li>
          </ul>
        </div>

        <div className="relative animate-rise [animation-delay:120ms]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(15,27,51,.45)] lg:aspect-[5/4]">
            <Image
              src="/images/hero.png"
              alt="Familia disfrutando el aire acondicionado en su sala"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-navy-700 backdrop-blur">
              Servicio a domicilio en {site.coverage.slice(0, 4).join(', ')}
            </p>
          </div>

          <div className="card absolute -bottom-6 -left-3 flex items-center gap-4 px-5 py-4 sm:-left-8">
            <Image src="/images/googleOpinion.png" alt="Google" width={72} height={33} className="h-7 w-auto" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="tabular text-2xl font-extrabold text-ink">{site.googleRating}</span>
                <span className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
              </div>
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-500 hover:text-brand-600"
              >
                Opiniones verificadas en Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
