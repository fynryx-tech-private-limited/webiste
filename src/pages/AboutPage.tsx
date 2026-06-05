import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { whyChooseUs } from '../data/whyChooseUs'
import { Button } from '../components/ui/Button'
import { useSEO } from '../utils/useSEO'

export function AboutPage() {
  useSEO({
    title: 'About Us | Fynryx – Your IT Solutions Partner',
    description: 'Learn about Fynryx, a values-driven technology agency providing managed IT services, cloud computing, cybersecurity, and custom software development.',
    keywords: 'Fynryx about, IT company, managed IT services, cloud solutions, cybersecurity, software development',
    canonical: 'https://fynryx.com/about',
  })
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Over 10 years we help companies reach their financial and branding goals through innovative technology."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Welcome to Fynryx"
                align="left"
              />
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                Fynryx is a values-driven technology agency dedicated to empowering businesses
                with cutting-edge IT solutions. We provide managed IT services, cloud computing,
                cybersecurity, and custom software development tailored to your unique needs.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Our team of experienced professionals works closely with clients to understand
                their challenges and deliver solutions that drive real business results. From
                startups to enterprise organizations, we scale our services to match your growth.
              </p>
              <Button to="/contact" variant="secondary" className="mt-8">
                Get in Touch
              </Button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
              alt="Our team"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Why Choose Us" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-4xl font-bold text-primary-200">
                  {String(item.id).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
