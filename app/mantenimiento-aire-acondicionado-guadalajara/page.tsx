import type { Metadata } from 'next'
import ServiceLanding from '@/components/ServiceLanding'
import { landingBySlug } from '@/lib/landings'

const landing = landingBySlug('mantenimiento-aire-acondicionado-guadalajara')!

export const metadata: Metadata = {
  title: landing.metaTitle,
  description: landing.metaDescription,
  alternates: { canonical: '/mantenimiento-aire-acondicionado-guadalajara' },
  openGraph: { title: landing.metaTitle, description: landing.metaDescription, url: '/mantenimiento-aire-acondicionado-guadalajara' },
}

export default function Page() {
  return <ServiceLanding landing={landing} />
}
