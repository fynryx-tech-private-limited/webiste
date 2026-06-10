import { stats } from '../../data/stats'
import { StatCounter } from '../ui/StatCounter'



export function StatsSection() {
  return (
    <section className="bg-primary-900 pt-24 pb-20">
      <div className="w-full px-10 md:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}