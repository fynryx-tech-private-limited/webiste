import { PageHero } from '../components/ui/PageHero'
import { CoursesSection } from '../components/home/CoursesSection'

export function CoursesPage() {
  return (
    <>
      <PageHero
        title="Courses"
        subtitle="Master the latest technologies with our industry-leading courses and hands-on training."
      />
      <CoursesSection />
    </>
  )
}
