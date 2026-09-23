'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  /** Valor final, por ejemplo 830 o 4.8 */
  value: number
  /** Texto antes del número, por ejemplo "+" */
  prefix?: string
  /** Texto después del número, por ejemplo " años" */
  suffix?: string
  /** Decimales a mostrar */
  decimals?: number
  /** Duración de la animación en ms */
  duration?: number
  className?: string
}

/**
 * Número que sube desde 0 hasta `value` cuando entra en pantalla.
 * Si el usuario prefiere menos movimiento, muestra el valor final directo.
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1800,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(value)
      setDone(true)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3) // arranca rápido y frena al final
          setShown(value * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
          else setDone(true)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  const text = (done ? value : shown).toLocaleString('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value.toLocaleString('es-MX')}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {text}
      </span>
    </span>
  )
}
