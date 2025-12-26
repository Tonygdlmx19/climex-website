'use client'

import Image from 'next/image'
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Shield,
  Clock,
  Award,
  Wrench,
  ThermometerSnowflake,
  Settings,
  Building2,
  Wind,
  ShoppingBag,
  CheckCircle,
  Users,
  MessageCircle,
  Star,
  Send
} from 'lucide-react'
import { useState, useEffect } from 'react'

// ============ HERO SECTION ============
function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contacto')
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const element = document.getElementById('servicios')
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/instalacion.png"
          alt="Instalación de aire acondicionado"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-white text-sm font-medium">+8 años de experiencia en Guadalajara</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Expertos en{' '}
              <span className="text-accent relative inline-block">
                Climatización
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 4 50 7 100 7C150 7 150 1 200 1" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              para tu Confort
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-xl mb-8">
              Instalación, mantenimiento y reparación de aires acondicionados.
              Servicio profesional con garantía para hogares y negocios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                Solicitar Cotización Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToServices}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all border border-white/20"
              >
                Ver Servicios
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, text: 'Garantía' },
                { icon: Clock, text: 'Respuesta 24hrs' },
                { icon: Award, text: 'Certificados' },
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

// ============ SERVICES SECTION ============
const services = [
  {
    icon: ThermometerSnowflake,
    title: 'Instalación',
    description: 'Instalación profesional de equipos minisplit, central y comercial con garantía.',
    image: '/images/instalacion.png',
  },
  {
    icon: Settings,
    title: 'Mantenimiento',
    description: 'Mantenimiento preventivo y correctivo para máximo rendimiento.',
    image: '/images/mantenimiento.png',
  },
  {
    icon: Wrench,
    title: 'Reparación',
    description: 'Diagnóstico y reparación de fallas en equipos de todas las marcas.',
    image: '/images/reparacion.png',
  },
  {
    icon: Building2,
    title: 'Proyectos Comerciales',
    description: 'Sistemas de climatización para comercios, oficinas e industrias.',
    image: '/images/proyectos.png',
  },
  {
    icon: ShoppingBag,
    title: 'Venta de Equipos',
    description: 'Equipos de las mejores marcas con garantía de fábrica.',
    image: '/images/venta.png',
  },
  {
    icon: Wind,
    title: 'Recarga de Gas',
    description: 'Recarga de refrigerante y detección de fugas.',
    image: '/images/recarga.png',
  },
]

function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-gradient-to-b from-white to-neutral-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Lo que hacemos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Soluciones completas en climatización para hogares y negocios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ ABOUT SECTION ============
const features = [
  { icon: Award, title: '+8 Años de Experiencia', description: 'Trayectoria comprobada en Guadalajara.' },
  { icon: Shield, title: 'Garantía en Servicios', description: 'Todos nuestros trabajos con garantía.' },
  { icon: Users, title: 'Técnicos Certificados', description: 'Personal capacitado y profesional.' },
  { icon: Clock, title: 'Respuesta Rápida', description: 'Atención en 24-48 horas.' },
  { icon: Wrench, title: 'Servicio Integral', description: 'Instalación, mantenimiento y reparación.' },
  { icon: CheckCircle, title: 'Precios Justos', description: 'Cotizaciones transparentes.' },
]

function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-neutral-light relative overflow-hidden">
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
                className="object-cover"
              />
            </div>
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
              Sobre nosotros
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              Somos tu mejor opción para servicios de climatización en Guadalajara y zona metropolitana.
              Ofrecemos soluciones profesionales con los más altos estándares de calidad.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
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

// ============ PROJECTS SECTION ============
const projects = [
  { image: '/images/ducto.png', title: 'Sistema de Ductos', category: 'Comercial' },
  { image: '/images/paquete.png', title: 'Aire Tipo Paquete', category: 'Industrial' },
  { image: '/images/mantenimiento2.png', title: 'Mantenimiento Preventivo', category: 'Residencial' },
  { image: '/images/reparacion2.png', title: 'Reparación de Equipos', category: 'Comercial' },
  { image: '/images/proyectos.png', title: 'Proyecto Corporativo', category: 'Oficinas' },
  { image: '/images/confort.png', title: 'Climatización Residencial', category: 'Residencial' },
]

function ProjectsSection() {
  return (
    <section id="proyectos" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Nuestro trabajo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
            Proyectos Realizados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Conoce algunos de los proyectos que hemos realizado para nuestros clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-accent text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS SECTION ============
const testimonials = [
  {
    name: 'María García',
    role: 'Propietaria de Restaurante',
    content: 'Excelente servicio. Instalaron el sistema de aire acondicionado en mi restaurante y quedó perfecto. Muy profesionales.',
    rating: 5,
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Gerente de Oficina',
    content: 'El mantenimiento que nos dan es de primera. Siempre puntuales y el equipo funciona como nuevo después de cada visita.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Ama de Casa',
    content: 'Repararon mi minisplit que ya no enfriaba. Llegaron rápido y el precio fue muy justo. Los recomiendo totalmente.',
    rating: 5,
  },
]

function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-blue-100 mb-6 italic">&quot;{testimonial.content}&quot;</p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-blue-200">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ CONTACT SECTION ============
function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: '',
    mensaje: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para enviar el formulario
    const whatsappMessage = `Hola, me gustaría solicitar información:\n\nNombre: ${formData.nombre}\nTeléfono: ${formData.telefono}\nEmail: ${formData.email}\nServicio: ${formData.servicio}\nMensaje: ${formData.mensaje}`
    window.open(`https://wa.me/523316145522?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  return (
    <section id="contacto" className="py-24 bg-neutral-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Contáctanos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
              ¿Listo para mejorar tu climatización?
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              Contáctanos hoy para una cotización gratuita. Nuestro equipo está listo para ayudarte.
            </p>

            <div className="space-y-6">
              <a
                href="tel:+523316145522"
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Teléfono</div>
                  <div className="font-semibold text-neutral-dark">33 1614 5522</div>
                </div>
              </a>

              <a
                href="https://wa.me/523316145522"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">WhatsApp</div>
                  <div className="font-semibold text-neutral-dark">Enviar mensaje</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-semibold text-neutral-dark">contacto@climex.mx</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Ubicación</div>
                  <div className="font-semibold text-neutral-dark">Guadalajara, Jalisco</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-neutral-dark mb-6">Solicita tu cotización</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Tu teléfono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Tu email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servicio de interés</label>
                <select
                  required
                  value={formData.servicio}
                  onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="Instalación">Instalación</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Reparación">Reparación</option>
                  <option value="Venta de Equipos">Venta de Equipos</option>
                  <option value="Proyecto Comercial">Proyecto Comercial</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Enviar Solicitud
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-neutral-dark py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logoClimex.png"
              alt="Climex Logo"
              width={40}
              height={40}
            />
            <div>
              <span className="text-white font-bold">Climex</span>
              <span className="block text-xs text-gray-400">Soluciones Integrales</span>
            </div>
          </div>

          <div className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Climex Soluciones Integrales. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/523316145522"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </a>
            <a
              href="tel:+523316145522"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Phone className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============ MAIN PAGE ============
export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  )
}
