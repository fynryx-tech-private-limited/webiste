import { HeroCarousel } from '../components/home/HeroCarousel'
import { ClientsMarquee } from '../components/home/ClientsMarquee'
import { AboutSection } from '../components/home/AboutSection'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { ServicesSection } from '../components/home/ServicesSection'
import { StatsSection } from '../components/home/StatsSection'
import { ProjectsPreview } from '../components/home/ProjectsPreview'
import { CtaBanner } from '../components/home/CtaBanner'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { useSEO } from '../utils/useSEO'

export function HomePage() {
  useSEO({
    title: 'Fynryx – Design. Innovate. Transform. | IT Services & Web Development',
    description: 'Professional IT services including web development, mobile apps, cloud computing, and managed IT support. Design. Innovate. Transform.',
    keywords: 'Fynryx, web development, IT services, mobile apps, cloud computing, managed IT support, software development',
    canonical: 'https://fynryx.com/',
  })

  return (
    <>
      <HeroCarousel />
      <ClientsMarquee />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <StatsSection />
      <ProjectsPreview />
      <CtaBanner />
      <TestimonialsSection />
    </>
  )
}
