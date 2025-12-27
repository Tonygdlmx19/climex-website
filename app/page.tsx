'use client'

import Image from 'next/image'
import BrandSlider from '@/components/BrandSlider'
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
  ShoppingBag,
  CheckCircle,
  Users,
  MessageCircle,
  Star,
  Send,
  Target,
  Eye,
  X
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// ============ SCROLL ANIMATION HOOK ============
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Animation classes helper
const fadeUp = (isVisible: boolean, delay = 0) =>
  `transition-all duration-700 ${delay ? `delay-[${delay}ms]` : ''} ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`

const fadeIn = (isVisible: boolean) =>
  `transition-all duration-700 ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`

// ============ HERO SECTION ============
function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contacto-form')
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const element = document.getElementById('servicios')
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center overflow-hidden pt-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Fondo Climex"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gray-100/90" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 border border-primary/20 mx-auto lg:mx-0">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">18 AÑOS DE EXPERIENCIA</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-royal">Climex</span>
              <br />
              <span className="text-neutral-dark">Soluciones Integrales</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8 mx-auto lg:mx-0">
              Servicio técnico especializado en sistemas de aire acondicionado y calefacción. Mantenimiento, Reparación, Venta de Equipo, Instalación y refacciones originales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Solicitar Cotización
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToServices}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-full transition-all border border-gray-200 shadow-sm"
              >
                Ver Servicios
              </button>
            </div>

            {/* Google Reviews */}
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm flex items-center gap-5">
                <Image
                  src="/images/googleOpinion.png"
                  alt="Google Reviews"
                  width={100}
                  height={100}
                  className="h-24 w-24 object-contain"
                />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-neutral-dark">4.8</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
              <div className="space-y-4">
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <Image
                    src="/aires/aires1 (1).png"
                    alt="Aire acondicionado minisplit"
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-56 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <Image
                    src="/aires/aires2.png"
                    alt="Equipos de climatización"
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-52 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <Image
                    src="/aires/aires3.png"
                    alt="Sistema de aire acondicionado"
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <Image
                    src="/aires/aires4.png"
                    alt="Unidad de aire acondicionado"
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ SERVICES SECTION ============
const services = [
  {
    title: 'Mantenimiento y Reparación',
    description: 'Nuestro servicio de mantenimiento es brindado con la mas alta calidad en el mercado.',
    image: '/images/mantenimiento.png',
    modalContent: {
      intro: 'Nuestro servicio de mantenimiento preventivo y correctivo está diseñado para garantizar el óptimo funcionamiento de sus equipos de aire acondicionado durante todo el año.',
      sections: [
        {
          title: '¿Qué incluye nuestro servicio?',
          items: ['Limpieza profunda de filtros y serpentines', 'Verificación y recarga de gas refrigerante', 'Revisión del sistema eléctrico y conexiones', 'Lubricación de partes móviles', 'Diagnóstico completo del equipo', 'Detección y reparación de fugas']
        },
        {
          title: 'Beneficios',
          items: ['Mayor vida útil de su equipo', 'Reducción en el consumo de energía', 'Mejor calidad del aire', 'Prevención de fallas costosas']
        }
      ],
      outro: 'Contamos con técnicos certificados y utilizamos herramientas de última generación para brindarle un servicio de primera calidad.'
    }
  },
  {
    title: 'Instalación',
    description: 'Servicio integral de instalación para que tu unidad quede en funcionamiento.',
    image: '/images/instalacion.png',
    modalContent: {
      intro: 'El servicio de instalación que brindamos es completamente integral. Nos encargamos de todas las áreas requeridas para que tu unidad de aire acondicionado quede en perfecto funcionamiento.',
      sections: [
        {
          title: 'Nuestro proceso de instalación incluye',
          items: ['Evaluación del espacio y recomendación del equipo ideal', 'Instalación de unidad interior y exterior', 'Tendido de tubería de cobre y cableado eléctrico', 'Instalación de drenaje', 'Trabajos de albañilería necesarios', 'Pruebas de funcionamiento y calibración']
        },
        {
          title: '¿Por qué elegirnos?',
          items: ['Evitas buscar diferentes proveedores', 'Ahorras tiempo y dinero', 'Garantía en mano de obra', 'Instalación limpia y profesional', 'Asesoría en el uso y cuidado del equipo']
        }
      ],
      outro: 'Trabajamos con todas las marcas y modelos del mercado, adaptándonos a las necesidades específicas de cada cliente.'
    }
  },
  {
    title: 'Proyección',
    description: 'Te apoyamos a diseñar y realizar tu proyecto de climatización de manera profesional.',
    image: '/images/proyectos.png',
    modalContent: {
      intro: 'Si tienes la idea de acondicionar un espacio ya sea residencial o comercial, pero no cuentas con información sobre el tema, permítenos apoyarte y realizar tu proyecto de manera profesional.',
      sections: [
        {
          title: 'Nuestro servicio de proyección incluye',
          items: ['Visita técnica para evaluación del espacio', 'Cálculo de carga térmica', 'Diseño del sistema de climatización', 'Selección de equipos adecuados', 'Presupuesto detallado', 'Planos y especificaciones técnicas']
        },
        {
          title: 'Tipos de proyectos que realizamos',
          items: ['Residenciales (casas y departamentos)', 'Comerciales (oficinas, tiendas, restaurantes)', 'Industriales (bodegas, plantas de producción)', 'Institucionales (escuelas, hospitales, hoteles)']
        }
      ],
      outro: 'Si ya cuentas con tu proyecto definido, contáctanos y déjanos saber cómo podemos ser parte de esa historia con un servicio de calidad que supere tus expectativas.'
    }
  },
  {
    title: 'Venta de Equipos',
    description: 'Equipos de las mejores marcas con garantía de fábrica.',
    image: '/images/venta.png',
    modalContent: {
      intro: 'Contamos con una amplia variedad de equipos de aire acondicionado de las mejores marcas del mercado, todos con garantía de fábrica y respaldo técnico.',
      sections: [
        {
          title: 'Marcas que manejamos',
          items: ['Mirage', 'York', 'Trane', 'Carrier', 'LG', 'Comfort Star', 'Lennox', 'Hisense']
        },
        {
          title: 'Tipos de equipos disponibles',
          items: ['Minisplit (residencial y comercial)', 'Piso Techo', 'Tipo Paquete', 'Tipo Ventana', 'Sistema Dividido', 'Equipos de precisión']
        },
        {
          title: 'Beneficios de comprar con nosotros',
          items: ['Asesoría personalizada para elegir el equipo ideal', 'Precios competitivos', 'Garantía de fábrica', 'Instalación profesional incluida (opcional)', 'Servicio post-venta', 'Refacciones originales disponibles']
        }
      ],
      outro: 'Te ayudamos a encontrar la solución perfecta para tus necesidades de climatización.'
    }
  },
  {
    title: 'Servicios Complementarios',
    description: 'Albañilería, tabla roca, pintura, fontanería e instalaciones eléctricas.',
    image: '/images/reparacion.png',
    modalContent: {
      intro: 'Además de nuestros servicios especializados en climatización, ofrecemos una gama completa de servicios complementarios para que tu proyecto quede completamente terminado.',
      sections: [
        {
          title: 'Servicios que ofrecemos',
          items: ['Albañilería: Apertura y cierre de huecos, resanes, acabados', 'Tabla roca: Instalación de plafones, muros divisorios, nichos', 'Pintura: Retoque y pintura de áreas afectadas por la instalación', 'Fontanería: Instalación de drenajes, conexiones de agua', 'Instalaciones eléctricas: Acometidas, centros de carga, cableado']
        },
        {
          title: 'Ventajas de nuestro servicio integral',
          items: ['Un solo proveedor para todo el proyecto', 'Coordinación eficiente de trabajos', 'Menor tiempo de ejecución', 'Garantía en todos los trabajos', 'Presupuesto integral sin sorpresas']
        }
      ],
      outro: 'Nuestro objetivo es que no tengas que preocuparte por nada. Nos encargamos de dejar tu espacio listo y funcionando perfectamente.'
    }
  },
]

