import { services } from '../../data/services'
import { ServiceListCard } from '../ui/ServiceListCard'
import { Button } from '../ui/Button'

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Our Services
        </h2>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceListCard key={service.id} service={service} variant="home" />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/services" variant="secondary">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}
