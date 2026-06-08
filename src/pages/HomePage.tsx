import { HeroCarousel } from '../components/home/HeroCarousel'
import { ClientsMarquee } from '../components/home/ClientsMarquee'
import { AboutSection } from '../components/home/AboutSection'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { ServicesSection } from '../components/home/ServicesSection'
import { StatsSection } from '../components/home/StatsSection'
import { ProjectsPreview } from '../components/home/ProjectsPreview'
import { CtaBanner } from '../components/home/CtaBanner'
import { TestimonialsSection } from '../components/home/TestimonialsSection'

export function HomePage() {
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
