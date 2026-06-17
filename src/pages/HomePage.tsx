// import { HeroCarousel } from '../components/home/HeroCarousel'
import { AboutSection } from '../components/home/AboutSection'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { ServicesSection } from '../components/home/ServicesSection'
import { ShowcaseSection } from '../components/home/ShowcaseSection'
import { ProjectsPreview } from '../components/home/ProjectsPreview'
// import { StatsSection } from '../components/home/StatsSection'
import { CtaBanner } from '../components/home/CtaBanner'


import { SEO } from '../utils/useSEO'

export function HomePage() {
  return (
    <>
      <SEO 
        title="Fynryx – Design. Innovate. Transform." 
        description="Fynryx provides top-tier IT services including web development, mobile apps, cloud computing, and managed IT support to transform your business." 
      />
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
