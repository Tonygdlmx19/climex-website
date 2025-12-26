'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Wrench, ThermometerSnowflake, Settings, Building2, Wind, ShoppingBag } from 'lucide-react'

const iconMap = {
  ThermometerSnowflake,
  Settings,
  Wrench,
  Building2,
  Wind,
  ShoppingBag,
}

interface ServiceCardProps {
  title: string
  description: string
  iconName: keyof typeof iconMap
  href: string
  image: string
}

export default function ServiceCard({ title, description, iconName, href, image }: ServiceCardProps) {
  const Icon = iconMap[iconName]

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Icon badge */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
        >
          Más información
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors pointer-events-none" />
    </div>
  )
}
