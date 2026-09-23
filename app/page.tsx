import Hero from '@/components/home/Hero'
import Brands from '@/components/home/Brands'
import Services from '@/components/home/Services'
import WhyUs from '@/components/home/WhyUs'
import Process from '@/components/home/Process'
import Gallery from '@/components/home/Gallery'
import Testimonials from '@/components/home/Testimonials'
import Coverage from '@/components/home/Coverage'
import Contact from '@/components/home/Contact'
import FAQ from '@/components/FAQ'
import { faqs } from '@/lib/faq'

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Services />
      <WhyUs />
      <Process />
      <Gallery />
      <Testimonials />
      <Coverage />
      <FAQ items={faqs.general} description="Lo que más nos preguntan sobre mantenimiento, reparación e instalación de aire acondicionado en Guadalajara." />
      <Contact />
    </>
  )
}
