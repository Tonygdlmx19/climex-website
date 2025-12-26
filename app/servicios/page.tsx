import { Metadata } from 'next'
import CTASection from '@/components/CTASection'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'Servicios | Climex Soluciones Integrales',
  description: 'Servicios de instalación, mantenimiento y reparación de aires acondicionados en Guadalajara. Cotización gratuita.',
}

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark pt-32 pb-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Soluciones profesionales
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Soluciones completas en climatización para tu hogar y negocio con garantía y profesionalismo
          </p>
        </div>
      </section>

      <ServicesContent />

      <CTASection />
    </>
  )
}
