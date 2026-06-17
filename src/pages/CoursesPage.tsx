import { PageHero } from '../components/ui/PageHero'
import { CoursesSection } from '../components/home/CoursesSection'
import { SEO } from '../utils/useSEO'

export function CoursesPage() {
  return (
    <>
      <SEO 
        title="Training & Courses - Fynryx" 
        description="Advance your career with industry-led training programs in Python, React, Data Science, and Cloud Technologies by Fynryx." 
      />
      <PageHero
        title="Courses"
        subtitle="Master the latest technologies with our industry-leading courses and hands-on training."
      />
      <CoursesSection />
    </>
  )
}
