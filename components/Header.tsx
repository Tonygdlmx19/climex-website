'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'

const navigation = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
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
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
        : 'bg-transparent py-4'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="flex items-center gap-3 group"
            >
              <Image
                src="/images/logoClimex.png"
                alt="Climex Logo"
                width={50}
                height={50}
                className="transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <span className={`text-xl font-bold transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
                  Climex
                </span>
                <span className={`block text-xs transition-colors ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
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
                    ? scrolled
                      ? 'text-primary bg-primary/10'
                      : 'text-white bg-white/20'
                    : scrolled
                      ? 'text-gray-700 hover:text-primary hover:bg-gray-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
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
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              33 1614 5522
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-accent-dark transition-all hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Cotiza Gratis
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-full p-2.5 transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
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
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`pb-6 pt-4 rounded-2xl mt-2 ${scrolled ? 'bg-white' : 'bg-white/10 backdrop-blur-md'}`}>
            <div className="space-y-1 px-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? scrolled
                        ? 'text-primary bg-primary/10'
                        : 'text-white bg-white/20'
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-50'
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="block rounded-xl bg-accent px-4 py-3 text-center text-base font-semibold text-white mt-4"
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
