import { stats } from '../../data/stats'
import { StatCounter } from '../ui/StatCounter'



export function StatsSection() {
  return (
    <section className="bg-primary-900 py-12 md:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}