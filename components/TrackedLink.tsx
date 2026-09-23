'use client'

import type { AnchorHTMLAttributes } from 'react'
import { track, type ConversionEvent } from '@/lib/analytics'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: ConversionEvent
  location?: string
}

/** Enlace <a> que registra un evento de conversión al hacer clic. */
export default function TrackedLink({ event, location, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, location ? { location } : {})
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
