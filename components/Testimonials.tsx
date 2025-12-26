'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Roberto Martinez',
    company: 'Restaurante El Patron',
    content: 'Excelente servicio. Instalaron el sistema de clima en nuestro restaurante de manera rapida y profesional. El equipo funciona perfectamente.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maria Gonzalez',
    company: 'Oficinas Contables MG',
    content: 'Llevamos 3 anos con el servicio de mantenimiento y nunca hemos tenido problemas. Muy puntuales y el precio es justo.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Carlos Hernandez',
    company: 'Particular',
    content: 'Repararon mi minisplit que otra empresa no pudo arreglar. Muy recomendados, saben lo que hacen.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La satisfaccion de nuestros clientes es nuestra mejor carta de presentacion
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-neutral-light rounded-2xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-primary/20 mb-6" />

            <p className="text-lg md:text-xl text-gray-700 mb-8">
              {testimonials[current].content}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-semibold text-neutral-dark">{testimonials[current].name}</p>
                <p className="text-gray-500 text-sm">{testimonials[current].company}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="p-3 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  aria-label="Anterior testimonio"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={next}
                  className="p-3 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  aria-label="Siguiente testimonio"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Ir a testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
