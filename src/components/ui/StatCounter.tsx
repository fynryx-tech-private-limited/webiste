import type { Stat } from '../../types'

interface StatCounterProps {
  stat: Stat
}

export function StatCounter({ stat }: StatCounterProps) {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-white sm:text-5xl">
        {stat.value}
        <span className="text-accent-400">{stat.suffix}</span>
      </p>
      <p className="brand-eyebrow mt-2 text-primary-200">{stat.label}</p>
    </div>
  )
}
