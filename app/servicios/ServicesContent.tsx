'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThermometerSnowflake, Settings, Wrench, Building2, CheckCircle, ArrowRight, Wind, ShoppingBag } from 'lucide-react'

const services = [
  {
    id: 'instalacion',
    icon: ThermometerSnowflake,
    title: 'Instalación de Aires Acondicionados',
    description: 'Instalación profesional de equipos minisplit, central y comercial. Trabajamos con todas las marcas del mercado.',
    image: '/images/instalacion.png',
    features: [
      'Visita técnica para evaluación del espacio',
      'Asesoría en selección del equipo adecuado',
      'Instalación con materiales de primera calidad',
      'Configuración y pruebas de funcionamiento',
      'Capacitación de uso al cliente',
      'Garantía de instalación por 1 año',
    ],
  },
  {
    id: 'mantenimiento',
    icon: Settings,
    title: 'Mantenimiento Preventivo y Correctivo',
    description: 'Mantén tu equipo funcionando de manera óptima con nuestro servicio de mantenimiento programado.',
    image: '/images/mantenimiento.png',
    features: [
      'Limpieza profunda de filtros y serpentines',
      'Revisión de niveles de refrigerante',
      'Verificación de conexiones eléctricas',
      'Lubricación de partes móviles',
      'Detección temprana de fallas',
      'Reporte detallado del estado del equipo',
    ],
  },
  {
    id: 'reparacion',
    icon: Wrench,
    title: 'Reparación de Equipos',
    description: 'Diagnosticamos y reparamos fallas en equipos de aire acondicionado de todas las marcas.',
    image: '/images/reparacion.png',
    features: [
      'Diagnóstico preciso de fallas',
      'Reparación de fugas de refrigerante',
      'Cambio de compresores y motores',
      'Reparación de tarjetas electrónicas',
      'Refacciones originales disponibles',
      'Garantía en reparaciones',
    ],
  },
  {
    id: 'proyectos',
    icon: Building2,
    title: 'Proyectos Especiales',
    description: 'Diseñamos e instalamos sistemas de climatización para comercios, oficinas y proyectos industriales.',
    image: '/images/proyectos.png',
    features: [
      'Diseño de sistemas de climatización',
      'Cálculo de cargas térmicas',
      'Instalación de sistemas VRF',
      'Ductos y difusores',
      'Automatización y control',
      'Mantenimiento de pólizas empresariales',
    ],
  },
  {
    id: 'venta',
    icon: ShoppingBag,
    title: 'Venta de Equipos',
    description: 'Contamos con equipos de las mejores marcas del mercado con garantía de fábrica.',
    image: '/images/venta.png',
    features: [
      'Minisplits de alta eficiencia',
      'Aires tipo paquete',
      'Equipos de confort',
      'Sistemas de ducto',
      'Todas las capacidades disponibles',
      'Garantía de fábrica incluida',
    ],
  },
  {
    id: 'recarga',
    icon: Wind,
    title: 'Recarga de Gas Refrigerante',
    description: 'Servicio de recarga de refrigerante y detección de fugas para mantener tu equipo funcionando correctamente.',
    image: '/images/recarga.png',
    features: [
      'Detección de fugas con equipo especializado',
      'Recarga de gas R410A y R22',
      'Verificación de presiones',
      'Prueba de funcionamiento',
      'Recomendaciones de mantenimiento',
      'Servicio a domicilio',
    ],
  },
]

export default function ServicesContent() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Floating icon */}
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-accent rounded-2xl flex items-center justify-center shadow-xl">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                  <service.icon className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-medium">Servicio profesional</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-500 transition-colors">
                        <CheckCircle className="w-4 h-4 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 group"
                >
                  Solicitar Cotización
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
