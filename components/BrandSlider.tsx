'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const brands = [
  { name: 'Mirage', logo: '/images/Mirage.png' },
  { name: 'York', logo: '/images/York.png' },
  { name: 'Trane', logo: '/images/Trane.png' },
  { name: 'Lennox', logo: '/images/Lennox.png' },
  { name: 'Carrier', logo: '/images/Carrier.png' },
  { name: 'Hisense', logo: '/images/Hisense.png' },
]

export default function BrandSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? brands.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === brands.length - 1 ? 0 : prev + 1))
  }

  const getVisibleBrands = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      let index = activeIndex + i
      if (index < 0) index = brands.length + index
      if (index >= brands.length) index = index - brands.length
      result.push({ ...brands[index], position: i })
    }
    return result
  }

  const visibleBrands = getVisibleBrands()

  return (
    <section className="py-16 bg-neutral-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-primary/50 mb-12">
          Marcas con las que trabajamos
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Flecha izquierda */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="flex items-center justify-center gap-4 md:gap-6 h-56 overflow-hidden">
            {visibleBrands.map((brand, idx) => {
              const isCenter = brand.position === 0
              const isAdjacent = Math.abs(brand.position) === 1
              const isEdge = Math.abs(brand.position) === 2

              return (
                <div
                  key={`${brand.name}-${idx}`}
                  className={`flex-shrink-0 transition-all duration-500 ease-out ${
                    isCenter
                      ? 'w-52 h-40 md:w-64 md:h-48 z-10 scale-100 opacity-100'
                      : isAdjacent
                      ? 'w-40 h-32 md:w-48 md:h-36 z-5 scale-90 opacity-70'
                      : 'w-32 h-24 md:w-36 md:h-28 z-0 scale-75 opacity-40 hidden sm:block'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-2xl flex items-center justify-center p-4 md:p-6 transition-all duration-500 ${
                      isCenter
                        ? 'bg-white shadow-2xl shadow-primary/20 border-2 border-primary/20'
                        : 'bg-gray-100 shadow-md'
                    }`}
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={180}
                      height={100}
                      className="object-contain max-h-full w-auto"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {brands.map((brand, index) => (
            <button
              key={brand.name}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Nombre de la marca activa */}
        <p className="text-center mt-4 text-lg font-semibold text-neutral-dark">
          {brands[activeIndex].name}
        </p>
      </div>
    </section>
  )
}
