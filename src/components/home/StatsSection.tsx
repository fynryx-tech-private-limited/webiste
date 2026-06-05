import { stats } from '../../data/stats'
import { StatCounter } from '../ui/StatCounter'

export function StatsSection() {
  return (
    <section className="bg-primary-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
