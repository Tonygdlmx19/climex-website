import type { Metadata } from 'next'
import ServiceLanding from '@/components/ServiceLanding'
import { landingBySlug } from '@/lib/landings'

const landing = landingBySlug('reparacion-aire-acondicionado-guadalajara')!

export const metadata: Metadata = {
  title: landing.metaTitle,
  description: landing.metaDescription,
  alternates: { canonical: '/reparacion-aire-acondicionado-guadalajara' },
  openGraph: { title: landing.metaTitle, description: landing.metaDescription, url: '/reparacion-aire-acondicionado-guadalajara' },
}

export default function Page() {
  return <ServiceLanding landing={landing} />
}
