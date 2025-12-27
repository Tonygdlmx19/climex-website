'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Phone, Mail, Facebook, Instagram } from 'lucide-react'

const navigation = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Misión y Visión', href: '#mision-vision' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navigation.map(item => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 120
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      scrolled ? 'shadow-lg' : 'shadow-md'
    }`}>
      {/* Top bar - Contact Info */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-xs font-medium text-white">
            <div className="flex items-center gap-6">
              <a href="tel:+523328000443" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone className="h-4 w-4" />
                <span>33 2800 0443</span>
              </a>
              <a href="mailto:ventas@climexsi.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Mail className="h-4 w-4" />
                <span>ventas@climexsi.com</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-white/80 text-xs">Síguenos:</span>
              <a href="#" className="rounded-full p-1.5 bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full p-1.5 bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between py-3">
          {/* Logo - 160px */}
          <div className="flex items-center">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="flex items-center gap-4 group"
            >
              <Image
                src="/images/logoClimex.png"
                alt="Climex Logo"
                width={160}
                height={160}
                className="h-24 w-24 object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-primary">
                  Climex
                </span>
                <span className="block text-sm text-gray-500">
                  Soluciones Integrales
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-white bg-primary'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href="tel:+523316145522"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              33 1614 5522
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-primary-dark transition-all hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Cotiza Gratis
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pb-6 pt-4 bg-white rounded-2xl mt-2 border border-gray-100 shadow-lg">
            <div className="space-y-1 px-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-white bg-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="block rounded-xl bg-primary px-4 py-3 text-center text-base font-semibold text-white mt-4"
              >
                Cotiza Gratis
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
