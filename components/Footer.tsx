import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'

const navigation = {
  servicios: [
    { name: 'Instalacion', href: '/servicios#instalacion' },
    { name: 'Mantenimiento', href: '/servicios#mantenimiento' },
    { name: 'Reparacion', href: '/servicios#reparacion' },
    { name: 'Proyectos Especiales', href: '/servicios#proyectos' },
  ],
  empresa: [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Garantias', href: '/nosotros#garantias' },
    { name: 'Contacto', href: '/contacto' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <span className="text-xl font-bold">Climex</span>
                <span className="block text-xs text-gray-400">Soluciones Integrales</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Expertos en climatizacion con mas de 8 anos de experiencia en Guadalajara y zona metropolitana.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Servicios</h3>
            <ul className="space-y-3">
              {navigation.servicios.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-light flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Calle Valvula #5986-A<br />
                  Guadalajara, Jalisco
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-light flex-shrink-0" />
                <a href="tel:+523316145522" className="text-gray-400 hover:text-white text-sm transition-colors">
                  33 1614 5522
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-light flex-shrink-0" />
                <a href="tel:+523324568104" className="text-gray-400 hover:text-white text-sm transition-colors">
                  33 2456 8104
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-light flex-shrink-0" />
                <a href="mailto:contacto@climexsi.com.mx" className="text-gray-400 hover:text-white text-sm transition-colors">
                  contacto@climexsi.com.mx
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-light flex-shrink-0" />
                <span className="text-gray-400 text-sm">Lun - Sab: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Climex Soluciones Integrales. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors">
                Aviso de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
