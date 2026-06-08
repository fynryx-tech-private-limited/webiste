import type { Service } from '../../types'
import { serviceIconMap } from './ServiceIcons'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      id={service.id}
      className="rounded-md border border-primary-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 inline-flex rounded-md bg-primary-50 p-3 text-primary-600 [&_svg]:h-7 [&_svg]:w-7">
        {serviceIconMap[service.icon]}
      </div>
      <h3 className="mb-2 text-lg font-bold text-primary-900">{service.title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{service.description}</p>
    </article>
  )
}
