'use client'

import { Shield, Clock, Award, Wrench, CheckCircle, Users } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: Award,
    title: '+8 Años de Experiencia',
    description: 'Trayectoria comprobada en el mercado de climatización en Guadalajara.',
  },
  {
    icon: Shield,
    title: 'Garantía en Servicios',
    description: 'Todos nuestros trabajos cuentan con garantía por escrito.',
  },
  {
    icon: Users,
    title: 'Técnicos Certificados',
    description: 'Personal capacitado y certificado en las mejores marcas.',
  },
  {
    icon: Clock,
    title: 'Respuesta Rápida',
    description: 'Atendemos emergencias y programamos visitas en 24-48 horas.',
  },
  {
    icon: Wrench,
    title: 'Servicio Integral',
    description: 'Desde instalación hasta mantenimiento preventivo y correctivo.',
  },
  {
    icon: CheckCircle,
    title: 'Precios Justos',
    description: 'Cotizaciones transparentes sin costos ocultos.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-neutral-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/confort.png"
                alt="Confort y calidad"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-neutral-dark">500+</div>
                  <div className="text-gray-600 text-sm">Clientes satisfechos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Nuestra promesa
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              Somos tu mejor opción para servicios de climatización en Guadalajara y zona metropolitana
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-dark mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
