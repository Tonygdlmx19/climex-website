import Image from 'next/image'
import Link from 'next/link'
import { Check, MessageCircle, Phone, ShieldCheck, Star, Clock, ArrowRight } from 'lucide-react'
import type { Landing } from '@/lib/landings'
import { site, whatsappUrl } from '@/lib/site'
import PageHero from '@/components/ui/PageHero'
import TrackedLink from '@/components/TrackedLink'
import Process from '@/components/home/Process'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'

/** Landing SEO de un servicio (mantenimiento, reparación, instalación). */
export default function ServiceLanding({ landing: l }: { landing: Landing }) {
  const s = l.service
  const wa = whatsappUrl(l.whatsappMessage)
  const loc = `landing-${s.id}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: l.h1,
      serviceType: s.title,
      description: l.metaDescription,
      url: `${site.url}/${l.slug}`,
      provider: { '@type': 'HVACBusiness', name: site.name, url: site.url, telephone: site.phones.main.e164 },
      areaServed: site.coverage.map((c) => ({ '@type': 'City', name: c })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${site.url}/servicios` },
        { '@type': 'ListItem', position: 3, name: s.title, item: `${site.url}/${l.slug}` },
      ],
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={l.eyebrow}
        title={l.h1}
        description={l.lead}
        crumbs={[{ name: 'Servicios', href: '/servicios' }, { name: s.title }]}
      />

      {/* Intro + foto + confianza */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {l.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-lg leading-relaxed text-slate-600 first:mt-0">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink event="contact_whatsapp" location={loc} href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-7 py-3.5 text-[15px]">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Cotizar por WhatsApp
              </TrackedLink>
              <TrackedLink event="contact_call" location={loc} href={`tel:${site.phones.main.e164}`} className="btn-outline px-7 py-3.5 text-[15px]">
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span className="tabular">{site.phones.main.display}</span>
              </TrackedLink>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              <li className="card flex items-center gap-3 px-4 py-3">
                <Star className="h-5 w-5 shrink-0 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-700">
                  <span className="tabular">{site.googleRating}</span> en Google ({site.googleReviewCount} reseñas)
                </span>
              </li>
              <li className="card flex items-center gap-3 px-4 py-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-700">Garantía por escrito</span>
              </li>
              <li className="card flex items-center gap-3 px-4 py-3">
                <Clock className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-700">{site.yearsExperience} años de experiencia</span>
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <Image src={s.image} alt={l.h1} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Qué incluye + señales */}
      <section className="bg-mist py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {s.includes.map((sec) => (
              <div key={sec.title} className="card p-7">
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-navy-700">{sec.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {sec.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="card bg-navy-800 p-7 text-white">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-brand-200">{l.signals.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {l.signals.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-navy-50">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">{s.outro}</p>
        </div>
      </section>

      <Process />

      {/* Fotos reales */}
      <section className="bg-mist py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Trabajos reales</span>
              <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Así trabajamos en Guadalajara</h2>
            </div>
            <Link href="/proyectos" className="btn-outline">
              Ver todos los trabajos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {l.photos.map((w) => (
              <li key={w.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={w.src} alt={w.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ
        items={l.faq}
        title={`Preguntas frecuentes sobre ${s.title.toLowerCase()}`}
        description="Si tu duda no está aquí, escríbenos por WhatsApp y te respondemos el mismo día."
      />

      {/* Cotización */}
      <section id="contacto" className="scroll-mt-20 bg-mist py-16 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Cotización gratis</span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Cotiza tu {s.title.toLowerCase()} hoy</h2>
            <p className="mt-4 text-lg text-slate-600">
              Atendemos {site.coverage.slice(0, 4).join(', ')} y alrededores. Respuesta el mismo día en horario de oficina.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <TrackedLink event="contact_whatsapp" location={`${loc}-form`} href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp {site.whatsapp.display}
              </TrackedLink>
              <TrackedLink event="contact_call" location={`${loc}-form`} href={`tel:${site.phones.main.e164}`} className="btn-outline">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Llamar {site.phones.main.display}
              </TrackedLink>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              {site.hours.map((h) => `${h.days}: ${h.time}`).join(' · ')}
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="text-xl font-extrabold text-ink">Solicita tu cotización</h3>
            <p className="mt-1 text-sm text-slate-600">Llena el formulario o mándanos los datos por WhatsApp.</p>
            <div className="mt-6">
              <ContactForm defaultService={l.formService} />
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
