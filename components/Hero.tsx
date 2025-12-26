'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Clock, Award, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/instalacion.png"
          alt="Instalación de aire acondicionado"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Floating shapes for modern effect */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-white text-sm font-medium">+8 años de experiencia</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Expertos en{' '}
              <span className="text-accent relative">
                Climatización
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 4 50 7 100 7C150 7 150 1 200 1" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              para tu Hogar y Negocio
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-blue-100 max-w-xl mb-8">
              Instalación, mantenimiento y reparación de aires acondicionados en Guadalajara.
              Servicio profesional con garantía.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                Solicitar Cotización
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+523316145522"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all border border-white/20"
              >
                <Phone className="w-5 h-5" />
                33 1614 5522
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, text: 'Garantía en servicios' },
                { icon: Clock, text: 'Respuesta rápida' },
                { icon: Award, text: 'Técnicos certificados' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <item.icon className="w-6 h-6 text-accent" />
                  <span className="text-xs sm:text-sm font-medium text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '500+', label: 'Proyectos completados' },
                  { number: '8+', label: 'Años de experiencia' },
                  { number: '100%', label: 'Clientes satisfechos' },
                  { number: '24/7', label: 'Soporte disponible' },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
