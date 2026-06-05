import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects } from '../data/projects'
import { useSEO } from '../utils/useSEO'

export function ProjectsPage() {
  useSEO({
    title: 'Portfolio | Successful IT Projects | Fynryx',
    description: 'Explore our portfolio of successful IT implementations and custom software solutions across diverse industries. See what we have delivered.',
    keywords: 'portfolio, IT projects, software development, web applications, case studies, custom solutions',
    canonical: 'https://fynryx.com/projects',
  })
  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="Explore our portfolio of successful IT implementations across diverse industries."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Work"
            description="We deliver innovative IT solutions that enhance efficiency and drive success."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
