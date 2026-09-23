import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'
import { site } from '@/lib/site'
import SectionHeading from '@/components/ui/SectionHeading'

const testimonials = [
  {
    name: 'Alejandra Pinal',
    content: 'Excelente servicio. Muy puntuales y muy amables. Se empeñaron en dejar el espacio muy limpio.',
  },
  {
    name: 'Jose Casas Cárdenas',
    content:
      'El mejor servicio, puntuales, atentos, dejan limpio en los lugares que trabajan, cumplen con lo que prometen. Altamente recomendables.',
  },
  {
    name: 'Ricardo Rodríguez',
    content:
      'Excelente servicio, excelente atención y la mejor recomendación por muy buen precio en equipos reconocidos; la mejor opción para sus próximos proyectos.',
  },
  {
    name: 'Ana Cortez',
    content:
      'Excelente la atención del personal y su trabajo. Llevo más de 3 años contratándolos para el mantenimiento del aire de nuestra oficina y nunca hemos tenido ningún problema.',
  },
  {
    name: 'Gerardo D. Treviño Villa',
    badge: 'Local Guide',
    content: 'Excelente equipo de trabajo, muy buen servicio de venta e instalación, altamente recomendable.',
  },
]

export default function Testimonials() {
  return (
    <section id="opiniones" className="relative scroll-mt-20 overflow-hidden bg-navy-900 py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-navy-500/40 blur-3xl" />
      </div>
      <div className="container relative">
        <SectionHeading
          light
          eyebrow="Opiniones"
          title="Lo que dicen nuestros clientes"
          description={`Calificación de ${site.googleRating} de 5 en reseñas de Google.`}
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className={`flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur ${
                i === testimonials.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-50">“{t.content}”</blockquote>
              <footer className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-extrabold text-white">
                  {t.name.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-navy-200">{t.badge ?? 'Reseña en Google'}</p>
                </div>
              </footer>
            </li>
          ))}
          <li className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 p-6 text-center">
            <span className="rounded-xl bg-white px-4 py-2">
              <Image src="/images/googleOpinion.png" alt="Google" width={90} height={41} className="h-8 w-auto" />
            </span>
            <p className="tabular mt-4 text-3xl font-extrabold">{site.googleRating} / 5</p>
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-200 hover:text-white"
            >
              Ver todas las reseñas
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
