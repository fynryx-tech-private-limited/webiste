import { Link } from 'react-router-dom'
import type { Service } from '../../types'
import { serviceIconMap } from './ServiceIcons'

interface ServiceListCardProps {
  service: Service
  variant: 'home' | 'page'
}

export function ServiceListCard({ service, variant }: ServiceListCardProps) {
  const icon = serviceIconMap[service.icon]

  if (variant === 'home') {
    return (
      <Link
        to={`/services#${service.id}`}
        className="flex items-start gap-5"
      >
        <div className="shrink-0 text-primary-500 [&_svg]:h-14 [&_svg]:w-14">
          {icon}
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/services#${service.id}`}
      className="flex items-start gap-4 rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-5 shadow-sm"
    >
      <div className="shrink-0 rounded-lg bg-primary-600 p-3 text-white [&_svg]:h-7 [&_svg]:w-7">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-base font-bold text-primary-900">{service.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{service.description}</p>
      </div>
    </Link>
  )
}
