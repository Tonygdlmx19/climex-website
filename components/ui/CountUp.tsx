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
 * Número que sube desde 0 hasta `value` cada vez que entra en pantalla
 * (al salir se reinicia, así el efecto se ve en cada scroll).
 * Si el usuario prefiere menos movimiento, muestra el valor final directo.
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2200,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value)
      return
    }
    let raf = 0
    const stop = () => cancelAnimationFrame(raf)
    const play = () => {
      stop()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3) // arranca rápido y frena al final
        setShown(t < 1 ? value * eased : value)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else {
          stop()
          setShown(0)
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop()
    }
  }, [value, duration])

  const text = shown.toLocaleString('es-MX', {
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
