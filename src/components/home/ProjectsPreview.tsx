import { projects } from '../../data/projects'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'
import { Button } from '../ui/Button'

export function ProjectsPreview() {
  return (
    <section className="bg-primary-50 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Projects"
          description="We deliver innovative IT solutions across diverse sectors, enhancing efficiency and driving success through custom technology implementations."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/projects" variant="secondary">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
