import type { Metadata } from 'next'
import Image from 'next/image'
import { Heart, ShieldCheck, Award, Users, Target, Eye } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import CTABand from '@/components/CTABand'
import Brands from '@/components/home/Brands'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Climex Soluciones Integrales: ${site.yearsExperience} años dando servicio de aire acondicionado en Guadalajara. Conoce nuestra historia, valores y garantías.`,
  alternates: { canonical: '/nosotros' },
}

const values = [
  { icon: Heart, title: 'Compromiso', text: 'Nos comprometemos con la satisfacción total del cliente en cada proyecto.' },
  { icon: ShieldCheck, title: 'Confianza', text: 'Transparencia y honestidad en presupuestos, tiempos y garantías.' },
  { icon: Award, title: 'Calidad', text: 'Materiales de primera, refacciones originales y buenas prácticas.' },
  { icon: Users, title: 'Profesionalismo', text: 'Equipo capacitado y certificado que llega puntual y trabaja limpio.' },
]

const guarantees = [
  { value: '1 año', label: 'de garantía en instalaciones' },
  { value: '90 días', label: 'de garantía en reparaciones' },
  { value: '100 %', label: 'refacciones originales' },
]

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title={`${site.yearsExperience} años cuidando el confort de Guadalajara`}
        description="Somos una empresa tapatía especializada en climatización para hogares, oficinas, comercios e industria."
        crumbs={[{ name: 'Nosotros' }]}
      />

      <section className="container grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <span className="eyebrow">Nuestra historia</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">De un taller familiar a un equipo integral</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
            <p>
              <strong className="text-ink">Climex Soluciones Integrales</strong> nació en Guadalajara con una idea sencilla:
              que contratar un servicio de aire acondicionado fuera fácil, claro y con garantía.
            </p>
            <p>
              Lo que empezó como un emprendimiento familiar hoy es una empresa reconocida por su puntualidad,
              limpieza y trato honesto, con más de {site.happyClients} clientes atendidos en la zona metropolitana.
            </p>
            <p>
              Atendemos desde el mantenimiento de un minisplit hasta proyectos de climatización completos, y
              complementamos con trabajos eléctricos, de albañilería y acabados para entregar todo terminado.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
          <Image src="/images/instalacion.png" alt="Técnicos de Climex instalando un equipo" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-20">
        <div className="container grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-600 text-white"><Target className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="text-xl font-extrabold text-ink">Misión</h2>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600">
              Brindar atención y servicio de alta calidad con personal calificado y especializado en todas las
              áreas, con precios competitivos y el compromiso de superar las expectativas de nuestros clientes.
            </p>
          </div>
          <div className="card p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white"><Eye className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="text-xl font-extrabold text-ink">Visión</h2>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600">
              Ser la empresa líder en soluciones de climatización y servicios integrales en México, reconocida por
              la excelencia en atención al cliente, la innovación tecnológica y el compromiso con el confort.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Valores</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Lo que guía nuestro trabajo</h2>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><v.icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-4 text-lg font-extrabold text-ink">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="garantias" className="bg-navy-900 py-16 text-white lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow !text-brand-200 before:!bg-brand-300">Garantías</span>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Respaldo por escrito en cada servicio</h2>
          </div>
          <dl className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {guarantees.map((g) => (
              <div key={g.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <dd className="tabular text-3xl font-extrabold text-brand-200">{g.value}</dd>
                <dt className="mt-1 text-sm text-navy-100">{g.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Brands />
      <CTABand />
    </>
  )
}
