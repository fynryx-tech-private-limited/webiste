// import { HeroCarousel } from '../components/home/HeroCarousel'
import { AboutSection } from '../components/home/AboutSection'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { ServicesSection } from '../components/home/ServicesSection'
import { ShowcaseSection } from '../components/home/ShowcaseSection'
import { ProjectsPreview } from '../components/home/ProjectsPreview'
// import { StatsSection } from '../components/home/StatsSection'
import { CtaBanner } from '../components/home/CtaBanner'


export function HomePage() {
  return (
    <>
      <ShowcaseSection />
      {/* <HeroCarousel /> */}
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <ProjectsPreview />
      {/* <ShowcaseSection /> */}
      {/* <StatsSection /> */}
      <CtaBanner />
      {/* <TestimonialsSection /> */}
    </>
  )
}
