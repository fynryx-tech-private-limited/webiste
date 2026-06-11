import { HeroCarousel } from '../components/home/HeroCarousel'
import { AboutSection } from '../components/home/AboutSection'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { ServicesSection } from '../components/home/ServicesSection'
import { ShowcaseSection } from '../components/home/ShowcaseSection'
import { ProjectsPreview } from '../components/home/ProjectsPreview'
import { CtaBanner } from '../components/home/CtaBanner'
import { TestimonialsSection } from '../components/home/TestimonialsSection'

export function HomePage() {
  return (
    <>
      
      <HeroCarousel />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <ShowcaseSection />
      <ProjectsPreview />
      <CtaBanner />
      <TestimonialsSection />
    </>
  )
}
