import { Metadata } from 'next'
import { Target, Eye, Heart, Shield, Award, Users } from 'lucide-react'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Nosotros | Climex Soluciones Integrales',
  description: 'Conoce mas sobre Climex, empresa de aire acondicionado en Guadalajara con mas de 8 anos de experiencia.',
}

const values = [
  {
    icon: Heart,
    title: 'Compromiso',
    description: 'Nos comprometemos con la satisfaccion total de nuestros clientes en cada proyecto.',
  },
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Trabajamos con transparencia y honestidad en todos nuestros servicios.',
  },
  {
    icon: Award,
    title: 'Calidad',
    description: 'Utilizamos materiales de primera calidad y las mejores practicas del mercado.',
  },
  {
    icon: Users,
    title: 'Profesionalismo',
    description: 'Nuestro equipo esta capacitado y certificado para brindar el mejor servicio.',
  },
]

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Conoce la historia y valores que nos definen
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-dark mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-neutral-dark">Climex Soluciones Integrales</strong> nacio en 2016 con la vision de ofrecer servicios de climatizacion de alta calidad en Guadalajara y su zona metropolitana.
                </p>
                <p>
                  Lo que comenzo como un pequeno emprendimiento familiar, hoy se ha convertido en una empresa reconocida por su profesionalismo, puntualidad y compromiso con la satisfaccion del cliente.
                </p>
                <p>
                  A lo largo de mas de 8 anos, hemos atendido a cientos de clientes residenciales y comerciales, construyendo relaciones de confianza basadas en la calidad de nuestro trabajo.
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <span className="text-gray-400">Imagen del equipo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mision y Vision */}
      <section className="py-20 bg-neutral-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Mision</h3>
              <p className="text-gray-600">
                Brindar soluciones integrales de climatizacion con la mas alta calidad, utilizando tecnologia de vanguardia y un equipo de profesionales comprometidos con la satisfaccion de nuestros clientes.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-dark mb-4">Vision</h3>
              <p className="text-gray-600">
                Ser la empresa lider en servicios de climatizacion en Jalisco, reconocida por nuestra excelencia, innovacion y compromiso con el medio ambiente y el bienestar de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guian nuestro trabajo diario
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-neutral-dark mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantias */}
      <section id="garantias" className="py-20 bg-neutral-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
              Nuestras Garantias
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">1 Ano</div>
              <p className="text-gray-600">Garantia en instalaciones</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">90 Dias</div>
              <p className="text-gray-600">Garantia en reparaciones</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-gray-600">Satisfaccion garantizada</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
