import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { AboutParticleBackground } from './AboutParticleBackground'

export function AboutSection() {
  return (
    <AboutParticleBackground>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-lg py-6 px-4 sm:pl-4 lg:mx-0 lg:max-w-none lg:py-10 lg:pl-6">
            <div
              className="about-photo-accent absolute left-2 top-4 sm:left-6 sm:top-8 z-0 h-[85%] w-[85%] sm:h-[82%] sm:w-[84%] rounded-lg"
              aria-hidden="true"
            />

            <img
              src="/fynryx-team.jpg"
              alt="Team collaboration"
              className="relative z-10 ml-4 mt-6 sm:ml-10 sm:mt-12 w-[calc(100%-1rem)] sm:w-full rounded-lg bg-white shadow-2xl"
            />
          </div>

          <div className="relative z-10">
            <SectionHeading
              // eyebrow="// About Us"
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
    </AboutParticleBackground>
  )
}
