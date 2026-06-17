import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { services } from '../data/services'
import { Button } from '../components/ui/Button'
import { InteractiveServiceExplorer } from '../components/ui/InteractiveServiceExplorer'
import { SEO } from '../utils/useSEO'

export function ServicesPage() {
  const location = useLocation()

  useEffect(() => {
    // Use the router location hash so this runs on in-app navigation
    const hash = (location.hash || '').replace('#', '')

    if (hash) {
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

  return (
    <>
      <SEO 
        title="Our IT Services - Fynryx" 
        description="Comprehensive IT solutions including web development, mobile apps, and cloud computing designed to help your business thrive in the digital age." 
      />
      <PageHero
        title="Our Services"
        subtitle="Comprehensive IT solutions designed to help your business thrive in the digital age."
      />

      {/* Services Overview */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1702047143580-0f349be86369?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Fynryx IT services and digital solutions"
                loading="lazy"
                decoding="async"
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

      {/* Interactive Service Explorer */}
      <section className="border-t border-primary-100 bg-slate-50 py-16">
        <InteractiveServiceExplorer services={services} initialActiveId={location.hash.replace('#', '')} />
      </section>



      {/* Custom Solution Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md bg-primary-900 p-10 text-center text-white">
            <h3 className="text-2xl font-bold text-white">Need a Custom Solution?</h3>
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
