import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
              alt="Team collaboration"
              className="rounded-md shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-md bg-primary-500 px-6 py-4 text-white shadow-lg sm:block">
              <p className="text-3xl font-bold">10+</p>
              <p className="brand-eyebrow text-primary-100">Years Experience</p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About Us"
              title="Welcome to Fynryx"
              align="left"
            />
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              At Fynryx, we provide a full suite of IT services, including managed IT
              solutions and technical support. Our mission is to empower businesses with
              innovative technology, ensuring optimal performance, security, and efficiency.
              With tailored solutions and expert support, we help you achieve your IT goals.
            </p>
            <Button to="/about" variant="secondary" className="mt-8">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
