import { Metadata } from 'next'
import { Building2, Home, Store, Factory } from 'lucide-react'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Proyectos | Climex Soluciones Integrales',
  description: 'Conoce algunos de nuestros proyectos de instalacion y mantenimiento de aires acondicionados en Guadalajara.',
}

const categories = [
  { id: 'todos', name: 'Todos', icon: null },
  { id: 'residencial', name: 'Residencial', icon: Home },
  { id: 'comercial', name: 'Comercial', icon: Store },
  { id: 'industrial', name: 'Industrial', icon: Factory },
]

const projects = [
  {
    id: 1,
    title: 'Restaurante El Patron',
    category: 'comercial',
    description: 'Instalacion de sistema de climatizacion central con 4 equipos de 5 toneladas.',
    location: 'Zapopan, Jalisco',
  },
  {
    id: 2,
    title: 'Oficinas Corporativas',
    category: 'comercial',
    description: 'Sistema VRF para edificio de oficinas de 3 niveles.',
    location: 'Guadalajara, Jalisco',
  },
  {
    id: 3,
    title: 'Residencia Colinas',
    category: 'residencial',
    description: 'Instalacion de 5 minisplits inverter en residencia de lujo.',
    location: 'Tlajomulco, Jalisco',
  },
  {
    id: 4,
    title: 'Clinica Dental',
    category: 'comercial',
    description: 'Sistema de climatizacion para consultorio con control de humedad.',
    location: 'Guadalajara, Jalisco',
  },
  {
    id: 5,
    title: 'Bodega Industrial',
    category: 'industrial',
    description: 'Sistema de ventilacion y enfriamiento para nave industrial de 2000m2.',
    location: 'El Salto, Jalisco',
  },
  {
    id: 6,
    title: 'Casa Habitacion',
    category: 'residencial',
    description: 'Instalacion de minisplit de 2 toneladas con servicio de mantenimiento.',
    location: 'Tonala, Jalisco',
  },
]

export default function ProyectosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Proyectos
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Conoce algunos de los trabajos que hemos realizado
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.id === 'todos'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-gray-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description}
                  </p>
                  <p className="text-gray-400 text-sm">
                    📍 {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Note about photos */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-blue-50 rounded-xl px-8 py-6">
              <p className="text-gray-600">
                <strong className="text-primary">Nota:</strong> Agrega tus propias fotos de proyectos reales en la carpeta <code className="bg-gray-100 px-2 py-1 rounded">/public/images/projects/</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
