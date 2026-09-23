import Image from 'next/image'
import { site } from '@/lib/site'

export default function Brands() {
  const logos = [...site.brands, ...site.brands]
  return (
    <section aria-labelledby="marcas" className="border-y border-line bg-white py-10">
      <div className="container">
        <h2 id="marcas" className="text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          Instalamos y damos servicio a todas las marcas
        </h2>
        <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-14 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
            {logos.map((b, i) => (
              <li key={`${b.name}-${i}`} className="shrink-0" aria-hidden={i >= site.brands.length}>
                {b.logo ? (
                  <Image
                    src={b.logo}
                    alt={i < site.brands.length ? b.name : ''}
                    width={160}
                    height={64}
                    className="h-8 w-auto max-w-[150px] object-contain md:h-10 md:max-w-[180px]"
                  />
                ) : (
                  <span className="block text-2xl font-extrabold uppercase tracking-[0.12em] text-slate-500 transition hover:text-navy-700 md:text-3xl">
                    {b.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
