'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { navigation, site, whatsappUrl } from '@/lib/site'
import { track } from '@/lib/analytics'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Resalta la sección visible en la página de inicio
  useEffect(() => {
    if (pathname !== '/') {
      setActive(pathname)
      return
    }
    const ids = navigation
      .map((n) => n.href.split('#')[1])
      .filter((id): id is string => Boolean(id))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`/#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' && (active === '' || active === '/') : active === href

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[box-shadow,background-color,border-color] duration-300 ${
        scrolled
          ? 'border-line/80 bg-white/90 shadow-[0_4px_24px_-12px_rgba(15,27,51,.18)] backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <nav className="container flex h-[72px] items-center justify-between gap-4" aria-label="Principal">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name}, inicio`}>
          <Image
            src="/images/logo-globo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block text-[17px] font-extrabold tracking-tight text-brand-600">CLIMEX</span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-navy-600">
              Soluciones Integrales
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? 'bg-navy-50 text-navy-700'
                    : 'text-slate-600 hover:bg-mist hover:text-ink'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${site.phones.main.e164}`}
            onClick={() => track('contact_call', { location: 'header' })}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-navy-700 hover:bg-navy-50"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="tabular">{site.phones.main.display}</span>
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('contact_whatsapp', { location: 'header' })}
            className="btn-primary px-5 py-2.5"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Cotiza gratis
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-mist lg:hidden"
        >
          <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <div className="container flex flex-col gap-1 py-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-base font-semibold ${
                isActive(item.href) ? 'bg-navy-50 text-navy-700' : 'text-ink hover:bg-mist'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={`tel:${site.phones.main.e164}`}
              onClick={() => track('contact_call', { location: 'menu' })}
              className="btn-outline"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Llamar
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('contact_whatsapp', { location: 'menu' })}
              className="btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
