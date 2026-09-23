import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactForm from '@/components/ContactForm'
import TrackedLink from '@/components/TrackedLink'

export default function Contact({ showMap = true }: { showMap?: boolean }) {
  return (
    <section id="contacto" className="scroll-mt-20 bg-mist py-20 lg:py-24">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contacto"
            title="Cotiza gratis hoy mismo"
            description="Dinos qué necesitas y te respondemos en horario de oficina el mismo día. Sin compromiso."
          />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            <li>
              <TrackedLink
                event="contact_whatsapp"
                location="contacto"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-4 transition hover:border-whatsapp/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-whatsapp/15 text-whatsapp-dark">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-slate-500">WhatsApp</span>
                  <span className="tabular block font-bold text-ink">{site.whatsapp.display}</span>
                </span>
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                event="contact_call"
                location="contacto"
                href={`tel:${site.phones.main.e164}`}
                className="card flex items-center gap-4 p-4 transition hover:border-brand-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-slate-500">Llámanos</span>
                  <span className="tabular block font-bold text-ink">{site.phones.main.display}</span>
                </span>
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                event="contact_email"
                location="contacto"
                href={`mailto:${site.email}`}
                className="card flex items-center gap-4 p-4 transition hover:border-brand-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-slate-500">Correo</span>
                  <span className="block truncate font-bold text-ink">{site.email}</span>
                </span>
              </TrackedLink>
            </li>
            <li>
              <div className="card flex items-center gap-4 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-slate-500">Horario</span>
                  <span className="tabular block text-sm font-bold text-ink">
                    Lun–Vie {site.hours[0].time} · Sáb {site.hours[1].time}
                  </span>
                </span>
              </div>
            </li>
          </ul>

          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card mt-3 flex items-center gap-4 p-4 transition hover:border-brand-300"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-slate-500">Visítanos</span>
              <span className="block font-bold text-ink">
                {site.address.street}, {site.address.neighborhood}, {site.address.city}
              </span>
            </span>
          </a>

          {showMap && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-line shadow-card">
              <iframe
                src={site.address.mapsEmbed}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación de ${site.name}`}
              />
            </div>
          )}
        </div>

        <div className="card self-start p-6 sm:p-8 lg:sticky lg:top-24">
          <h3 className="text-xl font-extrabold text-ink">Solicita tu cotización</h3>
          <p className="mt-1 text-sm text-slate-600">Llena el formulario o mándanos los datos por WhatsApp.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
