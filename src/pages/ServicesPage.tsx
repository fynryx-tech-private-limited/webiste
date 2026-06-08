import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { services } from '../data/services'
import { Button } from '../components/ui/Button'
import { ServiceListCard } from '../components/ui/ServiceListCard'

const iconMap: Record<string, React.ReactNode> = {
  globe: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  code: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  smartphone: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  search: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  palette: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.439.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  share: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.004.353.03.518.074l6.098 2.11a2.25 2.25 0 101.732-1.732l-6.098-2.11a2.25 2.25 0 00-2.25-2.438m0 0A2.25 2.25 0 0012.75 6.75v.75m-8.25-3v9m0 0v3.75m0-3.75h3.75m-3.75 0H3.75" />
    </svg>
  ),
}

export function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const location = useLocation()

  useEffect(() => {
    // Use the router location hash so this runs on in-app navigation
    const hash = (location.hash || '').replace('#', '')

    if (hash) {
      // Expand the matching service
      setExpandedService(hash)

      // Scroll to the service details section, accounting for sticky header
      setTimeout(() => {
        const element = document.querySelector(`[data-service-id="${hash}"]`) as HTMLElement | null
        const header = document.querySelector('header') as HTMLElement | null
        const headerOffset = header ? header.getBoundingClientRect().height + 12 : 0
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - headerOffset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 60)
    }
  }, [location.hash])

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive IT solutions designed to help your business thrive in the digital age."
      />

      {/* Services Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1702047143580-0f349be86369?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Fynryx IT services and digital solutions"
                className="rounded-md shadow-xl"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="Our Expertise"
                title="End-to-End Digital Solutions"
                align="left"
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  At Fynryx, we provide a complete suite of IT services to help businesses
                  build, launch, and grow in the digital landscape. From custom web and mobile
                  applications to tailored software development, our team delivers solutions
                  that are scalable, secure, and built for long-term performance.
                </p>
                <p>
                  Beyond development, we strengthen your online presence through professional
                  web design, search engine optimization, and social media marketing — ensuring
                  your brand reaches the right audience and converts visitors into customers.
                  Every engagement is guided by clear strategy, transparent communication, and
                  a commitment to results that matter to your business.
                </p>
                <p>
                  Explore our core service areas below to see how we work, what we deliver,
                  and how Fynryx can support your next project from concept to launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="border-t border-primary-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Our Services
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceListCard key={service.id} service={service} variant="page" />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                data-service-id={service.id}
                className="overflow-hidden rounded-lg border border-primary-200 bg-white transition-all duration-300"
              >
                {/* Service Header - Always Visible */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full px-6 py-6 text-left hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary-100 p-3 text-primary-600">
                        {iconMap[service.icon]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary-900">{service.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-primary-600">
                      {expandedService === service.id ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Service Details - Expanded Content */}
                {expandedService === service.id && (
                  <div className="border-t border-primary-200 px-6 py-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      {/* Content */}
                      <div>
                        <h4 className="mb-4 text-lg font-bold text-primary-900">Overview</h4>
                        <p className="mb-6 leading-relaxed text-slate-700">
                          {service.fullDescription}
                        </p>

                        {service.features && (
                          <div>
                            <h4 className="mb-4 text-lg font-bold text-primary-900">Key Features</h4>
                            <ul className="space-y-3">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <svg
                                    className="mt-1 h-5 w-5 flex-shrink-0 text-primary-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-slate-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Image */}
                      <div>
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="h-80 w-full rounded-lg object-cover shadow-md"
                          />
                        ) : (
                          <div className="flex h-80 items-center justify-center rounded-lg bg-primary-100">
                            <div className="text-center text-primary-600">
                              {iconMap[service.icon]}
                              <p className="mt-4 text-sm font-medium">{service.title}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 border-t border-primary-200 pt-6">
                      <Button to="/contact">
                        Get Started with {service.title}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solution Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md bg-primary-900 p-10 text-center text-white">
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
