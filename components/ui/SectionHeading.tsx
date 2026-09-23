type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  as?: 'h1' | 'h2'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  as: Tag = 'h2',
}: Props) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <span className={`eyebrow ${light ? '!text-brand-200 before:!bg-brand-300' : ''}`}>{eyebrow}</span>
      <Tag
        className={`mt-3 text-3xl font-extrabold leading-tight md:text-4xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? 'text-navy-100' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
