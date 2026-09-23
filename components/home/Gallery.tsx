'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { works } from '@/lib/gallery'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Gallery({
  limit = 6,
  showLink = true,
  id = 'trabajos',
  heading = true,
}: {
  limit?: number
  showLink?: boolean
  id?: string
  heading?: boolean
}) {
  const items = works.slice(0, limit)
  // Con 3 columnas, el primer elemento ocupa 2x2; si al final sobra una sola
  // foto, ocupa toda la fila para no dejar un hueco.
  const orphanLast = items.length > 3 && (items.length - 3) % 3 === 1
  // En móvil hay 2 columnas: la primera foto ocupa las dos y el resto va en pares;
  // si sobra una, también se estira a todo el ancho.
  const mobileOrphan = (items.length - 1) % 2 === 1
  const [index, setIndex] = useState<number | null>(null)

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length])
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % items.length)), [items.length])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, prev, next])

  return (
    <section id={id} className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="container">
        {heading && (
          <SectionHeading
            eyebrow="Trabajos realizados"
            title="Así se ve nuestro trabajo"
            description="Fotos reales de instalaciones y servicios en Guadalajara y la zona metropolitana."
          />
        )}

        <ul className={`grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 ${heading ? 'mt-12' : ''}`}>
          {items.map((w, i) => (
            <li
              key={w.src}
              className={
                i === 0
                  ? 'col-span-2 row-span-2'
                  : i === items.length - 1
                    ? `${mobileOrphan ? 'col-span-2' : ''} ${orphanLast ? 'md:col-span-3' : 'md:col-span-1'}`
                    : ''
              }
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-mist focus-visible:ring-4"
                aria-label={`Ampliar: ${w.alt}`}
              >
                <span
                  className={`relative block ${
                    i === 0
                      ? 'aspect-[4/3] md:aspect-auto md:h-full md:min-h-[24rem]'
                      : i === items.length - 1
                        ? `${mobileOrphan ? 'aspect-[16/9]' : 'aspect-[4/3]'} ${orphanLast ? 'md:aspect-[3/1]' : 'md:aspect-[4/3]'}`
                        : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={w.src}
                    alt={w.alt}
                    fill
                    sizes={
                      i === items.length - 1 && (orphanLast || mobileOrphan)
                        ? '100vw'
                        : i === 0
                          ? '(min-width: 768px) 66vw, 100vw'
                          : '(min-width: 768px) 33vw, 50vw'
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {showLink && (
          <div className="mt-8 text-center">
            <Link href="/proyectos" className="btn-outline">
              Ver todos los trabajos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[index].alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/90 p-3 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[index].src}
              alt={items[index].alt}
              width={items[index].w}
              height={items[index].h}
              sizes="100vw"
              className="max-h-[82vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="sr-only">{items[index].alt}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
