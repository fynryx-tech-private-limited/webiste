import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ServiceCard } from '../components/ui/ServiceCard'
import { services } from '../data/services'
import { Button } from '../components/ui/Button'
import { useSEO } from '../utils/useSEO'

export function ServicesPage() {
  useSEO({
    title: 'IT Services | Web Development, Cloud Computing & More | Fynryx',
    description: 'Comprehensive IT solutions including web development, mobile apps, cloud computing, managed IT support, and cybersecurity. Tailored for your business.',
    keywords: 'IT services, web development, mobile apps, cloud computing, managed IT support, cybersecurity, software solutions',
    canonical: 'https://fynryx.com/services',
  })
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive IT solutions designed to help your business thrive in the digital age."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Offer"
            description="From web and mobile development to SEO and social media marketing, we have the expertise to bring your vision to life."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-12 rounded-md bg-primary-900 p-10 text-center text-white">
            <h3 className="text-2xl font-bold">Need a Custom Solution?</h3>
            <p className="mx-auto mt-3 max-w-xl text-primary-100">
              Tell us about your project and we will craft a tailored plan that fits your
              budget and timeline.
            </p>
            <Button to="/contact" className="mt-6">
              Request a Free Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
