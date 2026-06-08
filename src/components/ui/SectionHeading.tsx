interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleColor = light ? 'text-white' : 'text-primary-900'
  const descColor = light ? 'text-primary-100' : 'text-slate-600'
  const eyebrowColor = light ? 'text-accent-400' : 'text-primary-600'

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className={`brand-eyebrow mb-2 ${eyebrowColor}`}>{eyebrow}</p>
      )}
      <h2 className={`text-5xl font-bold tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${descColor}`}>{description}</p>
      )}
    </div>
  )
}
