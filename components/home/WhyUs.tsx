import Image from 'next/image'
import { Award, ShieldCheck, Users, Clock, Wrench, BadgeDollarSign, Target, Eye } from 'lucide-react'
import { site } from '@/lib/site'
import SectionHeading from '@/components/ui/SectionHeading'

const stats = [
  { value: `${site.yearsExperience}`, suffix: ' años', label: 'de experiencia en Guadalajara' },
  { value: `+${site.happyClients}`, suffix: '', label: 'clientes atendidos' },
  { value: `${site.googleRating}`, suffix: ' ★', label: 'calificación en Google' },
  { value: '1', suffix: ' año', label: 'de garantía en instalaciones' },
]

const features = [
  { icon: Award, title: 'Experiencia comprobada', text: `${site.yearsExperience} años de trayectoria en la zona metropolitana.` },
  { icon: ShieldCheck, title: 'Garantía por escrito', text: 'En instalaciones, reparaciones y mantenimientos.' },
  { icon: Users, title: 'Técnicos certificados', text: 'Personal capacitado en las principales marcas.' },
  { icon: Clock, title: 'Respuesta rápida', text: 'Atendemos y programamos visitas el mismo día o al siguiente.' },
  { icon: Wrench, title: 'Servicio integral', text: 'Eléctrico, albañilería y acabados incluidos.' },
  { icon: BadgeDollarSign, title: 'Precios claros', text: 'Cotización por escrito, sin costos ocultos.' },
]

export default function WhyUs() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-mist py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Por qué Climex"
              title="Cuidamos tu inversión como si fuera nuestra"
              description="Sabemos que el aire acondicionado de tu casa, oficina o negocio es una inversión importante. Por eso trabajamos con procesos claros, garantía y gente que sabe lo que hace."
            />
            <ul className="mt-9 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.title} className="flex gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{f.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/mantenimiento.png"
                alt="Técnico de Climex dando mantenimiento a un minisplit"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <dl className="card relative -mt-10 mx-4 grid grid-cols-2 gap-px overflow-hidden bg-line sm:mx-8">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-5 py-4">
                  <dt className="order-2 text-xs font-semibold text-slate-500">{s.label}</dt>
                  <dd className="tabular text-2xl font-extrabold text-navy-700">
                    {s.value}
                    <span className="text-base font-bold text-brand-600">{s.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-600 text-white">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-extrabold text-ink">Misión</h3>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600">
              Brindar atención y servicio de alta calidad con personal calificado y especializado en
              todas las áreas, con precios competitivos y el compromiso de superar tus expectativas.
            </p>
          </div>
          <div className="card p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
                <Eye className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-extrabold text-ink">Visión</h3>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600">
              Ser la empresa líder en soluciones de climatización y servicios integrales en México,
              reconocida por la excelencia en atención al cliente, la innovación y el compromiso con el
              confort de hogares y negocios.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
