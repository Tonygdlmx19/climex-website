import type { Metadata } from 'next'
import { Home, Store, Factory } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Gallery from '@/components/home/Gallery'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Trabajos realizados',
  description:
    'Fotos reales de instalaciones, mantenimientos y proyectos de aire acondicionado realizados por Climex en Guadalajara y zona metropolitana.',
  alternates: { canonical: '/proyectos' },
}

const types = [
  { icon: Home, title: 'Residencial', text: 'Minisplit inverter, piso-techo y sistemas para casas y departamentos.' },
  { icon: Store, title: 'Comercial', text: 'Oficinas, restaurantes, consultorios, tiendas y escuelas.' },
  { icon: Factory, title: 'Industrial', text: 'Bodegas, plantas y naves con cálculo de carga térmica.' },
]

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        eyebrow="Trabajos"
        title="Trabajos realizados"
        description="Instalaciones y servicios reales de nuestro equipo en Guadalajara, Zapopan, Tlaquepaque, Tonalá y Tlajomulco."
        crumbs={[{ name: 'Trabajos' }]}
      />

      <section className="container py-12">
        <ul className="grid gap-4 md:grid-cols-3">
          {types.map((t) => (
            <li key={t.title} className="card flex gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <t.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-extrabold text-ink">{t.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Gallery limit={100} showLink={false} id="galeria" heading={false} />

      <CTABand />
    </>
  )
}
