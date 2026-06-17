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
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {projects.map((project, index) => (
            <div key={project.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <ProjectCard project={project} index={index} />
            </div>
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
