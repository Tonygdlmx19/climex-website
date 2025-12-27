import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto | Climex Soluciones Integrales',
  description: 'Contactanos para una cotizacion gratuita de aire acondicionado en Guadalajara. Respuesta en 24 horas.',
}

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contactanos
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Estamos listos para ayudarte con tu proyecto de climatizacion
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-neutral-dark mb-6">
                Solicita tu Cotizacion Gratis
              </h2>
              <form
                name="contacto"
                method="POST"
                action="/__forms.html"
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contacto" />
                <p className="hidden">
                  <label>
                    No llenar: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="33 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="tu@correo.com"
                  />
                </div>

                <div>
                  <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                    Servicio de interes
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Selecciona una opcion</option>
                    <option value="instalacion">Instalacion</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="reparacion">Reparacion</option>
                    <option value="proyecto">Proyecto especial</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Cuentanos sobre tu proyecto o necesidad..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  Enviar Solicitud
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-dark mb-6">
                  Informacion de Contacto
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Telefonos</h3>
                      <a href="tel:+523316145522" className="text-gray-600 hover:text-primary block">
                        33 1614 5522
                      </a>
                      <a href="tel:+523324568104" className="text-gray-600 hover:text-primary block">
                        33 2456 8104
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/523316145522"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                      >
                        Enviar mensaje
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Correo</h3>
                      <a href="mailto:contacto@climexsi.com.mx" className="text-gray-600 hover:text-primary">
                        contacto@climexsi.com.mx
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Direccion</h3>
                      <p className="text-gray-600">
                        Calle Valvula #5986-A<br />
                        Guadalajara, Jalisco
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Horario</h3>
                      <p className="text-gray-600">
                        Lunes a Viernes: 9:00 - 18:00<br />
                        Sabado: 9:00 - 14:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-64 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.8731841562397!2d-103.3630763!3d20.6597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1f3e5c12345%3A0x1234567890abcdef!2sGuadalajara%2C%20Jalisco!5e0!3m2!1ses!2smx!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicacion Climex"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
