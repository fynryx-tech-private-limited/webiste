import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <p className="brand-eyebrow mb-1 text-[0.6rem]">{project.category}</p>
        <h3 className="text-lg font-bold text-primary-900">{project.title}</h3>
      </div>
    </article>
  )
}
