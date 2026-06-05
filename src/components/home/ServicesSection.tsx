import { services } from '../../data/services'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'
import { Button } from '../ui/Button'

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          description="Comprehensive IT solutions tailored to help your business grow and succeed in the digital landscape."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/services" variant="secondary">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}
