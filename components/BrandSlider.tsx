const brands = [
  { name: 'Mirage', logo: '/images/brands/mirage.png' },
  { name: 'York', logo: '/images/brands/york.png' },
  { name: 'Trane', logo: '/images/brands/trane.png' },
  { name: 'Carrier', logo: '/images/brands/carrier.png' },
  { name: 'LG', logo: '/images/brands/lg.png' },
  { name: 'Samsung', logo: '/images/brands/samsung.png' },
  { name: 'Daikin', logo: '/images/brands/daikin.png' },
  { name: 'Lennox', logo: '/images/brands/lennox.png' },
]

export default function BrandSlider() {
  return (
    <section className="py-16 bg-neutral-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-medium text-gray-500 mb-10">
          Trabajamos con las mejores marcas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm"
            >
              {/* Placeholder for brand logos - replace with actual images */}
              <span className="text-gray-400 font-semibold text-sm">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