function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="servicios" className="py-24 bg-gradient-to-b from-white to-neutral-light">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Lo que hacemos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Climex Soluciones Integrales pone a tu disposición una amplia gama de servicios en el tema de aire acondicionado y mantenimiento general.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  Más detalles
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-48">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                {selectedService.title}
              </h3>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
              {/* Intro */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {selectedService.modalContent.intro}
              </p>

              {/* Sections with items */}
              {selectedService.modalContent.sections.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h4 className="font-bold text-neutral-dark text-lg mb-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Outro */}
              <p className="text-gray-600 leading-relaxed">
                {selectedService.modalContent.outro}
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href="#contacto"
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all"
                >
                  Solicitar este servicio
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ============ MISION Y VISION SECTION ============
function MisionVisionSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="mision-vision" className="py-24 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Quiénes somos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
            Misión y Visión
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Porque sabemos que todo en su empresa, hogar o negocio es una inversión, Climex le ayuda a cuidarla.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Misión */}
          <div className={`bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-10 border border-primary/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-dark">Misión</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Nuestra misión es brindarle atención y servicio de alta calidad, con personal calificado y especializado en todas las áreas. Ofertando precios competitivos dentro del mercado y comprometiéndonos a superar sus expectativas.
            </p>
          </div>

          {/* Visión */}
          <div className={`bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-10 border border-primary/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-dark">Visión</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ser la empresa líder en soluciones de climatización y servicios integrales en México, reconocida por nuestra excelencia en atención al cliente, innovación tecnológica y compromiso con el confort de hogares y negocios.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ COUNTER CARD COMPONENT ============
function CounterCard() {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const targetCount = 830

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('counter-card')
      if (element && !hasAnimated) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHasAnimated(true)
          let current = 0
          const increment = targetCount / 60
          const timer = setInterval(() => {
            current += increment
            if (current >= targetCount) {
              setCount(targetCount)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 20)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasAnimated])

  return (
    <div id="counter-card" className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary">+{count}</div>
        <div className="text-gray-600 text-sm mt-1">Clientes satisfechos</div>
      </div>
    </div>
  )
}

// ============ ABOUT SECTION ============
const features = [
  { icon: Award, title: 'Experiencia Comprobada', description: 'Trayectoria en Guadalajara y más ciudades.' },
  { icon: Shield, title: 'Garantía en Servicios', description: 'Todos nuestros trabajos con garantía.' },
  { icon: Users, title: 'Personal Calificado', description: 'Técnicos especializados en todas las áreas.' },
  { icon: Clock, title: 'Respuesta Rápida', description: 'Atención oportuna a tus necesidades.' },
  { icon: Wrench, title: 'Servicio Integral', description: 'Todo lo que necesitas en un solo lugar.' },
  { icon: CheckCircle, title: 'Precios Competitivos', description: 'Cotizaciones justas y transparentes.' },
]

function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="nosotros" className="py-24 bg-neutral-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/clientes.png"
                alt="Clientes satisfechos"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <CounterCard />
          </div>

          {/* Content side */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
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
const trabajos = [
  '/trabajos/025eda32-a3b3-4f6a-b090-e3ff06818658.JPG',
  '/trabajos/1ae1ac62-09e1-40cf-a1e0-4652b7e1d78a.JPG',
  '/trabajos/2227b464-edc6-4f5e-bc6f-e3d1dc9f56e6.JPG',
  '/trabajos/5c415407-df59-41a4-a8d7-30c99bd2d53c.JPG',
  '/trabajos/96632c65-46f1-4256-8328-e8c75d709b77.JPG',
  '/trabajos/9d5f79e2-dce4-47e5-8176-c7be3acadaba.JPG',
  '/trabajos/b648827d-2b91-4b52-b2be-09705281cbf3.JPG',
  '/trabajos/b81ae4ae-757d-4149-b2d2-50880d735645.JPG',
  '/trabajos/e6c0b2ff-8274-49a8-9dbf-b28895a0d705.JPG',
]

function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trabajos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev === 0 ? trabajos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % trabajos.length)
  }

  return (
    <section id="proyectos" className="py-24 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Nuestro trabajo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
            Algunos de Nuestros Trabajos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Conoce la calidad de nuestro trabajo a través de proyectos realizados para nuestros clientes
          </p>
        </div>

        {/* Carousel */}
        <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '200ms' }}>
          {/* Main Image */}
          <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            {trabajos.map((trabajo, index) => (
              <div
                key={trabajo}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={trabajo}
                  alt={`Trabajo realizado ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Counter badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <span className="text-sm font-semibold text-neutral-dark">
                {currentIndex + 1} / {trabajos.length}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap max-w-4xl mx-auto">
          {trabajos.map((trabajo, index) => (
            <button
              key={trabajo}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(index)
              }}
              className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-2 ring-primary ring-offset-2 scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={trabajo}
                alt={`Miniatura ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS SECTION ============
const testimonials = [
  {
    name: 'Alejandra Pinal',
    date: 'Hace 43 semanas',
    content: 'Excelente servicio. Muy puntuales y muy amables. Se empeñaron en dejar el espacio muy limpio.',
    rating: 5,
  },
  {
    name: 'Jose Casas Cardenas',
    date: 'Hace 45 semanas',
    content: 'El mejor servicio, puntuales, atentos, dejan limpio en los lugares que trabajan, cumplen con lo que prometen altamente recomendables.',
    rating: 5,
  },
  {
    name: 'Ricardo Rodriguez',
    date: 'Hace 47 semanas',
    content: 'Excelente servicio, excelente atención y la mejor recomendación por muy buen precio en equipos reconocidos; la mejor opción para sus próximos proyectos.',
    rating: 5,
  },
  {
    name: 'Ana Cortez',
    date: 'Hace 47 semanas',
    content: 'Excelente la atención del personal y su trabajo! Llevo más de 3 años contratándolos para el servicio de mantenimiento de aire de nuestra oficina y nunca hemos tenido ningún problema!',
    rating: 5,
  },
  {
    name: 'Gerardo D. Treviño Villa',
    date: '17 feb 2024',
    content: 'Excelente equipo de trabajo, muy buen servicio de venta e instalación, altamente recomendable.',
    rating: 5,
    isLocalGuide: true,
  },
]

function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/images/googleOpinion.png"
              alt="Google Reviews"
              width={160}
              height={160}
              className="h-40 w-40 object-contain mb-4"
            />
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              Opiniones de Google
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : '0ms' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{testimonial.date}</span>
              </div>
              <p className="text-gray-600 mb-4">&quot;{testimonial.content}&quot;</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-neutral-dark text-sm">{testimonial.name}</div>
                  {testimonial.isLocalGuide && (
                    <div className="text-xs text-primary">Local Guide</div>
                  )}
                </div>
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
  const { ref, isVisible } = useScrollAnimation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Hola, me gustaría solicitar información:\n\nNombre: ${formData.nombre}\nTeléfono: ${formData.telefono}\nEmail: ${formData.email}\nServicio: ${formData.servicio}\nMensaje: ${formData.mensaje}`
    window.open(`https://wa.me/523328000443?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  return (
    <section id="contacto" className="py-24 bg-neutral-light">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Contáctanos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              Contáctanos hoy para una cotización gratuita. Nuestro equipo está listo para ayudarte.
            </p>

            <div className="space-y-6">
              <a
                href="tel:+523328000443"
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Teléfono</div>
                  <div className="font-semibold text-neutral-dark">33 2800 0443</div>
                </div>
              </a>

              <a
                href="https://wa.me/523324568104"
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

              <a
                href="mailto:ventas@climexsi.com.mx"
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-semibold text-neutral-dark">ventas@climexsi.com.mx</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Ubicación</div>
                  <div className="font-semibold text-neutral-dark">Calle Válvula #5986-A, Col. Álamo Industrial, Guadalajara, Jalisco</div>
                </div>
              </div>

              {/* Google Map */}
              <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.066!2d-103.3183!3d20.6597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1e2c5a7d4b7%3A0x1234567890abcdef!2sCalle%20V%C3%A1lvula%205986%2C%20%C3%81lamo%20Industrial%2C%20Guadalajara%2C%20Jal.!5e0!3m2!1ses!2smx!4v1703656800000!5m2!1ses!2smx"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Climex"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contacto-form" className={`bg-white rounded-3xl p-8 shadow-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg shadow-black/30">
              <Image
                src="/images/logoClimex.png"
                alt="Climex Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
            </div>
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
              href="https://wa.me/523324568104"
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
      <BrandSlider />
      <ServicesSection />
      <MisionVisionSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  )
}
